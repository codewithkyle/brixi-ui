import{html as i,render as p}from"./lit-html.js";import{unsafeHTML as r}from"./unsafe-html.js";import s from"./button.js";import u from"./submit-button.js";import f from"./form.js";import{noop as n}from"./general.js";import d from"./env.js";class w{raw(t){const e=Object.assign({view:i``,width:512},t),l=new o(e.view,e.width,"raw");return document.body.appendChild(l),l}form(t){const e=Object.assign({title:"",message:"",view:i``,width:512,callbacks:{onSubmit:n,onCancel:n},cancel:"Cancel",submit:"Submit"},t);let l;const c=i`
            ${new f({class:"w-full",view:i`
                    <div class="block w-full py-1.5 px-2">
                        ${e.title?.length?i`<h2>${e.title}</h2>`:""} ${e.message?.length?i`<p class="mb-1.5">${r(e.message)}</p>`:""}
                        ${e.view}
                    </div>
                    <div class="w-full px-0.5 pb-0.5">
                        <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                            ${new s({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{"cancel"in e.callbacks&&typeof e.callbacks.cancel=="function"&&e.callbacks.cancel(),l.remove()},class:"mr-0.5"})}
                            ${new u({label:e.submit})}
                        </div>
                    </div>
                `,onSubmit:a=>{if(a.checkValidity()){const b=a.serialize();e.callbacks.submit(b,a,l)}}})}
        `;l=new o(c,e.width,"static-content"),document.body.appendChild(l)}passive(t){const e=Object.assign({title:"",message:"",actions:[{label:"Close",callback:n}],width:512},t);let l;const c=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${e.actions.map(a=>new s({label:a.label,type:"button",color:"grey",kind:"solid",callback:()=>{typeof a?.callback=="function"&&a.callback(),l.remove()},class:"ml-0.5"}))}
                </div>
            </div>
        `;l=new o(c,e.width,"static-content"),document.body.appendChild(l)}confirm(t){const e=Object.assign({title:"",message:"",confirm:"Submit",cancel:"Cancel",callbacks:{cancel:n,confirm:n},width:512},t);let l;const c=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${new s({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{"cancel"in e.callbacks&&typeof e.callbacks.cancel=="function"&&e.callbacks.cancel(),l.remove()},class:"mr-0.5"})}
                    ${new s({label:e.confirm,type:"button",color:"primary",kind:"solid",callback:()=>{"confirm"in e.callbacks&&typeof e.callbacks.confirm=="function"&&e.callbacks.confirm(),l.remove()}})}
                </div>
            </div>
        `;l=new o(c,e.width,"static-content"),document.body.appendChild(l)}dangerous(t){const e=Object.assign({title:"",message:"",confirm:"Delete",cancel:"Cancel",callbacks:{cancel:n,confirm:n},width:512},t);let l;const c=i`
            <div class="block w-full py-1.5 px-2">
                <h2>${e.title}</h2>
                <p>${r(e.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${new s({label:e.cancel,type:"button",color:"grey",kind:"solid",callback:()=>{"cancel"in e.callbacks&&typeof e.callbacks.cancel=="function"&&e.callbacks.cancel(),l.remove()},class:"mr-0.5"})}
                    ${new s({label:e.confirm,type:"button",color:"danger",kind:"solid",callback:()=>{"confirm"in e.callbacks&&typeof e.callbacks.confirm=="function"&&e.callbacks.confirm(),l.remove()}})}
                </div>
            </div>
        `;l=new o(c,e.width,"static-content"),document.body.appendChild(l)}}const v=new w;var M=v;class o extends HTMLElement{constructor(e,l,c){super();this.view=e,this.width=l,this.className=c,d.css(["modals"]).then(()=>this.render())}render(){this.tabIndex=0,this.focus();const e=i`
            <div class="backdrop"></div>
            <div class="modal" style="width:${this.width}px;">${this.view}</div>
        `;p(e,this)}}d.bind("modal-component",o);export{M as default};
