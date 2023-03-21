import{html as r,render as a}from"./lit-html.js";import o from"./supercomponent.js";import l from"./env.js";import{noop as c,parseDataset as h}from"./general.js";import i from"./soundscape.js";class n extends o{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.set({checked:t.checked}),this.model.callback(t.checked),t.checked?i.play("click"):i.play("hover")};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){this.classList.remove("is-active");const t=this.querySelector("input"),s=!t.checked;this.set({checked:s}),this.model.callback(s,t.name),s?i.play("click"):i.play("hover")}};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",required:!1,name:"",checked:!1,error:"",disabled:!1,callback:c,css:"",class:"",attributes:{},type:"check",value:null},this.model=h(this.dataset,this.model),l.css("checkbox").then(()=>{this.set(e,!0),this.render()})}connected(){this.addEventListener("click",e=>{e.stopImmediatePropagation()})}getName(){return this.model.name}getValue(){return this.model.checked?this.model.value:null}reset(){this.set({checked:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),i.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1,this.setError("This field is required")),e}renderIcon(){switch(this.model.type){case"line":return r`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>`;default:return r`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`}}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.setAttribute("form-input",""),this.className=`checkbox ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=r`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="checkbox"
                    name="${this.model.name}"
                    id="${e}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value??""}
                />
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
                    ${this.model.label?.length?r`<span>${this.model.label}</span>`:""}
                </label>
            </div>
        `;a(t,this)}}l.bind("checkbox-component",n);export{n as default};
