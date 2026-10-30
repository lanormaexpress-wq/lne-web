'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto'),path=require('node:path'),fs=require('node:fs'),cp=require('node:child_process'),express=require('express');
const {atoms,faststart}=require('../scripts/faststart-video.cjs');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),before=cp.execFileSync('git',['show','babb08f:assets/fondo.mp4'],{cwd:root,maxBuffer:32*1024*1024,windowsHide:true}),after=fs.readFileSync(path.join(root,'assets/fondo.mp4'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
assert.deepEqual(faststart(before),after);assert.deepEqual(faststart(after),after);
for(const type of ['mdat','ftyp']){const extract=b=>{const a=atoms(b).find(a=>a.type===type);return b.subarray(a.offset,a.offset+a.size)};assert.equal(hash(extract(before)),hash(extract(after)));}
assert(atoms(after).find(a=>a.type==='moov').offset<atoms(after).find(a=>a.type==='mdat').offset);
const app=express(),requests=[];
app.get('/',(_req,res)=>res.type('html').send('<!doctype html><html><body></body></html>'));
for(const [name,data] of [['before',before],['after',after]])app.get('/'+name+'.mp4',(req,res)=>{
 const range=req.headers.range;requests.push({name,range});res.set({'Accept-Ranges':'bytes','Content-Type':'video/mp4','Cache-Control':'no-store'});
 if(!range)return res.send(data);
 const match=/bytes=(\d+)-(\d*)/.exec(range);const start=Number(match[1]),end=Math.min(Number(match[2]||data.length-1),data.length-1);
 res.status(206).set({'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':String(end-start+1)}).end(data.subarray(start,end+1));
});
const server=app.listen(0,'127.0.0.1',async()=>{
 let browser;const results=[];
 try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const name of ['before','after']){
  const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const metrics=await page.evaluate(async name=>{
   const start=performance.now(),v=document.createElement('video');v.muted=true;v.preload='auto';document.body.append(v);
   await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=()=>reject(Error('Video decode failed'));v.src='/'+name+'.mp4';});
   const loadedMs=performance.now()-start,frames=[],canvas=document.createElement('canvas');canvas.width=v.videoWidth;canvas.height=v.videoHeight;
   for(const t of [0.5,1,3]){
    await new Promise(resolve=>{v.onseeked=resolve;v.currentTime=t;});
    canvas.getContext('2d').drawImage(v,0,0);const pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
    frames.push(Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',pixels))).map(b=>b.toString(16).padStart(2,'0')).join(''));
   }
   return {loadedMs,duration:v.duration,width:v.videoWidth,height:v.videoHeight,frames};
  },name);results.push({name,...metrics,requests:requests.filter(r=>r.name===name)});await context.close();
 }
 for(const key of ['duration','width','height','frames'])assert.deepEqual(results[0][key],results[1][key]);
 console.log(JSON.stringify({result:'PASS',sameMediaBytes:true,sameDecodedFrames:true,bytes:after.length,results},null,2));
 }catch(e){console.error(e);process.exitCode=1}finally{await browser?.close();server.closeAllConnections();server.close();}
});
