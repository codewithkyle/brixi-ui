import{html as n,render as g}from"./lit-html.js";import{unsafeHTML as u}from"./unsafe-html.js";import b from"./supercomponent.js";import p from"./env.js";import{noop as k,parseDataset as v}from"./general.js";import y from"./soundscape.js";import"./checkbox.js";import{UUID as E}from"./uuid.js";import S from"./fuse.js";import $ from"./pos.js";class m extends b{constructor(e){super();this.debounceFilterInput=this.debounce(this.updateQuery.bind(this),300);this.handleFilterInput=e=>{const i=e.currentTarget.value;this.debounceFilterInput(i)};this.checkAllCallback=e=>{const{name:t,checked:i,value:l}=e.detail,s={...this.model},c=`${this.model.name}-${this.model.label.replace(/\s+/g,"-").trim()}`;for(let a=0;a<s.options.length;a++)s.options[a].checked=!1;const r=[],h=Array.from(this.querySelectorAll(".options checkbox-component"));for(let a=0;a<h.length;a++){h[a].set({checked:l});const f=h[a].getName().replace(`${c}-`,"");for(let d=0;d<s.options.length;d++)if(s.options[d].value==f){s.options[d].checked=l,l&&r.push(s.options[d].value);break}}const o=this.querySelector(".select");r.length===s.options.length?o.innerHTML="All options selected":r.length===0?o.innerHTML=this.model.placeholder||"Select options":o.innerHTML=`${r.length} selected`,this.set(s,!0),this.model.callback(r)};this.checkboxCallback=e=>{const{value:t,name:i,checked:l}=e.detail,s=this.get();for(let o=0;o<s.options.length;o++)if(s.options[o].uid===i){s.options[o].checked=t;break}const c=[];for(let o=0;o<s.options.length;o++)s.options[o].checked&&c.push(s.options[o].value);const r=this.querySelector(".js-master-checkbox");r&&(c.length?r.set({checked:!0}):r.set({checked:!1}));const h=this.querySelector(".select");c.length===s.options.length?h.innerHTML="All options selected":c.length===0?h.innerHTML=this.model.placeholder||"Select options":h.innerHTML=`${c.length} selected`,this.set(s,!0),this.model.callback(c)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",name:"",icon:"",instructions:"",options:e?.options??[],required:!1,error:null,disabled:!1,callback:k,css:"",class:"",attributes:{},query:"",placeholder:"",search:null,separator:null},this.model=v(this.dataset,this.model);for(let t=0;t<this.model.options.length;t++)this.model.options[t]?.checked||(this.model.options[t].checked=!1),this.model.options[t].uid=E();delete e?.options,p.css("multi-select").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){this.set({error:e}),this.trigger("ERROR"),y.play("error")}reset(){const e=this.get();for(let t=0;t<e.options.length;t++)e.options[t].checked=!1;this.set(e)}getName(){return this.model.name}getValue(){const e=[];for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e.push(this.model.options[t].value);return e}validate(){let e=!0;return this.model.required&&!this.hasOneCheck()?(e=!1,this.setError("This field is required.")):this.clearError(),e}hasOneCheck(){let e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t]?.checked){e=!0;break}return e}calcSelected(){let e=0;for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e++;return e}filterOptions(){let e=[...this.model.options];if(this.model.query?.length)if(this.model.search==="strict"){const t=this.model.separator===null?[this.model.query]:this.model.query.trim().split(this.model.separator);for(let i=e.length-1;i>=0;i--){let l=!1;for(let s=0;s<t.length;s++)if(e[i].value.toString().toLowerCase().trim()===t[s].toString().toLowerCase().trim()){l=!0;break}l||e.splice(i,1)}}else{const i=new S(e,{ignoreLocation:!0,threshold:0,keys:["label"]}).search(this.model.query);e=[];for(let l=0;l<i.length;l++)e.push(i[l].item)}return e}updateQuery(e){this.set({query:e})}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=n`<p>${u(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=n`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderIcon(){let e;return this.model.icon instanceof HTMLElement?e=n` <i class="icon"> ${this.model.icon} </i> `:typeof this.model.icon=="string"&&this.model.icon.length?e=n` <i class="icon"> ${u(this.model.icon)} </i> `:e="",e}renderLabel(e){let t;return this.model.label?.length?t=n`<label for="${e}">${this.model.label}</label>`:t="",t}renderSearch(){let e;return this.model.search!==null?e=n`
                <div class="search">
                    <checkbox-component
                        data-name="multiselect-checkall"
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
                    <input @input=${this.handleFilterInput} type="text" placeholder="Search..." .value=${this.model.query} />
                </div>
            `:e="",e}render(){const e=`${this.model.name}-${this.model.label.replace(/\s+/g,"-").trim()}`;this.id=e,this.setAttribute("state",this.state),this.className=`multi-select js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)});const t=this.calcSelected(),i=this.filterOptions();this.tabIndex=0;const l=n`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select">${t?n`${this.calcSelected()} selected`:this.model.placeholder||"Select options"}</span>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                ${this.renderSearch()}
                <div class="options">
                    ${i.map(s=>n`
                            <checkbox-component
                                data-name="${s.uid}"
                                data-checked="${s.checked}"
                                data-label="${s.label}"
                                data-value="${s.value}"
                                @change=${this.checkboxCallback}
                            ></checkbox-component>
                        `)}
                </div>
            </multiselect-options>
        `;setTimeout(()=>{g(l,this);const s=this.querySelector("multiselect-options");s&&(s.style.width=`${this.scrollWidth}px`,$.positionElementToElement(s,this,8))},80)}}p.bind("multi-select-component",m);export{m as default};
