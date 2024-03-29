var o=class{constructor(){this.notifications=[],this.time=performance.now(),this.loop();}loop(){let e=performance.now(),t=(e-this.time)/1e3;if(this.time=e,document.hasFocus()){for(let i=this.notifications.length-1;i>=0;i--)if(this.notifications[i]?.duration&&this.notifications[i]?.duration!==1/0){if(this.notifications[i].duration-=t,this.notifications[i].timer){let s=this.notifications[i].duration/this.notifications[i].timerDuration;this.notifications[i].timer==="vertical"?this.notifications[i].timerEl.style.transform=`scaleY(${s})`:this.notifications[i].timerEl.style.transform=`scaleX(${s})`;}this.notifications[i].duration<=0&&(this.notifications[i].el.remove(),this.notifications.splice(i,1));}}window.requestAnimationFrame(this.loop.bind(this));}push(e){let t=Object.assign({title:"Title Required",message:"Notificaitons require a message.",closeable:!0,icon:null,duration:30,classes:[],el:null,timerEl:null,autofocus:!0,buttons:[],timer:null,timerDuration:30},e);Array.isArray(t.buttons)||(t.buttons=[t.buttons]),Array.isArray(t.classes)||(t.classes=[t.classes]),(t.duration!==1/0&&t.timer==="vertical"||t.timer==="horizontal")&&(t.timerDuration=t.duration),t.el=new n(t),t.timer&&(t.timerEl=t.el.querySelector("notification-timer")),this.notifications.push(t),this.getShell().appendChild(t.el);}getShell(){let e=document.body.querySelector("notifications-component")||document.createElement("notifications-component");return e.isConnected||document.body.appendChild(e),e}append(e){this.getShell().appendChild(e);}},n=class extends HTMLElement{constructor(t){super();this.handleCloseClickEvent=()=>{this.remove();};this.handleActionButtonClick=t=>{let i=t.currentTarget,s=parseInt(i.dataset.index);this.settings.buttons[s].callback(),this.remove();};this.settings=t,this.render();}render(){for(let i=0;i<this.settings.classes.length;i++)this.classList.add(this.settings.classes[i]);this.innerHTML=`
            ${this.settings.icon?`
                <i>${this.settings.icon}</i>
            `:""}
            <copy-wrapper>
                <h3 role="${this.settings.closeable?"alertdialog":"alert"}">${this.settings.title}</h3>
                <p>${this.settings.message}</p>
                ${this.settings.buttons.length?`
                    <notification-actions>
                    ${this.settings.buttons.map((i,s)=>`<button class="${i.classes?.join(" ")}" data-index="${s}" ${i?.ariaLabel?`aria-label="${i.ariaLabel}"`:""}>${i.label}</button>`)}
                    </notification-actions>
            `:""}
            </copy-wrapper>
            ${this.settings.closeable?`
                <button aria-label="close notification" class="close js-notification-close">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                </button>
            `:""}
            ${this.settings.timer?`
                <notification-timer class="${this.settings.timer}" style="transform: ${this.settings.timer==="horizontal"?"scaleX(1)":"scaleY(1)"};"></notification-timer>
            `:""}
        `,this.querySelectorAll("button[data-index]").forEach(i=>{i.addEventListener("click",this.handleActionButtonClick);});let t=this.querySelector(".js-notification-close");t&&t.addEventListener("click",this.handleCloseClickEvent);}connectedCallback(){if(this.settings.autofocus){let t=this.querySelector(".js-notification-close");t&&(document.activeElement.blur(),t.focus());}if(this.settings.buttons.length){for(let t=0;t<this.settings.buttons.length;t++)if(this.settings.buttons[t]?.autofocus){let i=this.querySelector(`button[data-index="${t}"]`);if(i){i.focus();break}}}}};customElements.get("notification-component")||customElements.define("notification-component",n);var l=new o,c=l;

export default c;
