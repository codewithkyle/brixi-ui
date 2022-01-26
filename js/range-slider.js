import{html as a,render as m}from"./lit-html.js";import s from"./env.js";import{default as o}from"./input.js";import{noop as d,parseDataset as u}from"./general.js";import{calcPercent as n}from"./numpy.js";class r extends o{constructor(t){super(t);this.handleInput=t=>{const i=t.currentTarget;let e=parseInt(i.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max);const l=n(e,this.model.max);this.style.setProperty("--track-fill",`${l}%`),this.update({value:e}),this.model.callback(e)};this.handleBlur=t=>{const i=t.currentTarget;let e=parseInt(i.value);isNaN(e)&&(e=this.model.min),e<this.model.min?e=this.model.max:e>this.model.max&&(e=this.model.max);const l=n(e,this.model.max);this.style.setProperty("--track-fill",`${l}%`),this.update({value:e})};this.model={manual:!1,label:"",name:"",instructions:"",readOnly:!1,required:!1,disabled:!1,error:"",autocapitalize:"off",autocomplete:"off",icon:"",placeholder:"",value:t?.min??0,minlength:0,maxlength:9999,min:0,max:9999,step:1,css:"",class:"",callback:d,attributes:{},datalist:[]},this.model=u(this.dataset,this.model),s.css(["range-slider"]).then(()=>{this.set(t,!0),this.render()}),this.style.setProperty("--track-fill",`${n(t?.value??0,t.max)}%`)}validate(t=null,i=!1){return!0}renderManualInput(){let t;return this.model.manual?t=a`
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
        `;this.setAttribute("state",this.state),this.className=`js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)}),m(i,this)}}s.mount("range-slider",r);export{r as default};
