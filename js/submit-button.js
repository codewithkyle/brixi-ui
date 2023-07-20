import{html as e,render as n}from"./lit-html.js";import{unsafeHTML as l}from"./unsafe-html.js";import s from"./env.js";import{parseDataset as a}from"./general.js";import o from"./spinner.js";import r from"./component.js";s.css(["submit-button","button"]);class i extends r{constructor(){super();this.handleClick=()=>{this.state!=="SUBMITTING"&&this.dispatchEvent(new CustomEvent("submit",{bubbles:!0}))};this.state="IDLING",this.stateMachine={IDLING:{START:"SUBMITTING"},SUBMITTING:{START:"SUBMITTING",STOP:"IDLING"}},this.model={label:"Submit",submittingLabel:"",size:"default",icon:"",disabled:!1}}static get observedAttributes(){return["data-label","data-size","data-icon","data-disabled"]}async connected(){const t=a(this.dataset,this.model);this.set(t)}renderIcon(){let t="";return this.state==="SUBMITTING"?t=new o({size:16,class:"mr-0.5"}):this.model.icon?.length?t=e`${l(this.model.icon)}`:t="",t}renderLabel(){let t="";return this.state==="SUBMITTING"&&this.model.submittingLabel?.length?t=e`<span>${this.model.submittingLabel}</span>`:this.model.label?.length?t=e`<span>${this.model.label}</span>`:t="",t}render(){this.setAttribute("state",this.state);const t=e`
            <button
                @click=${this.handleClick}
                class="bttn"
                color="primary"
                size="${this.model.size}"
                kind="solid"
                type="submit"
                icon=${this.model.icon||this.state==="SUBMITTING"?"left":""}
                sfx="button"
                ?disabled=${this.model.disabled||this.state==="SUBMITTING"}
            >
                ${this.renderIcon()} ${this.renderLabel()}
            </button>
        `;n(t,this)}}s.bind("submit-button",i);export{i as default};
