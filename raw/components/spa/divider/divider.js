import{html as e,render as o}from"./lit-html.js";import i from"./env.js";import{unsafeHTML as s}from"./unsafe-html.js";import{parseDataset as l}from"./general.js";import d from"./component.js";i.css(["divider"]);class r extends d{constructor(){super(),this.model={label:"",color:"grey",layout:"horizontal",type:"solid"}}static get observedAttributes(){return["data-label","data-color","data-layout","data-type"]}async connected(){const t=l(this.dataset,this.model);this.set(t)}render(){this.setAttribute("layout",this.model.layout),this.setAttribute("color",this.model.color),this.setAttribute("line-style",this.model.type);let t;this.model.label?.length?t=e`
                <div></div>
                <span>${s(this.model.label)}</span>
                <div></div>
            `:t=e` <div></div> `,o(t,this)}}i.bind("brixi-divider",r);export{r as default};
