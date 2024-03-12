import{html as s,render as n}from"./lit-html.js";import e from"./env.js";import{parseDataset as r}from"./general.js";import a from"./component.js";e.css(["input-chip"]);class i extends a{constructor(){super();this.handleClick=()=>{this.dispatchEvent(new CustomEvent("remove",{detail:{value:this.model.value},bubbles:!0,cancelable:!0})),this.remove()};this.handleKeydown=t=>{t.key===" "&&this.classList.add("is-active")};this.handleKeyup=t=>{t.key===" "&&(this.classList.remove("is-active"),this.click())};this.model={label:"",value:null}}static get observedAttributes(){return["data-label","data-value"]}connected(){const t=r(this.dataset,this.model);this.set(t),this.addEventListener("click",this.handleClick),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}render(){this.tabIndex=0,this.setAttribute("role","button"),this.setAttribute("sfx","button");const t=s`
            <span>${this.model.label}</span>
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
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        `;n(t,this)}}e.bind("brixi-input-chip",i);export{i as default};
