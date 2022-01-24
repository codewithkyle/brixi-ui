import{renderMarkdown as o}from"./markdown.js";import i from"./supercomponent.js";import{html as l,render as n}from"./lit-html.js";class r extends i{constructor(t){super();this.component=t,this.state="LOADING",this.stateMachine={LOADING:{SUCCESS:"IDLING"}},this.model={html:""},this.render(),this.fetchDoc()}async fetchDoc(){const t=await fetch(`/docs/components/${this.component}.md`);if(t.ok){const e=await t.text(),s=await o(e);this.update({html:s})}else this.update({html:'<p class="font-danger-700 absolute center">This component is missing documentation.</p>'});this.trigger("SUCCESS")}render(){if(this.state==="LOADING"){const t=l`
                <txt-skel class="w-1/4 mb-1" style="height:42px;"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-3/4 mb-0.5"></txt-skel>
            `;n(t,this)}else this.innerHTML=this.model.html,this.querySelectorAll("pre code").forEach(t=>{hljs?.highlightElement(t)})}}export{r as default};
