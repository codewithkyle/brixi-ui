import{html as i,render as a}from"./lit-html.js";import r from"./env.js";import"./radio.js";import{parseDataset as o}from"./general.js";import{unsafeHTML as d}from"./unsafe-html.js";import l from"./soundscape.js";import n from"./component.js";r.css(["radio-group","radio"]);class s extends n{constructor(){super(),this.model={label:"",instructions:"",disabled:!1,name:"",options:[],required:!1}}static get observedAttributes(){return["data-label","data-instructions","data-disabled","data-name","data-required","data-options"]}async connected(){const e=o(this.dataset,this.model);e.options.map(t=>{t.name=e.name,t.disabled=e?.disabled??!1}),this.state=e.disabled?"DISABLED":"IDLING",this.set(e)}getName(){return this.model.name}getValue(){let e=null;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t].checked){e=this.model.options[t].value;break}return e}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;e.options[0].checked=!0,this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),l.play("error"))}validate(){let e=!0;if(this.model.required){e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t].checked){e=!0;break}e||this.setError("This field is required")}return e}render(){this.setAttribute("state",this.state),this.setAttribute("form-input","");const e=i`
            <p>
                <strong>${this.model.label}</strong>
                ${d(this.model.instructions)}
            </p>
            ${this.model.options.map(t=>i`
                    <brixi-radio
                        data-label="${t.label}"
                        data-value="${t.value}"
                        data-checked="${t.checked}"
                        data-disabled="${t.disabled}"
                        data-name="${t.name}"
                        data-required="${t.required}"
                    ></brixi-radio>
                `)}
        `;a(e,this)}}r.bind("brixi-radio-group",s);export{s as default};
