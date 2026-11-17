import{seedRandom,choose,range}from'./noise.js';
const WARDROBE=['#f27c5f','#eacb79','#72aaa1','#dad2bd','#747e9e','#c07183'];
export class Pedestrian{constructor(x,y,seed=1){const r=seedRandom(seed);Object.assign(this,{x,y,vx:range(r,-22,22),vy:range(r,-22,22),color:choose(r,WARDROBE),skin:choose(r,['#b97856','#e0ae83','#915d4c','#f0c99f']),phase:r()*8,panic:0,alive:true,scale:.8+r()*.45});}}
export function spawnPedestrians(count=38,seed=1){const r=seedRandom(seed+710),people=[];for(let i=0;i<count;i++){const x=100+r()*1630,y=90+r()*1580;people.push(new Pedestrian(x,y,Math.floor(r()*99999)));}return people;}
export function walkSidewalks(people,dt,city){for(const p of people){p.phase+=dt*5;if(p.panic>0){p.panic=Math.max(0,p.panic-dt);p.x+=p.vx*dt*2.7;p.y+=p.vy*dt*2.7;}else{p.x+=p.vx*dt;p.y+=p.vy*dt;}if(city.collides(p.x,p.y,8)){p.vx*=-1;p.vy*=-1;p.x+=p.vx*dt*4;p.y+=p.vy*dt*4;}p.x=Math.max(16,Math.min(1920,p.x));p.y=Math.max(16,Math.min(1780,p.y));}}
export function panic(people,x,y,radius=220){for(const p of people)if(Math.hypot(p.x-x,p.y-y)<radius){const a=Math.atan2(p.y-y,p.x-x);p.vx=Math.cos(a)*100;p.vy=Math.sin(a)*100;p.panic=3.5;}}
export function hitReaction(person,force=160){person.panic=5;person.vx+=force;person.alive=false;}
