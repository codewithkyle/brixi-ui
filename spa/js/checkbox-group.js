import{html as r,render as n}from"./lit-html.js";import i from"./env.js";import"./checkbox.js";import{parseDataset as d}from"./general.js";import{unsafeHTML as l}from"./unsafe-html.js";import c from"./soundscape.js";import h from"./component.js";i.css("checkbox-group");class o extends h{constructor(){super();this.handleChange=e=>{const t=this.get(),s=t.options.findIndex(a=>a.value===e.detail.value);t.options[s].checked=e.detail.checked,this.set(t),this.validate()};this.stateMachine={IDLING:{ERROR:"ERROR",DISABLED:"DISABLED"},ERROR:{RESET:"IDLING"}},this.model={label:"",instructions:"",disabled:!1,name:"",options:[],required:!1,error:""}}static get observedAttributes(){return["data-label","data-instructions","data-disabled","data-name","data-options","data-required"]}async connected(){const e=d(this.dataset,this.model);e.options.map(t=>{t.disabled=e?.disabled??!1}),this.state=e.disabled?"DISABLED":"IDLING",this.set(e)}getName(){return this.model.name}getValue(){let e=[];return this.querySelectorAll("checkbox-component").forEach(t=>{const s=t.getValue();s&&e.push(s)}),e}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),c.play("error"))}validate(){return this.state==="DISABLED"||!this.model.required?!0:this.get().options.filter(s=>s.checked).length===0?(this.setError("Please select at least one option"),!1):(this.clearError(),!0)}render(){this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=r`
            <p>
                <strong>${this.model.label}</strong>
                ${this.state==="ERROR"?this.model.error:l(this.model.instructions)}
            </p>
            ${this.model.options.map(t=>r`
                    <brixi-checkbox
                        data-label="${t?.label??""}"
                        data-value="${t?.value??""}"
                        data-checked="${t?.checked??!1}"
                        data-disabled="${t?.disabled??!1}"
                        data-name="${this.model.name}"
                        @change=${this.handleChange}
                    ></brixi-checkbox>
                `)}
        `;n(e,this)}}i.bind("brixi-checkbox-group",o);export{o as default};
