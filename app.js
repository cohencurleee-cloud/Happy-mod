const detailStyle=document.createElement('link');
detailStyle.rel='stylesheet';
detailStyle.href='./detail.css';
document.head.appendChild(detailStyle);

const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const steam=id=>`https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;
const simple=name=>`https://cdn.simpleicons.org/${name}`;

const catalog=[
  {name:'Minecraft',icon:'https://cdn.icon-icons.com/icons2/3053/PNG/512/minecraft_macos_bigsur_icon_189943.png',developer:'Mojang Studios',rating:'4.3',tags:'game popular trending offline single sandbox paid reviews verified recommended latest xapk',aliases:'minecraft bedrock craft blocks'},
  {name:'Roblox',icon:'https://uoldown.com/icon/android/roblox/roblox-android.png',developer:'Roblox Corporation',rating:'4.4',tags:'game popular trending online sandbox region reviews verified recommended latest xapk',aliases:'roblox robux'},
  {name:'Grand Theft Auto: San Andreas',icon:'https://vectorified.com/images/gta-sa-icon-29.png',developer:'Rockstar Games',rating:'4.6',tags:'game popular action offline single paid region reviews verified recommended xapk',aliases:'gta gta sa san andreas'},
  {name:'Car Parking Multiplayer',icon:'https://dl.memuplay.com/new_market/img/com.olzhas.carparking.multyplayer.icon.2025-02-07-14-15-48.png',developer:'olzhass',rating:'4.5',tags:'game popular trending racing driving online simulation reviews verified recommended latest xapk',aliases:'car parking multiplayer driving cars'},
  {name:'Toca Boca World',icon:'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/eb/a2/d5/eba2d5dd-d70a-e6e9-7c7c-ccda0adf48d7/Placeholder.mill/1024x1024wd.png',developer:'Toca Boca',rating:'4.3',tags:'game popular casual offline single simulation reviews verified recommended latest',aliases:'toca toca life world'},
  {name:'Subway Surfers',icon:'https://img.itch.zone/aW1nLzE0MDg1NjI2LnBuZw%3D%3D/original/1pB1xO.png',developer:'SYBO Games',rating:'4.6',tags:'game popular trending arcade offline single reviews verified recommended latest',aliases:'subway surfer running'},
  {name:'Geometry Dash',icon:'https://geometrydash2.com/data/image/game/geometry-dash/dashmetry-3.png',developer:'RobTop Games',rating:'4.7',tags:'game popular arcade offline single paid reviews verified recommended',aliases:'gd geometry dash lite'},
  {name:'8 Ball Pool',icon:'https://imgc.eximg.jp/i%3Dhttps%253A%252F%252Fs.eximg.jp%252Fexnews%252Ffeed%252FTouchLab%252FTouchLab_14499_1.png%2Czoom%3D600%2Cquality%3D70%2Ctype%3Dwebp',developer:'Miniclip',rating:'4.8',tags:'game popular sports online casual reviews verified recommended latest',aliases:'pool billiards 8ball'},
  {name:'Dream League Soccer',icon:'https://alternative.me/media/512/dream-league-soccer-thumbnail-3siap3dnkp9j6nig-c.png',developer:'First Touch Games',rating:'4.4',tags:'game sports soccer football single online reviews verified recommended latest',aliases:'dls dream league football'},
  {name:'Poppy Playtime',icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/40/e1/ab/40e1abb0-cfcb-1efb-2eac-f8b274028e8c/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',developer:'Mob Entertainment',rating:'4.4',tags:'game popular horror offline single paid reviews verified recommended',aliases:'poppy playtime chapter 1 huggy wuggy'},
  {name:'Brawl Stars',icon:'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/bf/70/51/bf705169-c7a8-0040-40a3-7673bc2fcb64/Placeholder.mill/0x514h.jpg',developer:'Supercell',rating:'4.5',tags:'game popular trending action online region reviews verified latest',aliases:'brawl stars supercell'},
  {name:'Among Us',icon:steam(945360),developer:'Innersloth',rating:'4.5',tags:'game popular trending online casual region reviews verified recommended',aliases:'among us impostor'},
  {name:'Terraria',icon:steam(105600),developer:'Re-Logic',rating:'4.8',tags:'game popular offline single sandbox paid reviews verified recommended',aliases:'terraria survival sandbox'},
  {name:'Stardew Valley',icon:steam(413150),developer:'ConcernedApe',rating:'4.8',tags:'game popular offline single simulation casual paid reviews verified recommended',aliases:'stardew farm farming'},
  {name:'Bloons TD 6',icon:steam(960090),developer:'Ninja Kiwi',rating:'4.8',tags:'game strategy offline single paid reviews verified recommended',aliases:'bloons btd6 tower defense'},
  {name:'Dead Cells',icon:steam(588650),developer:'Motion Twin',rating:'4.7',tags:'game action offline single paid reviews verified recommended',aliases:'dead cells roguelike'},
  {name:'Human: Fall Flat',icon:steam(477160),developer:'No Brakes Games',rating:'4.5',tags:'game casual puzzle offline single online paid reviews verified',aliases:'human fall flat'},
  {name:'Goat Simulator',icon:steam(265930),developer:'Coffee Stain Studios',rating:'4.4',tags:'game casual simulation offline single paid reviews verified',aliases:'goat simulator'},
  {name:'The Escapists',icon:steam(298630),developer:'Mouldy Toof Studios',rating:'4.5',tags:'game strategy offline single paid reviews verified',aliases:'escapists prison'},
  {name:"Five Nights at Freddy's",icon:steam(319510),developer:'Scott Cawthon',rating:'4.7',tags:'game horror offline single paid reviews verified popular',aliases:'fnaf five nights freddys'},
  {name:"Five Nights at Freddy's 2",icon:steam(332800),developer:'Scott Cawthon',rating:'4.7',tags:'game horror offline single paid reviews verified',aliases:'fnaf 2 five nights freddys 2'},
  {name:'Plague Inc.',icon:steam(246620),developer:'Ndemic Creations',rating:'4.6',tags:'game strategy simulation offline single paid reviews verified',aliases:'plague inc evolved'},
  {name:"Don't Starve",icon:steam(219740),developer:'Klei Entertainment',rating:'4.6',tags:'game survival offline single paid reviews verified',aliases:'dont starve survival'},
  {name:'UNDERTALE',icon:steam(391540),developer:'Toby Fox',rating:'4.9',tags:'game offline single rpg paid reviews verified',aliases:'undertale'},
  {name:'LIMBO',icon:steam(48000),developer:'Playdead',rating:'4.6',tags:'game puzzle offline single paid reviews verified',aliases:'limbo'},
  {name:'Cuphead',icon:steam(268910),developer:'Studio MDHR',rating:'4.8',tags:'game action offline single paid reviews verified popular',aliases:'cuphead'},
  {name:'Hollow Knight',icon:steam(367520),developer:'Team Cherry',rating:'4.9',tags:'game action offline single paid reviews verified popular recommended',aliases:'hollow knight'},
  {name:'Celeste',icon:steam(504230),developer:'Maddy Makes Games',rating:'4.9',tags:'game arcade offline single paid reviews verified',aliases:'celeste'},
  {name:'Gang Beasts',icon:steam(285900),developer:'Boneloaf',rating:'4.4',tags:'game casual action online single paid reviews verified',aliases:'gang beasts'},
  {name:'The Binding of Isaac: Rebirth',icon:steam(250900),developer:'Nicalis',rating:'4.8',tags:'game action offline single paid reviews verified',aliases:'binding isaac rebirth'},
  {name:'Slay the Spire',icon:steam(646570),developer:'Mega Crit',rating:'4.8',tags:'game strategy offline single paid reviews verified',aliases:'slay spire cards'},
  {name:'Vampire Survivors',icon:steam(1794680),developer:'poncle',rating:'4.8',tags:'game action offline single casual paid reviews verified trending',aliases:'vampire survivors'},
  {name:'Balatro',icon:steam(2379780),developer:'LocalThunk',rating:'4.9',tags:'game strategy offline single paid reviews verified trending latest',aliases:'balatro poker cards'},
  {name:'Stumble Guys',icon:steam(1677740),developer:'Scopely',rating:'4.3',tags:'game casual online popular trending region reviews verified latest',aliases:'stumble guys'},
  {name:'Fall Guys',icon:steam(1097150),developer:'Mediatonic',rating:'4.2',tags:'game casual online popular region reviews verified',aliases:'fall guys'},
  {name:'Goose Goose Duck',icon:steam(1568590),developer:'Gaggle Studios',rating:'4.4',tags:'game casual online region reviews verified',aliases:'goose goose duck social deduction'},
  {name:'Papers, Please',icon:steam(239030),developer:'Lucas Pope',rating:'4.8',tags:'game simulation offline single paid reviews verified',aliases:'papers please'},
  {name:'Little Nightmares',icon:steam(424840),developer:'Tarsier Studios',rating:'4.6',tags:'game horror puzzle offline single paid reviews verified popular',aliases:'little nightmares'},
  {name:'Mini Metro',icon:steam(287980),developer:'Dinosaur Polo Club',rating:'4.7',tags:'game strategy puzzle offline single paid reviews verified',aliases:'mini metro'},
  {name:'Getting Over It',icon:steam(240720),developer:'Bennett Foddy',rating:'4.2',tags:'game arcade offline single paid reviews verified',aliases:'getting over it bennett foddy'},
  {name:'Poly Bridge',icon:steam(367450),developer:'Dry Cactus',rating:'4.7',tags:'game puzzle simulation offline single paid reviews verified',aliases:'poly bridge'},
  {name:'Totally Accurate Battle Simulator',icon:steam(508440),developer:'Landfall',rating:'4.8',tags:'game strategy simulation offline single paid reviews verified',aliases:'tabs totally accurate battle simulator'},
  {name:'ARK: Survival Evolved',icon:steam(346110),developer:'Studio Wildcard',rating:'4.2',tags:'game survival sandbox online single paid region reviews verified popular xapk',aliases:'ark survival evolved dinosaurs'},
  {name:'Clustertruck',icon:steam(397950),developer:'Landfall',rating:'4.6',tags:'game arcade action offline single paid reviews verified',aliases:'clustertruck'},
  {name:'Super Meat Boy',icon:steam(40800),developer:'Team Meat',rating:'4.7',tags:'game arcade offline single paid reviews verified',aliases:'super meat boy'},
  {name:'WorldBox',icon:steam(1206560),developer:'Maxim Karpenko',rating:'4.7',tags:'game sandbox simulation offline single ai reviews verified trending',aliases:'worldbox god simulator ai'},
  {name:'People Playground',icon:steam(1118200),developer:'mestiez',rating:'4.8',tags:'game sandbox simulation offline single paid reviews verified trending',aliases:'people playground'},
  {name:'Teardown',icon:steam(1167630),developer:'Tuxedo Labs',rating:'4.8',tags:'game sandbox action offline single paid reviews verified',aliases:'teardown destruction'},
  {name:'Sonic Mania',icon:steam(584400),developer:'SEGA',rating:'4.7',tags:'game arcade offline single paid reviews verified',aliases:'sonic mania sonic'},
  {name:'Bridge Constructor Portal',icon:steam(684410),developer:'ClockStone',rating:'4.5',tags:'game puzzle offline single paid reviews verified',aliases:'bridge constructor portal'},
  {name:'Rust',icon:steam(252490),developer:'Facepunch Studios',rating:'4.3',tags:'game survival online sandbox region reviews verified popular',aliases:'rust survival'},
  {name:"Garry's Mod",icon:steam(4000),developer:'Facepunch Studios',rating:'4.9',tags:'game sandbox online single paid reviews verified popular',aliases:'gmod garrys mod'},
  {name:'Portal 2',icon:steam(620),developer:'Valve',rating:'4.9',tags:'game puzzle offline single paid reviews verified popular',aliases:'portal 2'},
  {name:'Left 4 Dead 2',icon:steam(550),developer:'Valve',rating:'4.8',tags:'game action horror online single paid reviews verified',aliases:'l4d2 left 4 dead 2'},
  {name:'PAYDAY 2',icon:steam(218620),developer:'OVERKILL',rating:'4.5',tags:'game action online single paid reviews verified',aliases:'payday 2'},
  {name:'Brotato',icon:steam(1942280),developer:'Blobfish',rating:'4.7',tags:'game action offline single casual paid reviews verified latest',aliases:'brotato'},
  {name:'Kingdom Two Crowns',icon:steam(701160),developer:'Stumpy Squid',rating:'4.6',tags:'game strategy offline single paid reviews verified',aliases:'kingdom two crowns'},
  {name:'Bad North',icon:steam(688420),developer:'Plausible Concept',rating:'4.6',tags:'game strategy offline single paid reviews verified',aliases:'bad north'},
  {name:'Monument Valley 2',icon:steam(1927740),developer:'ustwo games',rating:'4.7',tags:'game puzzle offline single paid reviews verified',aliases:'monument valley 2'},
  {name:'Townscaper',icon:steam(1291340),developer:'Oskar Stålberg',rating:'4.7',tags:'game casual sandbox offline single paid reviews verified',aliases:'townscaper'},
  {name:'60 Seconds! Reatomized',icon:steam(1012880),developer:'Robot Gentleman',rating:'4.6',tags:'game survival strategy offline single paid reviews verified',aliases:'60 seconds reatomized'},
  {name:'Muse Dash',icon:steam(774171),developer:'PeroPeroGames',rating:'4.8',tags:'game arcade rhythm offline single paid reviews verified',aliases:'muse dash rhythm music'},
  {name:'Crossy Road',icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c6/e6/8b/c6e68b31-d559-dbe8-2bb6-d810a49765ab/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1024x1024bb.png',developer:'Hipster Whale',rating:'4.7',tags:'game arcade casual offline single reviews verified latest',aliases:'crossy road chicken'},
  {name:'Clash Royale',icon:'https://cdn.simpleicons.org/supercell',developer:'Supercell',rating:'4.4',tags:'game strategy online popular trending region reviews verified latest',aliases:'clash royale supercell'},
  {name:'Clash of Clans',icon:'https://cdn.simpleicons.org/supercell',developer:'Supercell',rating:'4.5',tags:'game strategy online popular region reviews verified',aliases:'clash clans coc supercell'},
  {name:'Forza Horizon 5',icon:steam(1551360),developer:'Playground Games',rating:'4.5',tags:'game racing driving popular trending online single paid reviews verified recommended',aliases:'forza horizon 5 cars racing'},
  {name:'Forza Horizon 4',icon:steam(1293830),developer:'Playground Games',rating:'4.6',tags:'game racing driving online single paid reviews verified',aliases:'forza horizon 4 cars racing'},
  {name:'Need for Speed Heat',icon:steam(1222680),developer:'Ghost Games',rating:'4.3',tags:'game racing driving online single paid reviews verified popular',aliases:'nfs heat need for speed'},
  {name:'Assetto Corsa',icon:steam(244210),developer:'Kunos Simulazioni',rating:'4.6',tags:'game racing driving simulation offline single online paid reviews verified',aliases:'assetto corsa racing simulator'},
  {name:'BeamNG.drive',icon:steam(284160),developer:'BeamNG',rating:'4.8',tags:'game racing driving simulation offline single paid reviews verified popular',aliases:'beamng beam ng cars crash'},
  {name:'Euro Truck Simulator 2',icon:steam(227300),developer:'SCS Software',rating:'4.9',tags:'game driving simulation offline single paid reviews verified popular',aliases:'ets2 euro truck simulator'},
  {name:'American Truck Simulator',icon:steam(270880),developer:'SCS Software',rating:'4.8',tags:'game driving simulation offline single paid reviews verified',aliases:'ats american truck simulator'},
  {name:'CarX Drift Racing Online',icon:steam(635260),developer:'CarX Technologies',rating:'4.5',tags:'game racing driving online single paid reviews verified',aliases:'carx drift racing'},
  {name:'Wreckfest',icon:steam(228380),developer:'Bugbear',rating:'4.5',tags:'game racing driving action offline single online paid reviews verified',aliases:'wreckfest racing'},
  {name:'Hot Wheels Unleashed',icon:steam(1271700),developer:'Milestone',rating:'4.3',tags:'game racing driving arcade offline single online paid reviews verified',aliases:'hot wheels unleashed racing'}
];

const apps=[
  {name:'Discord',icon:simple('discord'),developer:'Discord Inc.',rating:'4.4',tags:'app social online popular reviews verified',aliases:'discord chat voice'},
  {name:'Spotify',icon:simple('spotify'),developer:'Spotify',rating:'4.6',tags:'app music online popular reviews verified',aliases:'spotify music'},
  {name:'TikTok',icon:simple('tiktok'),developer:'TikTok',rating:'4.4',tags:'app video social online popular reviews verified',aliases:'tiktok videos'},
  {name:'Instagram',icon:simple('instagram'),developer:'Meta',rating:'4.3',tags:'app social photo online popular reviews verified',aliases:'instagram ig'},
  {name:'YouTube',icon:simple('youtube'),developer:'Google',rating:'4.5',tags:'app video online popular reviews verified',aliases:'youtube yt video'},
  {name:'Twitch',icon:simple('twitch'),developer:'Twitch',rating:'4.4',tags:'app video gaming online reviews verified',aliases:'twitch streams gaming'},
  {name:'Netflix',icon:simple('netflix'),developer:'Netflix',rating:'4.3',tags:'app video online popular reviews verified',aliases:'netflix movies'},
  {name:'CapCut',icon:simple('capcut'),developer:'ByteDance',rating:'4.5',tags:'app video editor popular reviews verified',aliases:'capcut editor'},
  {name:'Reddit',icon:simple('reddit'),developer:'Reddit',rating:'4.2',tags:'app social online reviews verified',aliases:'reddit communities'},
  {name:'Pinterest',icon:simple('pinterest'),developer:'Pinterest',rating:'4.5',tags:'app photo social online reviews verified',aliases:'pinterest pins'}
];

const allItems=[...catalog,...apps];
let currentView='featured';
let gameFilter='all';
let toastTimer;

function esc(s=''){
  return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function initials(name){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();}
function fallbackIcon(name){
  const text=initials(name);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" rx="42" fill="#20b94d"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="76" font-weight="700" fill="white">${esc(text)}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function safeImage(img,item){img.onerror=()=>{img.onerror=null;img.src=fallbackIcon(item.name);};}
function showToast(text){const toast=qs('#toast');toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1300);}
function normalize(s=''){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function matches(item,query){const tokens=normalize(query).split(/\s+/).filter(Boolean);const hay=normalize(`${item.name} ${item.developer} ${item.tags} ${item.aliases||''}`);return tokens.every(t=>hay.includes(t));}

function makeCard(item,variant='grid'){
  if(variant==='list'){
    const el=document.createElement('article');el.className='list-game';el.tabIndex=0;el.innerHTML=`<img alt="${esc(item.name)}"><span>${esc(item.name)}</span><b>›</b>`;
    const img=el.querySelector('img');img.src=item.icon;safeImage(img,item);activateItem(el,item);return el;
  }
  const el=document.createElement('article');el.className=variant==='strip'?'game-card':'catalog-card';el.tabIndex=0;
  el.innerHTML=`<img alt="${esc(item.name)}"><h3>${esc(item.name)}</h3>${variant==='grid'?'<span class="tiny-badge">✓</span>':''}`;
  const img=el.querySelector('img');img.src=item.icon;safeImage(img,item);activateItem(el,item);return el;
}
function activateItem(el,item){el.addEventListener('click',()=>openItem(item));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openItem(item);}});}
function renderInto(id,items,variant='strip',limit){const root=qs('#'+id);root.innerHTML='';(limit?items.slice(0,limit):items).forEach(item=>root.appendChild(makeCard(item,variant)));}
function byTag(tag){return catalog.filter(x=>x.tags.split(/\s+/).includes(tag));}
function renderFeatured(){
  renderInto('popularStrip',byTag('popular'),'strip',14);
  renderInto('trendingStrip',byTag('trending'),'strip',14);
  renderInto('offlineStrip',byTag('offline'),'strip',14);
  renderInto('racingStrip',catalog.filter(x=>/\b(racing|driving)\b/.test(x.tags)),'strip',14);
  renderInto('recommendedStrip',byTag('recommended'),'strip',16);
  renderInto('latestList',byTag('latest').slice().reverse(),'list',14);
}
function renderGames(filter='all'){
  gameFilter=filter||'all';let items=catalog;if(gameFilter!=='all') items=byTag(gameFilter);
  qs('#gameViewTitle').textContent=gameFilter==='all'?'All Games':gameFilter[0].toUpperCase()+gameFilter.slice(1)+' Games';
  qs('#gameViewSubtitle').textContent=`${items.length} game${items.length===1?'':'s'}`;renderInto('allGamesGrid',items,'grid');
}
function renderApps(){renderInto('allAppsGrid',apps,'grid');}
function setTab(name){currentView=name;qsa('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));qsa('.view').forEach(v=>v.classList.toggle('active-view',v.dataset.view===name));if(name==='game')renderGames(gameFilter);if(name==='app')renderApps();window.scrollTo({top:0,behavior:'smooth'});}
function searchNow(){
  const q=qs('#searchInput').value.trim();
  if(!q){qsa('.view').forEach(v=>v.classList.toggle('active-view',v.dataset.view===currentView));return;}
  const results=allItems.filter(item=>matches(item,q));qsa('.view').forEach(v=>v.classList.toggle('active-view',v.dataset.view==='search'));
  qs('#searchCount').textContent=`${results.length} result${results.length===1?'':'s'} for “${q}”`;renderInto('searchResults',results,'grid');qs('#noResults').style.display=results.length?'none':'block';
}
function openItem(item){
  qs('#detailHeaderTitle').textContent=item.name;qs('#detailName').textContent=item.name;qs('#detailDeveloper').textContent=item.developer||'Publisher';qs('#detailRating').textContent=item.rating||'4.5';qs('#detailWorking').textContent='100%';qs('#detailSize').textContent='Varies';qs('#detailVersion').textContent='Latest version';qs('#detailModText').textContent='Preview listing';qs('#detailKind').textContent=item.tags.includes('app')?'APP':'GAME';
  qs('#detailDescription').textContent=`Browse the ${item.name} listing in this HappyMod-style interface. This page is a visual demo and does not provide game files, APKs, or modified clients.`;
  qs('#detailModInfo').textContent='Listing preview only. Downloads are intentionally disabled.';
  const icon=qs('#detailIcon');icon.src=item.icon;icon.alt=item.name;safeImage(icon,item);
  ['#shotIcon1','#shotIcon2','#shotIcon3'].forEach(sel=>{const img=qs(sel);img.src=item.icon;img.alt=item.name;safeImage(img,item);});
  const itemTags=new Set(item.tags.split(/\s+/));const source=item.tags.includes('app')?apps:catalog;
  const similar=source.filter(x=>x!==item).map(x=>({item:x,score:x.tags.split(/\s+/).filter(t=>itemTags.has(t)).length})).sort((a,b)=>b.score-a.score).slice(0,7).map(x=>x.item);
  const row=qs('#similarRow');row.innerHTML='';similar.forEach(x=>{const b=document.createElement('button');b.className='similar-game';b.innerHTML=`<img alt="${esc(x.name)}"><span>${esc(x.name)}</span>`;const img=b.querySelector('img');img.src=x.icon;safeImage(img,x);b.addEventListener('click',()=>openItem(x));row.appendChild(b);});
  qsa('.detail-tabs button').forEach((x,i)=>x.classList.toggle('active',i===0));qs('#detailShade').classList.add('open');qs('#detailShade').setAttribute('aria-hidden','false');document.body.classList.add('detail-open');qs('.detail-scroll').scrollTop=0;
}
function closeDetail(){qs('#detailShade').classList.remove('open');qs('#detailShade').setAttribute('aria-hidden','true');document.body.classList.remove('detail-open');}

renderFeatured();renderGames();renderApps();
qs('.menu-btn').addEventListener('click',()=>qs('#drawerShade').classList.add('open'));
qs('#drawerShade').addEventListener('click',e=>{if(e.target===qs('#drawerShade'))qs('#drawerShade').classList.remove('open');});
qsa('[data-drawer]').forEach(btn=>btn.addEventListener('click',()=>{qs('#drawerShade').classList.remove('open');qs('#searchInput').value='';setTab(btn.dataset.drawer);}));
qsa('[data-drawer-filter]').forEach(btn=>btn.addEventListener('click',()=>{qs('#drawerShade').classList.remove('open');qs('#searchInput').value='';gameFilter=btn.dataset.drawerFilter;setTab('game');}));
qs('.search-btn').addEventListener('click',()=>{qs('#searchWrap').classList.toggle('open');if(qs('#searchWrap').classList.contains('open'))setTimeout(()=>qs('#searchInput').focus(),100);});
qs('#clearSearch').addEventListener('click',()=>{qs('#searchInput').value='';qsa('.view').forEach(v=>v.classList.toggle('active-view',v.dataset.view===currentView));qs('#searchInput').focus();});
qs('#searchInput').addEventListener('input',searchNow);
qs('#searchInput').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=qs('#searchInput').value.trim();const first=allItems.find(x=>matches(x,q));if(first)openItem(first);}});
qsa('.tab').forEach(btn=>btn.addEventListener('click',()=>{qs('#searchInput').value='';gameFilter='all';setTab(btn.dataset.tab);}));
qsa('.category').forEach(btn=>btn.addEventListener('click',()=>{qs('#searchInput').value='';gameFilter=btn.dataset.filter==='all'?'all':btn.dataset.filter;setTab('game');}));
qsa('.more').forEach(btn=>btn.addEventListener('click',()=>{gameFilter=btn.dataset.more;setTab('game');}));
qs('#clearGameFilter').addEventListener('click',()=>{gameFilter='all';renderGames();});
qs('#telegramBack').addEventListener('click',()=>{gameFilter='all';setTab('game');});
qs('.download-btn').addEventListener('click',()=>showToast('Downloads are disabled'));
qsa('.bottom-item').forEach(btn=>btn.addEventListener('click',()=>{qsa('.bottom-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');qs('#searchInput').value='';if(btn.dataset.bottom==='home'){gameFilter='all';setTab('featured');}else if(btn.dataset.bottom==='working'){gameFilter='verified';setTab('game');}else{gameFilter='casual';setTab('game');}}));
qs('#detailBack').addEventListener('click',closeDetail);
qs('#detailShade').addEventListener('click',e=>{if(e.target===qs('#detailShade'))closeDetail();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&qs('#detailShade').classList.contains('open'))closeDetail();});
qs('.detail-dots').addEventListener('click',()=>showToast('More options'));
qsa('.detail-tabs button').forEach((btn,index)=>btn.addEventListener('click',()=>{qsa('.detail-tabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(index===1)qsa('.detail-block')[1]?.scrollIntoView({behavior:'smooth',block:'start'});if(index===2)showToast('Comments disabled in demo');}));
