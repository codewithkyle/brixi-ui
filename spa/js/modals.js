import{html as a,render as f}from"./lit-html.js";import{unsafeHTML as o}from"./unsafe-html.js";import"./button.js";import"./submit-button.js";import"./form.js";import{noop as n}from"./general.js";import d from"./env.js";class u{raw(l){const t=Object.assign({view:a``,width:512},l),e=new s(t.view,t.width);return document.body.appendChild(e),e}form(l){const t=Object.assign({title:"",message:"",view:a``,width:512,callbacks:{onSubmit:n,onCancel:n},cancel:"Cancel",submit:"Submit"},l);let e;const i=a`
            <form-component
                class="w-full"
                @submit=${c=>{c.preventDefault();const r=c.currentTarget;if(r.checkValidity()){const m=r.serialize();t.callbacks.submit(m,r,e)}}}
            >
                <div class="block w-full py-1.5 px-2">
                    ${t.title?.length?a`<h2 class="font-lg font-medium font-grey-800 dark:font-grey-300 line-snug block mb-1">${t.title}</h2>`:""}
                    ${t.message?.length?a`<p class="font-grey-700 dark:font-grey-300 font-sm line-normal mb-1.5 block">${o(t.message)}</p>`:""} ${t.view}
                </div>
                <div class="w-full px-1 pb-1">
                    <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                        <brixi-button
                            data-label="${t.cancel}"
                            data-type="button"
                            data-color="grey"
                            data-kind="solid"
                            class="mr-0.5"
                            @click=${()=>{console.log("cancel"),"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                        ></brixi-button>
                        <brixi-submit-button data-label="${t.submit}"></brixi-submit-button>
                    </div>
                </div>
            </form-component>
        `;e=new s(i,t.width),document.body.appendChild(e)}passive(l){const t=Object.assign({title:"",message:"",actions:[{label:"Close",callback:n}],width:512},l);let e;const i=a`
            <div class="block w-full py-1.5 px-2">
                <h2 class="font-lg font-medium font-grey-800 dark:font-grey-300 line-snug block mb-1">${t.title}</h2>
                <p class="font-grey-700 dark:font-grey-300 font-sm line-normal block">${o(t.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    ${t.actions.map(c=>a`
                            <brixi-button
                                data-label="${c.label}"
                                data-type="button"
                                data-color="grey"
                                data-kind="solid"
                                @click=${()=>{typeof c?.callback=="function"&&c.callback(),e.remove()}}
                                class="ml-0.5"
                            ></brixi-button>
                        `)}
                </div>
            </div>
        `;e=new s(i,t.width),document.body.appendChild(e)}confirm(l){const t=Object.assign({title:"",message:"",confirm:"Submit",cancel:"Cancel",callbacks:{cancel:n,confirm:n},width:512},l);let e;const i=a`
            <div class="block w-full py-1.5 px-2">
                <h2 class="font-lg font-medium font-grey-800 dark:font-grey-300 line-snug block mb-1">${t.title}</h2>
                <p class="font-grey-700 dark:font-grey-300 font-sm line-normal block">${o(t.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    <brixi-button
                        data-label="${t.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${()=>{"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                        class="mr-0.5"
                    ></brixi-button>
                    <brixi-button
                        data-label="${t.confirm}"
                        data-type="button"
                        data-color="primary"
                        data-kind="solid"
                        @click=${()=>{"confirm"in t.callbacks&&typeof t.callbacks.confirm=="function"&&t.callbacks.confirm(),e.remove()}}
                    ></brixi-button>
                </div>
            </div>
        `;e=new s(i,t.width),document.body.appendChild(e)}dangerous(l){const t=Object.assign({title:"",message:"",confirm:"Delete",cancel:"Cancel",callbacks:{cancel:n,confirm:n},width:512},l);let e;const i=a`
            <div class="block w-full py-1.5 px-2">
                <h2 class="font-lg font-medium font-grey-800 dark:font-grey-300 line-snug block mb-1">${t.title}</h2>
                <p class="font-grey-700 dark:font-grey-300 font-sm line-normal block">${o(t.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-150 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    <brixi-button
                        data-label="${t.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${()=>{"cancel"in t.callbacks&&typeof t.callbacks.cancel=="function"&&t.callbacks.cancel(),e.remove()}}
                        class="mr-0.5"
                    ></brixi-button>
                    <brixi-button
                        data-label="${t.confirm}"
                        data-type="button"
                        data-color="danger"
                        data-kind="solid"
                        @click=${()=>{"confirm"in t.callbacks&&typeof t.callbacks.confirm=="function"&&t.callbacks.confirm(),e.remove()}}
                    ></brixi-button>
                </div>
            </div>
        `;e=new s(i,t.width),document.body.appendChild(e)}}const g=new u;var M=g;class s extends HTMLElement{constructor(l,t){super(),this.view=l,this.width=t,d.css(["modals","button"]).then(()=>this.render())}render(){this.tabIndex=0,this.focus();const l=a`
            <div class="backdrop"></div>
            <div class="modal" style="width:${this.width}px;">${this.view}</div>
        `;f(l,this)}}d.bind("brixi-modal",s);export{M as default};
