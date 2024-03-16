var s=Object.defineProperty;var a=(r,t,e)=>t in r?s(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var i=(r,t,e)=>(a(r,typeof t!="symbol"?t+"":t,e),e);class l extends HTMLElement{constructor(){super();i(this,"onBlur",()=>{if(this.textareaEl!=null){if(this.textareaEl.required&&this.textareaEl.value.trim().length==0){this.renderError("This field is required.");return}else if(this.textareaEl?.minLength!==-1&&this.textareaEl.value.length<this.textareaEl.minLength){this.renderError(`This field must be at least ${this.textareaEl.minLength} characters.`);return}else if(this.textareaEl.maxLength!==-1&&this.textareaEl.value.length>this.textareaEl.maxLength){this.renderError(`This field must be less than ${this.textareaEl.maxLength} characters.`);return}this.clearError()}});i(this,"onInput",()=>{this.clearError()})}connectedCallback(){this.textareaEl=this.querySelector("textarea"),this.textareaEl&&(this.textareaEl?.addEventListener("blur",this.onBlur.bind(this)),this.textareaEl?.addEventListener("input",this.onInput.bind(this)),this.textareaEl.maxLength>-1&&(!this.textareaEl.disabled||!this.textareaEl.readOnly)&&(this.counterEl=document.createElement("span"),this.counterEl.classList.add("counter"),this.counterEl.innerHTML=`${this.textareaEl.value.length}/${this.textareaEl.maxLength}`,this.appendChild(this.counterEl)),this.descEl=this.querySelector("p"),this.descEl==null&&(this.descEl=document.createElement("p"),this.insertBefore(this.descEl,this)),this.instructions=this.descEl?.innerHTML??"")}renderError(e){this.textareaEl!=null&&(this.setAttribute("state","ERROR"),this.descEl.innerHTML=e)}clearError(){this.textareaEl==null||this.textareaEl.getAttribute("state")==="IDLING"||(this.setAttribute("state","IDLING"),this.descEl!=null&&(this.descEl.innerHTML=this.instructions))}}export{l as BrixiInputComponent};
