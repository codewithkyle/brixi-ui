import{UUID as i}from"./uuid.js";import{html as o,render as s}from"./lit-html.js";import{unsafeHTML as c}from"./unsafe-html.js";import d from"./component.js";import n from"./env.js";import{parseDataset as a}from"./general.js";n.css(["accordion"]);class r extends d{constructor(){super(),this.model={sections:[]}}static get observedAttributes(){return["data-sections"]}connected(){const t=a(this.dataset,this.model);this.set(t)}renderSection(t){const e=i();return o`
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
                <div class="content">${c(decodeURI(t.content))}</div>
            </div>
        `}render(){const t=o` ${this.model.sections.map(this.renderSection)} `;s(t,this)}}n.bind("accordion-component",r);export{r as default};
