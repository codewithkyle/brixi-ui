import{html as t,render as n}from"./lit-html.js";import o from"./supercomponent.js";import i from"./env.js";import a from"./button.js";import{noop as c,parseDataset as d}from"./general.js";class r extends o{constructor(e){super();this.handleClose=e=>{this.model.closeCallback(),this.remove()};this.model={type:"info",heading:null,description:null,list:[],closeable:!1,actions:[],closeCallback:c,css:"",class:"",attributes:{}},this.model=d(this.dataset,this.model),i.css(["alert"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(){switch(this.model.type){case"danger":return t` <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>`;case"info":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    />
                </svg>`;case"success":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>`;case"warning":return t`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>`}}renderCloseButton(){let e;return this.model.closeable?e=t`
                <button sfx="button" @click=${this.handleClose} class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `:e="",e}renderList(){let e;return this.model.list.length?e=t`
                <ul>
                    ${this.model.list.map(s=>t` <li>${s}</li> `)}
                </ul>
            `:e="",e}renderActions(){let e;if(this.model.actions.length){let s=this.model.type;e=t`
                <div class="actions">
                    ${this.model.actions.map((l,g)=>t`
                            ${new a({label:l.label,kind:"text",color:s,callback:l.callback})}
                        `)}
                </div>
            `}else e="";return e}render(){this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const e=t`
            ${this.renderCloseButton()}
            <i> ${this.renderIcon()} </i>
            <div class="copy">
                ${this.model.heading?t`<h3>${this.model.heading}</h3>`:""} ${this.model.description?t`<p>${this.model.description}</p>`:""} ${this.renderList()}
                ${this.renderActions()}
            </div>
        `;this.setAttribute("kind",this.model.type),!this.model.heading&&!this.model.list.length&&this.setAttribute("flex","items-center"),n(e,this)}}i.bind("alert-component",r);export{r as default};
