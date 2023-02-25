import{html as o,render as n}from"./lit-html.js";import l from"./env.js";import{noop as i,parseDataset as h}from"./general.js";import{default as u}from"./input.js";class a extends u{constructor(e){super(e),this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,css:"",class:"",callbacks:{onInput:i,onFocus:i,onBlur:i},attributes:{},datalist:[],autofocus:!1},this.model=h(this.dataset,this.model),l.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,s=!1){e||(e=this.querySelector("input"));let t=!0;const r=new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm);return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",s)),(this.model.required||!this.model.required&&e.value.length)&&(e.value.length&&!r.test(e.value)?(t=!1,this.setError("Invalid email format.",s)):this.model.minlength>e.value.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s)):this.model.maxlength<e.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s))),t&&this.clearError(),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,s=o`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="email"
                    type="email"
                    id="${e}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),n(s,this)}}l.bind("email-input-component",a);export{a as default};
