import{html as a,render as r}from"./lit-html.js";import n from"./env.js";import{default as m}from"./input.js";import{noop as d,parseDataset as o}from"./general.js";import{calcPercent as l}from"./numpy.js";class s extends m{constructor(t){super(t);this.handleInput=t=>{const i=t.currentTarget;let e=parseInt(i.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max),this.fillPercentage=l(e,this.model.max),this.update({value:e}),this.model.callback(e)};this.handleBlur=t=>{const i=t.currentTarget;let e=parseInt(i.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max),this.fillPercentage=l(e,this.model.max),this.update({value:e})};this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",autocapitalize:"off",autocomplete:"off",icon:"",placeholder:"",value:t?.min??0,minlength:0,maxlength:9999,min:0,max:9999,step:1,css:"",class:"",callback:d,attributes:{},datalist:[]},this.model=o(this.dataset,this.model),this.fillPercentage=l(this.model.value,this.model.max),n.css(["range-slider"]).then(()=>{this.set(t,!0),this.render()})}validate(t=null,i=!1){return!0}renderManualInput(){let t;return this.model.manual?t=a`
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
            `:t="",t}render(){const t=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,i=a`
            ${this.renderLabel(t)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
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
                />
                ${this.renderManualInput()}
            </input-container>
        `;this.setAttribute("state",this.state),this.className=`js-input ${this.model.class}`,this.style.cssText=this.model.css,this.style.setProperty("--track-fill",`${this.fillPercentage}%`),Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)}),r(i,this)}}n.mount("range-slider",s);export{s as default};
