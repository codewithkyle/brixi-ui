import{html as n,render as a}from"./lit-html.js";import s from"./env.js";import"./button.js";import{parseDataset as r}from"./general.js";import d from"./component.js";s.css(["toggle-button","button"]);class o extends d{constructor(){super();this.handleClick=t=>{t.preventDefault(),t.stopPropagation();const i=new CustomEvent("change",{detail:{id:this.model.buttons[this.model.states[this.model.index]].id},bubbles:!0,cancelable:!0}),e=this.get();e.index++,e.index>=e.states.length&&(e.index=0),e.state=e.states[e.index],this.set(e),this.dispatchEvent(i)};this.model={state:null,states:[],buttons:{},instructions:"",index:0}}static get observedAttributes(){return["data-state","data-states","data-buttons","data-instructions","data-index"]}async connected(){const t=r(this.dataset,this.model);this.set(t),this.addEventListener("click",this.handleClick,{passive:!1,capture:!0})}renderButton(){const t=this.model.buttons[this.model.state];return n`
            <button-component
                data-label="${t?.label??""}"
                data-icon="${t?.icon??""}"
                data-color="${t?.color??"grey"}"
                data-size="${t?.size??"default"}"
                data-shape="${t?.shape??"default"}"
                data-kind="${t?.kind??"solid"}"
                data-icon-position="${t?.iconPosition??"left"}"
            ></button-component>
        `}renderInstructions(){let t;return this.model.instructions.length?t=n` <p>${this.model.instructions}</p> `:t="",t}render(){const t=n` ${this.renderInstructions()} ${this.renderButton()} `;a(t,this)}}s.bind("toggle-button",o);export{o as default};
