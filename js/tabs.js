import{html as n,render as o}from"./lit-html.js";import s from"./env.js";import{parseDataset as r}from"./general.js";import{unsafeHTML as h}from"./unsafe-html.js";import u from"./sortablejs.js";import"./button.js";import{UUID as m}from"./uuid.js";import l from"./component.js";s.css(["tabs","button"]);class d extends l{constructor(){super();this.handleClick=t=>{t.stopImmediatePropagation();const{value:e,index:a}=t.detail;this.callback(e,a)};this.firstRender=!0,this.model={tabs:[],active:0,sortable:!1,expandable:!1,shrinkable:!1}}static get observedAttributes(){return["data-tabs","data-active","data-sortable","data-expandable","data-shrinkable"]}async connected(){const t=r(this.dataset,this.model);this.set(t)}getOrder(){const t=[];return this.querySelectorAll("tab-component").forEach(e=>{t.push(e.model.value)}),t}callback(t,e){this.set({active:e}),this.dispatchEvent(new CustomEvent("change",{detail:{value:t}}))}sort(){const t=this.querySelector("tabs-container");u.create(t,{animation:150,onUpdate:()=>{const e=this.getOrder();this.dispatchEvent(new CustomEvent("sort",{detail:{values:e}}))}}),t.addEventListener("sort",e=>{e.stopImmediatePropagation()}),t.addEventListener("change",e=>{e.stopImmediatePropagation()})}addTab(){const t=window.prompt("New Tab Label");if(t!=null&&t.trim()!==""){const e=m();this.dispatchEvent(new CustomEvent("add",{detail:{label:t.trim(),value:e}}));const a={label:t,value:e},i=this.get();i.tabs.push(a),this.set(i),this.callback(e,i.tabs.length-1)}}resetIndexes(){this.querySelectorAll("tab-component").forEach((t,e)=>{t.setAttribute("data-index",e.toString())})}renderAddButton(){let t;return this.model.expandable?t=n`
                <button-component
                    data-kind="text"
                    data-color="grey"
                    data-icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
                    data-icon-position="center"
                    data-shape="round"
                    style="margin-bottom:6px;"
                    @click=${this.addTab.bind(this)}
                ></button-component>
            `:t="",t}render(){const t=n`
            <tabs-container>
                ${this.model.tabs.map((e,a)=>{const i=a===this.model.active;return n`
                        <tab-component
                            data-label=${e.label}
                            data-value=${e.value}
                            data-icon=${e.icon}
                            data-active=${i}
                            data-index=${a}
                            @tab=${this.handleClick}
                        ></tab-component>
                    `})}
            </tabs-container>
            ${this.renderAddButton()}
        `;o(t,this),this.model.sortable&&this.firstRender&&(this.firstRender=!1,this.sort())}}class p extends l{constructor(){super();this.handleClick=()=>{this.dispatchEvent(new CustomEvent("tab",{detail:{value:this.model.value,index:this.model.index},bubbles:!0,cancelable:!0}))};this.model={label:"",value:"",icon:"",active:!1,index:0},this.render()}static get observedAttributes(){return["data-label","data-value","data-icon","data-active","data-index","data-index"]}async connected(){const t=r(this.dataset,this.model);this.set(t),this.addEventListener("click",this.handleClick)}disconnected(){this.removeEventListener("click",this.handleClick)}renderIcon(){let t;return this.model?.icon?.length?t=n` <i> ${h(decodeURI(this.model.icon))} </i> `:t="",t}render(){const t=n`<span>${this.renderIcon()} ${this.model.label}</span>`;this.tabIndex=0,this.setAttribute("sfx","button"),this.className=`${this.model.active?"is-active":""} ${this.model?.icon?"has-icon":""}`,this.setAttribute("role","button"),this.setAttribute("aria-label",`Open ${this.model.label}`),o(t,this)}}s.bind("tab-component",p),s.bind("tabs-component",d);export{d as default};
