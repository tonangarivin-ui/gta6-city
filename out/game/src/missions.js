import{MISSIONS}from'./story.js';
export const MISSION_CHAIN=MISSIONS;
export class MissionRunner{constructor(){this.index=0;this.active=false;this.complete=false;this.failed=false;this.progress=0;this.message='';this.elapsed=0;this.target={x:1040,y:910};}
 startMission(index=this.index){this.index=Math.max(0,Math.min(MISSION_CHAIN.length-1,index));this.active=true;this.complete=false;this.failed=false;this.progress=0;this.elapsed=0;this.message=MISSION_CHAIN[this.index].dialogue[0];this.target={x:960+(this.index%3)*245,y:860+(this.index%2)*290};}
 updateObjectives(player,dt){if(!this.active)return;this.elapsed+=dt;if(Math.hypot(player.x-this.target.x,player.y-this.target.y)<95)this.completeMission();if(this.elapsed>210)this.failMission();}
 completeMission(){this.active=false;this.complete=true;this.index=Math.min(MISSION_CHAIN.length-1,this.index+1);this.message='Contract complete — payment cleared.';}
 failMission(){this.active=false;this.failed=true;this.message='Signal lost. Retry the contract.';}
 retryMission(){this.startMission(this.index);}
 current(){return MISSION_CHAIN[Math.min(this.index,MISSION_CHAIN.length-1)];}
}
