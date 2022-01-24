import{html as s,render as a}from"./lit-html.js";import n from"./supercomponent.js";import l from"./env.js";import{noop as o,parseDataset as h}from"./general.js";import u from"./soundscape.js";class i extends n{constructor(e){super();this.handleBlur=e=>{const t=e.currentTarget;this.validate(t)};this.handleInput=e=>{const t=e.currentTarget;this.update({value:t.value}),this.validate(t,!0),this.model.callback(t.value)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",placeholder:"",value:"",maxlength:9999,minlength:0,disabled:!1,readOnly:!1,rows:5,callback:o,css:"",class:"",attributes:{}},this.model=h(this.dataset,this.model),l.css("textarea").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.update({error:e}),this.trigger("ERROR"),u.error())}validate(e,t=!1){let r=!0;return this.model.required&&!e.value.length&&(r=!1,this.setError("This field is required.",t)),(this.model.required||!this.model.required&&e.value.length)&&(this.model.minlength>e.value.length?(console.log(e.value),r=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t)):this.model.maxlength<e.value.length&&(r=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,t))),r&&this.clearError(),r}getName(){return this.model.name}getValue(){return this.model.value.toString()}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=s`<p>${this.model.instructions}</p>`:this.state==="ERROR"&&this.model.error?e=s`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderLabel(e){let t;return this.model.label?.length?t=s`<label for="${e}">${this.model.label}</label>`:t="",t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=s`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
                placeholder="${this.model.placeholder}"
                autocomplete="${this.model.autocomplete}"
                rows="${this.model.rows}"
                maxlength="${this.model.maxlength}"
                minlength="${this.model.minlength}"
                name="${this.model.name}"
                id="${e}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
            ></textarea>
        `;this.setAttribute("state",this.state),this.className=`textarea js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(r=>{this.setAttribute(r,`${this.model.attributes[r]}`)}),a(t,this)}}l.mount("textarea-component",i);export{i as default};
