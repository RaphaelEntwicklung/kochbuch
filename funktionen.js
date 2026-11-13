/* Raphaels Kochbuch – Umrechnung und Formatierung */
/* ---------- Umrechnung & Formatierung ---------- */
const EGG={y:[18,'Eigelb'],w:[32,'Eiweiss'],e:[50,'Eier']};
const frac=v=>{const w=Math.floor(v),r=Math.round((v-w)*4)/4;const m={0:'',0.25:'¼',0.5:'½',0.75:'¾'};const s=m[r]||'';if(!w) return s||'0';return w+s};
function fmt(q,u,f){
  if(q==null) return '';
  let v=q*f;
  if(u==='kg'){v*=1000;u='g'}
  if(u==='l'){v*=1000;u='ml'} if(u==='dl'){v*=100;u='ml'} if(u==='cl'){v*=10;u='ml'}
  if(u==='g'||u==='ml'){
    if(v>=1000){const k=v/1000;return (k%1===0?k:k.toFixed(k<10?2:1).replace(/\.?0+$/,''))+' '+(u==='g'?'kg':'l')}
    if(u==='ml'&&v>=100){const d=Math.round(v/10)/10;return (d%1?d.toFixed(1):d)+' dl'}
    let r;
    if(v<10) r=Math.round(v*2)/2; else if(v<100) r=Math.round(v); else if(v<500) r=Math.round(v/5)*5; else r=Math.round(v/10)*10;
    return (r%1?r.toFixed(1):r)+' '+u;
  }
  if(u==='EL'||u==='TL'){
    if(u==='EL'&&v<0.5){v*=3;u='TL'}
    const r=Math.round(v*4)/4; if(r<0.25) return '1 Prise';
    return frac(r)+' '+u;
  }
  if(u==='Tropfen'||u==='Pkg'||u==='Würfel'||u==='Dose'||u==='Pack'){const r=Math.round(v*2)/2;return frac(r)+' '+(u==='Dose'&&r!==1?'Dosen':u)}
  if(u==='Blatt') v*=GEL;
  // Stk, Blatt
  const r=Math.round(v*2)/2;
  return frac(r)+(u==='Stk'?'':' '+u);
}
const GEL=2, GEL_G=1.67; // 1 Profi-Blatt (3,3 g) = 2 Haushaltsblätter (1,6–1,7 g)
function gelHint(q,f){const p=q*f;const hs=Math.round(p*GEL*2)/2;const g=Math.round(hs*GEL_G*2)/2;return `≈ ${g} g · Original: ${frac(Math.round(p*4)/4)} Profi-Blatt`}
function eggHint(q,f,k){const [w,n]=EGG[k];const c=q*f/w;const r=Math.round(c*2)/2;return `≈ ${frac(r)} ${n}`}

