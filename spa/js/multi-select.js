import{html as n,render as p}from"./lit-html.js";import{unsafeHTML as c}from"./unsafe-html.js";import h from"./env.js";import{parseDataset as m}from"./general.js";import b from"./soundscape.js";import"./checkbox.js";import{UUID as d}from"./uuid.js";import f from"./fuse.js";import g from"./pos.js";import v from"./component.js";h.css("multi-select");class u extends v{constructor(){super();this.debounceFilterInput=this.debounce(this.updateQuery.bind(this),300);this.handleFilterInput=e=>{const s=e.currentTarget.value;this.debounceFilterInput(s)};this.checkAllCallback=e=>{e.stopImmediatePropagation(),e.preventDefault();const{name:t,checked:s,value:r}=e.detail,i=this.get(),o=[];this.querySelectorAll(".options brixi-checkbox").forEach(l=>{for(let a=0;a<i.options.length;a++)if(i.options[a].uid===l.getName()){i.options[a].checked=s;break}});for(let l=0;l<i.options.length;l++)i.options[l].checked&&o.push(i.options[l].value);this.set(i),this.validate(),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:o},bubbles:!0,cancelable:!0}))};this.checkboxCallback=e=>{const{value:t,name:s,checked:r}=e.detail,i=this.get();for(let l=0;l<i.options.length;l++)if(i.options[l].uid===s){i.options[l].checked=r;break}const o=[];for(let l=0;l<i.options.length;l++)i.options[l].checked&&o.push(i.options[l].value);this.set(i),this.validate(),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:o},bubbles:!0,cancelable:!0}))};this.inputId=d(),this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",name:"",icon:"",instructions:"",options:[],required:!1,error:null,disabled:!1,query:"",placeholder:"",search:null,separator:null}}static get observedAttributes(){return["data-label","data-icon","data-instructions","data-options","data-required","data-name","data-disabled","data-query","data-placeholder","data-search","data-separator"]}async connected(){const e=m(this.dataset,this.model);for(let t=0;t<e.options.length;t++)e.options[t]?.checked||(e.options[t].checked=!1),e.options[t].uid=d();this.state=e?.disabled?"DISABLED":"IDLING",this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){this.set({error:e}),this.trigger("ERROR"),b.play("error")}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;this.set(e)}getName(){return this.model.name}getValue(){const e=[];for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e.push(this.model.options[t].value);return e}validate(){let e=!0;return this.model.required&&!this.hasOneCheck()?(e=!1,this.setError("This field is required.")):this.clearError(),e}hasOneCheck(){let e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t]?.checked){e=!0;break}return e}calcSelected(){let e=0;for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e++;return e}filterOptions(){let e=[...this.model.options];if(this.model.query?.length)if(this.model.search==="strict"){const t=this.model.separator===null?[this.model.query]:this.model.query.trim().split(this.model.separator);for(let s=e.length-1;s>=0;s--){let r=!1;for(let i=0;i<t.length;i++)if(e[s].value.toString().toLowerCase().trim()===t[i].toString().toLowerCase().trim()){r=!0;break}r||e.splice(s,1)}}else{const s=new f(e,{ignoreLocation:!0,threshold:0,keys:["label"]}).search(this.model.query);e=[];for(let r=0;r<s.length;r++)e.push(s[r].item)}return e}updateQuery(e){this.set({query:e})}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=n`<p>${c(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=n`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=n` <i class="icon"> ${c(this.model.icon)} </i> `),e}renderLabel(){let e="";return this.model.label?.length&&(e=n`<label for="${this.inputId}">${this.model.label}</label>`),e}renderSearch(){let e="";return this.model.search!==null&&(e=n`
                <div class="search">
                    <brixi-checkbox
                        data-checked="${this.hasOneCheck()}"
                        data-type="line"
                        class="inline-flex mr-0.5 js-master-checkbox"
                        data-value="all"
                        @change=${this.checkAllCallback}
                    ></brixi-checkbox>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </i>
                    <input
                        @change=${t=>{t.stopImmediatePropagation()}}
                        @input=${this.handleFilterInput}
                        type="text"
                        placeholder="Search..."
                        .value=${this.model.query}
                    />
                </div>
            `),e}render(){this.setAttribute("state",this.state);const e=this.calcSelected(),t=this.filterOptions();this.tabIndex=0;let s;e===this.model.options.length?s="All options selected":e===0?s=this.model.placeholder||"Select options":s=`${e} selected`;const r=n`
            ${this.renderLabel()} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select">${s}</span>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                ${this.renderSearch()}
                <div class="options">
                    ${t.map(o=>n`
                            <brixi-checkbox
                                data-name="${o.uid}"
                                data-checked="${o.checked}"
                                data-label="${o.label}"
                                data-value="${o.value}"
                                @change=${this.checkboxCallback}
                            ></brixi-checkbox>
                        `)}
                </div>
            </multiselect-options>
        `;p(r,this);const i=this.querySelector("multiselect-options");i&&(i.style.width=`${this.scrollWidth}px`,g.positionElementToElement(i,this,8)),e>0&&this.querySelector(".js-master-checkbox").set({checked:!0})}}h.bind("brixi-multi-select",u);export{u as default};
