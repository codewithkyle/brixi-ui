import{html as a,render as o}from"./lit-html.js";import l from"./env.js";import{noop as n,parseDataset as h}from"./general.js";import{default as u}from"./input.js";class r extends u{constructor(e){super(e);this.handleBlur=e=>{const s=e.currentTarget,t=this.formatPhoneNumber(s.value);this.set({value:t}),this.validate(s)};this.handleFocus=e=>{this.set({value:this.model.value.toString().replace(/[\-\+\s\(\)]/g,"")})};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,css:"",class:"",callback:n,attributes:{},datalist:[],autofocus:!1},this.model=h(this.dataset,this.model),l.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,s=!1){e||(e=this.querySelector("input"));let t=!0;const i=new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",s)),(!this.model.required&&e.value.length||this.model.required)&&(i.test(`${this.model.value}`)?this.model.minlength>e.value.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s)):this.model.maxlength<e.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,s)):(t=!1,this.setError("Invalid phone number.",s))),t&&this.clearError(),t}formatPhoneNumber(e){var s=(""+e).replace(/\D/g,""),t=s.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);if(t){var i=t[1]?"+1 ":"";return[i,"(",t[2],") ",t[3],"-",t[4]].join("")}return e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,s=a`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
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
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),o(s,this)}}l.bind("phone-input-component",r);export{r as default};
