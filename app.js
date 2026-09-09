const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

const searchWrap=qs('#searchWrap');
const searchInput=qs('#searchInput');
const drawerShade=qs('#drawerShade');
const noResults=qs('#noResults');
const toast=qs('#toast');
let activeTab='featured';
let activeFilter='';
let toastTimer;

function showToast(text){
  toast.textContent=text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),1300);
}

function applyFilters(){
  const q=searchInput.value.trim().toLowerCase();
  let shown=0;
  qsa('.searchable').forEach(card=>{
    const name=(card.dataset.name||'').toLowerCase();
    const type=(card.dataset.type||'').toLowerCase();
    const tabPass=activeTab==='featured'||activeTab==='game'||activeTab==='app'||activeTab==='telegram';
    const filterPass=!activeFilter||activeFilter==='all'||type.includes(activeFilter);
    const searchPass=!q||name.includes(q)||type.includes(q);
    const visible=tabPass&&filterPass&&searchPass;
    card.classList.toggle('hidden-by-filter',!visible);
    if(visible) shown++;
  });
  noResults.style.display=shown===0?'block':'none';
}

qs('.menu-btn').addEventListener('click',()=>drawerShade.classList.add('open'));
drawerShade.addEventListener('click',e=>{
  if(e.target===drawerShade) drawerShade.classList.remove('open');
});
qsa('.drawer button').forEach(btn=>btn.addEventListener('click',()=>{
  drawerShade.classList.remove('open');
  showToast(btn.textContent.trim());
}));

qs('.search-btn').addEventListener('click',()=>{
  searchWrap.classList.toggle('open');
  if(searchWrap.classList.contains('open')) setTimeout(()=>searchInput.focus(),120);
});
qs('#clearSearch').addEventListener('click',()=>{
  searchInput.value='';
  applyFilters();
  searchInput.focus();
});
searchInput.addEventListener('input',applyFilters);

qsa('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  qsa('.tab').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  activeTab=btn.dataset.tab;
  activeFilter='';
  applyFilters();
  showToast(btn.textContent.trim());
}));

qsa('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  activeFilter=btn.dataset.filter;
  applyFilters();
  const first=qsa('.searchable').find(x=>!x.classList.contains('hidden-by-filter'));
  if(first) first.scrollIntoView({behavior:'smooth',block:'center'});
}));

qsa('.game-card,.list-game').forEach(card=>card.addEventListener('click',()=>showToast(card.dataset.name||'Game')));
qsa('.more').forEach(btn=>btn.addEventListener('click',()=>showToast('More games')));
qs('.download-btn').addEventListener('click',()=>showToast('No downloads — UI only'));

qsa('.bottom-item').forEach(btn=>btn.addEventListener('click',()=>{
  qsa('.bottom-item').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  if(btn.dataset.bottom==='home'){
    activeFilter='';searchInput.value='';applyFilters();window.scrollTo({top:0,behavior:'smooth'});
  }else if(btn.dataset.bottom==='working'){
    qs('.safe-banner').scrollIntoView({behavior:'smooth',block:'center'});
  }else{
    qs('.wide-ad').scrollIntoView({behavior:'smooth',block:'center'});
  }
}));

applyFilters();
