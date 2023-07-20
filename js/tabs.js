import{html as i,render as r}from"./lit-html.js";import s from"./env.js";import{parseDataset as o}from"./general.js";import{unsafeHTML as u}from"./unsafe-html.js";import h from"./sortablejs.js";import"./button.js";import{UUID as m}from"./uuid.js";import l from"./component.js";s.css(["tabs","button"]);class d extends l{constructor(){super();this.handleClick=e=>{e.stopImmediatePropagation();const{value:t,index:a}=e.detail;this.callback(t,a)};this.firstRender=!0,this.model={tabs:[],active:0,sortable:!1,expandable:!1,shrinkable:!1}}static get observedAttributes(){return["data-tabs","data-active","data-sortable","data-expandable","data-shrinkable"]}async connected(){const e=o(this.dataset,this.model);this.set(e)}getOrder(){const e=[];return this.querySelectorAll("tab-component").forEach(t=>{e.push(t.model.value)}),e}callback(e,t){this.set({active:t}),this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,cancelable:!0}))}sort(){const e=this.querySelector("tabs-container");h.create(e,{animation:150,onUpdate:()=>{const t=this.getOrder();this.dispatchEvent(new CustomEvent("sort",{detail:{values:t},bubbles:!0,cancelable:!0}))}}),e.addEventListener("sort",t=>{t.stopImmediatePropagation()}),e.addEventListener("change",t=>{t.stopImmediatePropagation()})}addTab(){const e=window.prompt("New Tab Label");if(e!=null&&e.trim()!==""){const t=m();this.dispatchEvent(new CustomEvent("add",{detail:{label:e.trim(),value:t},bubbles:!0,cancelable:!0}));const a={label:e,value:t},n=this.get();n.tabs.push(a),this.set(n),this.callback(t,n.tabs.length-1)}}resetIndexes(){this.querySelectorAll("tab-component").forEach((e,t)=>{e.setAttribute("data-index",t.toString())})}renderAddButton(){let e;return this.model.expandable?e=i`
                <button-component
                    data-kind="text"
                    data-color="grey"
                    data-icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
                    data-icon-position="center"
                    data-shape="round"
                    style="margin-bottom:6px;"
                    @click=${this.addTab.bind(this)}
                ></button-component>
            `:e="",e}render(){const e=i`
            <tabs-container>
                ${this.model.tabs.map((t,a)=>{const n=a===this.model.active;return i`
                        <tab-component
                            data-label=${t.label}
                            data-value=${t.value}
                            data-icon=${t.icon}
                            data-active=${n}
                            data-index=${a}
                            @tab=${this.handleClick}
                        ></tab-component>
                    `})}
            </tabs-container>
            ${this.renderAddButton()}
        `;r(e,this),this.model.sortable&&this.firstRender&&(this.firstRender=!1,this.sort())}}class p extends l{constructor(){super();this.handleClick=()=>{this.dispatchEvent(new CustomEvent("tab",{detail:{value:this.model.value,index:this.model.index},bubbles:!0,cancelable:!0}))};this.model={label:"",value:"",icon:"",active:!1,index:0},this.render()}static get observedAttributes(){return["data-label","data-value","data-icon","data-active","data-index","data-index"]}async connected(){const e=o(this.dataset,this.model);this.set(e),this.addEventListener("click",this.handleClick)}disconnected(){this.removeEventListener("click",this.handleClick)}renderIcon(){let e;return this.model?.icon?.length?e=i` <i> ${u(decodeURI(this.model.icon))} </i> `:e="",e}render(){const e=i`<span>${this.renderIcon()} ${this.model.label}</span>`;this.tabIndex=0,this.setAttribute("sfx","button"),this.className=`${this.model.active?"is-active":""} ${this.model?.icon?"has-icon":""}`,this.setAttribute("role","button"),this.setAttribute("aria-label",`Open ${this.model.label}`),r(e,this)}}s.bind("tab-component",p),s.bind("tabs-component",d);export{d as default};
