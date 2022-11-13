import{html as i,render as o}from"./lit-html.js";import n from"./supercomponent.js";import s from"./env.js";import a from"./checkbox.js";import{parseDataset as l}from"./general.js";import{unsafeHTML as c}from"./unsafe-html.js";class r extends n{constructor(t){super(),t.options.map(e=>{e.name=t.name,e.disabled=t?.disabled??!1}),this.model={label:"",instructions:"",disabled:!1,name:"",options:[],css:"",class:"",attributes:{}},this.model=l(this.dataset,this.model),s.css("checkbox-group").then(()=>{this.set(t,!0),this.render()})}getName(){return this.model.name}getValue(){const t=[];return this.querySelectorAll("input:checked").forEach(e=>{t.push(e.value)}),t}render(){const t=i`
            <p>
                <strong>${this.model.label}</strong>
                ${c(this.model.instructions)}
            </p>
            ${this.model.options.map(e=>new a(e))}
        `;this.className=`${this.model.class} ${this.model.disabled?"is-disabled":""}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)}),o(t,this)}}s.mount("checkbox-group",r);export{r as default};
