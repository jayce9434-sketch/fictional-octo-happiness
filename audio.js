'use strict';
window.Sound=(()=>{
  let ctx=null,musicGain,fxGain,master,compressor,timer=null,next=0,step=0,phrase=0,playing=false,enabled=false,getBand=()=>({island:CI.islands[0],monsters:[]}),settings={master:80,music:65,sfx:75};
  const buffers={},active=new Set(),recent=new Map(),phraseCache=new Map();let jamMode=false;
  const baseFrequency={voice:130.8128,bass:65.4064,pad:130.8128,strings:261.6256,flute:261.6256,bell:261.6256,keys:261.6256,brass:130.8128,reed:130.8128,plucked:261.6256};
  const TAU=Math.PI*2;
  function makeSample(role){
    const sr=ctx.sampleRate,length=role==='pad'?3.2:role==='strings'?2.4:role==='voice'?1.7:2.2,n=Math.floor(sr*length),b=ctx.createBuffer(1,n,sr),d=b.getChannelData(0),f=baseFrequency[role]||261.6256;
    let seed=3201,prev=0;const noise=()=>{seed=(seed*1664525+1013904223)>>>0;return(seed/4294967296)*2-1;};
    for(let i=0;i<n;i++){
      const t=i/sr,p=TAU*f*t+Math.sin(TAU*5.2*t)*.016,attack=Math.min(1,t/(role==='pad'?.18:role==='strings'?.1:.012));let env=Math.exp(-t*(role==='bell'?2.5:role==='plucked'?4:role==='keys'?3:role==='bass'?2.5:.7));env*=attack*Math.min(1,(length-t)/.2);let v=0;
      if(role==='voice'){
        // Vowel formants create a rounded "oh / ah" choir rather than a square-wave beep.
        const vowel=Math.min(1,t*1.8);for(let k=1;k<=20;k++){const hz=f*k,formants=Math.exp(-Math.pow((hz-(520+vowel*180))/220,2))*.7+Math.exp(-Math.pow((hz-(1150+vowel*180))/300,2))*.34+Math.exp(-Math.pow((hz-2600)/420,2))*.14;v+=Math.sin(p*k)*(formants+.12/k)/3;}
        v+=noise()*.006;env*=.7+.3*Math.sin(Math.min(1,t/.6)*Math.PI);
      }else if(role==='bell'){
        v=Math.sin(p)*Math.exp(-t*1.2)*.45+Math.sin(p*2.756)*Math.exp(-t*2.5)*.23+Math.sin(p*5.404)*Math.exp(-t*4)*.1+Math.sin(p*8.933)*Math.exp(-t*6)*.04;
      }else if(role==='keys'){
        v=Math.sin(p)*.48+Math.sin(p*2.002)*Math.exp(-t*1.5)*.2+Math.sin(p*3.008)*Math.exp(-t*2.5)*.09+Math.sin(p*4.017)*Math.exp(-t*4)*.035;v+=noise()*.016*Math.exp(-t*60);
      }else if(role==='plucked'){
        v=Math.sin(p)*.5;for(let k=2;k<=8;k++)v+=Math.sin(p*k)*Math.exp(-t*k*1.5)*(.25/k);v+=noise()*.023*Math.exp(-t*60);
      }else if(role==='flute'){
        v=Math.sin(p)*.58+Math.sin(p*2)*.075+Math.sin(p*3)*.025;prev=prev*.8+noise()*.2;v+=prev*.025;
      }else if(role==='bass'){
        v=Math.sin(p)*.58+Math.sin(p*2)*.12+Math.sin(p*3)*.032;env*=Math.min(1,t/.025);
      }else if(role==='pad'){
        v=(Math.sin(p)+Math.sin(p*1.003)+Math.sin(p*.997))*.13+Math.sin(p*2)*.055+Math.sin(p*3)*.025;
      }else if(role==='strings'){
        for(let k=1;k<=9;k++)v+=(Math.sin(p*k)+Math.sin(p*k*1.002))*.17/(k*k*.35+.7);prev=prev*.9+noise()*.1;v+=prev*.024;
      }else if(role==='brass'){
        for(let k=1;k<=9;k++)v+=Math.sin(p*k)*(.4/k)*Math.exp(-k*t*.32);v=Math.tanh(v*1.4)*.65;
      }else if(role==='reed'){
        for(let k=1;k<=7;k++)v+=Math.sin(p*k)*(.24/k)*(k%2?1:.3);
      }
      d[i]=v*env;
    }
    return b;
  }
  function drum(type){
    const sr=ctx.sampleRate,len=type===0?.55:type===1?.3:.16,b=ctx.createBuffer(1,Math.floor(sr*len),sr),d=b.getChannelData(0);let p=0,previous=0;
    for(let i=0;i<d.length;i++){const t=i/sr,n=Math.random()*2-1;if(type===0){p+=TAU*(48+115*Math.exp(-t*26))/sr;d[i]=(Math.sin(p)*.75+n*.05*Math.exp(-t*90))*Math.exp(-t*10);}else if(type===1){previous=.35*previous+.65*n;d[i]=(previous*.65+Math.sin(TAU*185*t)*.2)*Math.exp(-t*19);}else{d[i]=(n-previous)*.2*Math.exp(-t*38);previous=n;}}
    return b;
  }
  async function init(){
    if(ctx){if(ctx.state==='suspended')await ctx.resume();enabled=true;return true;}
    try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;ctx=new AC();master=ctx.createGain();musicGain=ctx.createGain();fxGain=ctx.createGain();compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-14;compressor.knee.value=18;compressor.ratio.value=12;compressor.attack.value=.005;compressor.release.value=.18;
      const dry=ctx.createGain();dry.gain.value=.84;musicGain.connect(dry);dry.connect(compressor);fxGain.connect(compressor);
      // Short stereo echoes add space while keeping the song clear and the download small.
      const delay=ctx.createDelay(1),feedback=ctx.createGain(),wet=ctx.createGain(),lowpass=ctx.createBiquadFilter();delay.delayTime.value=.23;feedback.gain.value=.18;wet.gain.value=.15;lowpass.type='lowpass';lowpass.frequency.value=4300;musicGain.connect(delay);delay.connect(lowpass);lowpass.connect(wet);wet.connect(compressor);lowpass.connect(feedback);feedback.connect(delay);
      const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-1;limiter.knee.value=0;limiter.ratio.value=20;limiter.attack.value=.001;limiter.release.value=.1;compressor.connect(master);master.connect(limiter);limiter.connect(ctx.destination);
      for(const role of Object.keys(baseFrequency))buffers[role]=makeSample(role);for(let i=0;i<3;i++)buffers['drum'+i]=drum(i);
      applySettings(settings);await ctx.resume();enabled=true;return true;
    }catch(e){console.warn('Sound unavailable',e.message);return false;}
  }
  function applySettings(s){settings={...settings,...s};if(!ctx)return;master.gain.setTargetAtTime(Math.max(0,settings.master)/100,ctx.currentTime,.03);musicGain.gain.setTargetAtTime(Math.max(0,settings.music)/100*.54,ctx.currentTime,.03);fxGain.gain.setTargetAtTime(Math.max(0,settings.sfx)/100*.52,ctx.currentTime,.03);}
  function note(role,midi,time,duration=.4,velocity=.7,pan=0,channel='music'){
    if(!ctx||ctx.state!=='running'||active.size>90)return;const buffer=role.startsWith('drum')?buffers[role]:buffers[role]||buffers.keys;if(!buffer)return;
    const src=ctx.createBufferSource(),gain=ctx.createGain();src.buffer=buffer;if(!role.startsWith('drum'))src.playbackRate.value=Math.pow(2,(midi-69)/12)*440/(baseFrequency[role]||261.6256);
    let sourceOut=gain;src.connect(gain);if(ctx.createStereoPanner){const p=ctx.createStereoPanner();p.pan.value=Math.max(-.7,Math.min(.7,pan));gain.connect(p);sourceOut=p;}
    sourceOut.connect(channel==='fx'?fxGain:musicGain);const now=Math.max(ctx.currentTime,time),end=now+Math.max(.07,duration);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(velocity*(role==='pad'?.44:role==='voice'?.55:.52),now+.013);gain.gain.setTargetAtTime(.0001,end,.07);src.start(now);src.stop(end+.4);active.add(src);src.onended=()=>{active.delete(src);src.disconnect();gain.disconnect();if(sourceOut!==gain)sourceOut.disconnect();};
  }
  function scaleNote(degree,island){const sc=island.scale,len=sc.length,oct=Math.floor(degree/len),idx=((degree%len)+len)%len;return island.root+sc[idx]+oct*12;}
  function tick(){
    if(!playing||!enabled||!ctx||ctx.state!=='running'||document.hidden)return;
    if(jamMode)return;
    const band=getBand(),island=band.island,dt=60/island.bpm/2;if(next<ctx.currentTime-.4)next=ctx.currentTime+.06;
    while(next<ctx.currentTime+.18){
      const unique=new Map();for(const m of band.monsters){if(!m.muted&&m.volume!==0&&!unique.has(m.species))unique.set(m.species,m);}
      const group=[...unique.values()].slice(0,24);
      group.forEach((m,i)=>{const s=CI.byId[m.species],p=phraseCache.get(s.id)||(()=>{const p=CI.phrases(s);phraseCache.set(s.id,p);return p;})(),pi=m.phrase>=0?m.phrase:(phrase+s.index)%8,events=p[pi];for(const n of events)if(n.step===step){let vol=(m.volume??100)/100;const pan=(i/(Math.max(1,group.length-1))-.5)*.9;const role=s.role==='drum'?'drum'+n.degree:s.role;note(role,scaleNote(n.degree,island),next,Math.min(2.5,n.dur*dt),n.velocity*vol/Math.max(1,Math.sqrt(group.length/7)),pan);recent.set(m.species,performance.now()+120);if(s.role==='pad')note(role,scaleNote(n.degree+2,island),next+.01,n.dur*dt,n.velocity*vol*.4,pan);}});
      next+=dt;step++;if(step===32){step=0;phrase=(phrase+1)%8;}
    }
  }
  function setBand(fn){getBand=fn;}
  function start(){if(!ctx)return;playing=true;next=ctx.currentTime+.06;if(!timer)timer=setInterval(tick,40);}
  function stop(){playing=false;enabled=false;if(timer){clearInterval(timer);timer=null;}for(const src of active){try{src.stop();}catch{}}active.clear();}
  function reset(){step=0;phrase=0;if(ctx)next=ctx.currentTime+.1;recent.clear();}
  function effect(kind='tap'){
    if(!ctx||!enabled)return;const t=ctx.currentTime;
    const seq=kind==='reward'?[60,64,67,72,79]:kind==='hatch'?[60,67,72,76]:kind==='error'?[48,46]:kind==='collect'?[72,76,79]:kind==='feed'?[65,69,72]:[76];seq.forEach((n,i)=>note(kind==='tap'?'plucked':'bell',n,t+i*.065,.12,.6,0,'fx'));
  }
  function singing(id){const age=performance.now()-(recent.get(id)||-5000);return Math.max(0,1-age/330);}
  function cue(lane,accent=false){if(!ctx||!enabled)return;const band=getBand(),degree=[0,2,4][lane]+(accent?5:0);note(accent?'bell':'plucked',scaleNote(degree,band.island),ctx.currentTime,.2,accent?.75:.2,(lane-1)*.3);}
  function setJam(v){jamMode=v;if(!v)reset();}
  function jamBeat(index){if(!ctx||!enabled)return;const island=getBand().island,t=ctx.currentTime;if(index%4===0)note('drum0',0,t,.2,.55);if(index%8===4)note('drum1',0,t,.14,.3);if(index%2===0)note('drum2',0,t,.07,.2);if(index%8===0)note('bass',island.root-12+(index%32===24?7:0),t,.4,.55);if(index%16===0){note('pad',island.root+12,t,1.7,.26,-.3);note('pad',island.root+19,t,1.7,.22,.3);}}
  function stats(){return {enabled,playing,state:ctx?.state||'closed',sources:active.size,phrase:phrase+1};}
  document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden){ctx.suspend().catch(()=>{});}else if(enabled){ctx.resume().then(()=>{next=ctx.currentTime+.1;}).catch(()=>{});}});
  return {init,applySettings,start,stop,reset,effect,setBand,singing,cue,setJam,jamBeat,stats};
})();
