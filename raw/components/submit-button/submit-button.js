import{html as e,render as n}from"./lit-html.js";import{unsafeHTML as o}from"./unsafe-html.js";import r from"./supercomponent.js";import i from"./env.js";import{noop as a,parseDataset as m}from"./general.js";import u from"./spinner.js";class l extends r{constructor(t){super();this.handleClick=()=>{this.model.callback()};this.state="IDLING",this.stateMachine={IDLING:{START:"SUBMITTING"},SUBMITTING:{START:"SUBMITTING",STOP:"IDLING"}},this.model={label:"",size:"default",icon:"",callback:a,tooltip:null,css:"",class:"",attributes:{},disabled:!1},this.model=m(this.dataset,this.model),i.css(["submit-button","button"]).then(()=>{this.set(t,!0),this.render()})}renderIcon(){let t="";return this.state==="SUBMITTING"?t=new u({size:16,class:"mr-0.5"}):this.model.icon.length?t=e`${o(this.model.icon)}`:t="",t}renderLabel(){let t="";return this.model.label.length?t=e`<span>${this.model.label}</span>`:t="",t}render(){this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),this.setAttribute("state",this.state);const t=e`
            <button
                @click=${this.handleClick}
                class="bttn"
                color="primary"
                size="${this.model.size}"
                kind="solid"
                type="submit"
                icon=${this.model.icon||this.state==="SUBMITTING"?"left":""}
                ?tooltip=${this.model.tooltip}
                sfx="button"
                ?disabled=${this.model.disabled||this.state==="SUBMITTING"}
            >
                ${this.renderIcon()} ${this.renderLabel()}
            </button>
        `;n(t,this)}}i.bind("submit-button",l);export{l as default};
