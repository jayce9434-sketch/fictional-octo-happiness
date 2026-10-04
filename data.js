'use strict';
window.CI = (() => {
  const icons = {
    chorus:'<path d="M4 16V9m5 12V5m5 14V3m5 18V7m4 9v-5"/><path d="M2 19q12 8 24 0"/>',
    coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 8H11a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9.5M12 6v12"/>',
    gem:'<path d="m3 8 4-5h10l4 5-9 13Z"/><path d="M3 8h18M7 3l5 18 5-18M8 8l4-5 4 5"/>',
    food:'<path d="M12 8c-9-6-12 11-3 13h6c9-2 6-19-3-13Z"/><path d="M12 8V3m0 3c0-4 5-4 7-3-1 4-4 4-7 3"/>',
    star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
    settings:'<path d="m9 3-1 3-3 1 1 4-3 2 2 4 4-1 3 5 3-5 4 1 2-4-3-2 1-4-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
    music:'<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',
    focus:'<path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5"/><circle cx="12" cy="12" r="3"/>',
    sliders:'<path d="M4 7h16M4 17h16"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="17" r="2"/>',
    shop:'<path d="m3 9 3-6h12l3 6M4 12v9h16v-9M3 9c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0M9 21v-7h6v7"/>',
    egg:'<path d="M20 14c0 10-16 10-16 0C4 8 9 2 12 2s8 6 8 12Z"/><path d="m8 12 3 3 3-4 3 3"/>',
    island:'<path d="m2 15 10 6 10-6-10-6Z"/><path d="M2 15v4l10 4 10-4v-4M12 9V2m0 0L7 5m5-3 5 3"/>',
    scroll:'<path d="M7 3h13v15H8c-5 0-5 5-1 5h13M7 3a3 3 0 0 0-3 3h6c0-2-1-3-3-3ZM7 6v12M11 8h6m-6 4h6"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    spark:'<path d="m12 2 2 7 7 3-7 2-2 8-3-8-7-2 7-3Z"/>',arrow:'<path d="M3 12h17m-6-6 6 6-6 6"/>',
    leaf:'<path d="M3 20C1 4 11 1 21 3c1 13-5 19-18 17Zm0 0L17 7"/>',
    castle:'<path d="M4 21V9H2V3h4v3h4V3h4v3h4V3h4v6h-2v12ZM9 21v-6a3 3 0 0 1 6 0v6"/>',
    chest:'<path d="M3 11V8c0-7 18-7 18 0v3M3 11h18v10H3Z"/><rect x="10" y="9" width="4" height="6" rx="1"/>',
    torch:'<path d="M9 14h6l-1 8h-4ZM12 1c-1 5-5 5-5 8a5 5 0 0 0 10 0c0-2-1-4-2-5l-1 4c-3-1-1-4-2-7Z"/>',
    compass:'<circle cx="12" cy="12" r="10"/><path d="m16 8-3 5-5 3 3-5Z"/>',
    chat:'<path d="M3 3h18v13H9l-6 5ZM7 7h10M7 11h7"/>',
    book:'<path d="M12 5C9 2 5 2 2 4v16c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v15"/>',
    download:'<path d="M12 2v13m-5-5 5 5 5-5M3 17v4h18v-4"/>',
    upload:'<path d="M12 16V3m-5 5 5-5 5 5M3 17v4h18v-4"/>',
    heart:'<path d="M12 21C-4 10 4-4 12 5c8-9 16 5 0 16Z"/>',
    check:'<path d="m4 12 5 5L20 5"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/>',
    moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',
    trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0Zm0 1H3v3c0 4 4 5 4 5m10-8h4v3c0 4-4 5-4 5M12 15v6m-5 0h10"/>',
    mute:'<path d="M10 5 5 9H2v6h3l5 4ZM16 9l6 6m-6 0 6-6"/>',play:'<path d="m8 4 13 8-13 8Z"/>',pause:'<path d="M8 4v16M16 4v16"/>',
    wind:'<path d="M2 8h14c5 0 5-6 1-6M2 12h19M2 16h12c5 0 5 6 1 6"/>',snow:'<path d="M12 2v20M3 7l18 10M3 17 21 7M9 4l3 3 3-3M9 20l3-3 3 3"/>',
    flame:'<path d="M12 2c1 8-8 8-8 14a8 8 0 0 0 16 0c0-4-2-6-4-8l-1 5c-6-2 0-7-3-11Z"/>',water:'<path d="M12 2C7 9 4 12 4 16a8 8 0 0 0 16 0c0-4-3-7-8-14Z"/>',
    stone:'<path d="m4 8 5-5 9 2 4 10-5 6H6l-4-7Z"/>',time:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 3"/>',
    move:'<path d="M12 2v20M2 12h20M8 6l4-4 4 4M8 18l4 4 4-4M6 8l-4 4 4 4m12-8 4 4-4 4"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9 8c0-4 7-4 6 0 0 2-3 2-3 5m0 4h.01"/>'
  };
  const icon = (id,cls='')=>`<svg class="${cls}" viewBox="0 0 ${id==='chorus'?28:24} 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[id]||icons.spark}</svg>`;
  const islands = [
    {id:0,name:'Mossmeadow',tag:'THE FIRST VERSE',desc:'A forest finding its voice',genre:'Woodland chamber pop',bpm:96,root:48,scale:[0,2,4,7,9],level:1,cost:0,mult:1,gift:'pluff',sky:['#9fc7c7','#dce9ca'],grass:['#9abf78','#5e9770'],rock:'#486a66',accent:'#cef0a5'},
    {id:1,name:'Frostveil',tag:'THE CRYSTAL VERSE',desc:'Warm voices, frozen skies',genre:'Glacial dream waltz',bpm:84,root:50,scale:[0,2,3,7,9],level:3,cost:90000,mult:2.4,gift:'flurry',sky:['#839fbf','#e3e7ef'],grass:['#c4dce1','#85b2c7'],rock:'#597790',accent:'#e5ffff'},
    {id:2,name:'Tideglass',tag:'THE TIDAL VERSE',desc:'An orchestra beneath the waves',genre:'Tropical aquatic groove',bpm:108,root:53,scale:[0,2,4,7,11],level:6,cost:1800000,mult:7,gift:'dewdrop',sky:['#70babd','#c9eddc'],grass:['#83c9b3','#479a97'],rock:'#426c7e',accent:'#c1f5e1'},
    {id:3,name:'Emberfall',tag:'THE MOLTEN VERSE',desc:'Small sparks. Giant sound.',genre:'Molten brass and tribal drums',bpm:120,root:45,scale:[0,3,5,7,10],level:9,cost:18000000,mult:22,gift:'cinder',sky:['#ad858e','#efbea0'],grass:['#cd9a6d','#9d6c66'],rock:'#66506a',accent:'#ffcf89'},
    {id:4,name:'Starhaven',tag:'THE ASTRAL VERSE',desc:'A lullaby that lights the stars',genre:'Astral arpeggios and floating choir',bpm:90,root:55,scale:[0,2,4,6,9],level:12,cost:160000000,mult:80,gift:'lumen',sky:['#5d759f','#b8b8d5'],grass:['#b5a1cc','#7b82b3'],rock:'#535d88',accent:'#f2d4fa'},
    {id:5,name:'Shadowfen',tag:'THE MIDNIGHT VERSE',desc:'Where the quiet things sing',genre:'Moonlit trip hop and soft bass',bpm:78,root:43,scale:[0,3,5,7,10],level:16,cost:900000000,mult:250,gift:'nocturne',sky:['#52637f','#9da3b4'],grass:['#6c9690','#426565'],rock:'#414b66',accent:'#bbe4ca'},
    {id:6,name:'The Celestial Chorus',tag:'THE FINAL VERSE',desc:'Seven worlds. One impossible choir.',genre:'Celestial orchestral crescendo',bpm:100,root:60,scale:[0,2,4,7,9],level:20,cost:5000000000,mult:1000,gift:'lumen',sky:['#978abd','#e8c5dc'],grass:['#c5b7d6','#9199b8'],rock:'#675c8a',accent:'#fff0cc'}
  ];
  const raw = [
    ['pluff','Pluff','Plant','voice','tuft','#a9c781','#58744c',1,18,'A tiny forest singer with a surprisingly enormous voice.'],
    ['boulder','Bouldrum','Stone','drum','rock','#b3afa5','#747381',1,23,'The entire rhythm section fits inside one very round rock.'],
    ['dewdrop','Dewdrop','Water','bell','frog','#77c4c1','#387b87',1,20,'Glass droplets ring whenever it opens its mouth.'],
    ['skyrill','Skyrill','Wind','flute','bird','#d6c38d','#9a794f',2,24,'A feathered flute with the attention span of a cloud.'],
    ['flurry','Flurry','Frost','keys','tuft','#d6e9e8','#87adc3',3,45,'A snowball with paws and very delicate piano fingers.'],
    ['cinder','Cinderling','Fire','brass','lizard','#edab73','#ad6276',6,65,'It sneezes little sparks in exactly the right key.'],
    ['lumen','Lumen','Dream','pad','jelly','#c5a5e2','#8578b4',9,110,'A sleepy lantern that dreams in stacked harmonies.'],
    ['nocturne','Nocturne','Shade','bass','bat','#7d9aa6','#435565',12,160,'Under those wings is the deepest voice in the forest.'],
    ['mossknock','Mossknock','Plant Stone','drum','tree','#9ea87a','#5f7660',2,64,'Its hollow trunk makes a warm, woody backbeat.'],
    ['reedling','Reedling','Plant Water','reed','snail','#92d2a7','#558e73',2,68,'A reed organ grows from its spiraling shell.'],
    ['petalune','Petalune','Plant Wind','voice','bloom','#e6bdc9','#a873a2',3,74,'Petal ears bloom wider for every rising melody.'],
    ['chimefin','Chimefin','Water Wind','bell','manta','#9ecee1','#527eb1',3,80,'A floating fish that shakes a constellation of bells.'],
    ['tocktopus','Tocktopus','Stone Water','plucked','octo','#ceaa99','#885f71',3,85,'Eight tentacles. Eight strings. Zero missed rehearsals.'],
    ['gravelark','Gravelark','Stone Wind','flute','bird','#b6c6b7','#677d80',3,87,'A pebble beak turns passing breezes into riffs.'],
    ['kilnkin','Kilnkin','Fire Stone','bass','rock','#d6a174','#955d55',6,200,'The furnace in its belly hums like a double bass.'],
    ['flarewing','Flarewing','Fire Wind','brass','dragon','#e0a18a','#985c7b',6,220,'It plays a brass fanfare whenever a comet passes.'],
    ['glacier','Glacier','Frost Water','keys','owl','#a2d3e0','#6697b9',4,170,'A careful pianist with feathers made of ice.'],
    ['reverie','Reverie','Dream Shade','pad','ghost','#b6badb','#78759e',12,800,'Two shadows and a daydream learned to sing together.'],
    ['groovroot','Groovroot','Plant Stone Water','bass','tree','#a3b77d','#66744d',4,250,'A walking upright bass with little leaf-shaped shoes.'],
    ['chorwood','Chorwood','Plant Stone Wind','strings','tree','#c6ae8a','#806f5e',5,280,'It bows the branches of its own magnificent antlers.'],
    ['bloomtide','Bloomtide','Plant Water Wind','voice','bloom','#c2add2','#80739a',5,320,'Three mouths trade melodies like old best friends.'],
    ['tempora','Tempora','Stone Water Wind','drum','octo','#9eacba','#5c698b',5,350,'Rain, thunder, and tides are all inside its rhythm.'],
    ['ignidrake','Ignidrake','Fire Stone Wind','brass','dragon','#db9e66','#966169',8,750,'A gentle dragon with a towering horn section.'],
    ['snowbloom','Snowbloom','Frost Plant Water','strings','bloom','#c4dcdb','#7ea29e',7,600,'Every snowflake on its petals is a tiny violin.'],
    ['mosslord','Mosslord','Plant Stone Water Wind','voice','giant','#a6b981','#566c52',7,1250,'A four-part mountain of moss with a velvet baritone.'],
    ['solstice','Solstice','Fire Frost Dream Shade','pad','giant','#d2b3c3','#88749c',14,9000,'Its four horns carry summer, winter, dawn, and dusk.'],
    ['wisplet','Wisplet','Ethereal','voice','ghost','#c5eab5','#79a99a',8,4500,'A rare forest spirit that leaves harmonies in its wake.'],
    ['aurora','Aurorowl','Ethereal Frost','strings','owl','#adceef','#7975ba',8,5800,'Wings shimmer like a sky full of bowed strings.'],
    ['volta','Volta','Ethereal Fire','reed','beetle','#ecc987','#9e8277',10,8200,'Its antennae turn static electricity into a velvet synth.'],
    ['lumina','Lumina','Ethereal Dream','bell','jelly','#d9c6ec','#967eb3',14,12000,'A floating choir conductor made of moonlight.'],
    ['verdant','Verdant Colossus','Titan Plant','voice','giant','#adc88f','#617f5b',12,35000,'An ancient island guardian. Every syllable moves the trees.'],
    ['astral','Astralith','Titan Dream','pad','giant','#d3bfed','#8477ae',18,125000,'The final voice: a cathedral-sized celestial harmony.'],
    ['pumpkin','Pumpkinpip','Harvest','plucked','pumpkin','#e4a567','#98725f',2,175,'A pumpkin bard playing the strings inside its vine.'],
    ['spectra','Spectrabel','Spooky','bell','ghost','#d2b7e4','#877caa',3,280,'A cheerful little haunting, with absolutely impeccable timing.'],
    ['hexmoth','Hexmoth','Spooky Wind','pad','moth','#c9a3bc','#84679b',6,600,'Purple wings fold into a pair of glowing soundboards.'],
    ['maple','Maplemaw','Autumn','voice','tuft','#d5a878','#946c50',2,190,'A leaf-covered singer with a mouth bigger than its whole face.'],
    ['acorn','Acornote','Autumn Stone','drum','acorn','#c7aa7e','#80694b',4,320,'It uses its acorn cap as a snare drum.'],
    ['ochre','Ochrefox','Autumn Wind','strings','fox','#e2bc91','#9a7868',7,700,'A fox-shaped cello who only appears when the leaves turn.' ]
  ];
  const species = raw.map((r,i)=>({id:r[0],name:r[1],elements:r[2].split(' '),role:r[3],shape:r[4],color:r[5],dark:r[6],level:r[7],rate:r[8],desc:r[9],index:i,beds:i<8?1:i<18?2:i<24?3:i<26?4:i<30?5:i<32?8:2,price:Math.round(600*Math.pow(2.15,r[7]-1)),season:i>=32?(i<35?'halloween':'fall'):null}));
  const byId=Object.fromEntries(species.map(s=>[s.id,s]));
  const roles={voice:'Vocal melody',drum:'Percussion',bell:'Glass bells',flute:'Breathy flute',keys:'Felt piano',brass:'Warm brass',pad:'Choral harmony',bass:'Deep bass',reed:'Reed organ',plucked:'Plucked strings',strings:'Bowed strings'};
  const specialRecipes=[
    {id:'solstice',parents:['kilnkin','glacier'],chance:.7},
    {id:'wisplet',parents:['mosslord','reedling'],chance:.02},
    {id:'aurora',parents:['glacier','chimefin'],chance:.02},
    {id:'volta',parents:['ignidrake','skyrill'],chance:.02},
    {id:'lumina',parents:['reverie','nocturne'],chance:.02},
    {id:'pumpkin',parents:['pluff','boulder'],chance:.3,season:'halloween'},
    {id:'spectra',parents:['dewdrop','petalune'],chance:.22,season:'halloween'},
    {id:'hexmoth',parents:['cinder','skyrill'],chance:.16,season:'halloween'},
    {id:'maple',parents:['pluff','skyrill'],chance:.3,season:'fall'},
    {id:'acorn',parents:['boulder','mossknock'],chance:.22,season:'fall'},
    {id:'ochre',parents:['petalune','reedling'],chance:.16,season:'fall'}
  ];
  const eventInfo=(date=new Date())=>{
    const y=date.getFullYear();return {
      halloween:{name:'The Hollow Chorus',active:date>=new Date(y,9,1)&&date<new Date(y,10,1),end:new Date(y,10,1).getTime(),currency:'candies',token:'Hollow notes',icon:'moon'},
      fall:{name:'Golden Leaf Festival',active:date>=new Date(y,8,1)&&date<new Date(y,11,1),end:new Date(y,11,1).getTime(),currency:'leaves',token:'Golden leaves',icon:'leaf'}
    };
  };
  const decorations=[
    {id:'flower',name:'Moon daisies',cost:500,color:'#f2ddae',desc:'A small cluster of flowers.'},
    {id:'lamp',name:'Firefly lantern',cost:2500,color:'#eac586',desc:'A lantern with a soft golden glow.'},
    {id:'mushroom',name:'Velvet mushrooms',cost:4000,color:'#dfaab5',desc:'A home for the tiniest musicians.'},
    {id:'crystal',name:'Singing crystal',cost:10000,color:'#acc8f0',desc:'Reflects the colors of your island.'},
    {id:'fountain',name:'Harmony fountain',cost:45000,color:'#9ce0df',desc:'A fountain with glowing water.'},
    {id:'arch',name:'Vine arch',cost:80000,color:'#c1dca4',desc:'The entrance to a secret garden.'},
    {id:'statue',name:'Maestro monument',cost:350000,color:'#c2b6db',desc:'A tribute to a growing orchestra.'},
    {id:'pond',name:'Lily pond',cost:25000,color:'#91cabc',desc:'A quiet pool with floating lilies.'},
    {id:'pumpkin',name:'Hollow lantern',cost:5000,color:'#eeb273',season:'halloween',desc:'Available during the Hollow Chorus.'},
    {id:'maple',name:'Golden maple',cost:7500,color:'#e4b283',season:'fall',desc:'A tree dressed for the festival.'},
    {id:'obelisk',name:'Astral obelisk',cost:10000000,color:'#e7d4f1',desc:'A grand prism for your final island.'},
    {id:'stage',name:'Garden stage',cost:500000,color:'#d9bc8b',desc:'Your orchestra deserves a little stage.'}
  ];
  const skins=[{id:'natural',name:'Natural',cost:0},{id:'moon',name:'Moonlit',cost:1200},{id:'gold',name:'Golden',cost:4000},{id:'frost',name:'Frosted',cost:1800},{id:'hollow',name:'Hollow',cost:180,season:'halloween'},{id:'autumn',name:'Autumn',cost:180,season:'fall'}];
  const quests=[
    ['collect1','First encore','Collect coins from your island.','collects',1,2500,15,0],
    ['feed1','Growing voice','Feed any creature once.','feeds',1,5000,20,500],
    ['buy1','Bring in the drummer','Buy a creature from the market.','bought',1,7500,25,1000],
    ['breed1','A new harmony','Start your first breeding.','breeds',1,15000,30,1000],
    ['hatch1','Welcome to the choir','Hatch a creature from the nursery.','hatches',1,20000,30,2000],
    ['discover5','A tiny orchestra','Discover 5 species.','species',5,50000,50,3000],
    ['jam1','Take the stage','Finish a Studio performance.','jamWins',1,75000,100,10000],
    ['feed10','Practice makes harmony','Feed creatures 10 times.','feeds',10,120000,100,20000],
    ['island2','Beyond the forest','Own 2 islands.','islands',2,200000,150,30000],
    ['rare1','A colorful surprise','Discover a Rare variant.','rares',1,400000,200,50000],
    ['discover10','Ten different voices','Discover 10 species.','species',10,1000000,300,75000],
    ['exp1','Into the unknown','Finish an expedition.','expeditions',1,1500000,400,100000],
    ['island3','A tidal melody','Own 3 islands.','islands',3,3500000,500,150000],
    ['breed10','The breeding studio','Start 10 breedings.','breeds',10,8000000,600,200000],
    ['epic1','An epic voice','Discover an Epic variant.','epics',1,12000000,750,500000],
    ['discover15','The first full orchestra','Discover 15 species.','species',15,25000000,1000,750000],
    ['tour1','A sold-out tour','Finish a Festival performance.','tourWins',1,40000000,1500,1000000],
    ['island4','The molten movement','Own 4 islands.','islands',4,50000000,1500,1500000],
    ['feed50','A well-fed orchestra','Feed creatures 50 times.','feeds',50,80000000,2000,2500000],
    ['ethereal1','Beyond the ordinary','Discover an Ethereal species.','ethereals',1,120000000,2500,3000000],
    ['island5','Reach for the stars','Own 5 islands.','islands',5,250000000,3500,5000000],
    ['discover25','A world of voices','Discover 25 species.','species',25,500000000,5000,10000000],
    ['billion','The billion chorus','Earn a billion coins in total.','earned',1000000000,1000000000,7500,15000000],
    ['marathon1','World tour maestro','Win a World Tour performance.','marathonWins',1,2000000000,10000,25000000],
    ['island6','The midnight movement','Own 6 islands.','islands',6,3000000000,12000,30000000],
    ['titan1','An ancient awakening','Awaken a Titan.','titans',1,4000000000,15000,40000000],
    ['feed150','Every voice matters','Feed creatures 150 times.','feeds',150,5000000000,15000,50000000],
    ['island7','The seven-island symphony','Own all 7 islands.','islands',7,10000000000,25000,100000000],
    ['discover38','No voice left unheard','Discover all 38 species.','species',38,20000000000,50000,150000000],
    ['infinity','The Infinity Vault','Own all 7 islands and win 3 World Tours for a trillion coins and a billion gems, stars, and food.','marathonWins',3,1000000000000,1000000000,1000000000],
    ['trillion','The trillion encore','Earn a trillion coins in total.','earned',1000000000000,100000000000,100000,300000000]
  ].map(q=>({id:q[0],name:q[1],desc:q[2],stat:q[3],target:q[4],coins:q[5],gems:q[6],food:q[7],stars:q[0]==='infinity'?1000000000:Math.max(10,Math.round(Math.sqrt(q[5])/8)),xp:50+Math.round(Math.log10(q[5])*35)}));
  const concerts=[
    {id:'studio',name:'Studio Session',desc:'A one-minute set. A fast way to earn your next egg.',duration:60,target:55,rate:1.7,coins:250000,gems:75,stars:50,food:20000,xp:350,color:'#aaf7ce'},
    {id:'festival',name:'Festival Tour',desc:'Five minutes of shifting melodies and bigger rewards.',duration:300,target:450,rate:2.2,coins:25000000,gems:1500,stars:1500,food:1500000,xp:1600,color:'#cbb1f5'},
    {id:'world',name:'World Tour',desc:'Hit 2,000 notes within 20 active minutes. Pauses safely when you leave.',duration:1200,target:2000,rate:2.7,coins:10000000000,gems:25000,stars:100000,food:50000000,xp:12000,color:'#f7d486'}
  ];
  const phraseNames=['First light','Skipping stones','Windward','Echo garden','Silver rain','High tide','Firefly dance','Last constellation'];
  const patterns=[
    [[0,0,2],[3,2,1],[5,4,2],[8,3,2],[12,1,2],[15,0,1],[18,2,2],[22,4,3],[27,3,2],[30,1,1]],
    [[0,4,1],[2,3,1],[4,1,3],[9,2,1],[11,4,1],[13,6,2],[17,4,2],[21,3,1],[24,1,3],[29,0,2]],
    [[1,0,3],[6,3,2],[10,5,1],[12,4,1],[15,2,3],[20,1,2],[25,3,1],[28,0,4]],
    [[0,2,1],[2,4,1],[5,6,1],[7,4,2],[11,3,1],[14,1,2],[18,0,1],[20,2,1],[23,5,3],[29,4,2]],
    [[0,5,4],[6,4,2],[10,2,1],[13,0,3],[17,1,2],[22,3,3],[27,2,1],[30,0,2]],
    [[2,1,1],[4,3,1],[6,4,2],[10,6,3],[15,5,1],[18,3,3],[23,2,2],[27,4,1],[30,1,2]],
    [[0,0,1],[3,2,1],[6,1,1],[8,3,1],[11,5,2],[15,4,1],[18,2,1],[21,4,1],[25,6,2],[28,3,1],[31,0,1]],
    [[0,4,3],[5,2,2],[9,0,3],[14,3,2],[18,5,3],[23,4,2],[27,1,1],[29,0,3]]
  ];
  const phrases=s=>patterns.map((p,k)=>p.map(([step,degree,dur],j)=>{
    if(s.role==='drum')return {step:(step+(s.index%2))%32,degree:j%3,dur:.3,velocity:.36+((j+k)%4)*.12};
    const lower=s.role==='bass';const sustain=s.role==='pad'||s.role==='strings';
    return {step:(step+(s.index%3))%32,degree:degree+(s.index%4===0?1:0)+(lower?-5:0)+(s.role==='bell'||s.role==='flute'?5:0),dur:dur*(sustain?1.5:.8),velocity:.55+((j+s.index+k)%4)*.09};
  }));
  const dailyTasks=[{id:'dailycollect',name:'A morning encore',stat:'collects',target:8,coins:120000,gems:100,stars:75,food:30000},{id:'dailyfeed',name:'Rehearsal snacks',stat:'feeds',target:8,coins:250000,gems:150,stars:100,food:100000},{id:'dailybreed',name:'Fresh harmonies',stat:'breeds',target:3,coins:350000,gems:200,stars:150,food:100000},{id:'dailyjam',name:'Daily spotlight',stat:'jamWins',target:2,coins:750000,gems:300,stars:250,food:150000},{id:'dailynotes',name:'Keep the beat',stat:'notes',target:250,coins:1500000,gems:500,stars:500,food:300000}];
  const fmt=n=>{n=Number(n)||0;if(n>=1e12)return(n/1e12).toFixed(n>=1e13?1:2).replace(/\.0+$|0$/,'')+'T';if(n>=1e9)return(n/1e9).toFixed(n>=1e10?1:2).replace(/\.0+$|0$/,'')+'B';if(n>=1e6)return(n/1e6).toFixed(n>=1e7?1:2).replace(/\.0+$|0$/,'')+'M';if(n>=1e3)return(n/1e3).toFixed(n>=1e4?1:2).replace(/\.0+$|0$/,'')+'K';return Math.floor(n).toLocaleString('en-US')};
  const duration=n=>{n=Math.max(0,Math.ceil(n));return n>=3600?`${Math.floor(n/3600)}h ${Math.floor(n%3600/60)}m`:n>=60?`${Math.floor(n/60)}m ${String(n%60).padStart(2,'0')}s`:`${n}s`};
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return {icon,islands,species,byId,roles,specialRecipes,eventInfo,decorations,skins,quests,concerts,phraseNames,phrases,dailyTasks,fmt,duration,escape};
})();
