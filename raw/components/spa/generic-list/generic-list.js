import{html as r,render as c}from"./lit-html.js";import s from"./env.js";import{unsafeHTML as d}from"./unsafe-html.js";import o from"./component.js";import{parseDataset as a}from"./general.js";s.css(["generic-list"]);class i extends o{constructor(){super(),this.model={list:null}}static get observedAttributes(){return["data-list"]}async connected(){const e=a(this.dataset,this.model);this.set(e)}renderStyleType(e,t){switch(e){case"circle":return"circle";case"disc":return"disc";case"decimal":return"decimal";case"leading-zero":return"decimal-leading-zero";case"square":return"square";case"custom":return`"\\${t}"`;default:return"disc"}}renderItem(e,t="disc",n=""){return r` <li style="list-style-type:${this.renderStyleType(t,n)};">${d(decodeURI(e))}</li> `}renderList(e){switch(e?.type){case"ordered":return r`
                    <ol class="list">
                        ${e.items.map(t=>this.renderItem(t,e?.style,e?.icon))} ${e?.sub?this.renderList(e.sub):""}
                    </ol>
                `;default:return r`
                    <ul class="list">
                        ${e.items.map(t=>this.renderItem(t,e?.style,e?.icon))} ${e?.sub?this.renderList(e.sub):""}
                    </ul>
                `}}render(){const e=r` ${this.renderList(this.model.list)} `;c(e,this)}}s.bind("brixi-generic-list",i);export{i as default};
