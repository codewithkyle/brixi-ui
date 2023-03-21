import{html as l,render as r}from"./lit-html.js";import n from"./supercomponent.js";import s from"./env.js";import{noop as o,parseDataset as d}from"./general.js";import c from"./soundscape.js";class a extends n{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.model.callback(t.checked)};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.handleKeyup=e=>{if(e.key===" "){this.classList.remove("is-active");const t=this.querySelector("input");t.checked=!t.checked,this.set({checked:t.checked}),this.model.callback(!0)}};this.model={label:"",required:!1,name:"",checked:!1,disabled:!1,callback:o,css:"",class:"",attributes:{},value:null},this.model=d(this.dataset,this.model),s.css("radio").then(()=>{this.set(e,!0),this.render()})}getName(){return this.model.name}getValue(){return this.model.checked?this.model.value:null}reset(){this.set({checked:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),c.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.checked&&(e=!1,this.setError("This field is required")),e}render(){this.setAttribute("state",this.state),this.className=`radio js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)}),this.setAttribute("form-input","");const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=l`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="radio"
                    name="${this.model.name}"
                    id="${e}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value??""}
                />
                <label sfx="button" for="${e}">
                    <i
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        tabindex="0"
                        role="button"
                        aria-label=${`click to ${this.model.checked?"uncheck":"check"} the option ${this.model.label}`}
                    ></i>
                    <span>${this.model.label}</span>
                </label>
            </div>
        `;r(t,this)}}s.bind("radio-component",a);export{a as default};
