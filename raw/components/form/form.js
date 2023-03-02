import{html as n,render as l}from"./lit-html.js";import a from"./supercomponent.js";import i from"./env.js";import{noop as r,parseDataset as m}from"./general.js";class o extends a{constructor(t){super();this.handleSubmit=t=>{t.preventDefault(),this.model.onSubmit(this)};this.handleReset=t=>{t.preventDefault(),this.reset(),this.model.onReset()};this.model={css:"",class:"",attributes:{},view:null,onSubmit:r,onReset:r},this.model=m(this.dataset,this.model),i.css(["form"]).then(()=>{this.set(t,!0),this.render()})}start(){const t=this.querySelector("submit-button");t&&t.trigger("START")}stop(){const t=this.querySelector('submit-button[state="SUBMITTING"]');t&&t.trigger("STOP")}reset(){this.querySelectorAll("[form-input]").forEach(t=>{t.reset()})}serialize(){this.start();const t={};let e=!0;return this.querySelectorAll("[form-input]").forEach(s=>{s.validate()?t[s.getName()]=s.getValue():e=!1}),t}checkValidity(){let t=!0;return this.querySelectorAll("[form-input]").forEach(e=>{e.validate()||(t=!1)}),t}fail(t){const e={};this.querySelectorAll("[form-input]").forEach(s=>{e[s.getName()]=s});for(const s in t)e?.[s]?.setError(t[s]);this.stop()}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});const t=n` <form @submit=${this.handleSubmit} @reset=${this.handleReset}>${this.model.view}</form> `;l(t,this)}}i.bind("form-component",o);export{o as default};
