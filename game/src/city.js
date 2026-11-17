import{WORLD,PALETTE,BLOCK_COLORS}from'./config.js';import{hash2,seedRandom}from'./noise.js';
export const LANDMARKS=[{name:'The Sunwheel',x:430,y:360,type:'ferris'},{name:'Casa Brisa',x:990,y:330,type:'hotel'},{name:'Saltglass Pier',x:1840,y:900,type:'pier'},{name:'The Blue Heron',x:1180,y:1160,type:'tower'}];
export function blockAt(x,y){const gx=Math.floor(x/WORLD.block),gy=Math.floor(y/WORLD.block),road=36;return{x:gx*WORLD.block+road,y:gy*WORLD.block+road,w:WORLD.block-WORLD.road,h:WORLD.block-WORLD.road,gx,gy};}
export function buildingFacade(block,seed=1){const r=seedRandom((block.gx*997+block.gy*313+seed)>>>0),width=block.w*(.7+r()*.27),height=block.h*(.67+r()*.25);return{x:block.x+(block.w-width)/2,y:block.y+(block.h-height)/2,w:width,h:height,height:55+r()*210,color:BLOCK_COLORS[Math.floor(r()*BLOCK_COLORS.length)],roof:r()};}
export function placePalms(count=54,seed=1){const random=seedRandom(seed+42),palms=[];for(let i=0;i<count;i++){const x=1450+random()*470,y=random()*WORLD.height;palms.push({x,y,height:42+random()*24,lean:random()*0.3-.15});}for(let i=0;i<18;i++)palms.push({x:100+Math.floor(random()*5)*WORLD.block+25,y:i*96+30,height:48,lean:0});return palms;}
export function streetLights(){const lights=[];for(let x=20;x<WORLD.width;x+=WORLD.block)for(let y=20;y<WORLD.height;y+=WORLD.block)lights.push({x,y,lit:true});return lights;}
export function waterEdge(){return{x:WORLD.seaX,foam:WORLD.seaX-18,sand:WORLD.seaX-125};}
export class City{
 constructor(seed=1){this.seed=seed;this.random=seedRandom(seed);this.blocks=[];this.buildings=[];this.palms=placePalms(64,seed);this.lights=streetLights();this.landmarks=LANDMARKS;this.water=waterEdge();this.generate();}
 generate(){for(let y=0;y<WORLD.height;y+=WORLD.block)for(let x=0;x<WORLD.seaX-100;x+=WORLD.block){const b=blockAt(x+WORLD.block/2,y+WORLD.block/2);if(b.x<0||b.y<0||b.x+b.w>WORLD.seaX-60||b.y+b.h>WORLD.height)continue;b.index=hash2(b.gx,b.gy,this.seed);b.district=b.x<750?(b.y<740?'Marina Sol':'Old Lantern'):b.x<1450?(b.y<740?'Glassline':'Palm Market'):'Tideworks';this.blocks.push(b);if(b.x<150||b.y<80)continue;this.buildings.push(buildingFacade(b,this.seed));}}
 isRoad(x,y){const mx=((x%WORLD.block)+WORLD.block)%WORLD.block,my=((y%WORLD.block)+WORLD.block)%WORLD.block;return mx<WORLD.road||my<WORLD.road||x>WORLD.seaX-135;}
 nearestRoad(x,y){const gx=Math.round(x/WORLD.block),gy=Math.round(y/WORLD.block);return{x:gx*WORLD.block+WORLD.road/2,y:gy*WORLD.block+WORLD.road/2};}
 districtAt(x,y){return x<720?(y<720?'Marina Sol':'Old Lantern'):x<1400?(y<720?'Glassline':'Palm Market'):'Tideworks';}
 collides(x,y,r=18){if(x<0||y<0||x>WORLD.seaX-25||y>WORLD.height)return true;return this.buildings.some(b=>x+r>b.x&&x-r<b.x+b.w&&y+r>b.y&&y-r<b.y+b.h);}
}
export function generateCity(seed=1){return new City(seed);}
