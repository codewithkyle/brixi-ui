var s=Object.defineProperty;var a=(i,n,t)=>n in i?s(i,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[n]=t;var u=(i,n,t)=>(a(i,typeof n!="symbol"?n+"":n,t),t);class h extends HTMLElement{constructor(){super();u(this,"onInput",()=>{this.renderFill(),this.syncInput()});u(this,"onButtonClick",()=>{this.inputEl.value===this.inputEl.min?this.inputEl.value=this.inputEl.max:this.inputEl.value=this.inputEl.min,this.renderFill(),this.syncInput()});u(this,"onManualInput",()=>{+this.manualInputEL.value>+this.inputEl.max?this.manualInputEL.value=this.inputEl.max:+this.manualInputEL.value<+this.inputEl.min&&(this.manualInputEL.value=this.inputEl.min),this.inputEl.value=this.manualInputEL.value,this.renderFill(),this.syncInput()})}connectedCallback(){this.inputEl=this.querySelector("input[type=range]"),this.inputEl&&(this.inputEl.addEventListener("input",this.onInput),this.renderFill(),this.manualInputEL=this.querySelector("input[type=number]"),this.manualInputEL&&this.manualInputEL.addEventListener("change",this.onManualInput),this.buttonEl=this.querySelector("button"),this.buttonEl&&this.buttonEl.addEventListener("click",this.onButtonClick))}calcPercent(t,e){const l=t/e*100;return Math.round(l)}renderFill(){const t=this.calcPercent(+this.inputEl.value,+this.inputEl.max);this.style.setProperty("--track-fill",`${t}%`)}syncInput(){this.manualInputEL&&(this.manualInputEL.value=this.inputEl.value)}}export{h as default};
