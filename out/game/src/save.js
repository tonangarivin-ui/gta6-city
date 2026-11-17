export const SAVE_VERSION=1;
const KEY='solara-last-light-save';
export function saveGame(state){try{const record={version:SAVE_VERSION,time:Date.now(),cash:state.player.cash,health:state.player.health,x:state.player.x,y:state.player.y,mission:state.mission.index};localStorage.setItem(KEY,JSON.stringify(record));return true;}catch{return false;}}
export function loadGame(){try{const data=JSON.parse(localStorage.getItem(KEY)||'null');return data?.version===SAVE_VERSION?data:null;}catch{return null;}}
export function clearSave(){try{localStorage.removeItem(KEY);return true;}catch{return false;}}
