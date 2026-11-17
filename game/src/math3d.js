export function makeCamera(target,angle,distance=320,height=145){return{x:target.x-Math.cos(angle)*distance,y:target.y-Math.sin(angle)*distance,z:height,targetX:target.x,targetY:target.y,angle};}
export const FOCAL=620;
export function projectPoint(point,camera,view={width:1280,height:720}){const dx=point.x-camera.x,dy=point.y-camera.y,ca=Math.cos(camera.angle),sa=Math.sin(camera.angle),forward=dx*ca+dy*sa,side=-dx*sa+dy*ca,depth=forward,scale=FOCAL*(view.width/1280)/Math.max(depth,1);return{x:view.width/2+side*scale,y:view.height/2+(camera.z-(point.z||0))*scale+480*scale,scale,depth};}
export function depthSort(items,cam){return items.sort((a,b)=>((b.y-cam.y)**2+(b.x-cam.x)**2)-((a.y-cam.y)**2+(a.x-cam.x)**2));}
export function fogFactor(depth){return Math.max(0,Math.min(.83,(depth-450)/1800));}
export function shade(hex,amount){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v+amount)));return`#${[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')}`;}
export function lerpAngle(a,b,t){const d=((b-a+Math.PI*3)%(Math.PI*2))-Math.PI;return a+d*t;}
export function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
export function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
export function smoothstep(a,b,x){const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);}
export function rotate(x,y,a){return{x:x*Math.cos(a)-y*Math.sin(a),y:x*Math.sin(a)+y*Math.cos(a)};}
export function polygon(ctx,points,fill,stroke=null){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
