import{html as r,render as b}from"./lit-html.js";import{unsafeHTML as h}from"./unsafe-html.js";import f from"./supercomponent.js";import d from"./env.js";import{noop as g,parseDataset as k}from"./general.js";import v from"./soundscape.js";import u from"./checkbox.js";import{UUID as S}from"./uuid.js";import y from"./fuse.js";class p extends f{constructor(e){super();this.debounceFilterInput=this.debounce(this.updateQuery.bind(this),300);this.handleFilterInput=e=>{const s=e.currentTarget.value;this.debounceFilterInput(s)};this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={label:"",name:"",icon:"",instructions:"",options:e?.options??[],required:!1,error:null,disabled:!1,callback:g,css:"",class:"",attributes:{},query:"",placeholder:"",search:null,separator:null},this.model=k(this.dataset,this.model);for(let t=0;t<this.model.options.length;t++)this.model.options[t]?.checked||(this.model.options[t].checked=!1),this.model.options[t].uid=S();delete e?.options,d.css("multi-select").then(()=>{this.set(e,!0),this.render()})}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e,t){t||(this.set({error:e}),this.trigger("ERROR"),v.play("error"))}getName(){return this.model.name}getValue(){const e=[];for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e.push(this.model.options[t].value);return e}validate(e,t=!1){let s=!0;return this.model.required?(s=!1,this.setError("This field is required.",t)):this.clearError(),s}hasOneCheck(){let e=!1;for(let t=0;t<this.model.options.length;t++)if(this.model.options[t]?.checked){e=!0;break}return e}calcSelected(){let e=0;for(let t=0;t<this.model.options.length;t++)this.model.options[t].checked&&e++;return e}filterOptions(){let e=[...this.model.options];if(this.model.query?.length)if(this.model.search==="strict"){const t=this.model.separator===null?[this.model.query]:this.model.query.trim().split(this.model.separator);for(let s=e.length-1;s>=0;s--){let l=!1;for(let i=0;i<t.length;i++)if(e[s].value.toString().toLowerCase().trim()===t[i].toString().toLowerCase().trim()){l=!0;break}l||e.splice(s,1)}}else{const s=new y(e,{ignoreLocation:!0,threshold:0,keys:["label"]}).search(this.model.query);e=[];for(let l=0;l<s.length;l++)e.push(s[l].item)}return e}updateQuery(e){this.set({query:e})}checkAllCallback(e,t){const s={...this.model},l=`${this.model.name}-${this.model.label.replace(/\s+/g,"-").trim()}`;for(let n=0;n<s.options.length;n++)s.options[n].checked=!1;const i=[],c=Array.from(this.querySelectorAll(".options checkbox-component"));for(let n=0;n<c.length;n++){c[n].set({checked:e});const m=c[n].getName().replace(`${l}-`,"");for(let a=0;a<s.options.length;a++)if(s.options[a].value==m){s.options[a].checked=e,e&&i.push(s.options[a].value);break}}const o=this.querySelector(".select");i.length===s.options.length?o.innerHTML="All options selected":i.length===0?o.innerHTML=this.model.placeholder||"Select options":o.innerHTML=`${i.length} selected`,this.set(s,!0),this.model.callback(i)}checkboxCallback(e,t){const s=this.get();for(let o=0;o<s.options.length;o++)if(s.options[o].uid===t){s.options[o].checked=e;break}const l=[];for(let o=0;o<s.options.length;o++)s.options[o].checked&&l.push(s.options[o].value);const i=this.querySelector(".js-master-checkbox");i&&(l.length?i.set({checked:!0}):i.set({checked:!1}));const c=this.querySelector(".select");l.length===s.options.length?c.innerHTML="All options selected":l.length===0?c.innerHTML=this.model.placeholder||"Select options":c.innerHTML=`${l.length} selected`,this.set(s,!0),this.model.callback(l)}renderCopy(){let e;return this.state==="IDLING"&&this.model.instructions?e=r`<p>${h(this.model.instructions)}</p>`:this.state==="ERROR"&&this.model.error?e=r`<p class="font-danger-700">${this.model.error}</p>`:e="",e}renderIcon(){let e;return this.model.icon instanceof HTMLElement?e=r` <i class="icon"> ${this.model.icon} </i> `:typeof this.model.icon=="string"&&this.model.icon.length?e=r` <i class="icon"> ${h(this.model.icon)} </i> `:e="",e}renderLabel(e){let t;return this.model.label?.length?t=r`<label for="${e}">${this.model.label}</label>`:t="",t}renderSearch(){let e;return this.model.search!==null?e=r`
                <div class="search">
                    ${new u({name:"multiselect-checkall",checked:this.hasOneCheck(),callback:this.checkAllCallback.bind(this),type:"line",class:"inline-flex mr-0.5 js-master-checkbox",css:"width:24px;height:24px;"})}
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
            `:e="",e}render(){const e=`${this.model.name}-${this.model.label.replace(/\s+/g,"-").trim()}`;this.id=e;const t=this.calcSelected(),s=this.filterOptions();this.tabIndex=0;const l=r`
            ${this.renderLabel(e)} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select">${t?r`${this.calcSelected()} selected`:this.model.placeholder||"Select options"}</span>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                ${this.renderSearch()}
                <div class="options">
                    ${s.map(i=>r`${new u({name:i.uid,label:i.label,checked:i.checked,callback:this.checkboxCallback.bind(this)})}`)}
                </div>
            </multiselect-options>
        `;this.setAttribute("state",this.state),this.className=`multi-select js-input ${this.model.class}`,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(i=>{this.setAttribute(i,`${this.model.attributes[i]}`)}),setTimeout(()=>{b(l,this)},80)}}d.mount("multi-select-component",p);export{p as default};