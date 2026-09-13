(()=>{
  const installButton=document.querySelector('.fake-download');
  if(!installButton) return;

  const style=document.createElement('style');
  style.textContent=`
    .fake-download.install-ready{
      background:#20e85b !important;
      color:#fff !important;
      cursor:pointer !important;
      box-shadow:0 5px 14px rgba(20,200,75,.35);
      border:1px solid #11c947 !important;
      font-size:14px;
      transition:transform .12s ease,filter .12s ease,box-shadow .12s ease;
    }
    .fake-download.install-ready:active{
      transform:scale(.98);
      filter:brightness(.92);
      box-shadow:0 2px 7px rgba(20,200,75,.3);
    }
  `;
  document.head.appendChild(style);

  installButton.disabled=false;
  installButton.textContent='Install App';
  installButton.classList.add('install-ready');

  installButton.addEventListener('click',()=>{
    const name=(document.querySelector('#detailName')?.textContent||'Game').trim();
    const icon=document.querySelector('#detailIcon')?.src||'';
    const developer=(document.querySelector('#detailDeveloper')?.textContent||'').trim();

    const url=new URL('./game-app.html',window.location.href);
    url.searchParams.set('_v','5');
    url.searchParams.set('name',name);
    if(icon) url.searchParams.set('icon',icon);
    if(developer) url.searchParams.set('developer',developer);
    window.location.href=url.toString();
  });
})();