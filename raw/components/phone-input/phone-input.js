import{html as a,render as n}from"./lit-html.js";import l from"./env.js";import{noop as o,parseDataset as h}from"./general.js";import{default as u}from"./input.js";class r extends u{constructor(e){super(e);this.handleBlur=e=>{const i=e.currentTarget,t=this.formatPhoneNumber(i.value);this.update({value:t}),this.validate(i)};this.handleFocus=e=>{this.update({value:this.model.value.toString().replace(/[\-\+\s\(\)]/g,"")})};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,css:"",class:"",callback:o,attributes:{},datalist:[]},this.model=h(this.dataset,this.model),l.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,i=!1){e||(e=this.querySelector("input"));let t=!0;const s=new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",i)),(!this.model.required&&e.value.length||this.model.required)&&(s.test(`${this.model.value}`)?this.model.minlength>e.value.length?(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,i)):this.model.maxlength<e.value.length&&(t=!1,this.setError(`This input requires a least ${this.model.minlength} characters.`,i)):(t=!1,this.setError("Invalid phone number.",i))),t&&this.clearError(),t}formatPhoneNumber(e){var i=(""+e).replace(/\D/g,""),t=i.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);if(t){var s=t[1]?"+1 ":"";return[s,"(",t[2],") ",t[3],"-",t[4]].join("")}return e}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,i=a`
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
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),n(i,this)}}l.mount("phone-input-component",r);export{r as default};
