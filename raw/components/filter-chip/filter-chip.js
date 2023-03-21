import{html as r,render as a}from"./lit-html.js";import n from"./supercomponent.js";import i from"./env.js";import{noop as o,parseDataset as h}from"./general.js";class l extends n{constructor(e){super();this.handleClick=()=>{const e=!this.model.checked;this.set({checked:e},!0),this.model.callback(this.model.value,e)};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){const t=!this.model.checked;this.classList.remove("is-active"),this.model.callback(this.model.value,t),this.set({checked:t})}};this.model={css:"",class:"",attributes:{},label:null,value:null,callback:o,checked:!1},this.model=h(this.dataset,this.model),i.css(["filter-chip"]).then(()=>{this.set(e,!0),this.render()})}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),this.setAttribute("role","button");const e=`${this.model.label.trim().replace(/\s+/g,"-")}-${this.model.value.toString().trim().replace(/\s+/g,"-")}`,t=r`
            <input type="checkbox" ?checked="${this.model.checked}" .value=${this.model.value} id="${e}" />
            <label for="${e}" tabindex="0" @click=${this.handleClick} @keyup=${this.handleKeyup} @keydown=${this.handleKeydown}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span>${this.model.label}</span>
            </label>
        `;a(t,this)}}i.bind("filter-chip",l);export{l as default};
