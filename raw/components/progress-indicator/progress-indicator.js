import{html as r,render as o}from"./lit-html.js";import c from"./component.js";import s from"./env.js";import{parseDataset as n}from"./general.js";import{calcPercent as l}from"./numpy.js";s.css(["progress-indicator"]);class i extends c{constructor(){super(),this.model={size:24,tick:0,total:1,color:"grey"}}static get observedAttributes(){return["data-size","data-tick","data-total","data-color"]}async connected(){const e=n(this.dataset,this.model);this.set(e)}reset(){this.set({tick:0})}tick(e=1){const t=this.get();t.tick<t.total&&(t.tick+=e,this.set(t,!0),this.render(),t.tick>=t.total?this.dispatchEvent(new CustomEvent("finished",{bubbles:!0,cancelable:!0})):this.dispatchEvent(new CustomEvent("tick",{detail:{tick:t.tick},bubbles:!0,cancelable:!0})))}setTotal(e){this.set({total:e,tick:0},!0)}calcDashOffset(){const e=this.model.tick/this.model.total;let t=Math.round(70-70*e+2);return t>=70&&this.model.tick>0?t=69:t>70&&(t=70),t}render(){this.style.width=`${this.model.size}px`,this.style.height=`${this.model.size}px`,this.setAttribute("tooltip",`${l(this.model.tick,this.model.total)}%`);const e=r`
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
        `;o(e,this)}}s.bind("progress-indicator",i);export{i as default};
