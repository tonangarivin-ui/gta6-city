export function seedRandom(seed=1){let a=seed>>>0;return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
export function hash2(x,y,seed=1){let n=Math.imul((x|0)^seed,0x45d9f3b);n=Math.imul(n^(n>>>16),0x45d9f3b);n^=n>>>16;n^=Math.imul(y|0,0x27d4eb2d);n=Math.imul(n^(n>>>15),0x85ebca6b);return((n^(n>>>13))>>>0)/4294967296;}
export function valueNoise2D(x,y,seed=1){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;const u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);const a=hash2(ix,iy,seed),b=hash2(ix+1,iy,seed),c=hash2(ix,iy+1,seed),d=hash2(ix+1,iy+1,seed);return(a+(b-a)*u)*(1-v)+(c+(d-c)*u)*v;}
export function pickWeighted(items,random=Math.random){const total=items.reduce((sum,item)=>sum+item.weight,0);let roll=random()*total;for(const item of items){roll-=item.weight;if(roll<=0)return item.value;}return items.at(-1)?.value;}
export function range(random,min,max){return min+random()*(max-min);}
export function integer(random,min,max){return Math.floor(range(random,min,max+1));}
export function choose(random,list){return list[Math.floor(random()*list.length)];}
export function seededColor(random,palette){return choose(random,palette);}
