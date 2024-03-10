import{UUID as i}from"./uuid.js";import{html as e,render as c}from"./lit-html.js";import{unsafeHTML as s}from"./unsafe-html.js";import d from"./component.js";import n from"./env.js";import{parseDataset as a}from"./general.js";n.css(["accordion"]);class r extends d{constructor(){super(),this.model={sections:[]}}static get observedAttributes(){return["data-sections"]}connected(){const o=a(this.dataset,this.model);this.set(o)}renderSection(o){const t=i();return e`
            <accordion-section>
                <input type="checkbox" name="${t}" id="${t}" />
                <label sfx="button" role="button" tabindex="0" for="${t}">
                    <span>${o.label}</span>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </i>
                </label>
                <accordion-content>${s(decodeURI(o.content))}</accordion-content>
            </accordion-section>
        `}render(){const o=e` ${this.model.sections.map(this.renderSection)} `;c(o,this)}}n.bind("accordion-component",r);export{r as default};
