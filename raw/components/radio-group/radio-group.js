import{html as i,render as s}from"./lit-html.js";import r from"./env.js";import"./radio.js";import{parseDataset as a}from"./general.js";import{unsafeHTML as d}from"./unsafe-html.js";import l from"./soundscape.js";import n from"./component.js";r.css(["radio-group","radio"]);class o extends n{constructor(){super(),this.model={label:"",instructions:"",disabled:!1,name:"",options:[],required:!1}}static get observedAttributes(){return["data-label","data-instructions","data-disabled","data-name","data-required","data-options"]}async connected(){const e=a(this.dataset,this.model);e.options.map(t=>{t.name=e.name,t.disabled=e?.disabled??!1}),this.set(e)}getName(){return this.model.name}getValue(){let e=null;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t].checked){e=this.model.options[t].value;break}return e}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;e.options[0].checked=!0,this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),l.play("error"))}validate(){let e=!0;if(this.model.required){e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t].checked){e=!0;break}e||this.setError("This field is required")}return e}render(){this.setAttribute("form-input","");const e=i`
            <p>
                <strong>${this.model.label}</strong>
                ${d(this.model.instructions)}
            </p>
            ${this.model.options.map(t=>i`
                    <radio-component
                        data-label="${t.label}"
                        data-value="${t.value}"
                        data-checked="${t.checked}"
                        data-disabled="${t.disabled}"
                        data-name="${t.name}"
                        data-required="${t.required}"
                    ></radio-component>
                `)}
        `;s(e,this)}}r.bind("radio-group",o);export{o as default};
