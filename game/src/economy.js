export const SAFEHOUSES=[{name:'The Driftwood',district:'Marina Sol',x:310,y:520},{name:'Room 9',district:'Old Lantern',x:620,y:1080},{name:'Blue Hour Loft',district:'Glassline',x:1120,y:420}];
export const SHOP_ITEMS=[{name:'Reinforced tires',cost:450,type:'handling'},{name:'Padded jacket',cost:700,type:'armor'},{name:'Extended magazine',cost:900,type:'ammo'}];
export class Wallet{constructor(cash=1250){this.cash=cash;this.bank=0;this.upgrades=[];}earn(n){this.cash+=Math.max(0,n);return this.cash;}spend(n){if(n>this.cash)return false;this.cash-=n;return true;}}
export function buyUpgrade(wallet,item){if(wallet.upgrades.includes(item.type)||!wallet.spend(item.cost))return false;wallet.upgrades.push(item.type);return true;}
export function bankDeposit(wallet,amount){const n=Math.max(0,Math.min(amount,wallet.cash));wallet.cash-=n;wallet.bank+=n;return n;}
export function tierForCash(cash){return cash>=10000?'Bay legend':cash>=5000?'Local name':cash>=2000?'Known face':'New arrival';}
