import{html as r,render as o}from"./lit-html.js";import l from"./component.js";import i from"./env.js";import{parseDataset as n}from"./general.js";import"./progress-indicator.js";i.css(["progress-label"]);class s extends l{constructor(){super();this.indicator=null,this.model={total:1,title:"",subtitle:""}}static get observedAttributes(){return["data-title","data-subtitle","data-total"]}async connected(){const t=n(this.dataset,this.model);this.set(t)}tick(){this.indicator||(this.indicator=this.querySelector("progress-indicator")),this.indicator?.tick()}reset(){this.indicator||(this.indicator=this.querySelector("progress-indicator")),this.indicator?.reset()}setProgress(t){const e=this.querySelector("h3");e.classList.remove("none"),e.classList.add("block"),e.innerText=t}render(){const t=r`
            <progress-indicator data-total="${this.model.total}"></progress-indicator>
            <div class="ml-0.5" flex="column wrap">
                <h2 class="block font-bold font-sm line-snug">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length?"block":"none"} font-xs font-grey-700 line-snug">${this.model.subtitle}</h3>
            </div>
        `;o(t,this)}}i.bind("progress-label",s);export{s as default};
