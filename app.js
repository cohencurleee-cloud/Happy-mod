const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

const searchPanel=qs("#searchPanel");
const searchInput=qs("#searchInput");
const noResults=qs("#noResults");
const drawerBackdrop=qs("#drawerBackdrop");
const toast=qs("#toast");
let activeTab="featured";
let activeFilter="";
let toastTimer;

function showToast(text){
  toast.textContent=text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),1400);
}

function applyFilters(){
  const q=searchInput.value.trim().toLowerCase();
  let visible=0;

  qsa(".searchable").forEach(el=>{
    const name=(el.dataset.name||"").toLowerCase();
    const type=(el.dataset.type||"").toLowerCase();
    const tabPass=activeTab==="featured" || type.includes(activeTab);
    const filterPass=!activeFilter || type.includes(activeFilter);
    const searchPass=!q || name.includes(q) || type.includes(q);
    const show=tabPass && filterPass && searchPass;
    el.classList.toggle("hidden-by-filter",!show);
    if(show) visible++;
  });

  noResults.style.display=visible===0 ? "block" : "none";
}

qs(".menu-btn").addEventListener("click",()=>drawerBackdrop.classList.add("open"));
drawerBackdrop.addEventListener("click",e=>{
  if(e.target===drawerBackdrop) drawerBackdrop.classList.remove("open");
});
qsa(".drawer-link").forEach(btn=>btn.addEventListener("click",()=>{
  drawerBackdrop.classList.remove("open");
  showToast(btn.textContent.trim());
}));

qs(".search-btn").addEventListener("click",()=>{
  searchPanel.classList.toggle("open");
  if(searchPanel.classList.contains("open")) setTimeout(()=>searchInput.focus(),160);
});
qs("#clearSearch").addEventListener("click",()=>{
  searchInput.value="";
  searchInput.focus();
  applyFilters();
});
searchInput.addEventListener("input",applyFilters);

qsa(".section-tab").forEach(btn=>btn.addEventListener("click",()=>{
  qsa(".section-tab").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  activeTab=btn.dataset.tab;
  activeFilter="";
  applyFilters();
  window.scrollTo({top:0,behavior:"smooth"});
}));

function setCategoryFilter(filter){
  activeFilter=activeFilter===filter ? "" : filter;
  applyFilters();
  const match=qsa(".searchable").find(el=>!el.classList.contains("hidden-by-filter"));
  if(match) match.scrollIntoView({behavior:"smooth",block:"center"});
  showToast(activeFilter ? filter[0].toUpperCase()+filter.slice(1) : "All categories");
}

qsa("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>setCategoryFilter(btn.dataset.filter)));

qsa(".bottom-item").forEach(btn=>btn.addEventListener("click",()=>{
  qsa(".bottom-item").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  if(btn.dataset.bottom==="home"){
    activeTab="featured";activeFilter="";searchInput.value="";
    qsa(".section-tab").forEach(x=>x.classList.toggle("active",x.dataset.tab==="featured"));
    applyFilters();window.scrollTo({top:0,behavior:"smooth"});
  } else if(btn.dataset.bottom==="working"){
    activeFilter="";
    applyFilters();
    qs(".content-section:nth-of-type(3)")?.scrollIntoView({behavior:"smooth"});
    showToast("Showing verified-style listings");
  } else {
    qs(".ad-card").scrollIntoView({behavior:"smooth",block:"center"});
    showToast("Mini Games UI");
  }
}));

qsa(".fake-action").forEach(btn=>btn.addEventListener("click",e=>{
  e.preventDefault();
  showToast("UI demo only — no real download");
}));

qs(".download-btn").addEventListener("click",()=>showToast("Downloads: empty"));
applyFilters();
