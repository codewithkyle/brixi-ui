import{html as s,render as a}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import{cache as u}from"./cache.js";import r from"./env.js";import{parseDataset as d}from"./general.js";import c from"./soundscape.js";import h from"./component.js";import{UUID as m}from"./uuid.js";r.css("select");class o extends h{constructor(){super();this.handleChange=e=>{const t=e.currentTarget,i=parseInt(t.value),n=this.model.options[i].value;this.set({selected:i,value:n}),this.validate()};this.handleBlur=()=>{this.validate()};this.id=m(),this.state=this.dataset?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={selected:null,label:"",name:"",icon:"",instructions:"",options:[],required:!1,error:null,value:null,disabled:!1,autofocus:!1}}static get observedAttributes(){return[]}async connected(){const e=d(this.dataset,this.model);if(e?.value)for(let t=0;t<e.options.length;t++)e.options[t].value===e.value&&(e.selected=t);else e.value=e.options[0].value,e.selected=0;this.set(e)}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=s`<p>${l(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=s`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderIcon(){let e;return this.model.icon instanceof HTMLElement?e=s` <i class="icon"> ${this.model.icon} </i> `:typeof this.model.icon=="string"&&this.model.icon.length?e=s` <i class="icon"> ${l(this.model.icon)} </i> `:e="",e}clearError(){this.state==="ERROR"&&this.trigger("RESET")}reset(){this.set({selected:0,value:null})}setError(e){this.set({error:e}),this.trigger("ERROR"),c.play("error")}validate(){let e=!0;return this.model.required&&(this.model.value===""||this.model.value==null)?(e=!1,this.setError("This field is required.")):this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderLabel(){return s`<label for="${this.id}">${l(this.model.label)}</label>`}render(){this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=s`
            ${u(this.model.label?.length?this.renderLabel():"")} ${this.renderCopy()}
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    id="${this.id}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                >
                    ${this.model.options.map((t,i)=>s`<option value="${i}" ?selected=${this.model.selected===i}>${t.label}</option>`)}
                </select>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </select-container>
        `;a(e,this)}}r.bind("select-component",o);export{o as default};
