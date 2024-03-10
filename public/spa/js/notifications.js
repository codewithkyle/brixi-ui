var o=class{constructor(){this.notifications=[],this.time=performance.now(),this.loop()}loop(){let i=performance.now(),t=(i-this.time)/1e3;if(this.time=i,document.hasFocus()){for(let e=this.notifications.length-1;e>=0;e--)if(this.notifications[e]?.duration&&this.notifications[e]?.duration!==1/0){if(this.notifications[e].duration-=t,this.notifications[e].timer){let s=this.notifications[e].duration/this.notifications[e].timerDuration;this.notifications[e].timer==="vertical"?this.notifications[e].timerEl.style.transform=`scaleY(${s})`:this.notifications[e].timerEl.style.transform=`scaleX(${s})`}this.notifications[e].duration<=0&&(this.notifications[e].el.remove(),this.notifications.splice(e,1))}}window.requestAnimationFrame(this.loop.bind(this))}push(i){let t=Object.assign({title:"Title Required",message:"Notificaitons require a message.",closeable:!0,icon:null,duration:30,classes:[],el:null,timerEl:null,autofocus:!0,buttons:[],timer:null,timerDuration:30},i);Array.isArray(t.buttons)||(t.buttons=[t.buttons]),Array.isArray(t.classes)||(t.classes=[t.classes]),(t.duration!==1/0&&t.timer==="vertical"||t.timer==="horizontal")&&(t.timerDuration=t.duration),t.el=new n(t),t.timer&&(t.timerEl=t.el.querySelector("notification-timer")),this.notifications.push(t),this.getShell().appendChild(t.el)}getShell(){let i=document.body.querySelector("notifications-component")||document.createElement("notifications-component");return i.isConnected||document.body.appendChild(i),i}append(i){this.getShell().appendChild(i)}},n=class extends HTMLElement{constructor(i){super(),this.handleCloseClickEvent=()=>{this.remove()},this.handleActionButtonClick=t=>{let e=t.currentTarget,s=parseInt(e.dataset.index);this.settings.buttons[s].callback(),this.remove()},this.settings=i,this.render()}render(){for(let t=0;t<this.settings.classes.length;t++)this.classList.add(this.settings.classes[t]);this.innerHTML=`
            ${this.settings.icon?`
                <i>${this.settings.icon}</i>
            `:""}
            <copy-wrapper>
                <h3 role="${this.settings.closeable?"alertdialog":"alert"}">${this.settings.title}</h3>
                <p>${this.settings.message}</p>
                ${this.settings.buttons.length?`
                    <notification-actions>
                    ${this.settings.buttons.map((t,e)=>`<button class="${t.classes?.join(" ")}" data-index="${e}" ${t?.ariaLabel?`aria-label="${t.ariaLabel}"`:""}>${t.label}</button>`)}
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
        `,this.querySelectorAll("button[data-index]").forEach(t=>{t.addEventListener("click",this.handleActionButtonClick)});let i=this.querySelector(".js-notification-close");i&&i.addEventListener("click",this.handleCloseClickEvent)}connectedCallback(){if(this.settings.autofocus){let i=this.querySelector(".js-notification-close");i&&(document.activeElement.blur(),i.focus())}if(this.settings.buttons.length){for(let i=0;i<this.settings.buttons.length;i++)if(this.settings.buttons[i]?.autofocus){let t=this.querySelector(`button[data-index="${i}"]`);if(t){t.focus();break}}}}};customElements.get("notification-component")||customElements.define("notification-component",n);var a=new o,l=a,c=l;export{c as default};
