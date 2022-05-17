import{html as o,render as l}from"./lit-html.js";import n from"./supercomponent.js";import e from"./env.js";import{noop as i,parseDataset as a}from"./general.js";import c from"./progress-indicator.js";class r extends n{constructor(t){super(),this.model={css:"",class:"",attributes:{},total:1,title:"",subtitle:"",tickCallback:i,finishedCallback:i},this.model=a(this.dataset,this.model),e.css(["progress-label"]).then(()=>{this.set(t)})}tick(){this.querySelector("progress-indicator").tick()}reset(){this.querySelector("progress-indicator").reset()}setProgress(t){const s=this.querySelector("h3");s.classList.remove("none"),s.classList.add("block"),s.innerText=t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=o`
            ${new c({total:this.model.total,tickCallback:this.model.tickCallback.bind(this),finishedCallback:this.model.finishedCallback.bind(this)})}
            <div class="ml-0.5" flex="column wrap">
                <h2 class="block font-bold font-sm line-snug">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length?"block":"none"} font-xs font-grey-700 line-snug">${this.model.subtitle}</h3>
            </div>
        `;l(t,this)}}e.mount("progress-label",r);export{r as default};
