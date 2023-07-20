import{html as n,render as p}from"./lit-html.js";import{unsafeHTML as c}from"./unsafe-html.js";import h from"./env.js";import{parseDataset as m}from"./general.js";import g from"./soundscape.js";import"./checkbox.js";import{UUID as d}from"./uuid.js";import f from"./fuse.js";import b from"./pos.js";import v from"./component.js";h.css("multi-select");class u extends v{constructor(){super();this.debounceFilterInput=this.debounce(this.updateQuery.bind(this),300);this.handleFilterInput=e=>{const i=e.currentTarget.value;this.debounceFilterInput(i)};this.checkAllCallback=e=>{e.stopImmediatePropagation(),e.preventDefault();const{name:t,checked:i,value:o}=e.detail,s=this.get(),r=[];this.querySelectorAll(".options checkbox-component").forEach(l=>{for(let a=0;a<s.options.length;a++)if(s.options[a].uid===l.getName()){s.options[a].checked=i;break}});for(let l=0;l<s.options.length;l++)s.options[l].checked&&r.push(s.options[l].value);this.set(s),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:r},bubbles:!0,cancelable:!0}))};this.checkboxCallback=e=>{const{value:t,name:i,checked:o}=e.detail,s=this.get();for(let l=0;l<s.options.length;l++)if(s.options[l].uid===i){s.options[l].checked=o;break}const r=[];for(let l=0;l<s.options.length;l++)s.options[l].checked&&r.push(s.options[l].value);this.set(s),this.dispatchEvent(new CustomEvent("change",{detail:{name:this.model.name,value:r},bubbles:!0,cancelable:!0}))};this.inputId=d(),this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",name:"",icon:"",instructions:"",options:[],required:!1,error:null,disabled:!1,query:"",placeholder:"",search:null,separator:null}}static get observedAttributes(){return["data-label","data-icon","data-instructions","data-options","data-required","data-name","data-disabled","data-query","data-placeholder","data-search","data-separator"]}async connected(){const e=m(this.dataset,this.model);for(let t=0;t<e.options.length;t++)e.options[t]?.checked||(e.options[t].checked=!1),e.options[t].uid=d();this.state=e?.disabled?"DISABLED":"IDLING",this.set(e)}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){this.set({error:e}),this.trigger("ERROR"),g.play("error")}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;this.set(e)}getName(){return this.model.name}getValue(){const e=[];for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e.push(this.model.options[t].value);return e}validate(){let e=!0;return this.model.required&&!this.hasOneCheck()?(e=!1,this.setError("This field is required.")):this.clearError(),e}hasOneCheck(){let e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t]?.checked){e=!0;break}return e}calcSelected(){let e=0;for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e++;return e}filterOptions(){let e=[...this.model.options];if(this.model.query?.length)if(this.model.search==="strict"){const t=this.model.separator===null?[this.model.query]:this.model.query.trim().split(this.model.separator);for(let i=e.length-1;i>=0;i--){let o=!1;for(let s=0;s<t.length;s++)if(e[i].value.toString().toLowerCase().trim()===t[s].toString().toLowerCase().trim()){o=!0;break}o||e.splice(i,1)}}else{const i=new f(e,{ignoreLocation:!0,threshold:0,keys:["label"]}).search(this.model.query);e=[];for(let o=0;o<i.length;o++)e.push(i[o].item)}return e}updateQuery(e){this.set({query:e})}renderCopy(){let e="";return this.state==="IDLING"&&this.model.instructions?e=n`<p>${c(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error&&(e=n`<p class="font-danger-700">${this.model.error}</p>`),e}renderIcon(){let e="";return this.model.icon?.length&&(e=n` <i class="icon"> ${c(this.model.icon)} </i> `),e}renderLabel(){let e="";return this.model.label?.length&&(e=n`<label for="${this.inputId}">${this.model.label}</label>`),e}renderSearch(){let e="";return this.model.search!==null&&(e=n`
                <div class="search">
                    <checkbox-component
                        data-checked="${this.hasOneCheck()}"
                        data-type="line"
                        class="inline-flex mr-0.5 js-master-checkbox"
                        style="width:24px;height:24px;"
                        data-value="all"
                        @change=${this.checkAllCallback}
                    ></checkbox-component>
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
            `),e}render(){this.setAttribute("state",this.state);const e=this.calcSelected(),t=this.filterOptions();this.tabIndex=0;let i;e===this.model.options.length?i="All options selected":e===0?i=this.model.placeholder||"Select options":i=`${e} selected`;const o=n`
            ${this.renderLabel()} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select">${i}</span>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                ${this.renderSearch()}
                <div class="options">
                    ${t.map(r=>n`
                            <checkbox-component
                                data-name="${r.uid}"
                                data-checked="${r.checked}"
                                data-label="${r.label}"
                                data-value="${r.value}"
                                @change=${this.checkboxCallback}
                            ></checkbox-component>
                        `)}
                </div>
            </multiselect-options>
        `;p(o,this);const s=this.querySelector("multiselect-options");s&&(s.style.width=`${this.scrollWidth}px`,b.positionElementToElement(s,this,8)),e>0&&this.querySelector(".js-master-checkbox").set({checked:!0})}}h.bind("multi-select-component",u);export{u as default};
