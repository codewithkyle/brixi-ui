import{html as i,render as l}from"./lit-html.js";import o from"./supercomponent.js";import r from"./env.js";import{noop as n,parseDataset as p}from"./general.js";import{calcPercent as c}from"./numpy.js";class a extends o{constructor(e){super();this.handleClick=e=>{const t=e.currentTarget,s=parseInt(t.dataset.index);s<this.model.activeStep&&(this.set({activeStep:s}),this.model.callback(t.dataset.name))};this.model={callback:n,steps:e?.steps??[],activeStep:0,step:e?.step??null,layout:"vertical",css:"",class:"",attributes:{}},this.model=p(this.dataset,this.model);for(let t=0;t<this.model.steps.length;t++)if(this.model.steps[t].name===this.model.step){this.model.activeStep=t;break}r.css(["steps",`steps-${e?.layout??this.model.layout}`]).then(()=>{this.set(e,!0),this.render()})}renderVerticalStep(e,t){let s;return this.model.activeStep===t?s="active":this.model.activeStep>t?s="completed":s="pending",i`
            <button sfx="${s==="completed"?"button":""}" state="${s}" @click=${this.handleClick} data-name="${e?.name}" data-index="${t}">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </i>
                <div class="copy">
                    <h3>${e.label}</h3>
                    ${e?.description?i`<p>${e.description}</p>`:""}
                </div>
            </button>
        `}renderHorizontalStep(e,t){let s;return this.model.activeStep===t?s="active":this.model.activeStep>t?s="completed":s="pending",i`
            <button sfx="${s==="completed"?"button":""}" state="${s}" @click=${this.handleClick} data-name="${e?.name}" data-index="${t}">
                <h4>Step ${t+1}</h4>
                <h3>${e.label}</h3>
                ${e?.description?i`<p>${e.description}</p>`:""}
            </button>
        `}render(){const e=i`
            ${this.model.steps.map((t,s)=>{switch(this.model.layout){case"horizontal":return this.renderHorizontalStep(t,s);case"vertical":return this.renderVerticalStep(t,s);default:return""}})}
        `;this.className=`${this.model.layout} ${this.model.class}`,this.style.cssText=this.model.css,this.model.layout==="horizontal"&&(this.style.gridTemplateColumns=`repeat(${this.model.steps.length}, minmax(300px, ${Math.floor(c(1,this.model.steps.length))}%))`),Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),l(e,this)}}r.bind("steps-component",a);export{a as default};
