import{html as s,render as n}from"./lit-html.js";import i from"./supercomponent.js";import o from"./env.js";import{parseDataset as c}from"./general.js";class r extends i{constructor(t){super(),this.model={sections:[],css:"",class:"",attributes:{}},this.model=c(this.dataset,this.model),o.css(["accordion"]).then(()=>{this.set(t,!0),this.render()})}renderSection(t){const e=t.label.toLowerCase().trim().replace(/\s+/g,"-");return s`
            <div class="section">
                <input type="checkbox" name="${e}" id="${e}" />
                <label sfx="button" role="button" tabindex="0" for="${e}">
                    <span>${t.label}</span>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </i>
                </label>
                <p class="content">${t.content}</p>
            </div>
        `}render(){this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=s` ${this.model.sections.map(this.renderSection)} `;n(t,this)}}o.mount("accordion-component",r);export{r as default};
