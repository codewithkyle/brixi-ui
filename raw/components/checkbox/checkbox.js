import{html as i,render as a}from"./lit-html.js";import c from"./supercomponent.js";import l from"./env.js";import{noop as r,parseDataset as d}from"./general.js";import n from"./soundscape.js";class o extends c{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.set({checked:t.checked}),this.model.callback(t.checked,t.name),t.checked?n.play("click"):n.play("hover")};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){this.classList.remove("is-active");const t=this.querySelector("input"),s=!t.checked;this.set({checked:s}),this.model.callback(s,t.name),s?n.play("click"):n.play("hover")}};this.model={label:"",required:!1,name:"",checked:!1,disabled:!1,callback:r,css:"",class:"",attributes:{},type:"check"},this.model=d(this.dataset,this.model),l.css("checkbox").then(()=>{this.set(e,!0),this.render()})}connected(){this.addEventListener("click",e=>{e.stopImmediatePropagation()})}getName(){return this.model.name}getValue(){return this.model.checked}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1),e}renderIcon(){switch(this.model.type){case"line":return i`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>`;default:return i`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`}}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=i`
            <div class="inline-block mr-auto">
                <input @change=${this.handleChange} type="checkbox" name="${this.model.name}" id="${e}" .checked=${this.model.checked} ?disabled=${this.model.disabled} />
                <label for="${e}">
                    <check-box
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        role="button"
                        tabindex="0"
                        aria-label=${`click to ${this.model.checked?"uncheck":"check"} the box ${this.model.label}`}
                    >
                        <i> ${this.renderIcon()} </i>
                    </check-box>
                    ${this.model.label?.length?i`<span>${this.model.label}</span>`:""}
                </label>
            </div>
        `;this.setAttribute("state",this.state),this.className=`checkbox js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),a(t,this)}}l.bind("checkbox-component",o);export{o as default};
