import{html as l,render as n}from"./lit-html.js";import{unsafeHTML as a}from"./unsafe-html.js";import o from"./supercomponent.js";import r from"./env.js";import{noop as u,parseDataset as h}from"./general.js";import m from"./soundscape.js";class s extends o{constructor(e){super();this.handleBlur=e=>{const t=e.currentTarget;this.validate(t)};this.handleInput=e=>{const t=e.currentTarget;this.update({value:t.value}),this.validate(t,!0),this.model.callback(t.value)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",maxlength:9999,minlength:0,disabled:!1,readOnly:!1,callback:u,css:"",class:"",attributes:{}},this.model=h(this.dataset,this.model),r.css("input").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.update({error:e}),this.trigger("ERROR"),m.error())}validate(e=null,t=!1){e||(e=this.querySelector("input"));let i=!0;return this.model.required&&!e.value.length&&(i=!1,this.setError("This field is required.",t)),(this.model.required||!this.model.required&&e.value.length)&&(this.model.minlength>e.value.length?(i=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t)):this.model.maxlength<e.value.length&&(i=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t))),i&&this.clearError(),i}getName(){return this.model.name}getValue(){return this.model.value}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=l`<p>${this.model.instructions}</p>`:this.state==="ERROR"&&this.model.error?e=l`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderIcon(){let e;return this.model.icon?e=l` <i> ${a(this.model.icon)} </i> `:e="",e}renderLabel(e){let t;return this.model.label?.length?t=l`<label for="${e}">${this.model.label}</label>`:t="",t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=l`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    type="text"
                    id="${e}"
                    maxlength=${this.model.maxlength}
                    minlength="${this.model.minlength}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)}),n(t,this)}}r.mount("input-component",s);export{s as default};
