import{html as s,render as a}from"./lit-html.js";import r from"./env.js";import"./checkbox.js";import{parseDataset as n}from"./general.js";import{unsafeHTML as c}from"./unsafe-html.js";import l from"./soundscape.js";import d from"./component.js";r.css("checkbox-group");class i extends d{constructor(){super(),this.model={label:"",instructions:"",disabled:!1,name:"",options:[]}}static get observedAttributes(){return["data-label","data-instructions","data-disabled","data-name","data-options"]}async connected(){const e=n(this.dataset,this.model);e.options.map(t=>{t.disabled=e?.disabled??!1}),this.set(e)}getName(){return this.model.name}getValue(){let e=[];return this.querySelectorAll("checkbox-component").forEach(t=>{const o=t.getValue();o&&e.push(o)}),e}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),l.play("error"))}render(){this.setAttribute("form-input","");const e=s`
            <p>
                <strong>${this.model.label}</strong>
                ${c(this.model.instructions)}
            </p>
            ${this.model.options.map(t=>s`
                    <checkbox-component
                        data-label="${t?.label??""}"
                        data-value="${t?.value??""}"
                        data-checked="${t?.checked??!1}"
                        data-disabled="${t?.disabled??!1}"
                        data-name="${this.model.name}"
                    ></checkbox-component>
                `)}
        `;a(e,this)}}r.bind("checkbox-group",i);export{i as default};
