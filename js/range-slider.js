import{html as a,render as m}from"./lit-html.js";import n from"./env.js";import{default as o}from"./input.js";import{noop as i,parseDataset as u}from"./general.js";import{calcPercent as s}from"./numpy.js";class r extends o{constructor(t){super(t);this.handleInput=t=>{const l=t.currentTarget;let e=parseInt(l.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max),this.fillPercentage=s(e,this.model.max),this.set({value:e}),this.model.callbacks.onInput(e)};this.handleBlur=t=>{const l=t.currentTarget;let e=parseInt(l.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max),this.fillPercentage=s(e,this.model.max),this.set({value:e}),this.model.callbacks.onBlur(e)};this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",autocapitalize:"off",autocomplete:"off",icon:"",placeholder:"",value:t?.min??0,minlength:0,maxlength:9999,min:0,max:9999,step:1,css:"",class:"",callbacks:{onInput:i,onFocus:i,onBlur:i},attributes:{},datalist:[],autofocus:!1},this.model=u(this.dataset,this.model),this.fillPercentage=s(this.model.value,this.model.max),n.css(["range-slider"]).then(()=>{this.set(t,!0),this.render()})}validate(t=null,l=!1){return!0}renderManualInput(){let t="";return this.model.manual&&(t=a`
                <input
                    aria-label="manual range input for ${this.model.label}"
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="numeric"
                    type="number"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                />
            `),t}render(){const t=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,l=a`
            ${this.renderLabel(t)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="range"
                    id="${t}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                ${this.renderManualInput()}
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`js-input ${this.model.class}`,this.style.cssText=this.model.css,this.style.setProperty("--track-fill",`${this.fillPercentage}%`),Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)}),m(l,this)}}n.bind("range-slider",r);export{r as default};
