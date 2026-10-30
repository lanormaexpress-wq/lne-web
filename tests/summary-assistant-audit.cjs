// Read-only integration audit. Never calls Gemini, Supabase or an AI endpoint.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('asistente.js','utf8'),start=code.indexOf('async function obtenerContextoLey('),end=code.indexOf('async function enviarPreguntaAGemini(');
let fn=code.slice(start,end);fn=fn.slice(0,fn.lastIndexOf('}')+1);
(async()=>{
 const context=vm.runInNewContext(`(${fn})`,{window:{location:{pathname:'/formacion/ciencia-politica'},LNENormas:{getByPath:()=>null}},document:{querySelector:()=>({innerText:'Ciencia Política. El Estado.'}),body:{innerText:'CONTENIDO DEL MARCO NO INCLUIDO'}}});
 const summary=await context('¿Qué estudia la ciencia política?');assert.equal(summary,'Ciencia Política. El Estado.');assert.ok(!summary.includes('CONTENIDO DEL MARCO'));
 const normContext=vm.runInNewContext(`(${fn})`,{window:{location:{pathname:'/legislacion/codigo-procesal-penal'},LNEActiveNorm:{title:'Código Procesal Penal'},LNENormas:{captureData:()=>[{articulos:[{numero:'68-A',titulo:'Operativo de revelación del delito',texto:'Texto publicado de prueba local'}]}]}},document:{}});
 assert.match(await normContext('artículo 68-A'),/Texto publicado de prueba local/);
 const backend=fs.readFileSync('server.js','utf8').split("app.post('/api/chat'")[1];assert.doesNotMatch(backend,/articulos_legales|supabaseRest|summary_publications/);
 console.log('AUDIT: active loaded legislation context YES; published summary iframe context NO; server-side legal-table retrieval NO; live Gemini availability NOT TESTED; no endpoint changes.');
})().catch(e=>{console.error(e);process.exitCode=1});
