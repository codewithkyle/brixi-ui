import{html as l,render as o}from"./lit-html.js";import{unsafeHTML as a}from"./unsafe-html.js";import c from"./supercomponent.js";import r from"./env.js";import{noop as d,parseDataset as u}from"./general.js";import h from"./soundscape.js";class n extends c{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget,s=parseInt(t.value),i=this.model.options[s].value;this.update({selected:s,value:i}),this.validate(t,!0),this.model.callback(i)};this.handleBlur=e=>{const t=e.currentTarget;this.validate(t)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={selected:null,label:"",name:"",icon:"",instructions:"",options:e?.options??[],required:!1,error:null,value:"",disabled:!1,callback:d,css:"",class:"",attributes:{}},this.model=u(this.dataset,this.model);for(let t=0;t<this.model.options.length;t++)e?.value?this.model.options[t].value===e.value&&(this.model.selected=t):this.model.options[t].value===this.model.value&&(this.model.selected=t);r.css("select").then(()=>{this.set(e,!0),this.render()})}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=l`<p>${this.model.instructions}</p>`:this.state==="ERROR"&&this.model.error?e=l`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderIcon(){let e;return this.model.icon?e=l` <i class="icon"> ${a(this.model.icon)} </i> `:e="",e}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.update({error:e}),this.trigger("ERROR"),h.error())}validate(e,t=!1){let s=!0;return this.model.required&&(this.model.value===""||this.model.value==null)?(s=!1,this.setError("This field is required.",t)):this.clearError(),s}getName(){return this.model.name}getValue(){return this.model.value}renderLabel(e){let t;return this.model.label?.length?t=l`<label for="${e}">${this.model.label}</label>`:t="",t}render(){const e=`${this.model.label.replace(/\s+/g,"-").trim()}-${this.model.name}`,t=l`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    id="${e}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                >
                    ${this.model.options.map((s,i)=>l`<option value="${i}" ?selected=${this.model.selected===i}>${s.label}</option>`)}
                </select>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </select-container>
        `;this.setAttribute("state",this.state),this.className=`select js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),o(t,this)}}r.mount("select-component",n);export{n as default};
