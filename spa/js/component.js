import l from"./supercomponent.js";class n extends l{attributeChangedCallback(t,o,e){if(t.indexOf("data-")===0&&(t=t.substring(5),t in this.model)){let s;try{s=JSON.parse(e)}catch{s=e}const i=this.get();i[t]=s,this.set(i)}}}export{n as default};