import{html as n,render as p}from"./lit-html.js";import{unsafeHTML as o}from"./unsafe-html.js";import"./button.js";import"./submit-button.js";import"./form.js";import{noop as c}from"./general.js";import r from"./env.js";class u{raw(a){const t=Object.assign({view:n``,width:512},a),e=new s(t.view,t.width,"raw");return document.body.appendChild(e),e}form(a){const t=Object.assign({title:"",message:"",view:n``,width:512,callbacks:{onSubmit:c,onCancel:c},cancel:"Cancel",submit:"Submit"},a);let e;const l=n`
            <form-component
                class="w-full"
                @submit=${i=>{i.preventDefault();const d=i.currentTarget;if(d.checkValidity()){const b=d.serialize();t.callbacks.submit(b,d,e)}}}
            >
                <div class="block w-full py-1.5 px-2">
                    ${t.title?.length?n`<h2>${t.title}</h2>`:""} ${t.message?.length?n`<p class="mb-1.5">${o(t.message)}</p>`:""} ${t.view}
                </div>
                <div class="w-full px-0.5 pb-0.5">
                    <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                        <button-component
                            data-label="${t.cancel}"
                            data-type="button"
                            data-color="grey"
                            data-kind="solid"
                            @click=${()=>{"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                            class="mr-0.5"
                        ></button-component>
                        <submit-button data-label="${t.submit}"></submit-button>
                    </div>
                </div>
            </form-component>
        `;e=new s(l,t.width,"static-content"),document.body.appendChild(e)}passive(a){const t=Object.assign({title:"",message:"",actions:[{label:"Close",callback:c}],width:512},a);let e;const l=n`
            <div class="block w-full py-1.5 px-2">
                <h2>${t.title}</h2>
                <p>${o(t.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    ${t.actions.map(i=>n`
                            <button-component
                                data-label="${i.label}"
                                data-type="button"
                                data-color="grey"
                                data-kind="solid"
                                @click=${()=>{typeof i?.callback=="function"&&i.callback(),e.remove()}}
                                class="mr-0.5"
                            ></button-component>
                        `)}
                </div>
            </div>
        `;e=new s(l,t.width,"static-content"),document.body.appendChild(e)}confirm(a){const t=Object.assign({title:"",message:"",confirm:"Submit",cancel:"Cancel",callbacks:{cancel:c,confirm:c},width:512},a);let e;const l=n`
            <div class="block w-full py-1.5 px-2">
                <h2>${t.title}</h2>
                <p>${o(t.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    <button-component
                        data-label="${t.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${()=>{"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                        class="mr-0.5"
                    ></button-component>
                    <button-component
                        data-label="${t.confirm}"
                        data-type="button"
                        data-color="primary"
                        data-kind="solid"
                        @click=${()=>{"confirm"in t.callbacks&&typeof t.callbacks.confirm=="function"&&t.callbacks.confirm(),e.remove()}}
                    ></button-component>
                </div>
            </div>
        `;e=new s(l,t.width,"static-content"),document.body.appendChild(e)}dangerous(a){const t=Object.assign({title:"",message:"",confirm:"Delete",cancel:"Cancel",callbacks:{cancel:c,confirm:c},width:512},a);let e;const l=n`
            <div class="block w-full py-1.5 px-2">
                <h2>${t.title}</h2>
                <p>${o(t.message)}</p>
            </div>
            <div class="w-full px-0.5 pb-0.5">
                <div class="w-full p-0.5 bg-grey-100 radius-0.5" flex="row nowrap items-center justify-end">
                    <button-component
                        data-label="${t.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${()=>{"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                        class="mr-0.5"
                    ></button-component>
                    <button-component
                        data-label="${t.confirm}"
                        data-type="button"
                        data-color="danger"
                        data-kind="solid"
                        @click=${()=>{"confirm"in t.callbacks&&typeof t.callbacks.confirm=="function"&&t.callbacks.confirm(),e.remove()}}
                    ></button-component>
                </div>
            </div>
        `;e=new s(l,t.width,"static-content"),document.body.appendChild(e)}}const f=new u;var M=f;class s extends HTMLElement{constructor(t,e,l){super();this.view=t,this.width=e,this.className=l,r.css(["modals"]).then(()=>this.render())}render(){this.tabIndex=0,this.focus();const t=n`
            <div class="backdrop"></div>
            <div class="modal" style="width:${this.width}px;">${this.view}</div>
        `;p(t,this)}}r.bind("modal-component",s);export{M as default};
