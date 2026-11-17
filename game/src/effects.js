export class Particles{constructor(){this.items=[];this.marks=[];this.flare=0;this.rainOn=false;this.time=0;}
 emit(x,y,color,count=8,speed=100,life=.8){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,s=speed*(.2+Math.random()*.8);this.items.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:life*(.5+Math.random()),max:life,size:2+Math.random()*5,color});}}
 dust(x,y){this.emit(x,y,'#d8bd91',3,42,.6);}
 smoke(x,y){this.emit(x,y,'#7b8582',7,26,1.7);}
 sparks(x,y){this.emit(x,y,'#ffd26f',12,210,.38);}
 explosion(x,y){this.emit(x,y,'#ff744e',38,240,.9);this.emit(x,y,'#ffd47c',24,165,.65);}
 fire(x,y){this.emit(x,y,'#f37849',4,35,.5);}
 tyreMarks(x,y,angle){this.marks.push({x,y,angle,life:8});if(this.marks.length>100)this.marks.shift();}
 sunFlare(){this.flare=.72;}
 rain(dt){if(!this.rainOn)return;for(let i=0;i<10;i++)this.items.push({x:Math.random()*1280,y:Math.random()*720,vx:-100,vy:450,life:.5,max:.5,size:1,color:'#d6e9e7'});}
 update(dt){this.time+=dt;for(const p of this.items){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;p.vy+=18*dt;}this.items=this.items.filter(p=>p.life>0);this.marks=this.marks.filter(m=>(m.life-=dt)>0);this.flare=Math.max(0,this.flare-dt);this.rain(dt);}
 draw(ctx){for(const m of this.marks){ctx.strokeStyle=`rgba(33,35,35,${m.life/12})`;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x+Math.cos(m.angle)*30,m.y+Math.sin(m.angle)*30);ctx.stroke();}for(const p of this.items){ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
}
