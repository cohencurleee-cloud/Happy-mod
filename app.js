const detailStyle=document.createElement('link');
detailStyle.rel='stylesheet';
detailStyle.href='./detail.css';
document.head.appendChild(detailStyle);

const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

const searchWrap=qs('#searchWrap');
const searchInput=qs('#searchInput');
const drawerShade=qs('#drawerShade');
const noResults=qs('#noResults');
const toast=qs('#toast');
const detailShade=qs('#detailShade');
let activeTab='featured';
let activeFilter='';
let toastTimer;

const gameDetails={
  'Minecraft':{
    developer:'Mojang',rating:'4.6',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No mod file or APK is attached to this page.',
    description:'Explore randomly generated worlds, build anything you can imagine, survive the night, and create your own adventures.'
  },
  'Grand Theft Auto: San Andreas':{
    developer:'Rockstar Games',rating:'4.6',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No modified game file is available.',
    description:'An open-world action game set across Los Santos, San Fierro, and Las Venturas.'
  },
  'Car Parking Multiplayer':{
    developer:'olzhass',rating:'4.5',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. Downloads and mod packages are disabled.',
    description:'Open-world driving, parking challenges, car tuning, multiplayer racing, and free walking.'
  },
  'Toca Boca World':{
    developer:'Toca Boca',rating:'4.3',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No game files are provided.',
    description:'Create characters, build locations, tell stories, and explore a colorful open-ended world.'
  },
  'Poppy Playtime Chapter 1':{
    developer:'Mob Entertainment',rating:'4.4',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. The download control is intentionally disabled.',
    description:'Explore an abandoned toy factory, solve puzzles, and survive what is hiding inside.'
  },
  'Dream League Soccer':{
    developer:'First Touch Games',rating:'4.4',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No downloadable package is included.',
    description:'Build a football team, compete through divisions, upgrade your stadium, and play matches.'
  },
  '8 Ball Pool':{
    developer:'Miniclip',rating:'4.8',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. Downloads are disabled.',
    description:'Compete in online pool matches, tournaments, and one-on-one games across different tables.'
  },
  'Subway Surfers':{
    developer:'SYBO Games',rating:'4.6',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No APK or mod is available.',
    description:'Dash through subway tracks, dodge trains, collect coins, and chase high scores.'
  },
  'Geometry Dash':{
    developer:'RobTop Games',rating:'4.7',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. The download button cannot be used.',
    description:'Jump and fly through rhythm-based levels packed with obstacles and timing challenges.'
  },
  'Roblox':{
    developer:'Roblox Corporation',rating:'4.4',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No Roblox files or modified clients are provided.',
    description:'Discover and play millions of community-created experiences with friends.'
  }
};

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

function allGames(){
  const seen=new Set();
  return qsa('.game-open').map(card=>({
    name:card.dataset.name,
    icon:card.querySelector('img')?.src||''
  })).filter(game=>{
    if(!game.name||seen.has(game.name)) return false;
    seen.add(game.name);
    return true;
  });
}

function openGame(cardOrName){
  const card=typeof cardOrName==='string'
    ? qsa('.game-open').find(x=>x.dataset.name===cardOrName)
    : cardOrName;
  if(!card) return;

  const name=card.dataset.name;
  const icon=card.querySelector('img')?.src||'';
  const info=gameDetails[name]||{
    developer:'Game developer',rating:'4.5',working:'100%',size:'Varies',version:'Latest version',
    mod:'Preview listing',modInfo:'UI preview only. No downloadable files are provided.',
    description:'Game detail preview.'
  };

  qs('#detailHeaderTitle').textContent=name;
  qs('#detailName').textContent=name;
  qs('#detailDeveloper').textContent=info.developer;
  qs('#detailRating').textContent=info.rating;
  qs('#detailWorking').textContent=info.working;
  qs('#detailSize').textContent=info.size;
  qs('#detailVersion').textContent=info.version;
  qs('#detailModText').textContent=info.mod;
  qs('#detailModInfo').textContent=info.modInfo;
  qs('#detailDescription').textContent=info.description;

  const detailIcon=qs('#detailIcon');
  detailIcon.src=icon;
  detailIcon.alt=name;
  ['#shotIcon1','#shotIcon2','#shotIcon3'].forEach(selector=>{
    const img=qs(selector);img.src=icon;img.alt=name;
  });

  const similar=allGames().filter(g=>g.name!==name).slice(0,6);
  const row=qs('#similarRow');
  row.innerHTML='';
  similar.forEach(game=>{
    const btn=document.createElement('button');
    btn.className='similar-game';
    btn.innerHTML=`<img src="${game.icon}" alt="${game.name}"><span>${game.name}</span>`;
    btn.addEventListener('click',()=>openGame(game.name));
    row.appendChild(btn);
  });

  qsa('.detail-tabs button').forEach((x,i)=>x.classList.toggle('active',i===0));
  detailShade.classList.add('open');
  detailShade.setAttribute('aria-hidden','false');
  document.body.classList.add('detail-open');
  qs('.detail-scroll').scrollTop=0;
}

function closeGame(){
  detailShade.classList.remove('open');
  detailShade.setAttribute('aria-hidden','true');
  document.body.classList.remove('detail-open');
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

qsa('.game-open').forEach(card=>{
  card.addEventListener('click',()=>openGame(card));
  card.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();openGame(card);}
  });
});

qs('#detailBack').addEventListener('click',closeGame);
detailShade.addEventListener('click',e=>{if(e.target===detailShade) closeGame();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&detailShade.classList.contains('open')) closeGame();});
qs('.detail-dots').addEventListener('click',()=>showToast('More options'));

qsa('.detail-tabs button').forEach((btn,index)=>btn.addEventListener('click',()=>{
  qsa('.detail-tabs button').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  if(index===0) qs('.mod-card').scrollIntoView({behavior:'smooth',block:'start'});
  if(index===1) qsa('.detail-block')[2]?.scrollIntoView({behavior:'smooth',block:'start'});
  if(index===2) showToast('Comments disabled in demo');
}));

qsa('.collection-card').forEach(card=>card.addEventListener('click',()=>{
  if(card.dataset.collection==='popular') qs('.section').scrollIntoView({behavior:'smooth',block:'start'});
  else qsa('.section')[2]?.scrollIntoView({behavior:'smooth',block:'start'});
}));

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
