import{html as s,render as r}from"./lit-html.js";import c from"./supercomponent.js";import o from"./env.js";import{noop as a,parseDataset as d}from"./general.js";import n from"./soundscape.js";class l extends c{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.update({checked:t.checked}),this.model.callback(t.checked,t.name),t.checked?n.activate():n.deactivate()};this.model={label:"",required:!1,name:"",checked:!1,disabled:!1,callback:a,css:"",class:"",attributes:{},type:"check"},this.model=d(this.dataset,this.model),o.css("checkbox").then(()=>{this.set(e,!0),this.render()})}connected(){this.addEventListener("click",e=>{e.stopImmediatePropagation()})}getName(){return this.model.name}getValue(){return this.model.checked}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1),e}renderIcon(){switch(this.model.type){case"line":return s`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>`;default:return s`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`}}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=s`
            <div class="inline-block mr-auto">
                <input @change=${this.handleChange} type="checkbox" name="${this.model.name}" id="${e}" .checked=${this.model.checked} ?disabled=${this.model.disabled} />
                <label for="${e}">
                    <check-box role="button" tabindex="0" aria-label=${`click to ${this.model.checked?"uncheck":"check"} the box ${this.model.label}`}>
                        <i> ${this.renderIcon()} </i>
                    </check-box>
                    ${this.model.label?.length?s`<span>${this.model.label}</span>`:""}
                </label>
            </div>
        `;this.setAttribute("state",this.state),this.className=`checkbox js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)}),r(t,this)}}o.mount("checkbox-component",l);export{l as default};
