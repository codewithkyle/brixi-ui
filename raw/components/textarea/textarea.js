import{html as s,render as a}from"./lit-html.js";import{unsafeHTML as n}from"./unsafe-html.js";import o from"./supercomponent.js";import l from"./env.js";import{noop as h,parseDataset as u}from"./general.js";import m from"./soundscape.js";class i extends o{constructor(e){super();this.handleBlur=e=>{const t=e.currentTarget;this.validate(t)};this.handleInput=e=>{const t=e.currentTarget;this.update({value:t.value}),this.validate(t,!0),this.model.callback(t.value)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:"",maxlength:1/0,minlength:0,disabled:!1,readOnly:!1,rows:5,callback:h,css:"",class:"",attributes:{}},this.model=u(this.dataset,this.model),l.css("textarea").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.update({error:e}),this.trigger("ERROR"),m.error())}validate(e,t=!1){let r=!0;return this.model.required&&!e.value.length&&(r=!1,this.setError("This field is required.",t)),(this.model.required||!this.model.required&&e.value.length)&&(this.model.minlength>e.value.length?(console.log(e.value),r=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t)):this.model.maxlength<e.value.length&&(r=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t))),r&&this.clearError(),r}getName(){return this.model.name}getValue(){return this.model.value.toString()}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=s`<p>${n(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=s`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(e){let t;return this.model.label?.length?t=s`<label for="${e}">${this.model.label}</label>`:t="",t}renderCounter(){let e;return this.model.maxlength===1/0?e="":e=s` <span class="counter"> ${this.model.value.length}/${this.model.maxlength} </span> `,e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=s`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
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
            >
${this.model.value}</textarea
            >
            ${this.renderCounter()}
        `;this.setAttribute("state",this.state),this.className=`textarea js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(r=>{this.setAttribute(r,`${this.model.attributes[r]}`)}),a(t,this)}}l.mount("textarea-component",i);export{i as default};
