const express=require('express'),assert=require('node:assert/strict');
const app=express();let validations=0, revoked=false;
const token=(exp,session_id='mock-auth-session')=>'Bearer test.'+Buffer.from(JSON.stringify({exp,session_id})).toString('base64url')+'.signature';
app.use('/admin/resumenes',require('../lib/summary-editor')((req,res,next)=>{
 validations++;
 if(revoked)return res.status(401).json({error:'Sesión inválida.'});
 req.adminUser={id:'owner-test',app_metadata:{role:'owner'}};next();
}));
const server=app.listen(0,'127.0.0.1',async()=>{const base=`http://127.0.0.1:${server.address().port}/admin/resumenes`;
 try{
  async function bridge(exp,oldCookie){const r=await fetch(base+'/session',{method:'POST',headers:{Authorization:token(exp),...(oldCookie?{Cookie:oldCookie}:{})}});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0];}
  const future=Math.floor(Date.now()/1000)+3600,old=await bridge(future);
  const initialScope=await fetch(base+'/session',{method:'POST',headers:{Authorization:token(future)}}).then(r=>r.json());
  const refreshedScope=await fetch(base+'/session',{method:'POST',headers:{Authorization:token(future+10)}}).then(r=>r.json());
  assert.deepEqual(initialScope.documentSession,refreshedScope.documentSession,'Renovar JWT no debe cambiar el contexto del documento.');
  const nextScope=await fetch(base+'/session',{method:'POST',headers:{Authorization:token(future,'new-auth-session')}}).then(r=>r.json());
  assert.notEqual(initialScope.documentSession.sessionId,nextScope.documentSession.sessionId,'Un login nuevo debe tener otro contexto.');
  assert.equal(initialScope.documentSession.userId,'owner-test');
  const cookie=await bridge(future,old),headers={Cookie:cookie};
  assert.equal((await fetch(base+'/editor',{headers:{Cookie:old},redirect:'manual'})).status,302,'La cookie anterior debe revocarse al sincronizar.');
  const before=validations;
  assert.equal((await fetch(base+'/editor',{headers})).status,200);
  const editorHtml=await fetch(base+'/assets/2026-10-19/index.html',{headers}).then(r=>r.text());
  assert.ok(editorHtml.indexOf('LNESummaryStorage.install(')<editorHtml.indexOf('src="js/state.js"'),'El adaptador debe ejecutarse antes de recuperar el borrador.');
  assert.equal((await fetch(base+'/editor',{headers})).status,200,'Recarga/nueva pestaña con cookie compartida');
  const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'../admin-summary-editor/versions/2026-10-19');
  for(const match of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/(?:src|href)="((?:js|css|vendor)\/[^"?#]+)"/g))assert.equal((await fetch(base+'/assets/2026-10-19/'+match[1],{headers})).status,200);
  assert.equal(validations-before,3,'Dos páginas y el HTML original validan; CSS/JS no agregan validaciones.');
  revoked=true;
  const rejected=await fetch(base+'/editor',{headers,redirect:'manual'});
  assert.equal(rejected.status,302);assert.equal(rejected.headers.get('location'),'/admin?next=summary');
  revoked=false;
  const expired=await bridge(Math.floor(Date.now()/1000)-1);
  assert.equal((await fetch(base+'/editor',{headers:{Cookie:expired},redirect:'manual'})).status,302);
  assert.equal((await fetch(base+'/assets/2026-10-19/index.html',{headers:{Cookie:expired}})).status,401);
  assert.equal((await fetch(base+'/assets/2026-10-19/js/state.js')).status,200,'Código estático sin datos privados');
  const active=await bridge(future);
  assert.equal((await fetch(base+'/session',{method:'DELETE',headers:{Cookie:active}})).status,204);
  assert.equal((await fetch(base+'/editor',{headers:{Cookie:active},redirect:'manual'})).status,302);
  console.log('Auth: cookies renovadas, recarga/nueva pestaña, revocación, caducidad y logout correctos. Una validación por página; cero adicionales para los assets de la ráfaga.');
 }catch(e){console.error(e);process.exitCode=1;}finally{server.close();server.closeAllConnections();}
});
