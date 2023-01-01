import{html as i,render as o}from"./lit-html.js";import l from"./supercomponent.js";import s from"./env.js";import{unsafeHTML as d}from"./unsafe-html.js";import{parseDataset as a}from"./general.js";class r extends l{constructor(t){super(),this.model={label:"",color:"grey",layout:"horizontal",type:"solid",css:"",class:"",attributes:{}},this.model=a(this.dataset,this.model),s.css(["divider"]).then(()=>{this.set(t,!0),this.render()})}render(){this.setAttribute("layout",this.model.layout),this.setAttribute("color",this.model.color),this.setAttribute("line-style",this.model.type),this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(e=>{this.setAttribute(e,`${this.model.attributes[e]}`)});let t;this.model.label?.length?t=i`
                <div></div>
                <span>${d(this.model.label)}</span>
                <div></div>
            `:t=i` <div></div> `,o(t,this)}}s.bind("divider-component",r);export{r as default};
