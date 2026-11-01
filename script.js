/* NOIR CLUB site configuration: paste your real Discord invite URL here. */
const CONFIG = { discordInvite: 'https://discord.gg/PGfDmjN9Y7' };
const rules = [
 {number:'01',name:'RESPECT',tag:'etiquette',summary:'욕설, 인신공격, 비하 및 혐오 발언 금지',detail:'모든 멤버를 존중해 주세요. 과도한 욕설, 인신공격, 비하, 혐오 발언을 금지합니다. 정치 및 종교 논쟁으로 불편한 분위기를 만들지 말아 주세요.'},
 {number:'02',name:'NO DRAMA',tag:'safety',summary:'분쟁, 공개 저격 및 불필요한 다툼 금지',detail:'공개 저격, 싸움 유도, 억까, 팀원 탓, 멘탈 흔들기 등 다른 멤버를 불편하게 하는 행동을 금지합니다. 문제가 생기면 운영진에게 개인적으로 문의해 주세요.'},
 {number:'03',name:'NO ADVERTISING',tag:'channel',summary:'허가 없는 서버 초대 및 상업적 홍보 금지',detail:'운영진 허가 없이 타 서버 홍보, 서버 초대 링크 게시, 상업적 홍보를 하지 말아 주세요.'},
 {number:'04',name:'NO SPAM',tag:'channel',summary:'도배, 과도한 멘션 및 반복 메시지 자제',detail:'도배, 반복 홍보, 과도한 멘션 및 채널 주제에 맞지 않는 메시지는 자제해 주세요. INFORMATION 채널은 운영진 외 메시지 작성이 금지됩니다.'},
 {number:'05',name:'NO EXCLUSION',tag:'safety',summary:'파벌 형성, 배척 및 집단 괴롭힘 금지',detail:'신규 멤버 배척, 특정 멤버를 의도적으로 따돌리거나 여러 명이 한 사람을 몰아가는 행위를 금지합니다. 상대방이 불편해하는 개인 메시지 및 DM도 삼가 주세요.'},
 {number:'06',name:'CHANNEL PURPOSE',tag:'channel',summary:'채널 목적 준수 및 음성 매너 지키기',detail:'각 채널의 목적에 맞게 이용해 주세요. 보이스 채널에서는 과도한 잡음, 다른 사람의 대화를 방해하는 행동을 삼가 주세요. INFORMATION 채널에는 관리자만 메시지를 작성할 수 있습니다.'},
 {number:'07',name:'REPORT, DON’T RETALIATE',tag:'safety',summary:'보복 대신 운영진에게 신고하기',detail:'규칙 위반을 발견하면 운영진에게 개인적으로 신고해 주세요. 개인적인 보복, 공개적인 다툼 또는 분쟁 확산은 하지 말아 주세요.'},
 {number:'08',name:'SPEAK COMFORTABLY',tag:'etiquette',summary:'반말은 자유, 존댓말 선호도 존중',detail:'서버 내 반말 사용은 자유롭습니다. 반말이 불편하거나 존댓말을 선호하는 분들은 편하게 존댓말을 사용해 주세요. 서로의 말투와 의사를 존중합시다.'}
];
const $=s=>document.querySelector(s);const $$=s=>Array.from(document.querySelectorAll(s));
const list=$('#ruleList'), search=$('#ruleSearch');let currentFilter='all';
function renderRules(){const query=search.value.trim().toLocaleLowerCase();const filtered=rules.filter(r=>(currentFilter==='all'||r.tag===currentFilter)&&[r.name,r.summary,r.detail].join(' ').toLocaleLowerCase().includes(query));list.innerHTML=filtered.map(r=>`<div class="rule-item"><button class="rule-trigger" aria-expanded="false" aria-controls="rule-${r.number}"><span class="rule-num">${r.number}</span><span class="rule-name">${r.name}</span><span class="rule-summary">${r.summary}</span><span class="rule-plus">+</span></button><div id="rule-${r.number}" class="rule-detail" hidden>${r.detail}</div></div>`).join('');$('#emptyRules').hidden=filtered.length!==0;list.querySelectorAll('.rule-trigger').forEach(b=>b.addEventListener('click',()=>{let opened=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!opened));b.querySelector('.rule-plus').textContent=opened?'+':'−';document.getElementById(b.getAttribute('aria-controls')).hidden=opened;}));}
search.addEventListener('input',renderRules);$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;renderRules();}));renderRules();
const stages={1:['✧ STAGE 01','첫 규칙 위반 시 경고와 함께 구두 주의가 주어집니다. 같은 문제가 반복되지 않도록 안내합니다.'],2:['✧ STAGE 02','두 번째 경고를 받으면 음성 및 채팅 채널 이용이 24시간 동안 제한됩니다.'],3:['✧ STAGE 03','세 번째 경고를 받으면 운영진 판단에 따라 서버 추방(Kick) 또는 영구 강퇴(Ban)됩니다.']};$$('.warning-card').forEach(btn=>btn.addEventListener('click',()=>{$$('.warning-card').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#warningDetail').innerHTML=`<span>${stages[btn.dataset.stage][0]}</span><p>${stages[btn.dataset.stage][1]}</p>`;}));
let toastTimer;function toast(message){const e=$('#toast');e.textContent=message;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),3200)}
const dialog=$('#inviteDialog');function join(){const invite=CONFIG.discordInvite.trim();if(/^https:\/\/(discord\.gg|discord\.com\/invite)\/[\w-]+\/?$/i.test(invite)){window.open(invite,'_blank','noopener,noreferrer');return}$('#inviteMessage').textContent='디스코드 초대 링크가 아직 등록되지 않았습니다. 사이트 관리자에게 초대 링크를 문의해 주세요.';dialog.showModal()}$$('.join-btn').forEach(x=>x.addEventListener('click',join));$('#closeDialog').addEventListener('click',()=>dialog.close());$('#inviteAction').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
$('#copySite').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(window.location.href);toast('페이지 주소를 복사했습니다 ✧')}catch{toast('브라우저 주소창의 링크를 복사해 주세요.')}});
$('#year').textContent=new Date().getFullYear();$('#menuToggle').addEventListener('click',()=>{let nav=$('#nav');let open=nav.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open));});$$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>observer.observe(x));
const starCanvas=$('#stars');const ctx=starCanvas.getContext('2d');let dots=[];function resizeStars(){const dpr=Math.min(window.devicePixelRatio||1,2);starCanvas.width=Math.round(window.innerWidth*dpr);starCanvas.height=Math.round(window.innerHeight*dpr);starCanvas.style.width=window.innerWidth+'px';starCanvas.style.height=window.innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(120,Math.round(window.innerWidth*window.innerHeight/11000))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.3+Math.random()*1.2,phase:Math.random()*6.28,speed:.003+Math.random()*.012}));}resizeStars();window.addEventListener('resize',resizeStars,{passive:true});let tick=0;function animateStars(){ctx.clearRect(0,0,innerWidth,innerHeight);dots.forEach(d=>{let alpha=reduced?.45:.26+.45*(1+Math.sin(tick*d.speed+d.phase))/2;ctx.beginPath();ctx.fillStyle=`rgba(223,211,251,${alpha})`;ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()});tick++;if(!reduced)requestAnimationFrame(animateStars)}animateStars();if(!reduced)document.addEventListener('pointermove',e=>{$('#cursorGlow').style.left=e.clientX+'px';$('#cursorGlow').style.top=e.clientY+'px';});
window.addEventListener('scroll',()=>{$('#progress').style.width=(100*window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+'%'},{passive:true});
$('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('light');const light=document.body.classList.contains('light');$('#themeToggle').textContent=light?'☀':'☾';toast(light?'달빛 모드 활성화':'미드나잇 모드 활성화')});
/* User-provided track: start from the chorus, at comfortable volume. */
const TRACK_START = 70; // Seconds into track; change if preferred
const track = new Audio('./assets/noir-after-dark.mp3');
track.preload = 'auto'; track.loop = false; track.volume = 0.25;
let audioEnabled = false;
let playbackRequested = false;
const volumeInput = document.querySelector('#musicVolume');
function seekHighlight(){try{if(Number.isFinite(track.duration) && track.duration > TRACK_START) track.currentTime = TRACK_START;}catch{}}
track.addEventListener('loadedmetadata',seekHighlight,{once:true});
track.addEventListener('ended',()=>{seekHighlight();if(playbackRequested)track.play().catch(()=>{});});
function updateMusicState(){audioEnabled=!track.paused;$('#soundState').textContent=audioEnabled?'ON':'OFF';$('#soundToggle').setAttribute('aria-label',audioEnabled?'배경음악 끄기':'배경음악 켜기');}
async function startAudio(){playbackRequested=true;if(track.readyState>=1 && track.currentTime<TRACK_START)seekHighlight();try{await track.play();updateMusicState()}catch{updateMusicState(); /* autoplay restrictions: user can press Enter or music toggle */ }}
function stopAudio(){playbackRequested=false;track.pause();updateMusicState();}
$('#soundToggle').addEventListener('click',()=>audioEnabled?stopAudio():startAudio());
if(volumeInput){volumeInput.value=25;volumeInput.addEventListener('input',()=>{track.volume=Number(volumeInput.value)/100;$('#volumeValue').textContent=volumeInput.value+'%';});}
function closeWelcome(withSound){ document.body.classList.remove('intro-locked'); $('#welcome').classList.add('closed');document.body.style.overflow='';if(withSound)startAudio();else stopAudio();}
$('#enter').addEventListener('click',()=>closeWelcome(true));$('#enterQuiet').addEventListener('click',()=>closeWelcome(false));
document.body.style.overflow='hidden'; /* Start audio only after a deliberate entrance click. */
/* Autoplay with sound may be blocked by browsers until the first user gesture. */




/* Hidden ASA constellation: type a-s-a anywhere outside an editable control. */
(() => {
  let recent = '', active = false, cleanupTimer = null;
  const canvas = document.createElement('canvas');
  canvas.id = 'asaFx'; canvas.setAttribute('aria-hidden', 'true');
  const stage = document.createElement('div');
  stage.id = 'asaSecret'; stage.setAttribute('role','dialog'); stage.setAttribute('aria-modal','true');
  stage.setAttribute('aria-label','ASA 비밀의 밤'); stage.setAttribute('aria-hidden','true');
  stage.innerHTML = `<div class="asa-vortex" aria-hidden="true"><div class="asa-ring asa-ring-one"></div><div class="asa-ring asa-ring-two"></div><div class="asa-ring asa-ring-three"></div><span class="asa-core">✦</span></div><div class="asa-content"><span class="asa-overline">✧ THE SECRET OF THE NIGHT ✧</span><h2 class="asa-letters">A<span>S</span>A</h2><p class="asa-quote">당신은 숨겨진 밤의 문을 발견했습니다.</p><div class="asa-line"></div><p class="asa-subtitle">BEYOND THE MOON · BEYOND THE ORDINARY</p><button type="button" class="asa-dismiss">RETURN TO NOIR <span>↗</span></button></div><span class="asa-hint">✦ A SECRET UNLOCKED ✦</span>`;
  document.body.append(canvas, stage);
  const context = canvas.getContext('2d');
  let pieces = [], raf = 0, previousFocus = null, lastFrame = 0;
  const colors = ['#f8ecff','#dfb5ff','#9d81ff','#ffffff','#b7a0ff','#ffdaf9'];
  function resize(){const ratio=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*ratio;canvas.height=innerHeight*ratio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';context.setTransform(ratio,0,0,ratio,0,0);}
  function sprinkle(){
    pieces=Array.from({length:reduced?45:210},(_,i)=>{
      const angle=Math.random()*Math.PI*2, speed=1.4+Math.random()*5;
      return {x:innerWidth/2,y:innerHeight/2,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-1.4,life:90+Math.random()*110,size:1+Math.random()*4,color:colors[i%colors.length],rotation:Math.random()*7, spin:(Math.random()-.5)*.13};
    });
  }
  function render(timestamp){
    if(!active)return;
    if(timestamp-lastFrame<16){raf=requestAnimationFrame(render);return}lastFrame=timestamp;
    context.clearRect(0,0,innerWidth,innerHeight);
    for(const a of pieces){if(a.life<=0)continue;a.x+=a.vx;a.y+=a.vy;a.vy+=.018;a.vx*=.996;a.rotation+=a.spin;a.life--;
      context.save();context.translate(a.x,a.y);context.rotate(a.rotation);context.globalAlpha=Math.min(1,a.life/35);context.fillStyle=a.color;context.shadowBlur=18;context.shadowColor=a.color;
      context.fillRect(-a.size/2,-a.size/2,a.size,a.size*2.5);context.restore();
    }
    raf=requestAnimationFrame(render);
  }
  function reveal(){if(active)return;active=true;recent='';previousFocus=document.activeElement;resize();sprinkle();document.body.classList.add('asa-unlocked');stage.setAttribute('aria-hidden','false');stage.querySelector('button').focus();raf=requestAnimationFrame(render);clearTimeout(cleanupTimer);cleanupTimer=setTimeout(close,14000);}
  function close(){if(!active)return;active=false;cancelAnimationFrame(raf);clearTimeout(cleanupTimer);document.body.classList.remove('asa-unlocked');stage.setAttribute('aria-hidden','true');context.clearRect(0,0,canvas.width,canvas.height);if(previousFocus?.isConnected)previousFocus.focus();}
  stage.querySelector('button').addEventListener('click',close);
  stage.addEventListener('click',e=>{if(e.target===stage)close()});
  window.addEventListener('resize',()=>{if(active)resize()},{passive:true});
  document.addEventListener('keydown',e=>{
    if(active){if(e.key==='Escape'){e.preventDefault();close()}if(e.key==='Tab'){e.preventDefault();stage.querySelector('button').focus()}return}
    const el=e.target;
    if(el?.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(el?.tagName)||e.ctrlKey||e.altKey||e.metaKey)return;
    if(e.key.length===1){recent=(recent+e.key.toLowerCase()).slice(-3);if(recent==='asa')reveal();}
  });
})();
