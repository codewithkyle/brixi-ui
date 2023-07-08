import{html as s,render as o}from"./lit-html.js";import{unsafeHTML as r}from"./unsafe-html.js";import u from"./supercomponent.js";import n from"./env.js";import{noop as l,parseDataset as h}from"./general.js";import m from"./soundscape.js";class a extends u{constructor(e){super();this.handleBlur=()=>{this.validate(),this.model.callbacks?.onBlur&&typeof this.model.callbacks?.onBlur=="function"&&this.model.callbacks?.onBlur(this.model.value)};this.handleFocus=()=>{this.model.callbacks?.onFocus&&typeof this.model.callbacks?.onFocus=="function"&&this.model.callbacks?.onFocus(this.model.value)};this.handleInput=e=>{const t=e.currentTarget;this.set({value:t.value}),this.validate(),this.model.callbacks?.onInput&&typeof this.model.callbacks?.onInput=="function"&&this.model.callbacks?.onInput(t.value)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:null,maxlength:1/0,minlength:0,disabled:!1,readOnly:!1,rows:5,callbacks:{onInput:l,onBlur:l,onFocus:l},css:"",class:"",attributes:{},autofocus:!1},this.model=h(this.dataset,this.model),n.css("textarea").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}reset(){this.set({value:null});const e=this.querySelector("input");e&&(e.value=null)}setError(e){this.set({error:e}),this.trigger("ERROR"),m.play("error")}validate(){let e=!0;return this.model.required&&!this.model.value?.length&&(e=!1,this.setError("This field is required.")),(this.model.required||!this.model.required&&this.model.value?.length)&&(this.model.minlength>this.model.value.length?(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`)):this.model.maxlength<this.model.value.length&&(e=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`))),e&&this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=s`<p>${r(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=s`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(e){let t;return this.model.label?.length?t=s`<label for="${e}">${r(this.model.label)}</label>`:t="",t}renderCounter(){let e;return this.model.maxlength===1/0?e="":e=s` <span class="counter"> ${this.model.value?.length??0}/${this.model.maxlength} </span> `,e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`;this.setAttribute("state",this.state),this.setAttribute("form-input",""),this.className=`textarea ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)});const t=s`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
                @focus=${this.handleFocus}
                placeholder="${this.model.placeholder}"
                autocomplete="${this.model.autocomplete}"
                rows="${this.model.rows}"
                maxlength="${this.model.maxlength!==1/0?this.model.maxlength:9999}"
                minlength="${this.model.minlength}"
                name="${this.model.name}"
                id="${e}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
                ?autofocus=${this.model.autofocus}
            >
${this.model.value??""}</textarea
            >
            ${this.renderCounter()}
        `;o(t,this)}}n.bind("textarea-component",a);export{a as default};
