import{html as n,render as l}from"./lit-html.js";import o from"./supercomponent.js";import i from"./env.js";import{noop as r,parseDataset as c}from"./general.js";class a extends o{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.model.callback(t.checked)};this.model={label:"",required:!1,name:"",checked:!1,disabled:!1,callback:r,css:"",class:"",attributes:{}},this.model=c(this.dataset,this.model),i.css("radio").then(()=>{this.set(e,!0),this.render()})}getName(){return this.model.name}getValue(){return this.querySelector("input").checked}validate(){return!0}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=n`
            <div class="inline-block mr-auto">
                <input @change=${this.handleChange} type="radio" name="${this.model.name}" id="${e}" ?checked=${this.model.checked} ?disabled=${this.model.disabled} />
                <label sfx="button" for="${e}">
                    <i tabindex="0" role="button" aria-label=${`click to ${this.model.checked?"uncheck":"check"} the option ${this.model.label}`}></i>
                    <span>${this.model.label}</span>
                </label>
            </div>
        `;this.setAttribute("state",this.state),this.className=`radio js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),l(t,this)}}i.bind("radio-component",a);export{a as default};
