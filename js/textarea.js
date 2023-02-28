import{html as l,render as o}from"./lit-html.js";import{unsafeHTML as i}from"./unsafe-html.js";import u from"./supercomponent.js";import n from"./env.js";import{noop as r,parseDataset as h}from"./general.js";import m from"./soundscape.js";class a extends u{constructor(e){super();this.handleBlur=e=>{const t=e.currentTarget;this.validate(t),this.model.callbacks.onBlur(this.model.value)};this.handleFocus=e=>{this.model.callbacks.onFocus(this.model.value)};this.handleInput=e=>{const t=e.currentTarget;this.set({value:t.value}),this.validate(t,!0),this.model.callbacks.onInput(t.value)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:"",maxlength:1/0,minlength:0,disabled:!1,readOnly:!1,rows:5,callbacks:{onInput:r,onBlur:r,onFocus:r},css:"",class:"",attributes:{},autofocus:!1},this.model=h(this.dataset,this.model),n.css("textarea").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.set({error:e}),this.trigger("ERROR"),m.play("error"))}validate(e,t=!1){let s=!0;return this.model.required&&!e.value.length&&(s=!1,this.setError("This field is required.",t)),(this.model.required||!this.model.required&&e.value.length)&&(this.model.minlength>e.value.length?(console.log(e.value),s=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t)):this.model.maxlength<e.value.length&&(s=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t))),s&&this.clearError(),s}getName(){return this.model.name}getValue(){return this.model.value.toString()}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=l`<p>${i(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=l`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(e){let t;return this.model.label?.length?t=l`<label for="${e}">${i(this.model.label)}</label>`:t="",t}renderCounter(){let e;return this.model.maxlength===1/0?e="":e=l` <span class="counter"> ${this.model.value.length}/${this.model.maxlength} </span> `,e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=l`
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
${this.model.value}</textarea
            >
            ${this.renderCounter()}
        `;this.setAttribute("state",this.state),this.className=`textarea js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),o(t,this)}}n.bind("textarea-component",a);export{a as default};