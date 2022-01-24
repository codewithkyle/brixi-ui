import{html as r,render as a}from"./lit-html.js";import s from"./env.js";import{noop as n,parseDataset as m}from"./general.js";import{default as o}from"./input.js";class l extends o{constructor(e){super(e);this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",instructions:null,readOnly:!1,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",maxlength:9999,minlength:0,min:0,max:9999,step:1,disabled:!1,css:"",class:"",callback:n,attributes:{}},this.model=m(this.dataset,this.model),s.css("input").then(()=>{this.set(e,!0),this.render()})}validate(e=null,i=!1){e||(e=this.querySelector("input"));let t=!0;return this.model.required&&!e.value.length&&(t=!1,this.setError("This field is required.",i)),(this.model.required||!this.model.required&&e.value.length)&&(parseFloat(e.value)<this.model.min?(t=!1,this.setError(`Minimum allowed number is ${this.model.min}.`,i)):parseFloat(e.value)>this.model.max&&(t=!1,this.setError(`Maximum allowed number is ${this.model.max}.`,i))),t&&this.clearError(),t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,i=r`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="numeric"
                    type="number"
                    id="${e}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                />
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),a(i,this)}}s.mount("number-input-component",l);export{l as default};
