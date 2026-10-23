/* Shared list semantics: editor, imported DOCX and read-only HTML. */
window.LNELists=(()=>{
    const styles={
        vinetas:[['disc','•'],['circle','○'],['square','▪'],['dash','–'],['arrow','→'],['check','✓']],
        numerada:[['decimal','1.'],['decimal-paren','1)'],['upper-alpha','A.'],['lower-alpha','a.'],['upper-roman','I.'],['lower-roman','i.']],
        multinivel:[['decimal-outline','1. / 1.1 / 1.1.1'],['roman-alpha-decimal','I. / A. / 1.'],['alpha-decimal-alpha','A. / 1. / a.'],['paren-outline','1) / a) / i)']]
    };
    function alpha(value){let text='';for(let n=value;n>0;n=Math.floor((n-1)/26))text=String.fromCharCode(65+(n-1)%26)+text;return text;}
    function roman(value){if(value>3999)return String(value);let text='';for(const [n,s] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(value>=n){text+=s;value-=n;}return text;}
    function format(value,style){const raw=style.includes('alpha')?alpha(value):style.includes('roman')?roman(value):String(value);return style.startsWith('lower')?raw.toLowerCase():raw;}
    function settings(block){const p=block.propiedades||{},type=styles[p.formato]?p.formato:'vinetas';return {type,style:styles[type].some(s=>s[0]===p.listStyle)?p.listStyle:styles[type][0][0],start:Math.max(1,Math.min(999999,Math.floor(Number(p.startValue)||1)))};}
    function predecessor(block,blocks){const index=blocks.findIndex(b=>b.id===block.id);return index<0?null:blocks.slice(0,index).find(b=>b.id===block.propiedades?.continueFrom&&b.tipo==='lista');}
    function start(block,blocks=[]){const previous=predecessor(block,blocks);return previous?(build(previous,blocks).counts[0]||settings(previous).start)+1:settings(block).start;}
    function build(block,blocks=[]){
        const p=block.propiedades||{},{type,style}=settings(block),previous=predecessor(block,blocks),counts=previous?[...build(previous,blocks).counts]:Array(9).fill(0),initial=settings(block).start;
        const values=(p.items||[]).map((_,i)=>{
            const level=Math.max(0,Math.min(8,Number(p.itemLevels?.[i])||0));
            counts[level]++;if(counts[level]===1)counts[level]=level===0?initial:Math.max(1,Number(p.docxLevels?.[level]?.start)||1);
            for(let n=0;n<level;n++)if(!counts[n])counts[n]=n===0?initial:1;
            for(let n=level+1;n<counts.length;n++)counts[n]=0;
            if(p.docxLevels?.[level]){
                const definition=p.docxLevels[level],formats={decimal:'decimal',upperLetter:'upper-alpha',lowerLetter:'lower-alpha',upperRoman:'upper-roman',lowerRoman:'lower-roman'};
                if(definition.format==='bullet')return {'\uf0b7':'•','\uf0a7':'▪'}[definition.text]||definition.text||'•';
                return definition.text.replace(/%([1-9])/g,(_,n)=>format(counts[Number(n)-1]||1,formats[p.docxLevels[n-1]?.format]||'decimal'));
            }
            if(type==='vinetas')return styles.vinetas.find(s=>s[0]===style)[1];
            if(type==='multinivel'&&style==='decimal-outline')return counts.slice(0,level+1).join('.')+(level===0?'.':'');
            const scheme=type==='multinivel'?({'roman-alpha-decimal':['upper-roman','upper-alpha','decimal'],'alpha-decimal-alpha':['upper-alpha','decimal','lower-alpha'],'paren-outline':['decimal','lower-alpha','lower-roman']}[style]):null;
            const chosen=scheme?scheme[level%scheme.length]:style;
            return format(counts[level],chosen)+(style==='decimal-paren'||style==='paren-outline'?')':'.');
        });return {values,counts};
    }
    function markers(block,blocks=[]){return build(block,blocks).values;}
    return {styles,settings,markers,start};
})();
