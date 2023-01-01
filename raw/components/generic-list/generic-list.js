import{html as s,render as c}from"./lit-html.js";import a from"./supercomponent.js";import r from"./env.js";import{unsafeHTML as l}from"./unsafe-html.js";import{parseDataset as d}from"./general.js";class i extends a{constructor(e){super(),this.model={css:"",class:"",attributes:{},list:null},this.model=d(this.dataset,this.model),r.css(["generic-list"]).then(()=>{this.set(e,!0),this.render()})}renderStyleType(e,t){switch(e){case"circle":return"circle";case"disc":return"disc";case"decimal":return"decimal";case"leading-zero":return"decimal-leading-zero";case"square":return"square";case"custom":return`"\\${t}"`;default:return"disc"}}renderItem(e,t="disc",n=""){return s` <li style="list-style-type:${this.renderStyleType(t,n)};">${l(e)}</li> `}renderList(e){switch(e?.type){case"ordered":return s`
                    <ol class="list">
                        ${e.items.map(t=>this.renderItem(t,e?.style,e?.icon))} ${e?.sub?this.renderList(e.sub):""}
                    </ol>
                `;default:return s`
                    <ul class="list">
                        ${e.items.map(t=>this.renderItem(t,e?.style,e?.icon))} ${e?.sub?this.renderList(e.sub):""}
                    </ul>
                `}}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)});const e=s` ${this.renderList(this.model.list)} `;c(e,this)}}r.bind("generic-list",i);export{i as default};
