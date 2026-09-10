export default function handler(req,res){
  const rawName=Array.isArray(req.query.name)?req.query.name[0]:req.query.name;
  const rawIcon=Array.isArray(req.query.icon)?req.query.icon[0]:req.query.icon;
  const name=String(rawName||'Game Demo').slice(0,60);
  let icon='/apple-touch-icon.png';
  try{
    if(rawIcon){
      const u=new URL(String(rawIcon));
      if(u.protocol==='https:'||u.protocol==='http:') icon=u.toString();
    }
  }catch(e){}
  const start='/game-app.html?name='+encodeURIComponent(name)+'&icon='+encodeURIComponent(icon);
  const id='/game-app/'+encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''));
  res.setHeader('Content-Type','application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  res.status(200).send(JSON.stringify({
    id,
    name,
    short_name:name.slice(0,20),
    start_url:start,
    scope:'/',
    display:'standalone',
    background_color:'#0c0f0d',
    theme_color:'#18b84a',
    icons:[
      {src:icon,sizes:'192x192',type:'image/png',purpose:'any maskable'},
      {src:icon,sizes:'512x512',type:'image/png',purpose:'any maskable'}
    ]
  }));
}