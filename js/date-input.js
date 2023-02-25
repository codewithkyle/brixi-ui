import{html as n,render as o}from"./lit-html.js";import s from"./env.js";import d from"./flatpickr.js";import{noop as i,parseDataset as m}from"./general.js";import{default as u}from"./input.js";class r extends u{constructor(e){super(e);this.handleInput=e=>{const t=e.currentTarget;this.set({prevValue:this.model.value.toString(),value:t.value}),this.validate(t,!0),this.model.mode==="range"?(this.model.value.toString().search(/\bto\b/i)!==-1||this.model.prevValue===this.model.value)&&this.model.callbacks.onInput(t.value):this.model.mode==="single"&&this.model.callbacks.onInput(t.value)};this.firstRender=!0,this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={readOnly:!1,label:"",instructions:null,error:null,name:"",required:!1,autocomplete:"off",autocapitalize:"off",icon:null,placeholder:"",value:"",disabled:!1,maxlength:9999,minlength:0,dateFormat:"Z",displayFormat:"F j, Y",enableTime:!1,minDate:null,maxDate:null,mode:"single",disableCalendar:!1,timeFormat:"12",css:"",class:"",callbacks:{onInput:i,onFocus:i,onBlur:i},attributes:{},prevValue:null,datalist:[],autofocus:!1},this.model=m(this.dataset,this.model),s.css(["input","flatpickr"]).then(()=>{this.set(e,!0),this.render()})}validate(e=null,t=!1){e||(e=this.querySelector("input"));let a=!0;return this.model.required&&!e.value.length?(a=!1,this.setError("This field is required.",t)):this.clearError(),a}render(){if(this.model.mode==="range"&&!this.firstRender)return;const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=n`
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
        `;this.setAttribute("state",this.state),this.className=`input js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(l=>{this.setAttribute(l,`${this.model.attributes[l]}`)}),o(t,this);const a=this.querySelector("input");d(a,{dateFormat:this.model.dateFormat,enableTime:this.model.enableTime,altFormat:this.model.displayFormat,altInput:!0,minDate:this.model.minDate,maxDate:this.model.maxDate,mode:this.model.mode,noCalendar:this.model.disableCalendar,time_24hr:this.model.timeFormat==="24"}),this.firstRender=!1}}s.bind("date-input-component",r);export{r as default};
