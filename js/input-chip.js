import{html as n,render as r}from"./lit-html.js";import a from"./supercomponent.js";import s from"./env.js";import{noop as l,parseDataset as o}from"./general.js";class i extends a{constructor(t){super();this.handleClick=()=>{this.model.callback(this.model.value),this.remove()};this.handleKeydown=t=>{t.key===" "&&this.classList.add("is-active")};this.handleKeyup=t=>{t.key===" "&&(this.classList.remove("is-active"),this.model.callback(this.model.value),this.remove())};this.model={css:"",class:"",attributes:{},label:null,value:null,callback:l},this.model=o(this.dataset,this.model),s.css(["input-chip"]).then(()=>{this.set(t,!0),this.render()})}connected(){this.addEventListener("click",this.handleClick),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)}),this.tabIndex=0,this.setAttribute("role","button");const t=n`
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
        `;r(t,this)}}s.bind("input-chip",i);export{i as default};
