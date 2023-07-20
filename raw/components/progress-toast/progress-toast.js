import{html as o,render as r}from"./lit-html.js";import a from"./component.js";import i from"./env.js";import{parseDataset as n}from"./general.js";import"./progress-indicator.js";i.css(["progress-toast"]);class s extends a{constructor(){super();this.finishedCallback=()=>{this.remove()};this.indicator=null,this.model={total:1,title:"",subtitle:""}}static get observedAttributes(){return["data-title","data-subtitle","data-total"]}async connected(){const t=n(this.dataset,this.model);this.set(t)}tick(t=1){this.indicator||(this.indicator=this.querySelector("progress-indicator")),this.indicator?.tick(t)}reset(){this.indicator||(this.indicator=this.querySelector("progress-indicator")),this.indicator?.reset()}setProgress(t){const e=this.querySelector("h3");e.classList.remove("none"),e.classList.add("block"),e.innerText=t}render(){const t=o`
            <progress-indicator data-total="${this.model.total}" data-color="white" @finished=${this.finishedCallback}></progress-indicator>
            <div class="ml-0.75" flex="column wrap" style="flex:1;">
                <h2 class="block font-medium font-base mb-0.5 font-white">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length?"block":"none"} font-xs font-grey-300">${this.model.subtitle}</h3>
            </div>
        `;r(t,this)}}i.bind("progress-toast",s);export{s as default};
