import{html as i,render as n}from"./lit-html.js";import o from"./component.js";import r from"./env.js";import{parseDataset as l}from"./general.js";import{calcPercent as p}from"./numpy.js";r.css(["steps","steps-vertical","steps-horizontal"]);class a extends o{constructor(){super();this.handleClick=t=>{const e=t.currentTarget,s=parseInt(e.dataset.index);s<this.model.activeStep&&(this.set({activeStep:s}),this.dispatchEvent(new CustomEvent("step",{detail:{step:this.model.steps[s].name},bubbles:!0,cancelable:!0})))};this.model={steps:[],activeStep:0,step:null,layout:"vertical"}}static get observedAttributes(){return["data-steps","data-step","data-layout"]}async connected(){const t=l(this.dataset,this.model);for(let e=0;e<t.steps.length;e++)if(t.steps[e].name===t?.step){t.activeStep=e;break}this.set(t)}renderVerticalStep(t,e){let s;return this.model.activeStep===e?s="active":this.model.activeStep>e?s="completed":s="pending",i`
            <button sfx="${s==="completed"?"button":""}" state="${s}" @click=${this.handleClick} data-name="${t?.name}" data-index="${e}">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </i>
                <div class="copy">
                    <h3>${t.label}</h3>
                    ${t?.description?i`<p>${t.description}</p>`:""}
                </div>
            </button>
        `}renderHorizontalStep(t,e){let s;return this.model.activeStep===e?s="active":this.model.activeStep>e?s="completed":s="pending",i`
            <button sfx="${s==="completed"?"button":""}" state="${s}" @click=${this.handleClick} data-name="${t?.name}" data-index="${e}">
                <h4>Step ${e+1}</h4>
                <h3>${t.label}</h3>
                ${t?.description?i`<p>${t.description}</p>`:""}
            </button>
        `}render(){const t=i`
            ${this.model.steps.map((e,s)=>{switch(this.model.layout){case"horizontal":return this.renderHorizontalStep(e,s);case"vertical":return this.renderVerticalStep(e,s);default:return""}})}
        `;this.classList.add(this.model.layout),this.model.layout==="horizontal"&&(this.style.gridTemplateColumns=`repeat(${this.model.steps.length}, minmax(300px, ${Math.floor(p(1,this.model.steps.length))}%))`),n(t,this)}}r.bind("steps-component",a);export{a as default};
