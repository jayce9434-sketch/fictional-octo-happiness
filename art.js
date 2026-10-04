'use strict';
window.Art=(()=>{
  const TAU=Math.PI*2,cache=new Map();
  const rng=seed=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const ellipse=(c,x,y,rx,ry,color,stroke)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}};
  const line=(c,points,color,width=3)=>{c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();};
  const poly=(c,points,color,stroke)=>{c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}};
  const round=(c,x,y,w,h,r,color,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}};
  function creature(c,s,x,y,scale=1,t=0,singing=0,rarity='common',skin='natural',selected=false){
    c.save();c.translate(x,y);c.scale(scale,scale);
    let col=s.color,dark=s.dark;
    if(skin==='moon'){col='#acb5df';dark='#646994';}else if(skin==='gold'){col='#ead198';dark='#ac8a54';}else if(skin==='frost'){col='#d5eeef';dark='#81afbb';}else if(skin==='hollow'){col='#c7accf';dark='#796781';}else if(skin==='autumn'){col='#d4a57f';dark='#9c6a59';}
    ellipse(c,0,-2,31,9,'#15263c25');
    if(selected){ellipse(c,0,-2,39,13,'#daffe341');c.strokeStyle='#dcffe5';c.lineWidth=2;c.stroke();}
    const bob=Math.sin(t*2.4+s.index)*2+Math.sin(t*5)*singing*2; c.translate(0,-bob);
    const body=c.createLinearGradient(-20,-95,28,-10);body.addColorStop(0,col);body.addColorStop(1,dark);
    const outline=dark;let eyeY=-49,eyeSep=12,faceY=-40;
    ellipse(c,-17,-5,13,6,dark);ellipse(c,17,-5,13,6,dark);
    // The body shapes are drawn as separate silhouettes, with their own instruments.
    if(s.shape==='tree'){
      line(c,[[-17,-45],[-40,-67],[-44,-93]],dark,9);line(c,[[17,-45],[40,-68],[44,-92]],dark,9);
      for(let i=-1;i<=1;i+=2){ellipse(c,i*42,-92,18,13,col);ellipse(c,i*32,-75,15,11,col);line(c,[[i*38,-66],[i*53,-80]],dark,6);}
      round(c,-28,-91,56,82,20,body,outline);line(c,[[-19,-78],[-22,-30]],'#fff4d51d',3);line(c,[[22,-71],[19,-20]],'#121c351c',3);
      ellipse(c,0,-92,34,16,col);for(let i=0;i<6;i++)ellipse(c,-27+i*11,-94-Math.sin(i)*7,12,8,col);
      eyeY=-58;faceY=-45;
      if(s.role==='strings'){line(c,[[-44,-27],[38,-64]],'#edd6b1',4);line(c,[[-15,-79],[-11,-26]],'#eedda7',1);line(c,[[0,-80],[2,-26]],'#eedda7',1);line(c,[[12,-78],[16,-27]],'#eedda7',1);}
    }else if(s.shape==='rock'){
      poly(c,[[-34,-20],[-39,-55],[-22,-87],[11,-95],[37,-68],[35,-26],[17,-9],[-12,-9]],body,outline);
      poly(c,[[-39,-55],[-22,-87],[0,-68],[-11,-25]],'#ffffff16');line(c,[[12,-94],[7,-77],[15,-72]],'#17263c25',3);
      if(s.role==='drum'){ellipse(c,0,-21,25,12,'#d4c3a5',dark);ellipse(c,0,-24,23,9,'#ead7b7');line(c,[[-27,-38],[-38,-57]],'#e8d5b0',4);line(c,[[27,-38],[38,-57]],'#e8d5b0',4);}
      eyeY=-60;faceY=-45;
    }else if(s.shape==='bird'||s.shape==='owl'){
      poly(c,[[-25,-68],[-50,-34],[-35,-18],[-16,-25]],body,outline);poly(c,[[25,-68],[50,-34],[35,-18],[16,-25]],body,outline);
      ellipse(c,0,-45,32,43,body,outline);poly(c,[[-26,-71],[-32,-97],[-9,-84]],col,dark);poly(c,[[26,-71],[32,-97],[9,-84]],col,dark);
      ellipse(c,-14,-56,17,21,'#fff5dfaa');ellipse(c,14,-56,17,21,'#fff5dfaa');eyeY=-57;eyeSep=14;faceY=-34;
      if(s.shape==='bird'){poly(c,[[-6,-42],[6,-42],[0,-32]],'#e9be7d',dark);line(c,[[-30,-36],[-44,-54]],'#eddfb2',5);}
      else{round(c,-24,-23,48,14,5,'#dfebe7',dark);for(let i=0;i<5;i++)round(c,-19+i*8,-22,5,8,1,i%2?'#687284':'#f4f5e7');}
    }else if(s.shape==='bloom'){
      for(let i=0;i<7;i++){const a=i/7*TAU+Math.sin(t*.5)*.05;ellipse(c,Math.cos(a)*33,-54+Math.sin(a)*30,18,24,body,outline);}
      ellipse(c,0,-50,29,31,'#eedbc1',dark);ellipse(c,-20,-7,13,7,col);ellipse(c,20,-7,13,7,col);eyeY=-56;faceY=-40;
      line(c,[[0,-22],[0,-8]],dark,10);line(c,[[-10,-10],[-26,-17]],dark,6);line(c,[[10,-10],[26,-17]],dark,6);
      if(s.id==='bloomtide'){ellipse(c,-39,-30,8,8,'#eddbc9');ellipse(c,39,-30,8,8,'#eddbc9');}
    }else if(s.shape==='snail'){
      ellipse(c,16,-43,39,38,body,outline);c.beginPath();for(let i=0;i<100;i++){let a=i*.16,r=i*.28;c.lineTo(18+Math.cos(a)*r,-45+Math.sin(a)*r);}c.strokeStyle='#e4edbb88';c.lineWidth=3;c.stroke();
      ellipse(c,-6,-9,47,13,col,outline);ellipse(c,-30,-37,18,29,body,outline);line(c,[[-39,-59],[-45,-78]],dark,4);line(c,[[-23,-62],[-15,-82]],dark,4);ellipse(c,-45,-81,5,5,col);ellipse(c,-15,-85,5,5,col);
      eyeSep=7;eyeY=-42;faceY=-28;c.translate(-29,0);
    }else if(s.shape==='manta'){
      poly(c,[[-10,-75],[-62,-54],[-55,-20],[-19,-33],[0,-13],[19,-33],[55,-20],[62,-54],[10,-75]],body,outline);
      ellipse(c,0,-49,24,32,col);line(c,[[0,-19],[12,3],[25,10]],dark,5);eyeY=-53;faceY=-38;
      for(let i=-1;i<=1;i+=2){line(c,[[i*35,-44],[i*44,-25]],'#f4ecd6',2);ellipse(c,i*44,-21,6,8,'#f1db9e',dark);}
    }else if(s.shape==='octo'){
      for(let i=0;i<8;i++){const xx=-37+i*10.6;line(c,[[xx*.7,-28],[xx,-5-Math.sin(i+t)*3],[xx+(i%2?5:-5),2]],dark,10);line(c,[[xx*.7,-26],[xx,-7],[xx+(i%2?5:-5),1]],col,6);}
      ellipse(c,0,-53,37,42,body,outline);eyeY=-54;faceY=-40;
      if(s.role==='plucked'){round(c,-27,-29,54,12,5,'#dcbf8a',dark);for(let i=0;i<8;i++)line(c,[[-22+i*6,-31],[-22+i*6,-17]],'#fcf1c2',1);}
    }else if(s.shape==='dragon'||s.shape==='lizard'){
      if(s.shape==='dragon'){poly(c,[[-22,-59],[-62,-92],[-51,-46],[-42,-37],[-26,-32]],body,outline);poly(c,[[22,-59],[62,-92],[51,-46],[42,-37],[26,-32]],body,outline);line(c,[[-28,-54],[-54,-80]],'#ffdfa760',2);line(c,[[28,-54],[54,-80]],'#ffdfa760',2);}
      line(c,[[24,-16],[44,-8],[59,-24],[65,-32]],dark,11);poly(c,[[58,-31],[67,-48],[72,-28]],col,outline);
      ellipse(c,0,-37,29,33,body,outline);ellipse(c,0,-74,33,24,body,outline);poly(c,[[-26,-87],[-32,-106],[-15,-92]],'#eed6a2',dark);poly(c,[[26,-87],[32,-106],[15,-92]],'#eed6a2',dark);ellipse(c,0,-62,22,12,'#eed1a999');eyeY=-79;faceY=-61;
      ellipse(c,0,-28,17,21,'#f2d4a840');line(c,[[-28,-40],[-42,-27]],dark,7);line(c,[[28,-40],[43,-27]],dark,7);
    }else if(s.shape==='jelly'){
      for(let i=0;i<6;i++)line(c,[[-25+i*10,-30],[-26+i*10+Math.sin(t+i)*6,-15],[-22+i*9,-1]],col,5);
      ellipse(c,0,-58,40,37,body,outline);ellipse(c,-10,-68,19,13,'#fff9ff22');ellipse(c,0,-36,35,12,col,outline);
      for(let i=0;i<5;i++)ellipse(c,-22+i*11,-38,7,8,col);eyeY=-58;faceY=-43;
      for(let i=0;i<3;i++)ellipse(c,-15+i*15,-88-Math.sin(i)*8,3,3,'#f5eaff');
    }else if(s.shape==='bat'||s.shape==='moth'){
      for(let sign of [-1,1]){poly(c,[[sign*16,-67],[sign*65,-83],[sign*59,-43],[sign*45,-19],[sign*30,-31],[sign*17,-22]],body,outline);ellipse(c,sign*43,-54,10,15,'#fff2ce40');line(c,[[sign*21,-58],[sign*54,-70]],dark,2);}
      ellipse(c,0,-45,23,42,body,outline);if(s.shape==='bat'){poly(c,[[-16,-75],[-21,-99],[-5,-82]],col,dark);poly(c,[[16,-75],[21,-99],[5,-82]],col,dark);}else{line(c,[[-8,-80],[-19,-100]],dark,3);line(c,[[8,-80],[19,-100]],dark,3);ellipse(c,-20,-102,4,4,col);ellipse(c,20,-102,4,4,col);}eyeY=-56;faceY=-41;
    }else if(s.shape==='ghost'){
      c.translate(0,Math.sin(t*2+s.index)*4-8);c.beginPath();c.moveTo(-33,-8);c.bezierCurveTo(-45,-107,45,-107,33,-8);c.quadraticCurveTo(23,-17,17,-6);c.quadraticCurveTo(4,-18,-5,-5);c.quadraticCurveTo(-18,-17,-33,-8);c.fillStyle=body;c.fill();c.strokeStyle=outline;c.lineWidth=2;c.stroke();line(c,[[-25,-42],[-41,-30]],col,7);line(c,[[25,-42],[41,-30]],col,7);eyeY=-54;faceY=-39;ellipse(c,-13,-69,12,5,'#ffffff15');
    }else if(s.shape==='beetle'){
      for(let sign of [-1,1]){line(c,[[sign*24,-50],[sign*41,-35],[sign*44,-18]],dark,5);line(c,[[sign*23,-32],[sign*37,-16],[sign*40,-1]],dark,5);line(c,[[sign*8,-78],[sign*22,-100]],dark,3);ellipse(c,sign*23,-104,6,5,col);}
      ellipse(c,0,-39,34,34,body,outline);line(c,[[0,-62],[0,-7]],dark,3);ellipse(c,0,-67,26,23,col,dark);eyeY=-68;faceY=-52;for(let sign of [-1,1])for(let i=0;i<3;i++)ellipse(c,sign*(13+i%2*7),-40+i*11,4,4,'#f7e6aa75');
    }else if(s.shape==='giant'){
      line(c,[[-29,-60],[-53,-25]],dark,16);line(c,[[29,-60],[53,-25]],dark,16);ellipse(c,-53,-25,10,9,col);ellipse(c,53,-25,10,9,col);
      ellipse(c,0,-45,43,47,body,outline);ellipse(c,0,-67,35,29,col,dark);
      for(let sign of [-1,1]){poly(c,[[sign*19,-84],[sign*22,-116],[sign*33,-95],[sign*31,-79]],'#e4d4ae',dark);ellipse(c,sign*27,-112,6,6,s.id==='astral'?'#f5d5fb':'#cddfa5');}
      ellipse(c,0,-30,27,26,'#f5e5bb22');eyeY=-65;eyeSep=15;faceY=-48;
      for(let i=0;i<3;i++)ellipse(c,-19+i*19,-94+i%2*5,9,7,col);
      if(s.id==='astral'){c.save();c.shadowColor='#ecd4ff';c.shadowBlur=12;poly(c,[[0,-105],[9,-93],[0,-81],[-9,-93]],'#eddfff');c.restore();}
    }else if(s.shape==='pumpkin'){
      ellipse(c,0,-47,41,38,body,outline);for(let i=-1;i<=1;i++){c.beginPath();c.ellipse(i*14,-47,17,35,0,-1.2,1.2);c.strokeStyle='#a6654b55';c.lineWidth=2;c.stroke();}
      line(c,[[0,-82],[4,-98],[13,-101]],'#738b66',9);ellipse(c,13,-95,14,7,'#94a978');eyeY=-53;faceY=-36;
    }else if(s.shape==='acorn'){
      ellipse(c,0,-45,32,40,body,outline);ellipse(c,0,-75,37,15,dark);round(c,-34,-84,68,17,9,dark);line(c,[[0,-83],[3,-99]],dark,7);eyeY=-52;faceY=-36;for(let i=0;i<6;i++)line(c,[[-30+i*11,-83],[-23+i*11,-74]],'#e6d3aa50',1);
    }else if(s.shape==='fox'){
      line(c,[[23,-21],[53,-19],[58,-39]],col,23);ellipse(c,56,-42,12,15,'#f9dfb7');ellipse(c,0,-36,28,31,body,outline);ellipse(c,0,-70,32,27,body,outline);poly(c,[[-26,-79],[-32,-108],[-6,-87]],col,dark);poly(c,[[26,-79],[32,-108],[6,-87]],col,dark);poly(c,[[-26,-64],[0,-38],[26,-64],[0,-53]],'#f7ddb6');eyeY=-74;faceY=-58;eyeSep=13;
      line(c,[[-29,-39],[-43,-27],[29,-50]],'#f3d6af',4);
    }else{
      // Pluff, Flurry, Maplemaw, and Dewdrop have different ears and body textures.
      if(s.shape==='frog'){ellipse(c,-27,-68,15,16,col,dark);ellipse(c,27,-68,15,16,col,dark);ellipse(c,0,-41,38,37,body,outline);eyeY=-67;eyeSep=25;faceY=-40;ellipse(c,0,-27,25,16,'#e2eed25c');}
      else{for(let i=0;i<11;i++){let a=i/11*TAU;poly(c,[[Math.cos(a)*26,-46+Math.sin(a)*33],[Math.cos(a)*43,-46+Math.sin(a)*47],[Math.cos(a+.35)*29,-46+Math.sin(a+.35)*34]],col,dark);}
        ellipse(c,0,-45,35,40,body,outline);ellipse(c,-26,-78,13,21,col,dark);ellipse(c,26,-78,13,21,col,dark);ellipse(c,-26,-79,6,12,'#ead1b077');ellipse(c,26,-79,6,12,'#ead1b077');eyeY=-55;faceY=-35;}
      if(s.id==='maple'){for(let i=0;i<5;i++)poly(c,[[-30+i*15,-69],[-32+i*15,-90],[-24+i*15,-77],[-16+i*15,-91],[-15+i*15,-70]],'#e5ba78',dark);}
    }
    const blink=Math.sin(t*.68+s.index)>0.996;
    for(const sign of [-1,1]){if(blink)line(c,[[sign*eyeSep-5,eyeY],[sign*eyeSep+5,eyeY]],'#203843',3);else{ellipse(c,sign*eyeSep,eyeY,7,9,'#fff9e8');ellipse(c,sign*eyeSep+1,eyeY+1,3.7,5,'#293d48');ellipse(c,sign*eyeSep+2.1,eyeY-1.5,1.2,1.7,'#ffffff');}ellipse(c,sign*(eyeSep+7),faceY+1,5,3,'#d384833f');}
    if(singing>.1){ellipse(c,0,faceY+3,7+singing*2,5+singing*7,'#344453');ellipse(c,0,faceY+7,4,2,'#d5a0a0');}else{c.beginPath();c.arc(0,faceY-1,7,.15,Math.PI-.15);c.strokeStyle='#304047';c.lineWidth=2.5;c.stroke();}
    if(rarity!=='common'){c.save();c.strokeStyle=rarity==='epic'?'#ffde83':'#d1b5ff';c.fillStyle=c.strokeStyle;c.shadowColor=c.strokeStyle;c.shadowBlur=8;for(let i=0;i<3;i++){let xx=-38+i*38,yy=-104-Math.sin(t+i)*6;poly(c,[[xx,yy-5],[xx+3,yy],[xx,yy+5],[xx-3,yy]],c.fillStyle);}c.restore();}
    c.restore();
  }
  function sprite(id,rarity='common',skin='natural'){
    const key=id+rarity+skin;if(cache.has(key))return cache.get(key);
    const s=CI.byId[id];if(!s)return'';const a=document.createElement('canvas');a.width=240;a.height=220;creature(a.getContext('2d'),s,120,194,1.53,1,0,rarity,skin);const url=a.toDataURL();cache.set(key,url);return url;
  }
  function plant(c,x,y,scale,col,seed=0){c.save();c.translate(x,y);c.scale(scale,scale);ellipse(c,0,0,20,6,'#233c3d16');line(c,[[0,0],[0,-37]],'#577662',4);for(let i=0;i<5;i++){const sign=i%2?1:-1;ellipse(c,sign*12,-10-i*6,14,6,col);}c.restore();}
  function tree(c,x,y,scale,col,seed=0){c.save();c.translate(x,y);c.scale(scale,scale);ellipse(c,0,0,40,11,'#233c3d20');line(c,[[0,0],[0,-80]],'#6d7462',12);line(c,[[0,-39],[-22,-66]],'#6d7462',7);ellipse(c,0,-84,39,44,col);ellipse(c,-23,-68,29,30,col);ellipse(c,25,-70,30,34,col);ellipse(c,-7,-99,23,22,'#ffffff0c');for(let i=0;i<8;i++)ellipse(c,Math.sin(i*12.3)*30,-78+Math.cos(i*4)*24,5,3,'#ffffff0e');c.restore();}
  function decor(c,id,x,y,col='#b3d6a0'){
    c.save();c.translate(x,y);ellipse(c,0,0,24,7,'#1c343b1c');
    if(id==='flower'){for(let i=0;i<6;i++){let xx=Math.sin(i*2)*18,yy=Math.cos(i*2)*5;line(c,[[xx,yy],[xx,yy-19]],'#649572',2);for(let j=0;j<5;j++)ellipse(c,xx+Math.cos(j*1.26)*5,yy-20+Math.sin(j*1.26)*5,4,4,col);ellipse(c,xx,yy-20,3,3,'#e8c78f');}}
    else if(id==='lamp'){line(c,[[0,0],[0,-58]],'#746c69',4);round(c,-14,-59,28,25,5,'#ecd591','#85725e');poly(c,[[-19,-59],[0,-71],[19,-59]],'#74777b');c.save();c.globalAlpha=.1;ellipse(c,0,-48,42,40,'#ffe2a3');c.restore();}
    else if(id==='mushroom'){for(let i=0;i<3;i++){let xx=-20+i*19,yy=i%2*8;round(c,xx-3,yy-24,6,24,3,'#efe0bf');ellipse(c,xx,yy-26,16,9,col,'#907581');ellipse(c,xx-4,yy-28,3,2,'#efeadc');}}
    else if(id==='crystal'||id==='obelisk'){let k=id==='obelisk'?2:1;poly(c,[[-13*k,0],[-16*k,-42*k],[0,-65*k],[16*k,-42*k],[13*k,0]],col,'#78919e');poly(c,[[0,0],[0,-65*k],[16*k,-42*k],[13*k,0]],'#ffffff36');}
    else if(id==='fountain'){ellipse(c,0,-2,36,16,'#b3c3be','#718d92');ellipse(c,0,-5,30,10,'#99d4d9');round(c,-6,-43,12,34,4,'#c7d6cf');ellipse(c,0,-45,20,9,'#c9dfd4');ellipse(c,0,-49,14,5,'#9cd4de');line(c,[[0,-48],[0,-73]],'#caeff1',4);for(let i=-1;i<=1;i+=2)line(c,[[0,-68],[i*17,-56],[i*22,-35]],'#bce7e1',2);}
    else if(id==='arch'){line(c,[[-30,0],[-32,-47],[-20,-75],[0,-85],[20,-75],[32,-47],[30,0]],'#807c67',9);for(let i=0;i<9;i++)ellipse(c,Math.cos(i/8*Math.PI)*31,-47-Math.sin(i/8*Math.PI)*35,10,7,col);}
    else if(id==='statue'){round(c,-22,-12,44,12,4,'#8b98a3');poly(c,[[-14,-14],[-11,-51],[0,-76],[11,-51],[14,-14]],col,'#8a8a9d');ellipse(c,0,-65,14,16,col);line(c,[[12,-46],[30,-69]],col,7);}
    else if(id==='pond'){ellipse(c,0,-2,39,20,'#7a9897');ellipse(c,0,-5,34,15,'#94cacc');for(let i=0;i<4;i++){ellipse(c,Math.sin(i*4)*24,-6+Math.cos(i*4)*9,7,3,'#a6c78a');}}
    else if(id==='maple'){tree(c,0,0,1,col);}
    else if(id==='pumpkin'){ellipse(c,0,-14,22,18,col,'#ba8a60');poly(c,[[-12,-16],[-6,-20],[-4,-12]],'#674e52');poly(c,[[12,-16],[6,-20],[4,-12]],'#674e52');line(c,[[-7,-7],[0,-4],[7,-7]],'#674e52',3);line(c,[[0,-30],[3,-39]],'#77866b',5);}
    else if(id==='stage'){ellipse(c,0,-7,50,20,'#a89b82');for(let i=0;i<4;i++)line(c,[[-40,-14+i*5],[40,-14+i*5]],'#d6bf90',2);round(c,-4,-44,8,35,3,'#90827e');ellipse(c,0,-47,7,8,'#c5d0c8');}
    c.restore();
  }
  const structures=[{id:'castle',name:'Harmony Hall',x:600,y:223},{id:'breed',name:'Breeding grove',x:307,y:372},{id:'nursery',name:'Nursery',x:886,y:357},{id:'bakery',name:'Bakery',x:385,y:507},{id:'mine',name:'Gem mine',x:831,y:509},{id:'expeditions',name:'Sky dock',x:1037,y:411}];
  function building(c,b,theme,t,ready=false){
    c.save();c.translate(b.x,b.y);ellipse(c,0,1,b.id==='castle'?87:58,20,'#243e4329');
    if(b.id==='castle'){
      poly(c,[[-83,-13],[-74,-48],[75,-48],[84,-13]],'#9c9f84','#6b7d72');round(c,-65,-103,130,79,10,'#d8d1af','#789184');
      for(let i=-1;i<=1;i+=2){round(c,i*60-17,-115,34,91,5,'#b4c2aa','#748b80');poly(c,[[i*60-24,-115],[i*60,-144],[i*60+24,-115]],'#668e82','#4c716c');}
      poly(c,[[-68,-103],[0,-152],[68,-103]],'#738f7a','#516d69');line(c,[[-58,-103],[0,-144],[58,-103]],'#b9cf9b',3);
      round(c,-21,-74,42,49,19,'#718874');round(c,-16,-69,32,41,15,'#e6db9c');line(c,[[0,-64],[0,-28]],'#a89874',2);
      for(let xx of [-43,43]){round(c,xx-8,-84,16,24,7,'#647e80');round(c,xx-5,-81,10,18,5,'#e7d993');}
      ellipse(c,0,-121,12,12,'#e7dcae','#597b72');line(c,[[-4,-122],[0,-116],[5,-126]],'#719775',2);
      round(c,-42,-17,84,8,2,'#bdc3a3');round(c,-48,-9,96,8,2,'#b5bea0');
    }else if(b.id==='breed'){
      ellipse(c,0,-10,54,18,'#8cab86','#5e8b70');for(let sign of [-1,1]){line(c,[[sign*36,-13],[sign*42,-59],[sign*22,-87],[0,-96]],'#8e9476',9);for(let i=0;i<4;i++)ellipse(c,sign*(36-i*9),-55-i*13,16,9,theme.grass[0]);}
      ellipse(c,0,-22,27,14,'#a5b998');ellipse(c,-13,-37,13,20,'#e1d9b1','#b1a486');ellipse(c,13,-33,10,15,'#c6d7bc','#9caa87');for(let i=0;i<4;i++)ellipse(c,Math.sin(t+i*2)*35,-80+Math.cos(t+i*2)*8,2,2,'#eff2b3');
    }else if(b.id==='nursery'){
      round(c,-49,-69,98,60,10,'#c2c0a4','#7a9187');poly(c,[[-58,-69],[0,-110],[58,-69]],'#89aaa0','#64897e');line(c,[[-47,-70],[0,-104],[47,-70]],'#c1d3a3',3);
      round(c,-31,-45,62,30,10,'#718e82');ellipse(c,0,-38,15,23,'#e8dfba','#acaa88');poly(c,[[-7,-43],[0,-36],[7,-44]],'#b3cbbb');for(let xx of [-39,39])round(c,xx-6,-54,12,17,5,'#e6da9c');
    }else if(b.id==='bakery'){
      round(c,-45,-59,90,53,8,'#d3bfa0','#967f71');poly(c,[[-51,-59],[0,-93],[51,-59]],'#a98574','#876b65');round(c,23,-101,13,33,3,'#a58f7e');
      round(c,-23,-41,46,29,12,'#806d6a');ellipse(c,0,-24,16,7,'#e6c696');for(let xx of [-31,31])round(c,xx-7,-40,14,16,4,'#e9dca2');
      for(let i=0;i<3;i++)ellipse(c,30+Math.sin(t+i)*4,-109-i*12-(t*8%12),5+i*2,7+i*3,'#f0e6d325');
    }else if(b.id==='mine'){
      poly(c,[[-51,-7],[-53,-43],[-35,-64],[-5,-74],[33,-63],[54,-24],[43,-7]],'#8e9b9e','#6f7e85');round(c,-23,-47,46,41,20,'#556c78');
      line(c,[[-30,-10],[-30,-49],[0,-62],[30,-49],[30,-10]],'#b7ac8d',6);poly(c,[[-7,-18],[-12,-33],[0,-48],[12,-33],[7,-18]],'#c4b0e5','#9585b2');line(c,[[-34,-1],[34,-1]],'#c1bba0',4);line(c,[[-34,5],[34,5]],'#c1bba0',4);
    }else{
      poly(c,[[-33,-9],[-32,-33],[42,-17],[53,3]],'#c2b49b','#8c887d');for(let i=0;i<5;i++)line(c,[[-25+i*15,-22],[-18+i*15,0]],'#928f7e',2);
      ellipse(c,8,-81,37,42,'#ead1a1','#b29a7c');line(c,[[-16,-49],[-8,-24]],'#b8aa88',2);line(c,[[30,-50],[21,-20]],'#b8aa88',2);round(c,-9,-28,34,18,6,'#9e8c73');line(c,[[8,-119],[8,-43]],'#b79c7e',2);ellipse(c,-5,-95,14,20,'#fff5da24');
    }
    if(ready){c.save();c.shadowColor='#c4ffc8';c.shadowBlur=14;ellipse(c,0,-118-(b.id==='castle'?55:0),13,13,'#c3f5c8');line(c,[[-5,-119-(b.id==='castle'?55:0)],[-1,-115-(b.id==='castle'?55:0)],[6,-123-(b.id==='castle'?55:0)]],'#4c8667',2.5);c.restore();}
    c.restore();
  }
  function ground(c,theme,t,width=1200,height=750){
    const random=rng(4100+theme.id*89);let cx=600,cy=388;
    const rock=c.createLinearGradient(0,380,0,670);rock.addColorStop(0,theme.rock);rock.addColorStop(1,'#354859');
    c.beginPath();c.moveTo(120,386);c.bezierCurveTo(180,625,490,672,600,696);c.bezierCurveTo(780,652,1030,588,1080,386);c.closePath();c.fillStyle=rock;c.fill();
    for(let i=0;i<26;i++){const xx=150+i*36;poly(c,[[xx,400],[xx+25,418],[xx+9,620-Math.abs(xx-600)*.12],[xx-10,565-Math.abs(xx-600)*.11]],i%2?'#ffffff09':'#18263a10');}
    ellipse(c,cx,cy+13,480,208,'#c9d1a075');ellipse(c,cx,cy+5,480,204,'#688d78');
    const gr=c.createLinearGradient(200,190,900,590);gr.addColorStop(0,theme.grass[0]);gr.addColorStop(1,theme.grass[1]);ellipse(c,cx,cy,480,197,gr);
    ellipse(c,cx,cy-8,455,177,'#ffffff05');
    for(let i=0;i<190;i++){let a=random()*TAU,r=Math.sqrt(random()),xx=cx+Math.cos(a)*r*460,yy=cy+Math.sin(a)*r*185;ellipse(c,xx,yy,1.5+random()*5,.7+random()*2,'#e9f0be'+(i%3===0?'18':'0c'));}
    // Soft stepping-stone paths connect the buildings without covering the choir.
    for(let i=0;i<16;i++){const a=i/15;ellipse(c,380+a*400,425+Math.sin(a*Math.PI*2)*15,16,6,'#dcdbba30');}for(let i=0;i<7;i++)ellipse(c,600+i*3,265+i*19,11,5,'#dcdbba28');
    const plants=[ [197,363,.8],[247,308,1.1],[347,260,.85],[829,263,.95],[981,318,.8],[1000,490,.65],[235,470,.7],[471,228,.7],[722,214,.7]];
    for(let [x,y,z]of plants){if(theme.id===3){decor(c,'crystal',x,y,'#d6b4ac');}else tree(c,x,y,z,theme.id===1?'#c4dce0':theme.id===4?'#a1a2cc':theme.id===5?'#608884':theme.id===6?'#c8b8d5':theme.grass[0]);}
    for(let i=0;i<32;i++){const a=random()*TAU;const xx=cx+Math.cos(a)*(430+random()*27),yy=cy+Math.sin(a)*(173+random()*13);plant(c,xx,yy,.4+random()*.35,theme.accent);}
    // Water pocket and little rivers on the tidal island.
    ellipse(c,233,412,47,24,'#5caaa68e');ellipse(c,233,409,38,17,theme.id===1?'#daece9':'#acdddd88');
    if(theme.id===2){line(c,[[260,450],[310,455],[320,490],[300,531]],'#9bdcdb',17);line(c,[[260,450],[310,455],[320,490],[300,531]],'#d0f3e65c',5);}
    if(theme.id===3){line(c,[[520,594],[545,624],[557,660]],'#dd8c5c',7);line(c,[[520,594],[545,624],[557,660]],'#fbc17b',2);}
    for(let i=0;i<4;i++)plant(c,453+i*84,592-Math.abs(i-1.5)*6,.6,theme.accent);
  }
  function sky(c,theme,w,h,t){
    const bg=c.createLinearGradient(0,0,0,h);bg.addColorStop(0,theme.sky[0]);bg.addColorStop(1,theme.sky[1]);c.fillStyle=bg;c.fillRect(0,0,w,h);
    ellipse(c,w*.72,h*.18,61,61,'#f8f4d51a');ellipse(c,w*.72,h*.18,42,42,'#fff5df17');
    const clouds=[[-.07,.4,.65],[.22,.15,.6],[.48,.82,.85],[.85,.34,.65],[1.06,.77,.9]];
    for(let i=0;i<clouds.length;i++){const[x,y,z]=clouds[i],xx=(x*w+t*(i%2?1:-1)*1.3+w*2)%(w*1.45)-w*.18,yy=y*h;c.save();c.translate(xx,yy);c.scale(z,z);for(let j=0;j<5;j++)ellipse(c,j*42,Math.sin(j*2)*10,64,24,'#fffbe321');c.restore();}
    if(theme.id>=4){for(let i=0;i<25;i++){let xx=((i*163.7)%w),yy=(i*87.7)%(h*.55);ellipse(c,xx,yy,1+Math.sin(t+i)*.4,1+Math.sin(t+i)*.4,'#fff7ea55');}}
  }
  function thumbnail(id){const key='island'+id;if(cache.has(key))return cache.get(key);const a=document.createElement('canvas');a.width=500;a.height=300;let c=a.getContext('2d'),theme=CI.islands[id];sky(c,theme,500,300,0);c.save();c.translate(-30,-32);c.scale(.47,.47);ground(c,theme,0);for(let b of structures)building(c,b,theme,0);creature(c,CI.byId[theme.gift],610,415,.9);c.restore();let url=a.toDataURL();cache.set(key,url);return url;}
  return {creature,sprite,ground,sky,building,structures,decor,thumbnail,rng,ellipse,line,poly,round};
})();
