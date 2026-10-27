'use strict';
// API contract and failure/retry tests; provider is entirely in memory.
const test = require('node:test'), assert = require('node:assert/strict');
const express = require('express'), crypto = require('node:crypto');
const permissions = require('../admin-permission-catalog');
const { privateRouter, publicRouter } = require('../lib/summary-documents');
const templateRouter = require('../lib/summary-templates');
const app = express(), cards = new Map(), documents = new Map(), publications = new Map(), objects = new Set(), tasks = new Map();
let base, server, failStorage = false, rpcDeletes = 0;
const uid = crypto.randomUUID(), ids = [crypto.randomUUID(),crypto.randomUUID(),crypto.randomUUID()];
app.use(express.json());
app.post('/mock/rest/v1/rpc/:rpc', (req,res) => {
 const body=req.body;
 if(req.params.rpc==='reorder_summary_templates'){
  const actual=[...cards.values()].filter(c=>c.course_id===body.course).sort((a,b)=>a.sort_order-b.sort_order).map(c=>c.id);
  if(JSON.stringify(actual)!==JSON.stringify(body.expected_ids))return res.status(409).json({code:'40001'});
  body.ordered_ids.forEach((id,index)=>cards.get(id).sort_order=index+1);return res.json(null);
 }
 if(req.params.rpc==='ordered_summary_publications')return res.json([...publications.values()].filter(p=>p.course_id===body.course).sort((a,b)=>cards.get(a.template_id).sort_order-cards.get(b.template_id).sort_order));
 if(req.params.rpc==='delete_summary_document'){
  rpcDeletes++;const row=documents.get(body.document_id);
  if(!row)return res.status(409).json({});
  if(row.updated_at!==body.expected_updated_at)return res.status(409).json({code:'40001'});
  documents.delete(row.id);publications.delete(row.id);
  const card=cards.get(row.template_id);let removed=null;
  if(card&&![...documents.values()].some(d=>d.template_id===card.id)&&![...publications.values()].some(p=>p.template_id===card.id)){
   removed=card.id;cards.delete(card.id);tasks.set(row.id,{id:row.id,image_path:card.image_path,shared:false});
  }
  return res.json({document_id:row.id,template_deleted:removed});
 }
 if(req.params.rpc==='summary_cleanup_tasks'){
  const task=tasks.get(body.completed_id);if(task&&!objects.has(task.image_path))tasks.delete(task.id);
  return res.json([...tasks.values()]);
 }
 res.status(404).json({});
});
app.get('/mock/rest/v1/summary_documents',(req,res)=>res.json([...documents.values()].filter(d=>!req.query.status||d.status===req.query.status.slice(3))));
app.get('/mock/rest/v1/summary_templates',(req,res)=>res.json([...cards.values()].filter(c=>c.course_id===req.query.course_id?.slice(3)).sort((a,b)=>a.sort_order-b.sort_order)));
app.post('/mock/storage/v1/object/sign/:bucket/*',(req,res)=>res.json({signedURL:'/object/'+req.params.bucket+'/'+req.params[0]}));
app.delete('/mock/storage/v1/object/:bucket',(req,res)=>{
 if(failStorage)return res.status(503).json({});
 for(const path of req.body.prefixes)objects.delete(path);res.json([]);
});
const auth=(req,res,next)=>{
 const profile=req.get('x-profile')||'owner';
 req.adminUser={id:uid,app_metadata:{role:profile==='owner'?'owner':'editor'},admin_permissions:profile==='restricted'?{summary_access:true}:permissions.preset(profile)};next();
};
const config=()=>({url:base+'/mock',key:'mock-not-a-secret'});
app.use('/documents',auth,privateRouter(config));app.use('/templates',auth,templateRouter(config));app.use('/public',publicRouter(config));
test.before(async()=>{server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));base='http://127.0.0.1:'+server.address().port;});
test.after(()=>{server.close();server.closeAllConnections();});
test.beforeEach(()=>{cards.clear();documents.clear();publications.clear();objects.clear();tasks.clear();failStorage=false;rpcDeletes=0;});
async function api(path,method='GET',body,profile='owner'){
 const response=await fetch(base+path,{method,headers:{'Content-Type':'application/json','x-profile':profile},...(body?{body:JSON.stringify(body)}:{})});return {status:response.status,body:await response.json()};
}
function fixture(status='BORRADOR',templateId=ids[0]){
 const id=crypto.randomUUID(),path=`${uid}/${templateId}/${crypto.randomUUID()}.webp`;
 if(!cards.has(templateId)){cards.set(templateId,{id:templateId,course_id:'contratos',sort_order:cards.size+1,name:'Temporary',image_path:path});objects.add(path);}
 const row={id,status,title:'TEMPORAL',template_id:templateId,course_id:'contratos',updated_at:'version-1'};documents.set(id,row);
 if(status==='PUBLICADO')publications.set(id,{...row,template_name:'Temporary',image_path:cards.get(templateId).image_path});return row;
}
test('three cards: 1,2,3 -> 3,1,2; admin and public persist same IDs/order',async()=>{
 ids.forEach(id=>fixture('PUBLICADO',id));const ordered=[ids[2],ids[0],ids[1]],publicationIds=[...publications.keys()];
 assert.equal((await api('/templates/order','POST',{course_id:'contratos',expected_ids:ids,ordered_ids:ordered})).status,200);
 for(let reload=0;reload<2;reload++){
  assert.deepEqual((await api('/templates?course_id=contratos')).body.templates.map(t=>t.id),ordered);
  assert.deepEqual((await api('/public?course_id=contratos')).body.topics.map(t=>t.publicationId),[publicationIds[2],publicationIds[0],publicationIds[1]]);
 }
 assert.equal(cards.size,3);assert.equal(objects.size,3);assert.deepEqual([...publications.keys()],publicationIds);
 assert.notEqual((await api('/templates/order','POST',{course_id:'contratos',expected_ids:ids,ordered_ids:ordered})).status,200);
});
test('ordering preserves existing explicit card permissions, not role names',async()=>{
 ids.forEach(id=>fixture('BORRADOR',id));
 assert.equal((await api('/templates/order','POST',{course_id:'contratos',expected_ids:ids,ordered_ids:ids},'restricted')).status,403);
 for(const profile of ['writer','reviewer'])assert.equal((await api('/templates/order','POST',{course_id:'contratos',expected_ids:ids,ordered_ids:ids},profile)).status,200);
});
for(const status of ['BORRADOR','EN_REVISION','PUBLICADO'])test('owner permanently deletes '+status+' and exclusive resources',async()=>{
 const row=fixture(status),result=await api('/documents/'+row.id,'DELETE',{confirm:true,updated_at:row.updated_at});
 assert.equal(result.status,200);assert.equal(result.body.cleanupPending,0);assert.equal(documents.size,0);assert.equal(publications.size,0);assert.equal(cards.size,0);assert.equal(objects.size,0);assert.equal(tasks.size,0);
});
test('shared card/image retained; other document untouched',async()=>{
 const first=fixture('PUBLICADO'),second=fixture('BORRADOR');
 assert.equal((await api('/documents/'+first.id,'DELETE',{confirm:true,updated_at:first.updated_at})).status,200);
 assert.equal(documents.get(second.id),second);assert.equal(cards.size,1);assert.equal(objects.size,1);assert.equal(publications.size,0);
});
test('writer and reviewer denied before any delete RPC; confirmation/version required',async()=>{
 const row=fixture();for(const role of ['writer','reviewer'])assert.equal((await api('/documents/'+row.id,'DELETE',{confirm:true,updated_at:row.updated_at},role)).status,403);
 assert.equal(rpcDeletes,0);assert.equal((await api('/documents/'+row.id,'DELETE',{})).status,400);
 assert.equal((await api('/documents/'+row.id,'DELETE',{confirm:true,updated_at:'old'})).status,409);assert.ok(documents.has(row.id));
});
test('Storage failure leaves durable retry, not false cleanup; retry requires OWNER',async()=>{
 const row=fixture('PUBLICADO');failStorage=true;
 const deleted=await api('/documents/'+row.id,'DELETE',{confirm:true,updated_at:row.updated_at});
 assert.equal(deleted.status,200);assert.equal(deleted.body.cleanupPending,1);assert.ok(deleted.body.warning);assert.equal(documents.size,0);assert.equal(objects.size,1);assert.equal(tasks.size,1);
 assert.equal((await api('/documents/cleanup','POST',{},'reviewer')).status,403);
 failStorage=false;assert.equal((await api('/documents/cleanup','POST',{})).body.cleanupPending,0);assert.equal(objects.size,0);assert.equal(tasks.size,0);
});
