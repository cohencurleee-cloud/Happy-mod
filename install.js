(()=>{
  const installButton=document.querySelector('.fake-download');
  if(!installButton) return;

  installButton.disabled=false;
  installButton.textContent='Install App';
  installButton.classList.add('install-ready');

  installButton.addEventListener('click',()=>{
    const name=(document.querySelector('#detailName')?.textContent||'Game').trim();
    const icon=document.querySelector('#detailIcon')?.src||'';
    const developer=(document.querySelector('#detailDeveloper')?.textContent||'').trim();

    const url=new URL('./game-app.html',window.location.href);
    url.searchParams.set('name',name);
    if(icon) url.searchParams.set('icon',icon);
    if(developer) url.searchParams.set('developer',developer);
    window.location.href=url.toString();
  });
})();