export class AudioEngine{constructor(){this.context=null;this.master=null;this.enabled=false;this.nodes=[];this.radioIndex=0;}
 unlock(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.context??=new C();this.context.resume().catch(()=>{});this.master??=this.context.createGain();this.master.gain.value=.11;this.master.connect(this.context.destination);this.enabled=true;}catch{this.enabled=false;}}
 tone(freq,duration=.12,type='sine',volume=.15){try{if(!this.context||!this.enabled)return;const o=this.context.createOscillator(),g=this.context.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(volume,this.context.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+duration);o.connect(g);g.connect(this.master);o.start();o.stop(this.context.currentTime+duration);}catch{}}
 engineHum(speed=0){this.tone(55+Math.abs(speed)*.28,.08,'sawtooth',.035);}
 tyreScreech(){this.tone(850,.18,'triangle',.08);}
 gunshot(){this.tone(105,.09,'square',.16);}
 footstep(){this.tone(95,.045,'sine',.045);}
 radioLoop(){this.tone([220,277,330,392][this.radioIndex++%4],.26,'sine',.028);}
}
