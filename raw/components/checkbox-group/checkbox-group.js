import{html as i,render as o}from"./lit-html.js";import n from"./supercomponent.js";import s from"./env.js";import l from"./checkbox.js";import{parseDataset as a}from"./general.js";class r extends n{constructor(e){super();e.options.map(t=>{t.name=e.name,t.disabled=e?.disabled??!1}),this.model={label:"",instructions:"",disabled:!1,name:"",options:[],css:"",class:"",attributes:{}},this.model=a(this.dataset,this.model),s.css("checkbox-group").then(()=>{this.set(e,!0),this.render()})}getName(){return this.model.name}getValue(){const e=[];return this.querySelectorAll("input:checked").forEach(t=>{e.push(t.value)}),e}render(){const e=i`
            <p>
                <strong>${this.model.label}</strong>
                ${this.model.instructions}
            </p>
            ${this.model.options.map(t=>new l(t))}
        `;this.className=`${this.model.class} ${this.model.disabled?"is-disabled":""}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(t=>{this.setAttribute(t,`${this.model.attributes[t]}`)}),o(e,this)}}s.mount("checkbox-group",r);export{r as default};
