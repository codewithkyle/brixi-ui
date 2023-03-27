import{html as i,render as p}from"./lit-html.js";import{unsafeHTML as r}from"./unsafe-html.js";import c from"./button.js";import w from"./submit-button.js";import u from"./form.js";import{noop as a}from"./general.js";import d from"./env.js";class v{raw(l){const e=Object.assign({view:i``,width:512},l),t=new o(e.view,e.width,"raw");return document.body.appendChild(t),t}form(l){const e=Object.assign({title:"",message:"",view:i``,width:512,callbacks:{onSubmit:a,onCancel:a},cancel:"Cancel",submit:"Submit"},l);let t;const s=i`
            ${new u({class:"w-full",view:i`
                    <div class="block w-full py-1.5 px-2">
                        ${e.title?.length?i`<h2>${e.title}</h2>`:""} ${e.message?.length?i`<p class="mb-1.5">${r(e.message)}</p>`:""}
                        ${e.view}
                    </div>
                    <div class="w-full px-0.5 pb-0.5">
                        <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                            ${new c({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{"cancel"in e.callbacks&&typeof e.callbacks.cancel=="function"&&e.callbacks.cancel(),t.remove()},class:"mr-0.5"})}
                            ${new w({label:e.submit})}
                        </div>
                    </div>
                `,onSubmit:n=>{if(n.checkValidity()){const b=n.serialize();e.callbacks.submit(b,n,t)}}})}
        `;t=new o(s,e.width,"static-content"),document.body.appendChild(t)}passive(l){const e=Object.assign({title:"",message:"",actions:[{label:"Close",callback:a}],width:512},l);let t;const s=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${e.actions.map(n=>new c({label:n.label,type:"button",color:"grey",kind:"solid",callback:()=>{n.callback(),t.remove()},class:"ml-0.5"}))}
                </div>
            </div>
        `;t=new o(s,e.width,"static-content"),document.body.appendChild(t)}confirm(l){const e=Object.assign({title:"",message:"",confirm:"Submit",cancel:"Cancel",callbacks:{cancel:a,confirm:a},width:512},l);let t;const s=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${new c({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{e.callbacks.cancel(),t.remove()},class:"mr-0.5"})}
                    ${new c({label:e.confirm,type:"button",color:"primary",kind:"solid",callback:()=>{e.callbacks.confirm(),t.remove()}})}
                </div>
            </div>
        `;t=new o(s,e.width,"static-content"),document.body.appendChild(t)}dangerous(l){const e=Object.assign({title:"",message:"",confirm:"Delete",cancel:"Cancel",callbacks:{cancel:a,confirm:a},width:512},l);let t;const s=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${new c({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{e.callbacks.cancel(),t.remove()},class:"mr-0.5"})}
                    ${new c({label:e.confirm,type:"button",color:"danger",kind:"solid",callback:()=>{e.callbacks.confirm(),t.remove()}})}
                </div>
            </div>
        `;t=new o(s,e.width,"static-content"),document.body.appendChild(t)}}const g=new v;var M=g;class o extends HTMLElement{constructor(e,t,s){super();this.view=e,this.width=t,this.className=s,d.css(["modals"]).then(()=>this.render())}render(){this.tabIndex=0,this.focus();const e=i`
            <div class="backdrop"></div>
            <div class="modal" style="width:${this.width}px;">${this.view}</div>
        `;p(e,this)}}d.bind("modal-component",o);export{M as default};
