import{html as s,render as l}from"./lit-html.js";import t from"./env.js";import{parseDataset as o}from"./general.js";import a from"./component.js";import{UUID as r}from"./uuid.js";t.css(["filter-chip"]);class i extends a{constructor(){super();this.handleClick=()=>{const e=!this.model.checked;this.set({checked:e}),this.dispatchEvent(new CustomEvent("change",{detail:{checked:e,value:this.model.value}}))};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{e.key===" "&&(this.classList.remove("is-active"),this.click())};this.id=r(),this.model={label:"",value:null,checked:!1}}static get observedAttributes(){return["data-label","data-value","data-checked"]}async connected(){const e=o(this.dataset,this.model);this.set(e)}render(){this.setAttribute("role","button"),this.setAttribute("sfx","button");const e=s`
            <input type="checkbox" ?checked="${this.model.checked}" .value=${this.model.value||""} id="${this.id}" />
            <label for="${this.id}" tabindex="0" @click=${this.handleClick} @keyup=${this.handleKeyup} @keydown=${this.handleKeydown}>
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
        `;l(e,this)}}t.bind("filter-chip",i);export{i as default};
