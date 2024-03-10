import a from"./supercomponent.js";import{message as i}from"./messaging.js";import{html as n,render as s}from"./lit-html.js";class o extends a{constructor(){super();this.navigate=t=>{const e=t.currentTarget,r=e.dataset.slug.replace(/.*\//,"").trim();this.set({active:r}),window.history.replaceState(null,null,`/${e.dataset.slug}`),i({recipient:"view",data:e.dataset.slug})};this.toggleGroup=t=>{t.currentTarget.classList.toggle("is-open")};this.handleMenuClick=t=>{document.body.classList.toggle("is-open")};this.state="LOADING",this.stateMachine={LOADING:{SUCCESS:"IDLING"}},this.model={navigation:[],active:null},this.render()}async fetchNavigation(){const e=await(await fetch("/navigation.json",{method:"GET",headers:new Headers({Accept:"application/json"})})).json();this.set({navigation:e}),this.trigger("SUCCESS")}renderLink(t){let e=location.pathname.includes("/mpa/")?"mpa":"spa";return n`
            <button sfx="button" class="${t.slug===this.model.active?"is-active":""}" @click=${this.navigate} data-slug="${e}/${t.slug}">
                <span>${t.name.replace(/\-/g," ")}</span>
            </button>
        `}renderLinkWithChildren(t){return n`
            <button sfx="button" @click=${this.toggleGroup}>
                <span>${t.name.replace(/\-/g," ")}</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512">
                        <path
                            fill="currentColor"
                            d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                        />
                    </svg>
                </i>
            </button>
            <nav-children-container>
                ${t.children.map(e=>e.children.length?this.renderLinkWithChildren(e):this.renderLink(e))}
            </nav-children-container>
        `}render(){let t;switch(this.state){case"LOADING":t=n`
                    ${Array.from(Array(8)).map(()=>n` <nav-skel></nav-skel> `)}
                `;break;default:t=n`
                    ${this.model.navigation.map(e=>n` ${e.children.length?this.renderLinkWithChildren(e):this.renderLink(e)} `)}
                    <button @click=${this.handleMenuClick} style="position:fixed;top:1.5rem;left:295px;" class="bttn menu" kind="text" color="grey" icon="center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="open" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                `;break}s(t,this)}connected(){this.fetchNavigation();const t=location.pathname.replace(/.*\//,"").trim();this.set({active:t})}}export{o as default};
