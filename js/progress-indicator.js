import{html as o,render as c}from"./lit-html.js";import l from"./supercomponent.js";import s from"./env.js";import{noop as i,parseDataset as n}from"./general.js";import{calcPercent as a}from"./numpy.js";class r extends l{constructor(e){super();this.model={css:"",class:"",attributes:{},size:24,tick:0,total:1,tickCallback:i,finishedCallback:i,color:"grey"},this.model=n(this.dataset,this.model),s.css(["progress-indicator"]).then(()=>{this.set(e,!0),this.render()})}reset(){this.set({tick:0})}tick(e=1){const t=this.get();t.tick<t.total&&(t.tick+=e,this.set(t,!0),this.render(),t.tick>=t.total?this.model.finishedCallback():this.model.tickCallback(t.tick))}setTotal(e){this.set({total:e,tick:0},!0)}calcDashOffset(){const e=this.model.tick/this.model.total;let t=Math.round(70-70*e+2);return t>=70&&this.model.tick>0?t=69:t>70&&(t=70),t}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),this.style.width=`${this.model.size}px`,this.style.height=`${this.model.size}px`,this.setAttribute("tooltip",`${a(this.model.tick,this.model.total)}%`);const e=o`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" color="${this.model.color}">
                <circle class="inner" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" cx="16" cy="16" r="11.05" />
                <circle
                    style="stroke-dashoffset: ${this.calcDashOffset()};"
                    class="outter"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    cx="16"
                    cy="16"
                    r="11.05"
                />
            </svg>
        `;c(e,this)}}s.mount("progress-indicator",r);export{r as default};
