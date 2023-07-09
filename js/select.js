import{html as s,render as d}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import{cache as u}from"./cache.js";import o from"./env.js";import{parseDataset as c}from"./general.js";import h from"./soundscape.js";import m from"./component.js";import{UUID as p}from"./uuid.js";o.css("select");class n extends m{constructor(){super();this.handleChange=e=>{const t=e.currentTarget,i=parseInt(t.value),r=this.model.options[i].value;this.set({selected:i,value:r}),this.validate();const a=new CustomEvent("change",{detail:{value:r}});this.dispatchEvent(a)};this.handleBlur=()=>{this.validate()};this.id=p(),this.state=this.dataset?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED",ENABLE:"IDLING"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING",DISABLE:"DISABLED"}},this.model={selected:null,label:"",name:"",icon:"",instructions:"",options:[],required:!1,error:null,value:null,disabled:!1,autofocus:!1}}static get observedAttributes(){return["data-label","data-icon","data-instructions","data-options","data-required","data-name","data-value","data-disabled","data-autofocus"]}async connected(){const e=c(this.dataset,this.model);if(e?.value)for(let t=0;t<e.options.length;t++)e.options[t].value===e.value&&(e.selected=t);else e.value=e.options[0].value,e.selected=0;e?.error&&(this.state="ERROR"),e?.disabled&&(this.state="DISABLED"),e?.autofocus&&document?.activeElement?.blur(),this.set(e)}renderCopy(){let e;return this.state==="ERROR"&&this.model.error?.length?e=s`<p class="font-danger-700">${this.model.error}</p>`:this.model.instructions?.length?e=s`<p>${l(this.model.instructions)}</p>`:e="",e}renderIcon(){let e;return this.model.icon instanceof HTMLElement?e=s` <i class="icon"> ${this.model.icon} </i> `:typeof this.model.icon=="string"&&this.model.icon.length?e=s` <i class="icon"> ${l(this.model.icon)} </i> `:e="",e}clearError(){this.state==="ERROR"&&(this.set({error:null}),this.trigger("RESET"))}reset(){this.set({selected:0,value:null})}setError(e){this.set({error:e}),this.trigger("ERROR"),h.play("error")}validate(){let e=!0;return this.model.required&&(this.model.value===""||this.model.value==null)?(e=!1,this.setError("This field is required.")):this.clearError(),e}getName(){return this.model.name}getValue(){return this.model.value}renderLabel(){return s`<label for="${this.id}">${l(this.model.label)}</label>`}render(){this.state!=="DISABLED"&&this.model.disabled?this.trigger("DISABLE"):this.state==="DISABLED"&&!this.model.disabled&&this.trigger("ENABLE"),this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=s`
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
        `;d(e,this)}}o.bind("select-component",n);export{n as default};
