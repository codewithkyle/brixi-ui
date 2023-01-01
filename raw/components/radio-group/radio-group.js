import{html as r,render as o}from"./lit-html.js";import n from"./supercomponent.js";import e from"./env.js";import a from"./radio.js";import{parseDataset as d}from"./general.js";import{unsafeHTML as l}from"./unsafe-html.js";class i extends n{constructor(t){super(),t.options.map(s=>{s.name=t.name,s.disabled=t?.disabled??!1}),this.model={label:"",instructions:"",disabled:!1,name:"",options:[],css:"",class:"",attributes:{}},this.model=d(this.dataset,this.model),e.css("radio-group").then(()=>{this.set(t,!0),this.render()})}getName(){return this.model.name}getValue(){return this.querySelector("input:checked").value}render(){const t=r`
            <p>
                <strong>${this.model.label}</strong>
                ${l(this.model.instructions)}
            </p>
            ${this.model.options.map(s=>new a(s))}
        `;this.className=`${this.model.class} ${this.model.disabled?"is-disabled":""}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),o(t,this)}}e.bind("radio-group",i);export{i as default};
