import{html as a,render as o}from"./lit-html.js";import s from"./env.js";import{noop as n,parseDataset as h}from"./general.js";import{default as d}from"./input.js";class l extends d{constructor(e){super(e);this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,css:"",class:"",callback:n,attributes:{}},this.model=h(this.dataset,this.model),s.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,i=!1){e||(e=this.querySelector("input"));let t=!0;const r=new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm);return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",i)),(this.model.required||!this.model.required&&e.value.length)&&(e.value.length&&!r.test(e.value)?(t=!1,this.setError("Invalid email format.",i)):this.model.minlength>e.value.length?(console.log(e.value),t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,i)):this.model.maxlength<e.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,i))),t&&this.clearError(),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,i=a`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
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
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),o(i,this)}}s.mount("email-input-component",l);export{l as default};
