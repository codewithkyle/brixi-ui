import d from"./supercomponent.js";import{html as n,render as c}from"./lit-html.js";import{unsafeHTML as h}from"./unsafe-html.js";import r from"./env.js";import{noop as m,parseDataset as u}from"./general.js";import b from"./progress-indicator.js";class a extends d{constructor(t){super();this.handleClick=t=>{this.fetchData()};this.handleKeydown=t=>{t instanceof KeyboardEvent&&t.key.toLowerCase()===" "&&this.classList.add("is-active")};this.handleKeyup=t=>{t instanceof KeyboardEvent&&t.key.toLowerCase()===" "&&(this.classList.remove("is-active"),this.fetchData())};this.downloading=!1,this.model={label:"",downloadingLabel:"downloading",kind:"solid",color:"primary",shape:"default",size:"default",icon:"",callback:m,css:"",class:"",attributes:{},url:location.origin,options:{method:"GET"},workerURL:"/js/file-download-worker.js"},this.model=u(this.dataset,this.model),r.css(["button","download-button"]).then(()=>{this.set(t,!0),this.render()})}connected(){this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keyup",this.handleKeyup)}async fetchData(){if(this.downloading)return;this.downloading=!0;const t=this.querySelector("svg, img");t&&(t.style.display="none");const e=this.querySelector("span");e&&(e.innerText=this.model.downloadingLabel);const i=new Worker(this.model.workerURL);i.onmessage=l=>{const{type:o,data:s}=l.data;switch(o){case"tick":this.indicator.tick(s);break;case"start":this.indicator=new b({total:s,class:"mr-0.5",css:"margin-left:-0.25rem;",color:this.model.color==="white"?"grey":"white"}),this.insertBefore(this.indicator,this.childNodes[0]);break;case"done":this.model.callback(new Blob([s])),this.indicator.remove(),e.innerText=this.model.label,t&&(t.style.display="inline-block"),i.terminate(),this.downloading=!1;break;case"error":console.error(s),this.model.callback(null),i.terminate(),this.indicator.remove(),e.innerText=this.model.label,t&&(t.style.display="inline-block"),this.downloading=!1;break;default:console.warn(`Unhandled file download worker message type: ${o}`);break}},i.postMessage({url:this.model.url,options:this.model.options})}renderIcon(){let t;return this.model.icon.length?t=n`${h(this.model.icon)}`:t="",t}render(){this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=n` ${this.renderIcon()} <span>${this.model.label}</span> `;this.className="bttn",this.setAttribute("role","button"),this.tabIndex=0,this.setAttribute("color",this.model.color),this.setAttribute("size",this.model.size),this.setAttribute("kind",this.model.kind),this.setAttribute("shape",this.model.shape),this.model.icon?.length&&this.setAttribute("icon","left"),this.setAttribute("sfx","button"),c(t,this)}}r.bind("download-button-component",a);export{a as default};
