// Isolated provider test. No real Auth, database, publication or credentials.
const assert=require('node:assert/strict'),express=require('express'),crypto=require('node:crypto');
const app=express(),rows=new Map();let base,inserts=0;
const author='11111111-1111-4111-8111-111111111111';
app.use('/mock',express.json());
app.all('/mock/rest/v1/summary_documents',(req,res)=>{
 const found=[...rows.values()].filter(row=>Object.entries(req.query).every(([key,value])=>key==='content_lne->>documentoId'?row.content_lne.documentoId===value.slice(3):!['id','author_id'].includes(key)||row[key]===value.slice(3)));
 if(req.method==='GET')return res.json(found);
 if(req.method==='POST'){
  if(rows.has(req.body.id))return res.json([]);
  inserts++;const row={...req.body,updated_at:new Date().toISOString()};rows.set(row.id,row);return res.json([row]);
 }
 if(req.method==='PATCH'){for(const row of found)Object.assign(row,req.body);return res.json(found);}
 res.status(405).end();
});
app.use('/documents',(req,_res,next)=>{req.adminUser={id:author,app_metadata:{role:'editor'},admin_permissions:{summary_access:true,summary_create:true,summary_edit:true,summary_save:true}};next();},require('../lib/summary-documents').privateRouter(()=>({url:base+'/mock',key:'mock-only'})));
const server=app.listen(0,'127.0.0.1',async()=>{try{
 base=`http://127.0.0.1:${server.address().port}`;
 const body={title:'Identity fixture',content_lne:{documentoId:'same-editor-document',bloques:[{id:'p1',texto:'Original'}]},preview_html:'<p>Original</p>'};
 async function post(){const response=await fetch(base+'/documents',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,id:crypto.randomUUID()})});assert.ok(response.ok);return (await response.json()).document;}
 const batch=await Promise.all(Array.from({length:5},post));
 assert.equal(new Set(batch.map(row=>row.id)).size,1);assert.equal(rows.size,1);assert.equal(inserts,1);
 const id=batch[0].id;
 assert.equal((await post()).id,id,'Lost client UUID must resolve the existing editor identity');
 const open=await fetch(base+'/documents/'+id).then(r=>r.json());assert.equal(open.canEdit,true);
 rows.get(id).status='EN_REVISION';assert.equal((await post()).id,id);
 const foreign={...rows.get(id),id:crypto.randomUUID(),author_id:'22222222-2222-4222-8222-222222222222'};rows.set(foreign.id,foreign);
 const denied=await fetch(base+'/documents/'+foreign.id).then(r=>r.json());assert.equal(denied.canEdit,false);
 assert.equal(rows.size,2,'Only the explicitly seeded foreign fixture adds a second row');
 console.log('PASS (simulated provider): concurrent create, lost client ID, review transition, single stable record, edit permission validation.');
}catch(error){console.error(error);process.exitCode=1;}finally{server.close();server.closeAllConnections();}});
