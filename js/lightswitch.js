import o from"./supercomponent.js";import{html as d,render as c}from"./lit-html.js";import{unsafeHTML as a}from"./unsafe-html.js";import n from"./env.js";import i from"./soundscape.js";import{noop as h,parseDataset as b}from"./general.js";class r extends o{constructor(e){super();this.handleChange=e=>{const t=e.currentTarget;this.set({enabled:t.checked}),this.model.callback(t.checked),t.checked?i.play("activate"):i.play("deactivate")};this.handleKeyup=e=>{if(e.key===" "){const t=this.querySelector("input");t.checked=!t.checked,this.classList.remove("is-active"),this.set({enabled:t.checked}),this.model.callback(t.checked),t.checked?i.play("activate"):i.play("deactivate")}};this.handleKeydown=e=>{e.key===" "&&this.classList.add("is-active")};this.model={name:"",label:"",instructions:"",enabledLabel:null,disabledLabel:null,enabled:!1,disabled:!1,callback:h,color:"success",css:"",class:"",attributes:{},value:null,required:!1},this.model=b(this.dataset,this.model),n.css("lightswitch").then(()=>{this.set(e,!0),this.render()})}getName(){return this.model.name}getValue(){return this.model.enabled?this.model.value:null}reset(){this.set({enabled:!1})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),i.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.enabled&&(e=!1,this.setError("This field is required")),e}resize(){const e=this.querySelector("light-switch"),t=e.querySelector("span:first-of-type"),s=e.querySelector("span:last-of-type"),l=this.querySelector("i");this.model.enabled?(e.style.width=`${t.scrollWidth+32}px`,t.style.transform="translateX(6px)",s.style.transform="translateX(6px)",l.style.transform="translate(6px, 2px)"):(e.style.width=`${s.scrollWidth+32}px`,t.style.transform=`translateX(-${t.scrollWidth}px)`,s.style.transform=`translateX(-${t.scrollWidth}px)`,l.style.transform=`translate(-${t.scrollWidth}px, 2px)`)}render(){this.setAttribute("color",this.model.color),this.setAttribute("form-input",""),this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const e=`${this.model.name}-${this.model.label.replace(/\s+/g,"-").trim()}`,t=d`
            <input
                @change=${this.handleChange}
                type="checkbox"
                name="${this.model.name}"
                id="${e}"
                ?disabled=${this.model.disabled}
                .checked=${this.model.enabled}
                .value=${this.model.value??""}
            />
            <label for="${e}">
                <light-switch tabindex="0" @keyup=${this.handleKeyup} @keydown=${this.handleKeydown} aria-label="${this.model.enabled?"enabled":"disabled"}">
                    <span>${this.model.enabledLabel instanceof HTMLElement?this.model.enabledLabel:a(this.model.enabledLabel)}</span>
                    <i></i>
                    <span>${this.model.disabledLabel instanceof HTMLElement?this.model.disabledLabel:a(this.model.disabledLabel)}</span>
                </light-switch>
                <div class="ml-0.75" flex="column wrap">
                    <span class="block line-snug font-sm font-medium font-grey-700">${this.model.label}</span>
                    <span class="block line-snug font-xs font-grey-500">${this.model.instructions}</span>
                </div>
            </label>
        `;c(t,this),setTimeout(this.resize.bind(this),80)}}n.bind("lightswitch-component",r);export{r as default};
