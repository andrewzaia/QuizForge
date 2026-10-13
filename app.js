const $=s=>document.querySelector(s), bank=window.QUESTION_BANK; let quiz=[],i=0,score=0,locked=false,review=[],mode='quick',activeTopic='General Knowledge',activePlayer='',questionStartedAt=0,totalAnswerMs=0,clockHandle=null,timeLimitMs=0,questionDeadline=0;
const topic=$('#topic'), difficulty=$('#difficulty');

function now(){return performance.now()}
function formatTime(ms){const s=Math.max(0,ms)/1000;return s<60?s.toFixed(1)+'s':Math.floor(s/60)+'m '+(s%60).toFixed(1).padStart(4,'0')+'s'}
function stopClock(){if(clockHandle!==null){clearInterval(clockHandle);clockHandle=null}}
function showClocks(questionMs){
  const current=now();
  const elapsed=questionMs===undefined?(locked?0:Math.max(0,current-questionStartedAt)):questionMs;
  $('#questionTime').textContent='Question time: '+formatTime(timeLimitMs?Math.min(elapsed,timeLimitMs):elapsed);
  $('#totalTimeLive').textContent='Total answering time: '+formatTime(totalAnswerMs+(locked?0:timeLimitMs?Math.min(elapsed,timeLimitMs):elapsed));
  if(!timeLimitMs)return;
  const remaining=Math.max(0,questionDeadline-current);
  const countdown=$('#timeCountdown');
  countdown.textContent='Time left: '+Math.ceil(remaining/1000)+'s';
  countdown.classList.toggle('urgent',remaining<=5000);
  if(!locked && remaining===0)expireQuestion();
}
function startQuestionClock(){stopClock();questionStartedAt=now();questionDeadline=timeLimitMs?questionStartedAt+timeLimitMs:0;showClocks(0);clockHandle=setInterval(()=>showClocks(),100)}
function stopQuestionClock(){const elapsed=Math.max(0,Math.min(timeLimitMs||Infinity,now()-questionStartedAt));stopClock();totalAnswerMs+=elapsed;showClocks(elapsed);return elapsed}

const cats=[...new Set(bank.map(x=>x.category))].sort(); topic.innerHTML='<option>General Knowledge</option>'+cats.map(x=>`<option>${x}</option>`).join('');
function eligible(){return bank.filter(x=>(topic.value==='General Knowledge'||x.category===topic.value)&&(difficulty.value==='all'||x.difficulty===difficulty.value))}
function availability(){let n=eligible().length; $('#available').textContent=`${n} question${n===1?'':'s'} available for this selection.`; [...$('#count').options].forEach(o=>o.disabled=+o.value>n)} topic.onchange=difficulty.onchange=availability; availability();
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
function launch(pool,n){if(!pool.length)return alert('No questions match those filters yet.');stopClock();quiz=shuffle(pool).slice(0,Math.min(n,pool.length));i=score=0;totalAnswerMs=0;review=[];$('#setup').classList.add('hidden');$('#results').classList.add('hidden');$('#quiz').classList.remove('hidden');show()}
function quickPlay(){mode='quick';activeTopic='General Knowledge';activePlayer='';timeLimitMs=0;launch(bank,10)}
$('#quickStart').onclick=quickPlay;
$('#start').onclick=()=>{mode='custom';activeTopic=topic.value;activePlayer=$('#player').value.trim();timeLimitMs=Number($('#timeLimit').value)*1000;launch(eligible(),+$('#count').value)};
$('#customToggle').onclick=()=>{let panel=$('#customPanel'),open=panel.classList.toggle('hidden')===false;$('#customToggle').setAttribute('aria-expanded',open);$('#customToggle').textContent=open?'HIDE OPTIONS':'CUSTOM QUIZ';if(open)panel.scrollIntoView({behavior:window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})};
function show(){
  locked=false;const x=quiz[i];
  $('#qmeta').textContent=`QUESTION ${i+1} / ${quiz.length}`;
  $('#scorelive').textContent=`SCORE ${score}`;
  $('#progress').style.width=`${i/quiz.length*100}%`;
  $('#badge').textContent=`${x.category} • ${x.difficulty}`;
  $('#question').textContent=x.q;
  $('#feedback').classList.add('hidden');
  $('#next').classList.add('hidden');
  $('#answers').innerHTML=x.options.map((a,j)=>`<button class="answer" data-i="${j}"><b>${String.fromCharCode(65+j)}</b><span>${a}</span></button>`).join('');
  document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
  $('#timeCountdown').classList.toggle('hidden',!timeLimitMs);
  $('#timeCountdown').classList.remove('urgent');
  startQuestionClock();
}
function choose(sel){
  if(locked)return;
  if(timeLimitMs && now()>=questionDeadline){expireQuestion();return}
  locked=true;
  const durationMs=stopQuestionClock(),x=quiz[i],ok=sel===x.answer;
  if(ok)score++;
  review.push({x,sel,ok,durationMs});
  document.querySelectorAll('.answer').forEach((b,j)=>{b.disabled=true;if(j===x.answer)b.classList.add('correct');else if(j===sel)b.classList.add('wrong')});
  $('#scorelive').textContent=`SCORE ${score}`;
  const f=$('#feedback');
  f.textContent=ok?'✓ Correct!':`✕ The correct answer is ${x.options[x.answer]}.`;
  f.className='feedback '+(ok?'good':'bad');
  $('#next').textContent=i===quiz.length-1?'SEE RESULTS →':'NEXT QUESTION →';
  $('#next').classList.remove('hidden');
}
function expireQuestion(){
  if(locked)return;
  locked=true;
  const durationMs=stopQuestionClock(),x=quiz[i];
  review.push({x,sel:null,ok:false,durationMs,timedOut:true});
  document.querySelectorAll('.answer').forEach((b,j)=>{b.disabled=true;if(j===x.answer)b.classList.add('correct')});
  const f=$('#feedback');
  f.textContent="Time's up! The correct answer is "+x.options[x.answer]+'.';
  f.className='feedback bad';
  $('#next').textContent=i===quiz.length-1?'SEE RESULTS →':'NEXT QUESTION →';
  $('#next').classList.remove('hidden');
}
$('#next').onclick=()=>{i++;i<quiz.length?show():finish()};
function finish(){
  stopClock();
  $('#quiz').classList.add('hidden');$('#results').classList.remove('hidden');
  const p=Math.round(score/quiz.length*100),name=(mode==='custom'?activePlayer:'')||'You';
  $('#resultTitle').textContent='You scored';
  $('#percent').textContent=p+'%';
  $('#rawscore').textContent=`${score} / ${quiz.length}`;
  $('#resultMessage').textContent=p>=90?'Outstanding - quiz royalty.':p>=70?'Strong round - nicely played.':p>=50?'Solid effort. There’s room for a comeback.':'A character-building round. Time for the rematch!';
  const timedOut=review.filter(r=>r.timedOut).length;
  $('#roundTiming').innerHTML='<div class="stat"><span>Total answering time</span><b>'+formatTime(totalAnswerMs)+'</b></div>'+
    '<div class="stat"><span>Average per question</span><b>'+formatTime(totalAnswerMs/quiz.length)+'</b></div>'+
    (timeLimitMs?'<div class="stat"><span>Time limit</span><b>'+formatTime(timeLimitMs)+' per question</b></div><div class="stat"><span>Timed out</span><b>'+timedOut+' / '+quiz.length+'</b></div>':'');
  const stats={};review.forEach(r=>{stats[r.x.category]??=[0,0];stats[r.x.category][1]++;if(r.ok)stats[r.x.category][0]++});
  $('#breakdown').innerHTML='<h3>Topic breakdown</h3>'+Object.entries(stats).map(([k,v])=>`<div class="stat"><span>${k}</span><b>${v[0]} / ${v[1]}</b></div>`).join('');
  $('#review').innerHTML=review.map((r,n)=>`<details><summary>${r.timedOut?'⌛':r.ok?'✓':'✕'} ${n+1}. ${r.x.q} <span class="question-duration">${r.timedOut?'Timed out - ':''}${formatTime(r.durationMs)}</span></summary><p>Your answer: <b>${r.timedOut?'Timed out (no answer)':r.x.options[r.sel]}</b><br>Correct answer: <b>${r.x.options[r.x.answer]}</b></p></details>`).join('');
  saveScore(name,p);renderScores();
}
let scoreCache=[];
function loadScores(){
  try {
    const stored=window.localStorage.getItem('quizScores');
    if(stored){const parsed=JSON.parse(stored);if(Array.isArray(parsed)){scoreCache=parsed;return parsed}}
  } catch (_) {}
  return scoreCache;
}
function storeScores(scores){scoreCache=scores;try{window.localStorage.setItem('quizScores',JSON.stringify(scores))}catch(_){}}
function saveScore(name,p){const s=loadScores();s.push({name,p,score,total:quiz.length,topic:activeTopic,date:new Date().toLocaleDateString()});s.sort((a,b)=>b.p-a.p);storeScores(s.slice(0,10))}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function renderScores(){
  const s=loadScores();
  $('#highscores').innerHTML=s.length?s.map((x,n)=>'<div class="stat"><span>#'+(n+1)+' '+escapeHtml(x.name)+' <small>'+escapeHtml(x.topic)+'</small></span><b>'+escapeHtml(x.p)+'%</b></div>').join(''):'<p class="small">No scores yet.</p>';
}
renderScores();
$('#again').onclick=()=>{mode==='quick'?quickPlay():launch(eligible(),+$('#count').value)};$('#home').onclick=()=>location.reload();$('#clearScores').onclick=()=>{scoreCache=[];try{window.localStorage.removeItem('quizScores')}catch(_){}renderScores()};
