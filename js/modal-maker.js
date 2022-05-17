var h=()=>{},o=class extends HTMLElement{constructor(s=h){super(),this.close=()=>{this.reject(),this.remove()},this.reject=s}connected(){}connectedCallback(){this.closeButton=this.querySelector(".close"),this.closeButton.addEventListener("click",this.close),document.activeElement.blur(),this.closeButton.focus(),this.backdrop=this.querySelector(".backdrop"),this.backdrop.addEventListener("click",this.close),this.connected()}},a=class extends o{constructor(s,e,i){super(i),this.confirm=()=>{this.resolve(),this.remove()},this.cancel=()=>{this.reject(),this.remove()},this.settings=s,this.resolve=e,this.render()}render(){this.className=this.settings.className,this.innerHTML=`
			<div class="backdrop"></div>
			<div class="modal" size="${this.settings.size}">
				<h1>${this.settings.heading}</h1>
				<p>${this.settings.message}</p>
				<div class="actions">
					<button class="cancel">
						${this.settings.rejectLabel}
					</button>
					<button class="confirm ${this.settings.dangerous?"danger":""}">
						${this.settings.confirmLabel}
					</button>
				</div>
				<button class="close" aria-label="close modal">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		`}connected(){this.confirmButton=this.querySelector(".confirm"),this.confirmButton.addEventListener("click",this.confirm),this.cancelButton=this.querySelector(".cancel"),this.cancelButton.addEventListener("click",this.cancel)}},l=class extends o{constructor(s,e,i){super(i),this.submit=n=>{n.preventDefault(),this.settings.form.checkValidity()?(this.resolve(new FormData(this.settings.form)),this.remove()):this.settings.form.reportValidity()},this.settings=s,this.resolve=e,this.render()}render(){this.className=this.settings.className,this.innerHTML=`
			<div class="backdrop"></div>
			<div class="modal" size="${this.settings.size}">
				${this.settings.heading?.length?`<h1>${this.settings.heading}</h1>`:""}
				${this.settings.message?.length?`<p>${this.settings.message}</p>`:""}
				<div class="form"></div>
				<button class="close" aria-label="close modal">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		`}connected(){this.settings.form instanceof HTMLFormElement&&(this.form=this.querySelector(".form"),this.form.appendChild(this.settings.form),this.settings.form.addEventListener("submit",this.submit))}},r=class extends o{constructor(s){super(),this.settings=s,this.render()}render(){this.className=this.settings.className,this.innerHTML=`
			<div class="backdrop"></div>
			<div class="modal" size="${this.settings.size}">
				<h1>${this.settings.heading}</h1>
				<p>${this.settings.message}</p>
				<button class="close" aria-label="close modal">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		`}},c=class extends o{constructor(s){super(),this.settings=s,this.render()}render(){this.className=this.settings.className,this.innerHTML=`
			<div class="backdrop"></div>
			<div class="modal" size="${this.settings.size}">
				${this.settings.heading?.length?`<h1>${this.settings.heading}</h1>`:""}
				${this.settings.message?.length?`<p>${this.settings.message}</p>`:""}
				<div class="container">
					${this.settings.el instanceof HTMLElement?"":this.settings.el}
				</div>
				<button class="close" aria-label="close modal">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		`}connected(){this.settings.el instanceof HTMLElement&&this.querySelector(".container").appendChild(this.settings.el)}},d=class{constructor(){this.modal=null}launch(s){this.modal?.isConnected&&(this.modal.reject(),this.modal.remove()),this.modal=s,document.body.appendChild(this.modal)}passive(s){let e=Object.assign({className:"",heading:"Heading",message:"Passive modals require a message.",size:"small"},s);this.launch(new r(e))}confirm(s){return new Promise((e,i)=>{let n=Object.assign({className:"",heading:"Heading",message:"Confirm modals require a message.",size:"small",confirmLabel:"Confirm",rejectLabel:"Cancel",dangerous:!1},s);this.launch(new a(n,e,i))})}form(s){return new Promise((e,i)=>{let n=Object.assign({className:"",heading:null,message:null,size:"medium",form:null},s);this.launch(new l(n,e,i))})}raw(s){let e=Object.assign({className:"",heading:null,message:null,size:"large",el:null},s);this.launch(new c(e))}},t=new d,m=t.passive.bind(t),g=t.confirm.bind(t),u=t.form.bind(t),v=t.raw.bind(t);customElements.define("passive-modal",r),customElements.define("confirm-modal",a),customElements.define("form-modal",l),customElements.define("raw-modal",c);export{g as confirm,u as form,m as passive,v as raw};
