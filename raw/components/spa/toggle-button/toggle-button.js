import{html as e,render as i}from"./lit-html.js";import n from"./env.js";import"./button.js";import{parseDataset as o}from"./general.js";import r from"./component.js";n.css(["toggle-button","button"]);class s extends r{constructor(){super();this.handleAction=t=>{t.stopImmediatePropagation()};this.handleClick=()=>{this.dispatchEvent(new CustomEvent("action",{detail:{id:this.model.buttons[this.model.states[this.model.index]].id},bubbles:!0,cancelable:!0}));const t=this.get();t.index++,t.index>=t.states.length&&(t.index=0),t.state=t.states[t.index],this.set(t)};this.model={state:null,states:[],buttons:{},instructions:"",index:0}}static get observedAttributes(){return["data-state","data-states","data-buttons","data-instructions","data-index"]}async connected(){const t=o(this.dataset,this.model);this.set(t)}renderButton(){const t=this.model.buttons[this.model.state];return e`
            <brixi-button
                data-label="${t?.label??""}"
                data-icon="${t?.icon??""}"
                data-color="${t?.color??"grey"}"
                data-size="${t?.size??"default"}"
                data-shape="${t?.shape??"default"}"
                data-kind="${t?.kind??"solid"}"
                data-icon-position="${t?.iconPosition??"left"}"
                @click="${this.handleClick}"
                @action=${this.handleAction}
            ></brixi-button>
        `}renderInstructions(){let t;return this.model.instructions.length?t=e` <p>${this.model.instructions}</p> `:t="",t}render(){const t=e` ${this.renderInstructions()} ${this.renderButton()} `;i(t,this)}}n.bind("brixi-toggle-button",s);export{s as default};
