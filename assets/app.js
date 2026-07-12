
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const el=(h)=>{const t=document.createElement("template");t.innerHTML=h.trim();return t.content.firstElementChild;};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

const Identity={currentUser:{id:"usr_demo",displayName:"dr. Pengguna Demo",role:"Psikiater (mode demo)"}};
const Audit={events:[],record(a,t,m={}){this.events.push({ts:new Date().toISOString(),actor:Identity.currentUser.id,action:a,objectType:t,meta:m});}};

const ASSESSMENT_STATES=[
  {id:"present",label:"Ada"},{id:"absent",label:"Tidak ada"},{id:"unknown",label:"Tidak diketahui"},
  {id:"not_assessed",label:"Belum dinilai"},{id:"not_applicable",label:"Tidak berlaku"},{id:"unable_to_assess",label:"Tak dapat dinilai"}
];
const STATE_LABEL=Object.fromEntries(ASSESSMENT_STATES.map(s=>[s.id,s.label]));

/* ==== Data ICD-10/PPDGJ-III dimuat dari assets/data.js (KNOWLEDGE_META, SYN, PEND, PPDGJ_PD, ICD10) ==== */
;(function(){function w(ns){for(var i=0;i<ns.length;i++){var n=ns[i];var pd=PPDGJ_PD[n.code];if(pd){n.pd=pd;if(pd.termasuk&&pd.termasuk.length)n.incl=pd.termasuk.join('; ');if(pd.tak_termasuk&&pd.tak_termasuk.length)n.excl=pd.tak_termasuk.join('; ');if(pd.halaman)n.ppdgj='Pedoman diagnostik terinci tersedia pada kartu di bawah (PPDGJ-III, hlm. cetak '+pd.halaman+').';else if(pd.deskripsi)n.ppdgj=pd.deskripsi;}if(n.children)w(n.children);}}w(ICD10);})();
const KnowledgeSearch={
  flat:[],
  index(){this.flat=[];const w=(ns,p)=>{ns.forEach(n=>{const q=p.concat([n]);this.flat.push({node:n,path:q});if(n.children)w(n.children,q);});};w(ICD10,[]);},
  nc(q){return q.replace(/\s+/g,"").toUpperCase();},
  search(query){const q=(query||"").trim().toLowerCase();if(!q)return[];const qc=this.nc(query);const out=[];
    for(const rec of this.flat){const n=rec.node;let score=0,reason="";const cn=this.nc(n.code);
      if(cn===qc){score=100;reason="kode sama persis";}
      else if(cn.startsWith(qc)&&/^[F0-9.–-]+$/i.test(qc)){score=80;reason="awalan kode";}
      else if(n.term.toLowerCase().includes(q)){score=60;reason="istilah cocok";}
      else if((n.synonyms||[]).some(s=>s.includes(q))){score=50;reason="sinonim cocok";}
      if(score>0)out.push({...rec,score,reason});}
    return out.sort((a,b)=>b.score-a.score||a.node.code.localeCompare(b.node.code)).slice(0,40);},
  findByCode(code){const qc=this.nc(code);return this.flat.find(r=>this.nc(r.node.code)===qc)||null;}
};

const DA_FINDINGS=[
  {id:"low_mood",label:"Suasana perasaan menurun (≥ 2 minggu)"},{id:"anhedonia",label:"Anhedonia / kehilangan minat"},
  {id:"sleep_disturb",label:"Gangguan tidur"},{id:"suicidal_idea",label:"Ide bunuh diri / membahayakan diri"},
  {id:"psychotic_sx",label:"Gejala psikotik (waham/halusinasi)"},{id:"substance_use",label:"Penggunaan zat psikoaktif terkini"},
  {id:"thyroid_flag",label:"Tanda kelainan tiroid / medis"},{id:"recent_trauma",label:"Peristiwa traumatik / stresor berat"}
];
const DA_LABEL=Object.fromEntries(DA_FINDINGS.map(f=>[f.id,f.label]));
const DA_RULE_VERSION="rules-syn-0.1";
const DiagnosticRules={
  rules:[
    {id:"rule_urgent_safety",severity:"critical",category:"urgent",title:"Keselamatan segera: ide membahayakan diri",source:"Prinsip keselamatan klinis (sintetis)",
     eval:f=>f.suicidal_idea==="present",support:["suicidal_idea"],against:[],relevantMissing:["suicidal_idea"],
     basis:"Temuan ide bunuh diri = 'Ada' memicu peringatan keselamatan; bukan penilaian derajat risiko.",
     limitation:"Tidak mengukur derajat risiko. Tidak menggantikan penilaian langsung & protokol darurat setempat."},
    {id:"rule_depressive_pattern",severity:"info",category:"supported",title:"Pertimbangkan pola depresif",concept:"icd_f32",source:"Struktur ICD-10 F32 (sintetis)",
     eval:f=>f.low_mood==="present"&&(f.anhedonia==="present"||f.sleep_disturb==="present"),support:["low_mood","anhedonia","sleep_disturb"],against:["psychotic_sx"],relevantMissing:["anhedonia","sleep_disturb"],
     basis:"Kombinasi suasana perasaan menurun dengan anhedonia/gangguan tidur mendukung pertimbangan pola depresif.",
     limitation:"Bukan diagnosis. Durasi, hendaya, dan eksklusi harus dinilai pada checklist yang sesuai."},
    {id:"rule_psychosis_pattern",severity:"attention",category:"supported",title:"Pertimbangkan spektrum psikotik",concept:"icd_f20",source:"Struktur ICD-10 F20–F29 (sintetis)",
     eval:f=>f.psychotic_sx==="present",support:["psychotic_sx"],against:[],relevantMissing:["substance_use","thyroid_flag"],
     basis:"Gejala psikotik yang dilaporkan/diobservasi memerlukan pertimbangan spektrum psikotik & penyebab alternatif.",
     limitation:"Penyebab medis, zat, dan afektif harus disingkirkan. Bukan diagnosis."}
  ],
  alternatives:[
    {when:f=>f.substance_use!=="absent",label:"Penyebab terkait zat (intoksikasi / putus zat)",note:"Pertimbangkan bila penggunaan zat tidak dapat disingkirkan."},
    {when:f=>f.thyroid_flag!=="absent",label:"Penyebab medis (mis. disfungsi tiroid)",note:"Pertimbangkan pemeriksaan laboratorium sesuai indikasi."},
    {when:()=>true,label:"Penyebab neurologis, medikasi, tidur, perkembangan, kontekstual",note:"Tetap dipertimbangkan bila relevan; tidak boleh disembunyikan."}
  ],
  evaluate(fs){const urgent=[],supported=[];
    for(const r of this.rules){let ok=false;try{ok=r.eval(fs);}catch(e){ok=false;}if(ok)(r.category==="urgent"?urgent:supported).push(r);}
    const missing=DA_FINDINGS.filter(f=>{const s=fs[f.id];return s==="unknown"||s==="not_assessed"||s==="unable_to_assess"||s==null;});
    const alts=this.alternatives.filter(a=>{try{return a.when(fs);}catch(e){return false;}});
    return{urgent,supported,missing,alternatives:alts,ruleVersion:DA_RULE_VERSION};}
};

const SCALES=[{
  id:"scale_syn_mood9",name:"Skala Skrining Mood-9 (SINTETIS)",version:"scale-syn-0.1",
  purpose:"Skrining beban gejala umum (demonstrasi non-produksi).",population:"Dewasa (contoh sintetis).",recall:"2 minggu terakhir",
  license:"Instrumen sintetis; bukan instrumen berlisensi mana pun.",missingPolicy:"Boleh melewati maksimum 2 item; >2 item kosong → skor tidak valid.",
  limitation:"Skor skrining. BUKAN diagnosis. Tidak menggantikan penilaian langsung.",
  items:Array.from({length:9},(_,i)=>({id:"q"+(i+1),text:"Item sintetis "+(i+1)+": frekuensi gejala contoh."})),
  options:[{v:0,l:"Tidak sama sekali"},{v:1,l:"Beberapa hari"},{v:2,l:"Lebih dari separuh hari"},{v:3,l:"Hampir setiap hari"}],
  bands:[{max:4,l:"Minimal (sintetis)"},{max:9,l:"Ringan (sintetis)"},{max:14,l:"Sedang (sintetis)"},{max:27,l:"Berat (sintetis)"}],
  score(res){const ans=Object.values(res).filter(v=>v!=null&&v!=="");const missing=this.items.length-ans.length;
    if(missing>2)return{valid:false,missing,reason:"Lebih dari 2 item kosong."};
    const sum=ans.reduce((a,v)=>a+Number(v),0);const band=this.bands.find(b=>sum<=b.max);return{valid:true,missing,sum,band:band?band.l:"-"};}
}];

const GAF={
  source:"Kerangka GAF (legacy). Bukan bagian dari DSM-5-TR.",version:"gaf-legacy-0.1",
  ranges:[
    {min:91,max:100,l:"91–100: Fungsi superior (deskriptor sintetis)."},{min:81,max:90,l:"81–90: Gejala minimal / fungsi baik (sintetis)."},
    {min:71,max:80,l:"71–80: Gejala sementara & dapat diperkirakan (sintetis)."},{min:61,max:70,l:"61–70: Beberapa gejala ringan (sintetis)."},
    {min:51,max:60,l:"51–60: Gejala sedang (sintetis)."},{min:41,max:50,l:"41–50: Gejala serius (sintetis)."},
    {min:31,max:40,l:"31–40: Hendaya uji realitas/komunikasi (sintetis)."},{min:21,max:30,l:"21–30: Perilaku sangat dipengaruhi gejala (sintetis)."},
    {min:11,max:20,l:"11–20: Bahaya melukai diri/orang lain (sintetis)."},{min:1,max:10,l:"1–10: Bahaya persisten berat (sintetis)."},{min:0,max:0,l:"0: Informasi tidak adekuat."}
  ],
  rangeFor(score){const s=Number(score);return this.ranges.find(r=>s>=r.min&&s<=r.max)||null;}
};

const App={
  route:{name:"icd",params:{}},save:{timer:null},
  setSave(state){const ss=$("#saveState");ss.dataset.state=state;$(".txt",ss).textContent={saved:"Tersimpan",saving:"Menyimpan…",unsaved:"Perubahan belum tersimpan",failed:"Gagal menyimpan"}[state];},
  markDirty(){clearTimeout(this.save.timer);this.setSave("saving");this.save.timer=setTimeout(()=>this.setSave("saved"),700);}
};
function toast(msg){const t=el(`<div class="toast" role="status">${esc(msg)}</div>`);$("#toasts").appendChild(t);setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(()=>t.remove(),320);},3200);}

const Panel={
  open(title,body){const p=$("#panel");p.hidden=false;$("#workspace").classList.add("has-panel");
    p.innerHTML=`<div class="row between mb-3"><h3 class="pt" style="margin:0">${esc(title)}</h3><button class="btn btn-ghost btn-sm" id="panelClose" aria-label="Tutup panel">Tutup ✕</button></div>${body}`;
    $("#panelClose").onclick=()=>Panel.close();p.setAttribute("tabindex","-1");p.focus();},
  close(){const p=$("#panel");p.hidden=true;$("#workspace").classList.remove("has-panel");p.innerHTML="";}
};
function whyBody({suggestion,support=[],against=[],missing=[],basis,source,framework,version,limitation}){
  const list=(a,e)=>a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<div class="empty">${esc(e)}</div>`;
  return `<div class="why-block"><h4>Saran yang ditampilkan</h4><div class="small">${esc(suggestion)}</div></div>
  <div class="why-block"><h4>Temuan pendukung</h4>${list(support,"Tidak ada temuan pendukung tercatat.")}</div>
  <div class="why-block"><h4>Temuan yang berlawanan</h4>${list(against,"Tidak ada temuan yang berlawanan tercatat.")}</div>
  <div class="why-block"><h4>Informasi yang belum ada</h4>${list(missing,"Tidak ada gap yang teridentifikasi.")}</div>
  <div class="why-block"><h4>Dasar aturan / kriteria</h4><div class="small">${esc(basis)}</div></div>
  <div class="why-block"><h4>Sumber &amp; kerangka</h4><div class="small">${esc(source)}${framework?" · "+esc(framework):""}</div></div>
  <div class="why-block"><h4>Versi konten / aturan</h4><div class="small"><span class="badge version">${esc(version)}</span></div></div>
  <div class="why-block"><h4>Keterbatasan</h4><div class="small">${esc(limitation)}</div></div>`;
}

const NAV=[
  {group:"Beranda",items:[{id:"home",label:"Home",ic:"⌂",feature:"Home"},{id:"session",label:"Clinical Session",ic:"🗂",feature:"Clinical Session"}]},
  {group:"Clinical Tools",items:[
    {id:"da",label:"Diagnostic Assistant",ic:"◈",feature:"Clinical Tools"},
    {id:"mse",label:"Mental Status Examination Builder",ic:"▤",feature:"Clinical Tools"},
    {id:"scales",label:"Psychiatric Rating Scale Center",ic:"∑",feature:"Clinical Tools"},
    {id:"ddx",label:"Differential Diagnosis Center",ic:"⇄",feature:"Clinical Tools"},
    {id:"axial",label:"Multi-Axial Diagnosis Builder",ic:"▩",feature:"Clinical Tools",legacy:true},
    {id:"gaf",label:"GAF Calculator",ic:"◐",feature:"Clinical Tools",legacy:true}
  ]},
  {group:"Reference Center",items:[
    {id:"checklist",label:"DSM-5-TR & PPDGJ-III Interactive Checklist",ic:"☑",feature:"Reference Center"},
    {id:"icd",label:"ICD-10 Mental Disorders Explorer",ic:"🔍",feature:"Reference Center"}
  ]},
  {group:"Akun",items:[{id:"account",label:"Account & Settings",ic:"⚙",feature:"Account"}]}
];
const NAV_INDEX={};NAV.forEach(g=>g.items.forEach(i=>NAV_INDEX[i.id]=i));
function renderNav(){const w=$("#navScroll");w.innerHTML="";NAV.forEach(g=>{w.appendChild(el(`<div class="nav-group-label">${esc(g.group)}</div>`));
  g.items.forEach(it=>w.appendChild(el(`<a href="#/${it.id}" class="nav-link" data-id="${it.id}"><span class="ic" aria-hidden="true">${it.ic}</span><span>${esc(it.label)}</span>${it.legacy?'<span class="legacy-dot">Legacy</span>':""}</a>`)));});}

const ROUTES={home:renderHome,session:renderSession,da:renderDiagnosticAssistant,mse:renderMSE,scales:renderScales,ddx:renderDDx,axial:renderAxial,gaf:renderGAF,checklist:renderChecklist,icd:renderICD,account:renderAccount};
function parseHash(){const h=location.hash.replace(/^#\/?/,"");const[name,...rest]=h.split("/");return{name:name||"icd",params:{sub:rest.join("/")}};}
function navigate(){Panel.close();const r=parseHash();App.route=r;const item=NAV_INDEX[r.name]||NAV_INDEX.icd;const render=ROUTES[r.name]||renderICD;
  $("#hFeature").textContent=item.feature;$("#hTitle").textContent=item.label;
  document.querySelectorAll(".nav-link").forEach(a=>{if(a.dataset.id===r.name)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  const main=$("#main");main.classList.remove("reading");main.innerHTML="";render(main,r.params);main.focus();
  Audit.record("navigate","route",{name:r.name});closeDrawer();window.scrollTo(0,0);}

function pageHead(t,l){return `<div class="section"><h1>${esc(t)}</h1>${l?`<p class="page-lead">${esc(l)}</p>`:""}</div>`;}
function syntheticBadge(){return `<span class="badge synthetic" title="Data non-produksi">Konten sintetis</span>`;}
function legacyNotice(x){return `<div class="legacy-notice" role="note"><span class="a-ic" aria-hidden="true">⚠</span><div><strong>Kerangka legacy — bukan bagian dari DSM-5-TR.</strong><br><span class="small">${esc(x||"")}</span></div></div>`;}
function draftTag(){return `<span class="draft-tag"><span aria-hidden="true">✎</span>Draft — memerlukan tinjauan klinisi</span>`;}
function assessmentStateControl(name,current){return `<div class="state-row" role="group" aria-label="Status penilaian">${ASSESSMENT_STATES.map(s=>`<button type="button" class="state-btn" data-s="${s.id}" data-name="${esc(name)}" aria-pressed="${current===s.id}"><span class="mk" aria-hidden="true"></span>${esc(s.label)}</button>`).join("")}</div>`;}

document.addEventListener("click",e=>{const b=e.target.closest(".state-btn");if(!b||!b.dataset.name)return;
  b.closest(".state-row").querySelectorAll(".state-btn").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
  document.dispatchEvent(new CustomEvent("state-change",{detail:{name:b.dataset.name,value:b.dataset.s}}));App.markDirty();});

function renderHome(main){main.classList.add("reading");
  const _blocks=ICD10.map(b=>{let tot=0,cov=0;(function w(n){tot++;if(Object.prototype.hasOwnProperty.call(PPDGJ_PD,n.code))cov++;if(n.children)n.children.forEach(w);})(b);return {code:b.code,term:b.term,tot,cov};});
  const _totNodes=_blocks.reduce((s,b)=>s+b.tot,0),_covNodes=_blocks.reduce((s,b)=>s+b.cov,0),_blocksDone=_blocks.filter(b=>b.cov>0).length;
  const _tools=NAV.filter(g=>g.group==="Clinical Tools"||g.group==="Reference Center").flatMap(g=>g.items).length;
  const _pct=_totNodes?Math.round(_covNodes/_totNodes*100):0,_pctBlok=Math.round(_blocksDone/_blocks.length*100);
  const _kpi=(tone,label,value,sub,pct)=>`<div class="kpi kpi-${tone}"><div class="k-label">${esc(label)}</div><div class="k-value">${value}</div>${pct!=null?`<div class="k-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>`:""}<div class="k-sub">${esc(sub)}</div></div>`;
  const _kpis=[
    _kpi("blue","Cakupan pedoman",`${_covNodes}<span class="k-of"> / ${_totNodes}</span>`,`kode dengan pedoman PPDGJ-III rinci (${_pct}%)`,_pct),
    _kpi("green","Blok terpetakan",`${_blocksDone}<span class="k-of"> / ${_blocks.length}</span>`,"blok Bab V sudah memuat pedoman rinci",_pctBlok),
    `<div class="kpi kpi-slate"><div class="k-label">Sumber &amp; status</div><div class="k-src">PPDGJ-III &middot; ICD-10 Bab V</div><div class="k-tags">${draftTag()}</div><div class="k-sub">${_tools} alat deterministik &middot; diperbarui ${esc(KNOWLEDGE_META.effectiveDate)}</div></div>`
  ].join("");
  const _covRows=_blocks.map(b=>{const p=b.tot?Math.round(b.cov/b.tot*100):0,done=b.cov>0;return `<div class="cov-row${done?" done":""}"><span class="cov-code">${esc(b.code)}</span><span class="cov-term">${esc(b.term)}</span><span class="cov-track"><span class="cov-fill" style="width:${p}%"></span></span><span class="cov-num">${b.cov}/${b.tot}</span></div>`;}).join("");
  main.innerHTML=pageHead("Home","Pilih mode kerja. Ringkasan di bawah adalah status basis pengetahuan — bukan dasbor analitik pasien atau data sensitif.")
  +`<div class="section"><div class="section-title"><h2>Status basis pengetahuan</h2></div><div class="kpi-grid">${_kpis}</div></div>
    <div class="section"><div class="section-title"><h2>Cakupan pedoman per blok</h2></div><div class="card cov-card">${_covRows}</div></div>
    <div class="grid cols-2">
    <button class="card mode-card" onclick="location.hash='#/icd'"><span class="mode-eyebrow">Mode Referensi</span><h3>Buka referensi &amp; alat mandiri</h3><p class="small muted">Telusuri ICD-10, checklist, dan alat tanpa identitas pasien.</p><span class="mode-go">Buka &rarr;</span></button>
    <button class="card mode-card" onclick="location.hash='#/session'"><span class="mode-eyebrow">Mode Sesi Klinis</span><h3>Mulai / lanjutkan sesi klinis</h3><p class="small muted">Konteks minimum, pemberitahuan penggunaan, lalu penilaian keselamatan.</p><span class="mode-go">Mulai &rarr;</span></button></div>
    <div class="section mt-6"><div class="section-title"><h2>Delapan fitur MVP</h2></div><div class="grid cols-2">
    ${NAV.filter(g=>g.group==="Clinical Tools"||g.group==="Reference Center").flatMap(g=>g.items).map(it=>`<a class="card" href="#/${it.id}" style="text-decoration:none;color:inherit"><div class="row between"><strong>${esc(it.label)}</strong>${it.legacy?'<span class="badge legacy">Legacy</span>':""}</div></a>`).join("")}
    </div></div>
    <div class="alert info mt-6"><span class="a-ic">ℹ️</span><div class="a-body"><div class="a-title">Batas produk</div>PsychVerse tidak memberikan rekomendasi pengobatan/peresepan, chatbot, diagnosis-mandiri pasien, penjadwalan, atau telemedicine. Logika inti bersifat deterministik, bukan AI generatif.</div></div>`;}

function renderSession(main){main.classList.add("reading");
  main.innerHTML=pageHead("Clinical Session","Alur: konteks minimum → pemberitahuan penggunaan → keselamatan segera → penilaian → tinjauan → konfirmasi klinisi.")
  +`<div class="alert critical"><span class="a-ic">⛔</span><div class="a-body"><div class="a-title">Keselamatan didahulukan</div>Jika ada temuan yang mengindikasikan bahaya segera, <strong>ikuti protokol darurat setempat</strong>. Tindakan klinis mendesak tidak boleh ditunda untuk melengkapi perangkat lunak.</div></div>
  <div class="card"><h3 class="mb-3">Konteks sesi (minimum, tanpa pengenal langsung)</h3>
    <div class="field"><label for="sesLabel">Label sesi ter-deidentifikasi</label><input class="input" id="sesLabel" placeholder="mis. Sesi-A (bukan nama pasien)" oninput="App.markDirty()"></div>
    <div class="field"><label for="sesMode">Mode</label><select class="select" id="sesMode"><option>Rawat jalan (contoh)</option><option>Konsultasi (contoh)</option></select></div>
    <div class="alert info"><span class="a-ic">ℹ️</span><div class="a-body">URL &amp; log tidak boleh memuat nama pasien, gejala, atau pengenal. Data demo ini tidak dikirim ke mana pun.</div></div>
    <div class="spread mt-3"><button class="btn btn-primary" onclick="location.hash='#/da'">Lanjut ke penilaian keselamatan &amp; struktur</button><button class="btn btn-secondary" onclick="location.hash='#/mse'">Buka MSE Builder</button></div></div>`;}

let icdState={query:"",expanded:new Set(["icd_f3"])};
function renderICD(main,params){const detailCode=params&&params.sub?decodeURIComponent(params.sub):"";
  main.innerHTML=pageHead("ICD-10 Mental Disorders Explorer","Telusuri struktur ICD-10 Bab V (F00–F99) berdasarkan kode, istilah, atau sinonim. Pemilihan kode bukan diagnosis.")
  +`<div class="row between mb-3"><div class="spread"><span class="badge blue">${esc(KNOWLEDGE_META.source)}</span><span class="badge version">${esc(KNOWLEDGE_META.contentVersion)}</span>${syntheticBadge()}</div><button class="btn btn-ghost btn-sm" id="icdSource">Lihat sumber &amp; versi</button></div>
  <div class="searchbox field"><label for="icdSearch">Pencarian kode / istilah / sinonim</label><input class="input" id="icdSearch" type="search" autocomplete="off" placeholder='mis. F32, depresi, panik, alkohol' value="${esc(icdState.query)}" aria-describedby="icdSearchHelp"><button class="btn btn-secondary btn-sm clear" id="icdClear" ${icdState.query?"":"hidden"}>Bersihkan</button><div class="help" id="icdSearchHelp">Pencarian menangani variasi format kode (mis. "f32", "F32", "F 32").</div></div>
  <div id="icdResults" aria-live="polite"></div>`;
  $("#icdSource").onclick=openSourcePanel;const input=$("#icdSearch"),clr=$("#icdClear");
  input.addEventListener("input",()=>{icdState.query=input.value;clr.hidden=!input.value;runICDSearch();});
  clr.onclick=()=>{input.value="";icdState.query="";clr.hidden=true;input.focus();runICDSearch();};
  if(detailCode)openICDDetail(detailCode,true);else runICDSearch();}
function openSourcePanel(){Panel.open("Sumber & versi",`<div class="dl"><dt>Sumber</dt><dd>${esc(KNOWLEDGE_META.source)}</dd><dt>Versi konten</dt><dd><span class="badge version">${esc(KNOWLEDGE_META.contentVersion)}</span></dd><dt>Berlaku</dt><dd>${esc(KNOWLEDGE_META.effectiveDate)}</dd><dt>Lisensi</dt><dd>${esc(KNOWLEDGE_META.license)}</dd><dt>PPDGJ-III</dt><dd>${esc(KNOWLEDGE_META.ppdgj)}</dd></div><div class="alert attention mt-4"><span class="a-ic">⚠</span><div class="a-body">Kode &amp; judul kategori mengikuti klasifikasi resmi <strong>PPDGJ-III / ICD-10 Bab V</strong>. Pedoman diagnostik rinci diparafrasekan dari PPDGJ-III dan dilengkapi secara bertahap; entri yang belum dilengkapi diberi tanda.</div></div>`);}
function runICDSearch(){const box=$("#icdResults");if(!box)return;const q=icdState.query.trim();
  if(!q){renderICDTree(box);return;}
  box.innerHTML=`<div class="card"><div class="skeleton" style="width:40%"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>`;
  clearTimeout(runICDSearch._t);runICDSearch._t=setTimeout(()=>{const results=KnowledgeSearch.search(q);Audit.record("search","icd10",{n:results.length});
    if(!results.length){box.innerHTML=`<div class="state-block"><div class="big" aria-hidden="true">🔎</div><h3>Tidak ada hasil</h3><p>Tidak ada kode atau istilah yang cocok dengan “${esc(q)}”. Coba kode blok (mis. F30–F39) atau istilah lain.</p><button class="btn btn-secondary" onclick="document.getElementById('icdClear').click()">Bersihkan pencarian</button></div>`;return;}
    box.innerHTML=`<div class="small muted mb-3">${results.length} hasil untuk “${esc(q)}”</div>`+results.map(r=>{const n=r.node,hi=s=>highlight(s,q);return `<button class="result" data-code="${esc(n.code)}"><span class="code">${hi(n.code)}</span><span><span>${hi(n.term)}</span><div class="small muted mt-2">Cocok: ${esc(r.reason)}${n.block?" · blok kategori":""}</div></span></button>`;}).join("");
    box.querySelectorAll(".result").forEach(b=>b.onclick=()=>openICDDetail(b.dataset.code));},220);}
function highlight(text,q){const t=esc(text),term=esc(q);if(!term)return t;try{return t.replace(new RegExp("("+term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>");}catch(e){return t;}}
function renderICDTree(box){box.innerHTML=`<div class="card"><div class="row between mb-3"><h3 style="margin:0">Hierarki ICD-10 — Bab V</h3></div><ul class="tree" id="icdTree" role="tree" aria-label="Hierarki ICD-10"></ul></div>`;const root=$("#icdTree");ICD10.forEach(n=>root.appendChild(treeNode(n)));}
function treeNode(n){const kids=n.children&&n.children.length;const li=el(`<li role="treeitem" aria-expanded="${icdState.expanded.has(n.id)}"></li>`);
  const btn=el(`<button class="node-btn" data-code="${esc(n.code)}"><span class="caret ${icdState.expanded.has(n.id)?"open":""}" aria-hidden="true">${kids?"▸":"·"}</span><span class="code">${esc(n.code)}</span><span class="tw">${esc(n.term)}</span></button>`);
  li.appendChild(btn);let sub=null;
  if(kids){sub=el(`<ul role="group"></ul>`);if(!icdState.expanded.has(n.id))sub.style.display="none";n.children.forEach(c=>sub.appendChild(treeNode(c)));li.appendChild(sub);}
  btn.onclick=()=>{if(kids){const open=icdState.expanded.has(n.id);open?icdState.expanded.delete(n.id):icdState.expanded.add(n.id);li.setAttribute("aria-expanded",String(!open));$(".caret",btn).classList.toggle("open",!open);if(sub)sub.style.display=open?"none":"";}else openICDDetail(n.code);};
  return li;}
function openICDDetail(code,skipHash){const rec=KnowledgeSearch.findByCode(code);const box=$("#icdResults");if(!box)return;
  if(!rec){box.innerHTML=`<div class="state-block"><div class="big">⚠</div><h3>Kode tidak ditemukan</h3><p>Kode “${esc(code)}” tidak tersedia pada dataset sintetis ini.</p></div>`;return;}
  if(!skipHash)history.replaceState(null,"",`#/icd/${encodeURIComponent(rec.node.code)}`);
  Audit.record("view_code","icd10",{code:rec.node.code});const n=rec.node;
  const crumbs=rec.path.map((p,i)=>i<rec.path.length-1?`<button data-code="${esc(p.code)}">${esc(p.code)}</button><span class="sep">›</span>`:`<span>${esc(p.code)}</span>`).join("");
  box.innerHTML=`<nav class="crumbs" aria-label="Breadcrumb"><button data-code="__root">ICD-10</button><span class="sep">›</span>${crumbs}</nav>
  <div class="card"><div class="row between"><div><span class="mono-code" style="font-size:22px">${esc(n.code)}</span><h2 style="margin-top:4px">${esc(n.term)}</h2></div><div class="spread"><span class="badge blue" title="Klasifikasi resmi">PPDGJ-III</span><span class="badge version">${esc(KNOWLEDGE_META.contentVersion)}</span></div></div>
    <div class="alert info mt-3"><span class="a-ic">ℹ️</span><div class="a-body">Pemilihan kode ICD-10 ini <strong>bukan diagnosis</strong> dan tidak menyiratkan kesimpulan klinis.</div></div>
    <div class="dl mt-4"><dt>Kode</dt><dd class="mono-code">${esc(n.code)}</dd><dt>Istilah preferensi</dt><dd>${esc(n.term)}</dd><dt>Tipe</dt><dd>${n.block?"Blok kategori":"Kategori / subkategori"}</dd><dt>Catatan inklusi</dt><dd>${esc(n.incl||PEND)}</dd><dt>Catatan eksklusi</dt><dd>${esc(n.excl||PEND)}</dd><dt>Komentar PPDGJ-III</dt><dd><span class="badge" style="margin-right:6px">PPDGJ-III</span>${esc(n.ppdgj||PEND)}</dd><dt>Sinonim</dt><dd>${(n.synonyms||[]).map(s=>`<span class="chip">${esc(s)}</span>`).join(" ")||"—"}</dd></div>
    ${pdHtml(n)}${kidsHtml(n)}<hr class="div"><div class="spread"><button class="btn btn-secondary" data-code="__back">← Kembali ke pencarian</button><button class="btn btn-ghost" id="icdWhy">Mengapa item ini? / atribusi</button></div></div>`;
  box.querySelectorAll("[data-code]").forEach(b=>b.onclick=()=>{const c=b.dataset.code;if(c==="__root"||c==="__back"){history.replaceState(null,"","#/icd");icdState.query="";const s=$("#icdSearch");if(s)s.value="";const cl=$("#icdClear");if(cl)cl.hidden=true;runICDSearch();}else openICDDetail(c);});
  $("#icdWhy").onclick=()=>Panel.open("Atribusi & sumber",whyBody({suggestion:`Menampilkan entri ICD-10 ${n.code} — ${n.term}.`,support:n.pd?["Kode dan judul sesuai klasifikasi resmi PPDGJ-III / ICD-10 Bab V.","Pedoman diagnostik diparafrasekan dari PPDGJ-III (hlm. cetak "+(n.pd.halaman||"-")+")."]:["Kode dan judul sesuai klasifikasi resmi PPDGJ-III / ICD-10 Bab V."],against:[],missing:n.pd?[]:["Sebagian entri belum memuat pedoman diagnostik rinci (sedang dilengkapi dari PPDGJ-III)."],basis:"Navigasi/pencarian klasifikasi bersifat deterministik atas dataset terversi.",source:KNOWLEDGE_META.source,framework:"ICD-10",version:KNOWLEDGE_META.contentVersion,limitation:"Pedoman diagnostik rinci diparafrasekan dari PPDGJ-III; bukan pengganti penilaian klinis."}));
  window.scrollTo(0,0);}
function pdHtml(n){if(!n.pd)return"";var pd=n.pd;var h="";
h+=`<hr class="div"><div class="section-title"><h3 style="margin:0">Pedoman Diagnostik \u2014 PPDGJ-III</h3>${draftTag()}</div><div class="card"><div class="row between mb-2"><span class="badge blue">PPDGJ-III</span><span class="badge version">Hlm. cetak ${esc(pd.halaman||"-")}</span></div>`;
if(pd.deskripsi)h+=`<p class="small">${esc(pd.deskripsi)}</p>`;
var g=pd.gejala_kelompok||pd.ciri;
if(g){h+=`<h4 class="mt-3">${pd.gejala_kelompok?"Kelompok gejala":"Ciri khas"}</h4>`;if(g.catatan)h+=`<p class="small muted">${esc(g.catatan)}</p>`;h+=`<ul class="small">`;["a","b","c","d","e","f","g","h","i"].forEach(function(k){if(g[k])h+=`<li><strong>(${k})</strong> ${esc(g[k])}</li>`;});h+=`</ul>`;}
if(pd.kriteria){h+=`<h4 class="mt-3">Kriteria</h4><ul class="small">`;["a","b","c","d","e","f","g"].forEach(function(k){if(pd.kriteria[k])h+=`<li><strong>(${k})</strong> ${esc(pd.kriteria[k])}</li>`;});h+=`</ul>`;}
if(pd.pedoman_diagnostik)h+=`<div class="alert info mt-3"><span class="a-ic">\ud83d\udccb</span><div class="a-body"><div class="a-title">Pedoman diagnostik</div>${esc(pd.pedoman_diagnostik)}</div></div>`;
if(pd.pengecualian)h+=`<div class="alert attention mt-3"><span class="a-ic">\u26a0</span><div class="a-body"><div class="a-title">Pengecualian / diagnosis banding</div>${esc(pd.pengecualian)}</div></div>`;
var pp=pd.pola_perjalanan_karakter_kelima||pd.karakter_kelima;
if(pp){h+=`<h4 class="mt-3">${pd.pola_perjalanan_karakter_kelima?"Pola perjalanan (karakter kelima)":"Karakter kelima"}</h4><ul class="small">`;Object.keys(pp).forEach(function(k){h+=`<li><span class="mono-code">${esc(k)}</span> \u2014 ${esc(pp[k])}</li>`;});h+=`</ul>`;}
if(pd.catatan)h+=`<p class="small muted mt-3">Catatan: ${esc(pd.catatan)}</p>`;
if(pd.catatan_stres)h+=`<p class="small muted mt-2">Catatan onset & stres akut: ${esc(pd.catatan_stres)}</p>`;
if(pd.termasuk&&pd.termasuk.length)h+=`<div class="mt-3"><strong class="small">Termasuk:</strong> ${pd.termasuk.map(function(x){return '<span class="chip">'+esc(x)+'</span>';}).join(" ")}</div>`;
if(pd.tak_termasuk&&pd.tak_termasuk.length)h+=`<div class="mt-2"><strong class="small">Tak termasuk:</strong> ${pd.tak_termasuk.map(function(x){return '<span class="chip">'+esc(x)+'</span>';}).join(" ")}</div>`;
h+=`</div>`;return h;}
function kidsHtml(n){if(!(n.children&&n.children.length))return"";return `<hr class="div"><h3 class="mb-3">Sub-kategori</h3>${n.children.map(c=>`<button class="result" data-code="${esc(c.code)}"><span class="code">${esc(c.code)}</span><span>${esc(c.term)}</span></button>`).join("")}`;}

let daState={};
function renderDiagnosticAssistant(main){daState={};DA_FINDINGS.forEach(f=>daState[f.id]="not_assessed");
  main.innerHTML=pageHead("Diagnostic Assistant","Mengorganisir penalaran diagnostik secara deterministik & dapat dijelaskan. Tidak menghasilkan diagnosis akhir otonom.")
  +`<div class="alert info"><span class="a-ic">ℹ️</span><div class="a-body">Data yang belum dinilai / tidak diketahui <strong>tidak</strong> dianggap sebagai temuan “tidak ada”. Setiap saran memiliki penjelasan <strong>Mengapa?</strong>.</div></div>
  <div class="grid cols-2" id="daFindings"></div>
  <div class="spread mt-4"><button class="btn btn-primary" id="daRun">Jalankan evaluasi aturan deterministik</button><span class="badge version">${esc(DA_RULE_VERSION)}</span></div>
  <div id="daOutput" class="mt-6"></div>`;
  const fw=$("#daFindings");DA_FINDINGS.forEach(f=>fw.appendChild(el(`<div class="card"><div class="label mb-2">${esc(f.label)}</div>${assessmentStateControl("da:"+f.id,daState[f.id])}</div>`)));
  document.addEventListener("state-change",daListener);
  $("#daRun").onclick=runDA;}
function daListener(e){if(!e.detail.name.startsWith("da:"))return;daState[e.detail.name.slice(3)]=e.detail.value;}
const CONCEPT_ICD={icd_f32:"F32",icd_f20:"F20",icd_f23:"F23",icd_f25:"F25",icd_f30:"F30"};
function runDA(){const res=DiagnosticRules.evaluate(daState);const out=$("#daOutput");
  const sec=(title,html)=>`<div class="section"><div class="section-title"><h2>${esc(title)}</h2></div>${html}</div>`;
  let urgent=res.urgent.length?res.urgent.map(r=>`<div class="alert critical"><span class="a-ic">⛔</span><div class="a-body"><div class="a-title">${esc(r.title)}</div>Pemicu: ${esc(DA_LABEL[r.support[0]]||"")}. Kategori tindakan: <strong>ikuti protokol darurat setempat &amp; lakukan penilaian langsung segera</strong>. Jangan menunda tindakan mendesak untuk melengkapi perangkat lunak.<div class="mt-3"><button class="btn btn-danger btn-sm" data-why="${r.id}">Mengapa?</button></div></div></div>`).join(""):`<div class="alert info"><span class="a-ic">ℹ️</span><div class="a-body">Tidak ada pemicu keselamatan segera dari data yang dimasukkan. <strong>Ini bukan pernyataan “tidak ada risiko”.</strong> Penilaian klinis langsung tetap diperlukan.</div></div>`;
  let supported=res.supported.length?res.supported.map(r=>`<div class="card"><div class="row between"><strong>${esc(r.title)}</strong><div class="spread">${r.concept&&CONCEPT_ICD[r.concept]?`<button class="btn btn-secondary btn-sm" data-icd="${esc(CONCEPT_ICD[r.concept])}">Lihat di ICD-10 →</button>`:""}<button class="btn btn-ghost btn-sm" data-why="${r.id}">Mengapa?</button></div></div><div class="small muted mt-2">${esc(r.source)}${r.concept&&CONCEPT_ICD[r.concept]?` · tertaut ke ${esc(CONCEPT_ICD[r.concept])}${hasPedoman(CONCEPT_ICD[r.concept])?" (pedoman rinci tersedia)":""}`:""}</div></div>`).join(""):`<p class="muted">Belum ada pertimbangan yang didukung oleh data terkini.</p>`;
  let missing=res.missing.length?`<div class="card"><ul style="margin:0;padding-left:18px">${res.missing.map(f=>`<li>${esc(f.label)} — <span class="muted">${esc(STATE_LABEL[daState[f.id]]||"belum dinilai")}</span></li>`).join("")}</ul></div>`:`<p class="muted">Tidak ada gap informasi teridentifikasi.</p>`;
  let alts=`<div class="card">${res.alternatives.map(a=>`<div class="mb-2"><strong>${esc(a.label)}</strong><div class="small muted">${esc(a.note)}</div></div>`).join("")}</div>`;
  out.innerHTML=sec("1 · Pertimbangan mendesak (keselamatan)",urgent)+sec("2 · Pertimbangan yang didukung",supported)+sec("3 · Informasi yang belum ada",missing)+sec("4 · Alternatif medis / neurologis / zat (selalu terlihat)",alts)
  +`<div class="alert attention"><span class="a-ic">✎</span><div class="a-body"><div class="a-title">${draftTag()}</div>Keluaran ini adalah materi penalaran, bukan diagnosis. Klinisi menambah/menghapus/mengurutkan pertimbangan dan memiliki dokumentasi akhir.</div></div>`;
  out.querySelectorAll("[data-icd]").forEach(b=>{b.onclick=()=>{location.hash="#/icd/"+encodeURIComponent(b.dataset.icd);};});
  out.querySelectorAll("[data-why]").forEach(b=>{const r=[...DiagnosticRules.rules].find(x=>x.id===b.dataset.why);b.onclick=()=>Panel.open("Mengapa saran ini?",whyBody({suggestion:r.title,support:r.support.filter(s=>daState[s]==="present").map(s=>DA_LABEL[s]),against:r.against.map(s=>DA_LABEL[s]),missing:r.relevantMissing.map(s=>DA_LABEL[s]),basis:r.basis,source:r.source,framework:"Deterministik",version:DA_RULE_VERSION,limitation:r.limitation}));});
  Audit.record("da_evaluate","rules",{urgent:res.urgent.length,supported:res.supported.length});App.markDirty();}

const MSE_DOMAINS=["Penampilan & perilaku","Kesadaran & keterlibatan","Aktivitas psikomotor","Pembicaraan","Mood & afek","Bentuk pikir","Isi pikir","Persepsi","Kognisi","Tilikan","Pertimbangan (judgment)","Kendali impuls","Keterbatasan pemeriksaan"];
let mseData={};
function renderMSE(main){mseData={};
  main.innerHTML=pageHead("Mental Status Examination Builder","Dokumentasi MSE terstruktur, netral, dan dapat disunting. Tidak ada temuan “normal” yang diasumsikan otomatis.")
  +`<div class="row between mb-3"><div class="spread"><span class="badge blue">Mode ringkas</span><span class="badge">Mode rinci</span></div><button class="btn btn-secondary" id="mseGen">Perbarui pratinjau naratif</button></div>
  <div id="mseDomains"></div>
  <div class="section mt-6"><div class="section-title"><h2>Pratinjau naratif</h2>${draftTag()}</div>
    <div class="card"><textarea class="textarea" id="mseNarrative" style="min-height:160px" aria-label="Naratif MSE" oninput="App.markDirty()"></textarea>
    <div class="small muted mt-2">Menyunting naratif tidak mengubah temuan terstruktur secara diam-diam. Jika berbeda materiil, tinjau kembali.</div></div></div>`;
  const dw=$("#mseDomains");MSE_DOMAINS.forEach((d,i)=>{const id="m"+i;mseData[id]={domain:d,source:"clinician",state:"not_assessed",note:""};
    dw.appendChild(el(`<div class="card"><div class="row between"><strong>${esc(d)}</strong>
      <select class="select" style="max-width:220px" data-src="${id}"><option value="clinician">Diobservasi klinisi</option><option value="patient">Dilaporkan pasien</option><option value="collateral">Dilaporkan kolateral</option></select></div>
      <div class="mt-3">${assessmentStateControl("mse:"+id,"not_assessed")}</div>
      <div class="field mt-3" style="margin-bottom:0"><textarea class="textarea" placeholder="Deskripsi terstruktur / bebas (opsional)" data-note="${id}"></textarea></div></div>`));});
  dw.querySelectorAll("[data-src]").forEach(s=>s.onchange=()=>{mseData[s.dataset.src].source=s.value;App.markDirty();});
  dw.querySelectorAll("[data-note]").forEach(t=>t.oninput=()=>{mseData[t.dataset.note].note=t.value;App.markDirty();});
  document.addEventListener("state-change",mseListener);
  $("#mseGen").onclick=()=>{const parts=Object.values(mseData).filter(d=>d.state!=="not_assessed"||d.note).map(d=>{const src={clinician:"diobservasi klinisi",patient:"dilaporkan pasien",collateral:"dilaporkan kolateral"}[d.source];return `${d.domain}: ${STATE_LABEL[d.state]} (${src})${d.note?" — "+d.note:""}.`;});
    $("#mseNarrative").value=parts.length?("[Draft — memerlukan tinjauan klinisi]\n"+parts.join(" ")):"[Draft] Belum ada domain yang dinilai. Domain yang belum dinilai tidak diasumsikan normal.";App.markDirty();toast("Pratinjau naratif diperbarui (Draft).");};}
function mseListener(e){if(!e.detail.name.startsWith("mse:"))return;mseData[e.detail.name.slice(4)].state=e.detail.value;}

function renderScales(main){const s=SCALES[0];let responses={};
  main.innerHTML=pageHead("Psychiatric Rating Scale Center","Administrasi & penskoran instrumen yang disetujui. Skor skrining bukan diagnosis.")
  +`<div class="card mb-4"><div class="row between"><h3 style="margin:0">${esc(s.name)}</h3>${syntheticBadge()}</div>
    <div class="dl mt-3"><dt>Tujuan</dt><dd>${esc(s.purpose)}</dd><dt>Populasi</dt><dd>${esc(s.population)}</dd><dt>Periode</dt><dd>${esc(s.recall)}</dd><dt>Kebijakan item kosong</dt><dd>${esc(s.missingPolicy)}</dd><dt>Lisensi</dt><dd>${esc(s.license)}</dd><dt>Versi</dt><dd><span class="badge version">${esc(s.version)}</span></dd></div></div>
  <div id="scaleItems"></div>
  <div class="spread mt-4"><button class="btn btn-primary" id="scaleScore">Hitung skor</button></div>
  <div id="scaleResult" class="mt-6"></div>`;
  const iw=$("#scaleItems");s.items.forEach(it=>{iw.appendChild(el(`<div class="card"><div class="label mb-2">${esc(it.text)}</div><div class="state-row">${s.options.map(o=>`<button type="button" class="state-btn" data-item="${it.id}" data-v="${o.v}" aria-pressed="false"><span class="mk"></span>${esc(o.l)} (${o.v})</button>`).join("")}</div></div>`));});
  iw.querySelectorAll(".state-btn").forEach(b=>b.onclick=()=>{iw.querySelectorAll(`[data-item="${b.dataset.item}"]`).forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));responses[b.dataset.item]=Number(b.dataset.v);App.markDirty();});
  $("#scaleScore").onclick=()=>{const r=s.score(responses);const rb=$("#scaleResult");
    if(!r.valid){rb.innerHTML=`<div class="alert attention"><span class="a-ic">⚠</span><div class="a-body"><div class="a-title">Skor tidak valid</div>${esc(r.reason)} Item kosong: ${r.missing}. Sesuai kebijakan instrumen, skor tidak dihitung.</div></div>`;return;}
    rb.innerHTML=`<div class="card"><div class="row between"><h3 style="margin:0">Hasil</h3><button class="btn btn-ghost btn-sm" id="scaleWhy">Mengapa?</button></div>
      <div class="dl mt-3"><dt>Skor total</dt><dd class="mono-code">${r.sum}</dd><dt>Interpretasi</dt><dd>${esc(r.band)}</dd><dt>Item kosong</dt><dd>${r.missing}</dd><dt>Sumber/versi</dt><dd><span class="badge version">${esc(s.version)}</span></dd></div>
      <div class="alert info mt-3"><span class="a-ic">ℹ️</span><div class="a-body">Ini skor <strong>skrining</strong>, <strong>bukan diagnosis</strong>, dan tidak menggantikan penilaian langsung.</div></div></div>`;
    $("#scaleWhy").onclick=()=>Panel.open("Mengapa skor ini?",whyBody({suggestion:`Skor total ${r.sum} → ${r.band}`,support:["Penjumlahan deterministik atas item terjawab."],against:[],missing:r.missing?["Terdapat "+r.missing+" item kosong (dalam batas kebijakan)."]:[],basis:"Skor = Σ nilai item; interpretasi dari rentang terversi.",source:s.name,framework:"Rating scale (sintetis)",version:s.version,limitation:s.limitation}));
    App.markDirty();};}

const DDX_SEED=[
  {id:"d1",label:"Episode depresif (F32)",cat:"Psikiatri",feat:"Mood menurun, anhedonia",course:"≥ 2 minggu",flag:"Ide bunuh diri",danger:false},
  {id:"d2",label:"Gangguan bipolar (F31)",cat:"Psikiatri",feat:"Riwayat episode manik/hipomanik",course:"Episodik",flag:"Aktivasi berlebih",danger:false},
  {id:"d3",label:"Hipotiroidisme",cat:"Medis",feat:"Lelah, intoleransi dingin",course:"Bertahap",flag:"Miksedema",danger:true},
  {id:"d4",label:"Delirium (F05)",cat:"Neurologis/Medis",feat:"Fluktuasi kesadaran",course:"Akut",flag:"Penurunan kesadaran",danger:true},
  {id:"d5",label:"Putus zat (F1x.3)",cat:"Zat",feat:"Riwayat penggunaan zat",course:"Akut",flag:"Instabilitas otonom",danger:true}
];
function renderDDx(main){let list=DDX_SEED.map(x=>({...x}));
  main.innerHTML=pageHead("Differential Diagnosis Center","Bandingkan alternatif psikiatri & non-psikiatri. Ketiadaan bukti berbeda dari bukti yang berlawanan.")
  +`<div class="field" style="max-width:520px"><label for="ddxInput">Presentasi klinis (mulai dari sini)</label><input class="input" id="ddxInput" placeholder="mis. mood menurun 3 minggu, kelelahan" oninput="App.markDirty()"></div>
  <div class="alert attention"><span class="a-ic">⚠</span><div class="a-body"><div class="a-title">Alternatif berbahaya namun jarang — selalu terlihat</div><div id="ddxDanger"></div></div></div>
  <div class="section"><div class="section-title"><h2>Tabel perbandingan</h2></div><div class="table-wrap"><table><thead><tr><th>Kemungkinan</th><th>Kategori</th><th>Ciri pembeda</th><th>Perjalanan</th><th>Red flag</th><th>Aksi</th></tr></thead><tbody id="ddxBody"></tbody></table></div>
  <div class="legend"><span><i style="background:var(--color-risk)"></i> Berbahaya/mendesak</span><span><i style="background:var(--color-primary)"></i> Psikiatri</span></div></div>`;
  const render=()=>{$("#ddxDanger").innerHTML=list.filter(x=>x.danger).map(x=>`<div class="mb-2"><strong>${esc(x.label)}</strong> <span class="small muted">— ${esc(x.cat)} · red flag: ${esc(x.flag)}</span></div>`).join("")||'<span class="small muted">Tidak ada.</span>';
    $("#ddxBody").innerHTML=list.map(x=>`<tr><td><strong>${esc(x.label)}</strong></td><td>${esc(x.cat)}</td><td>${esc(x.feat)}</td><td>${esc(x.course)}</td><td>${esc(x.flag)}</td><td><button class="btn btn-secondary btn-sm" data-del="${x.id}">Hapus</button></td></tr>`).join("");
    $("#ddxBody").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{list=list.filter(x=>x.id!==b.dataset.del);render();App.markDirty();});};
  render();}

const AXES=[{n:"Aksis I",d:"Gangguan klinis (legacy)"},{n:"Aksis II",d:"Gangguan kepribadian / retardasi mental (legacy)"},{n:"Aksis III",d:"Kondisi medis umum (legacy)"},{n:"Aksis IV",d:"Masalah psikososial & lingkungan (legacy)"},{n:"Aksis V",d:"GAF (legacy)"}];
function renderAxial(main){
  main.innerHTML=pageHead("Multi-Axial Diagnosis Builder")+legacyNotice("Kerangka multi-aksial ditahan untuk kompatibilitas legacy. Tidak menyiratkan endorsemen DSM-5-TR.")
  +`<div id="axes"></div>
  <div class="alert info mt-3"><span class="a-ic">ℹ️</span><div class="a-body">Status “ditangguhkan” dan “tidak pasti” didukung. Keluaran menyertakan keterbatasan legacy dan tetap dapat disunting.</div></div>`;
  const w=$("#axes");AXES.forEach((a,i)=>w.appendChild(el(`<div class="card"><div class="row between"><strong>${esc(a.n)}</strong><span class="badge legacy">Legacy</span></div><div class="small muted mb-2">${esc(a.d)}</div>
    <div class="field" style="margin-bottom:8px"><textarea class="textarea" placeholder="Catatan aksis (opsional)" oninput="App.markDirty()"></textarea></div>
    <div class="state-row"><button class="state-btn" data-s="present" data-name="ax:${i}" aria-pressed="false"><span class="mk"></span>Terisi</button><button class="state-btn" data-s="not_assessed" data-name="ax:${i}" aria-pressed="true"><span class="mk"></span>Ditangguhkan</button><button class="state-btn" data-s="unknown" data-name="ax:${i}" aria-pressed="false"><span class="mk"></span>Tidak pasti</button></div></div>`)));}

function renderGAF(main){let score="",rationale="";
  main.innerHTML=pageHead("GAF Calculator")+legacyNotice("GAF tidak menghasilkan kesimpulan risiko, disposisi, kelayakan, atau pengobatan. Memerlukan rasional dari klinisi.")
  +`<div class="card"><div class="field"><label for="gafScore">Skor GAF (0–100)</label><input class="input" id="gafScore" type="number" min="0" max="100" style="max-width:160px" placeholder="mis. 55"><div class="help" id="gafRange">Masukkan skor untuk melihat rentang deskriptif.</div></div>
    <div class="field"><label for="gafRat">Rasional klinisi <span style="color:var(--color-risk)">*wajib</span></label><textarea class="textarea" id="gafRat" placeholder="Dasar penilaian fungsi (wajib sebelum finalisasi tinjauan)"></textarea></div>
    <div class="spread"><button class="btn btn-primary" id="gafFinal" disabled>Finalisasi tinjauan</button><button class="btn btn-ghost" id="gafWhy">Mengapa? / keterbatasan</button></div>
    <div id="gafOut" class="mt-4"></div></div>`;
  const sIn=$("#gafScore"),rIn=$("#gafRat"),fin=$("#gafFinal");
  const upd=()=>{score=sIn.value;rationale=rIn.value.trim();const rg=GAF.rangeFor(score);
    $("#gafRange").innerHTML=score!==""&&rg?esc(rg.l):"Masukkan skor untuk melihat rentang deskriptif.";
    fin.disabled=!(score!==""&&rg&&rationale.length>0);App.markDirty();};
  sIn.oninput=upd;rIn.oninput=upd;
  fin.onclick=()=>{const rg=GAF.rangeFor(score);$("#gafOut").innerHTML=`<div class="alert success"><span class="a-ic">✓</span><div class="a-body"><div class="a-title">Tinjauan tercatat (Draft legacy)</div>
    <div class="dl mt-2"><dt>Skor</dt><dd class="mono-code">${esc(score)}</dd><dt>Rentang</dt><dd>${esc(rg.l)}</dd><dt>Rasional</dt><dd>${esc(rationale)}</dd><dt>Penulis</dt><dd>${esc(Identity.currentUser.displayName)}</dd><dt>Waktu</dt><dd>${new Date().toLocaleString("id-ID")}</dd><dt>Sumber/versi</dt><dd><span class="badge legacy">Legacy</span> <span class="badge version">${esc(GAF.version)}</span></dd><dt>Keterbatasan</dt><dd>${esc(GAF.source)} Skor GAF sendiri tidak menentukan risiko/disposisi.</dd></div></div></div>`;Audit.record("gaf_finalize","assessment",{score});toast("Tinjauan GAF legacy tercatat.");};
  $("#gafWhy").onclick=()=>Panel.open("GAF — keterbatasan",whyBody({suggestion:"Pemetaan skor → rentang deskriptif GAF.",support:["Pemetaan rentang bersifat deterministik."],against:[],missing:rationale?[]:["Rasional klinisi wajib diisi."],basis:"Rentang GAF ditetapkan berdasarkan ambang skor.",source:GAF.source,framework:"GAF (legacy)",version:GAF.version,limitation:"Bukan bagian DSM-5-TR. Tidak menghasilkan kesimpulan risiko/disposisi/kelayakan/pengobatan."}));}

const CHECKLIST={
  "DSM-5-TR":{version:"dsm5tr-syn-0.1",note:"Konten DSM ditampilkan hanya bila diizinkan lisensi. Berikut placeholder sintetis.",criteria:[{id:"a",t:"Kriteria A (sintetis): jumlah gejala inti pada periode yang sama."},{id:"b",t:"Kriteria B (sintetis): durasi minimum."},{id:"c",t:"Kriteria C (sintetis): hendaya fungsi."},{id:"d",t:"Kriteria D (sintetis): eksklusi (zat/medis/lainnya)."}]},
  "PPDGJ-III":{version:"ppdgj3-syn-0.1",note:"Komentar PPDGJ-III placeholder sintetis (menunggu konten berlisensi).",criteria:[{id:"p1",t:"Pedoman (sintetis): gejala utama sesuai pedoman."},{id:"p2",t:"Pedoman (sintetis): durasi/lama gejala."},{id:"p3",t:"Pedoman (sintetis): dampak fungsi."}]}
};
function renderChecklist(main){let fw="DSM-5-TR";let states={};
  main.innerHTML=pageHead("DSM-5-TR & PPDGJ-III Interactive Checklist","Tinjauan berorientasi kriteria dengan kerangka yang selalu terpisah — tidak pernah digabung.")
  +`<div class="field" style="max-width:360px"><label for="fwSel">Kerangka</label><select class="select" id="fwSel"><option>DSM-5-TR</option><option>PPDGJ-III</option></select></div>
  <div id="clBody"></div>`;
  const draw=()=>{const c=CHECKLIST[fw];states={};c.criteria.forEach(cr=>states[cr.id]="not_assessed");
    $("#clBody").innerHTML=`<div class="row between mb-3"><span class="badge blue">${esc(fw)}</span><span class="badge version">${esc(c.version)}</span></div>
    <div class="alert info"><span class="a-ic">ℹ️</span><div class="a-body">${esc(c.note)}</div></div>
    ${c.criteria.map(cr=>`<div class="card"><div class="label mb-2">${esc(cr.t)}</div>${assessmentStateControl("cl:"+cr.id,"not_assessed")}</div>`).join("")}
    <div class="spread mt-4"><button class="btn btn-primary" id="clEval">Tinjau status kriteria</button></div><div id="clResult" class="mt-4"></div>`;
    $("#clEval").onclick=()=>{const vals=Object.values(states);const met=vals.filter(v=>v==="present").length,unmet=vals.filter(v=>v==="absent").length,unknown=vals.filter(v=>v==="unknown").length,na=vals.filter(v=>v==="not_assessed"||v==="unable_to_assess"||v==="not_applicable").length;
      let overall=na>0||unknown>0?"insufficient":(unmet===0?"appears_met":"not_met");
      const map={appears_met:["success","Kriteria tampak terpenuhi berdasarkan data yang dimasukkan"],not_met:["attention","Kriteria tampak tidak terpenuhi"],insufficient:["attention","Informasi tidak cukup"]};
      const cls=map[overall][0],txt=map[overall][1];
      $("#clResult").innerHTML=`<div class="alert ${cls}"><span class="a-ic">${cls==="success"?"✓":"⚠"}</span><div class="a-body"><div class="a-title">${esc(txt)}</div>Terpenuhi: ${met} · Tidak terpenuhi: ${unmet} · Tidak diketahui: ${unknown} · Belum dinilai/NA: ${na}.<div class="small mt-2">Ini bukan diagnosis. Kerangka ${esc(fw)} tidak digabung dengan kerangka lain. Pemetaan lintas-kerangka tidak menyatakan ekuivalensi.</div></div></div>`;App.markDirty();};};
  document.addEventListener("state-change",e=>{if(e.detail.name.startsWith("cl:"))states[e.detail.name.slice(3)]=e.detail.value;});
  $("#fwSel").onchange=e=>{fw=e.target.value;draw();};draw();}

function renderAccount(main){main.classList.add("reading");
  main.innerHTML=pageHead("Account & Settings","Preferensi pengguna, aksesibilitas, dan keamanan (demo).")
  +`<div class="card"><h3 class="mb-3">Profil</h3><div class="dl"><dt>Nama</dt><dd>${esc(Identity.currentUser.displayName)}</dd><dt>Peran</dt><dd>${esc(Identity.currentUser.role)}</dd></div></div>
  <div class="card"><h3 class="mb-3">Aksesibilitas</h3><div class="field" style="margin-bottom:0"><label for="locale">Bahasa antarmuka</label><select class="select" id="locale" style="max-width:280px"><option>Bahasa Indonesia</option><option>English (fallback)</option></select><div class="help">Target WCAG 2.2 AA. Navigasi kritis dapat dioperasikan dengan keyboard.</div></div></div>
  <div class="card"><h3 class="mb-3">Keamanan &amp; privasi</h3><p class="small muted" style="margin:0">Data psikiatri sangat sensitif. Aplikasi meminimalkan data, tidak menaruh data sensitif di URL/log, dan menggunakan data sintetis untuk demo.</p></div>`;}

function openDrawer(){$("#app").classList.add("nav-open");$("#menuBtn").setAttribute("aria-expanded","true");}
function closeDrawer(){$("#app").classList.remove("nav-open");$("#menuBtn").setAttribute("aria-expanded","false");}
$("#menuBtn").onclick=()=>{$("#app").classList.contains("nav-open")?closeDrawer():openDrawer();};
$("#scrim").onclick=closeDrawer;
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeDrawer();if(!$("#panel").hidden)Panel.close();}});

const hasPedoman=(code)=>{try{return Object.prototype.hasOwnProperty.call(PPDGJ_PD,code);}catch(e){return false;}};
const Palette={
  flat:[],sel:0,
  toolItems(){const out=[];NAV.forEach(g=>g.items.forEach(it=>{if(it.id!=="home")out.push({id:it.id,label:it.label,group:g.group,legacy:!!it.legacy});}));return out;},
  open(){const m=$("#cmdk");if(!m)return;m.hidden=false;document.body.classList.add("cmdk-open");const inp=$("#cmdkInput");inp.value="";this.sel=0;this.run("");setTimeout(()=>inp.focus(),20);Audit.record&&Audit.record("open","palette",{});},
  close(){const m=$("#cmdk");if(!m)return;m.hidden=true;document.body.classList.remove("cmdk-open");},
  toggle(){$("#cmdk")&&$("#cmdk").hidden?this.open():this.close();},
  run(q){q=(q||"").trim();const ql=q.toLowerCase();
    const tools=this.toolItems().filter(t=>!q||t.label.toLowerCase().includes(ql));
    const icd=q?KnowledgeSearch.search(q).slice(0,8):[];
    const groups=[];
    if(tools.length)groups.push({title:"Alat & halaman",rows:tools.map(t=>({kind:"tool",id:t.id,label:t.label,sub:t.group+(t.legacy?" · legacy":""),code:null}))});
    if(icd.length)groups.push({title:"ICD-10 / PPDGJ-III",rows:icd.map(r=>({kind:"icd",code:r.node.code,label:r.node.term,sub:r.node.code+" · "+r.reason+(hasPedoman(r.node.code)?" · pedoman rinci":"")}))});
    this.flat=[];groups.forEach(g=>g.rows.forEach(r=>this.flat.push(r)));
    if(this.sel>=this.flat.length)this.sel=Math.max(0,this.flat.length-1);
    this.render(groups);},
  render(groups){const box=$("#cmdkResults");if(!box)return;
    if(!this.flat.length){box.innerHTML=`<div class="cmdk-empty">Tidak ada hasil. Coba kode seperti <strong>F20</strong> atau kata seperti <strong>depresi</strong>.</div>`;return;}
    let idx=0,html="";
    groups.forEach(g=>{html+=`<div class="cmdk-group">${esc(g.title)}</div>`;
      g.rows.forEach(r=>{const active=idx===this.sel?" active":"";
        const badge=r.kind==="icd"?`<span class="cmdk-code">${esc(r.code)}</span>`:`<span class="cmdk-kind">Alat</span>`;
        html+=`<div class="cmdk-row${active}" role="option" data-i="${idx}" aria-selected="${idx===this.sel}">${badge}<span class="cmdk-lbl"><span class="cmdk-lbl-main">${esc(r.label)}</span><span class="cmdk-lbl-sub">${esc(r.sub)}</span></span><span class="cmdk-go" aria-hidden="true">↵</span></div>`;idx++;});});
    box.innerHTML=html;
    box.querySelectorAll(".cmdk-row").forEach(node=>{node.onmouseenter=()=>{this.sel=+node.dataset.i;this.paint();};node.onclick=()=>{this.sel=+node.dataset.i;this.choose();};});},
  paint(){const box=$("#cmdkResults");if(!box)return;box.querySelectorAll(".cmdk-row").forEach(node=>{const a=+node.dataset.i===this.sel;node.classList.toggle("active",a);node.setAttribute("aria-selected",a);});const act=box.querySelector(".cmdk-row.active");if(act)act.scrollIntoView({block:"nearest"});},
  move(d){if(!this.flat.length)return;this.sel=(this.sel+d+this.flat.length)%this.flat.length;this.paint();},
  choose(){const r=this.flat[this.sel];if(!r)return;this.close();if(r.kind==="icd")location.hash="#/icd/"+encodeURIComponent(r.code);else location.hash="#/"+r.id;}
};
$("#cmdkTrigger")&&($("#cmdkTrigger").onclick=()=>Palette.open());
$("#cmdkInput")&&$("#cmdkInput").addEventListener("input",e=>Palette.run(e.target.value));
$("#cmdkBackdrop")&&($("#cmdkBackdrop").onclick=()=>Palette.close());
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&(e.key==="k"||e.key==="K")){e.preventDefault();Palette.toggle();return;}const m=$("#cmdk");if(m&&!m.hidden){if(e.key==="Escape"){e.preventDefault();Palette.close();}else if(e.key==="ArrowDown"){e.preventDefault();Palette.move(1);}else if(e.key==="ArrowUp"){e.preventDefault();Palette.move(-1);}else if(e.key==="Enter"){e.preventDefault();Palette.choose();}}});
KnowledgeSearch.index();renderNav();
window.addEventListener("hashchange",navigate);
if(!location.hash)location.hash="#/icd";
navigate();
