export function mountTemplateManager({modal,getCourse,onSelect}) {
 const root=modal.querySelector('[data-managed]');
 root.innerHTML=`<h3>Cartillas administrables</h3><p data-template-status role="status"></p><div data-template-list class="summary-template-grid"></div><section data-template-form hidden><h4 data-form-title>Añadir cartilla</h4><label>NOMBRE DE LA CARTILLA<input data-template-name maxlength="200"></label><label>IMAGEN DE LA CARTILLA<input data-template-image type="file" accept="image/jpeg,image/png,image/webp"></label><div class="summary-template-preview" hidden><img data-template-preview alt="Vista previa de la cartilla"></div><p data-image-info></p><button type="button" data-template-save>GUARDAR CARTILLA</button><button type="button" data-template-cancel>CANCELAR</button></section>`;
 const find=s=>root.querySelector(s),list=find('[data-template-list]'),status=find('[data-template-status]'),form=find('[data-template-form]'),name=find('[data-template-name]'),image=find('[data-template-image]'),preview=find('[data-template-preview]'),info=find('[data-image-info]'),save=find('[data-template-save]'),add=modal.querySelector('[data-add]');
 let owner=false,canCreate=false,editing=null,blob=null,objectUrl=null,generation=0,loadId=0,optimizing=false;
 const kb=n=>(n/1024).toFixed(1)+' KB';
 async function api(url,options={}) {const r=await fetch('/admin/resumenes/templates'+url,{...options,credentials:'same-origin',cache:'no-store'});let b;try{b=await r.json();}catch(_){throw Error('No se pudo conectar con las cartillas.');}if(!r.ok)throw Error(b.error||'No se pudo completar la operación.');return b;}
 function resetForm(){generation++;editing=null;blob=null;optimizing=false;name.value='';image.value='';info.textContent='';form.hidden=true;preview.parentElement.hidden=true;if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;save.disabled=false;}
 function begin(row){resetForm();status.textContent='';editing=row||null;form.hidden=false;find('[data-form-title]').textContent=row?'Editar cartilla':'Añadir cartilla';name.value=row?.name||'';if(row){preview.src=row.image_url;preview.parentElement.hidden=false;}name.focus();}
 async function confirmDelete(){const d=document.createElement('dialog');d.innerHTML='<form method="dialog"><p>¿Eliminar esta cartilla?</p><button value="cancel">Cancelar</button><button value="delete">Eliminar</button></form>';document.body.append(d);d.showModal();return new Promise(resolve=>d.addEventListener('close',()=>{const yes=d.returnValue==='delete';d.remove();resolve(yes);},{once:true}));}
 async function load(){
  const id=++loadId;resetForm();list.replaceChildren();const course=getCourse();add.hidden=!canCreate||!course;
  if(!course){status.textContent='';return;}status.textContent='Consultando cartillas…';
  try{
   const result=await api('?course_id='+encodeURIComponent(course.id));if(id!==loadId)return;
   status.textContent=result.templates.length?'':'Todavía no hay cartillas creadas.';
   for(const [index,row] of result.templates.entries()){
    const card=document.createElement('article');card.className='summary-managed-card';card.dataset.templateId=row.id;
    const select=document.createElement('button');select.type='button';const img=document.createElement('img');img.src=row.image_url;img.alt=row.name;
    const title=document.createElement('strong');title.textContent=`${index+1}. ${row.name}`;
    const state=document.createElement('span');state.textContent='Disponible';select.append(img,title,state);
    select.addEventListener('click',()=>onSelect({id:row.id,name:row.name}));card.append(select);
    if(owner){
     for(const [delta,label] of [[-1,'Mover arriba'],[1,'Mover abajo']]){
      const move=document.createElement('button');move.type='button';move.textContent=delta<0?'↑':'↓';move.title=label;move.setAttribute('aria-label',`${label}: ${row.name}`);
      move.disabled=index+delta<0||index+delta>=result.templates.length;
      move.addEventListener('click',async()=>{
       const expected=result.templates.map(t=>t.id),ordered=[...expected];[ordered[index],ordered[index+delta]]=[ordered[index+delta],ordered[index]];
       list.querySelectorAll('button').forEach(button=>button.disabled=true);
       try{
        await api('/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:course.id,expected_ids:expected,ordered_ids:ordered})});
        if(id!==loadId)return;await load();status.textContent='Orden guardado correctamente.';
       }catch(e){if(id===loadId){await load();status.textContent=e.message;}}
      });card.append(move);
     }
     const edit=document.createElement('button');edit.type='button';edit.textContent='Editar cartilla';edit.addEventListener('click',()=>begin(row));
     const remove=document.createElement('button');remove.type='button';remove.textContent='Eliminar cartilla';
     remove.addEventListener('click',async()=>{if(!await confirmDelete())return;remove.disabled=true;try{const result=await api('/'+row.id,{method:'DELETE'});await load();status.textContent=result.warning||'Cartilla eliminada correctamente.';}catch(e){status.textContent=e.message;remove.disabled=false;}});
     card.append(edit,remove);
    }list.append(card);
   }
  }catch(e){if(id===loadId)status.textContent=e.message;}
 }
 image.addEventListener('change',async()=>{const file=image.files[0],current=++generation;blob=null;if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)){info.textContent='Selecciona una imagen JPG, PNG o WebP.';image.value='';return;}optimizing=true;save.disabled=true;info.textContent='Optimizando imagen…';let bitmap;try{bitmap=await createImageBitmap(file,{imageOrientation:'from-image'});const scale=Math.min(1,1408/bitmap.width,880/bitmap.height),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);let optimized;for(const q of [.86,.80,.74,.68]){optimized=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',q));if(!optimized||optimized.size<=409600)break;}if(!optimized||optimized.type!=='image/webp')throw Error('Este navegador no pudo convertir la imagen a WebP.');if(current!==generation)return;blob=optimized;if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(blob);preview.src=objectUrl;preview.parentElement.hidden=false;info.textContent=`Original: ${bitmap.width} × ${bitmap.height} · ${kb(file.size)}. Optimizada: ${canvas.width} × ${canvas.height} · ${kb(blob.size)} · WebP · reducción ${(100*(1-blob.size/file.size)).toFixed(1)}%.`;info.dataset.metrics=JSON.stringify({originalBytes:file.size,originalWidth:bitmap.width,originalHeight:bitmap.height,finalBytes:blob.size,width:canvas.width,height:canvas.height,type:blob.type});}catch(e){if(current===generation)info.textContent=e.message||'No se pudo leer esta imagen.';}finally{bitmap?.close();if(current===generation){optimizing=false;save.disabled=false;}}});
 save.addEventListener('click',async()=>{if(optimizing)return;const course=getCourse();if(!course||!name.value.trim()||(!editing&&!blob)){status.textContent='Completa el nombre y selecciona una imagen válida.';return;}save.disabled=true;const data=new FormData();data.append('name',name.value.trim());data.append('course_id',course.id);if(blob)data.append('image',blob,'cartilla.webp');try{const result=await api(editing?'/'+editing.id:'',{method:editing?'PATCH':'POST',body:data});await load();status.textContent=result.warning||'Cartilla guardada correctamente.';}catch(e){status.textContent=e.message;}finally{save.disabled=false;}});
 add.addEventListener('click',()=>begin(null));find('[data-template-cancel]').addEventListener('click',resetForm);
 return {load,setPermission(value,manage=value){canCreate=Boolean(value);owner=Boolean(manage);},reset(){loadId++;resetForm();list.replaceChildren();status.textContent='';add.hidden=true;}};
}
