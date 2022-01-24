import{html as r,render as d}from"./lit-html.js";import h from"./supercomponent.js";import o from"./env.js";import{unsafeHTML as c}from"./unsafe-html.js";import{subscribe as u}from"./pubsub.js";import g from"./badge.js";import{parseDataset as m}from"./general.js";class l extends h{constructor(e){super();this.handleMenuClick=e=>{const t=!this.model.isOpen;localStorage.setItem("side-nav-state",`${t}`),this.update({isOpen:t})};let t=localStorage.getItem("side-nav-state")!=="false";window.innerWidth<=350&&(t=!1),this.model={nav:[],isOpen:t,name:"",role:"",avatar:"",currentPage:location.pathname.replace(/^\//,"").toLowerCase(),logo:"",title:"",css:"",class:"",attributes:{}},this.model=m(this.dataset,this.model),o.css(["side-nav"]).then(()=>{this.set(e,!0),this.render()}),u("navigation",this.inbox.bind(this))}inbox(e){this.update({currentPage:e.replace(/^\//,"").toLowerCase()})}connected(){window.addEventListener("resize",this.debounce(()=>{let e=localStorage.getItem("side-nav-state")!=="false";window.innerWidth<=350&&(e=!1),this.update({isOpen:e})},300),{passive:!0})}renderIcon(e){let t;return e?.icon?.length?t=r`
                <i>
                    ${c(e.icon)}
                    ${e?.badge?r`${new g({offsetX:-3,offsetY:3})}`:""}
                </i>
            `:t="",t}renderMenuIcon(){let e;return this.model.isOpen?e=r`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            `:e=r`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `,e}renderLink(e){let t;const s=e.label.toLocaleLowerCase().replace(/\s+/g,"-");let i=!1;if(e?.subnav?.length){for(let a=0;a<e.subnav.length;a++)if(this.model.currentPage===e.subnav[a].url.replace(/^\//,"".trim().toLowerCase())){i=!0;break}if(!e?.badge){let a=!1;for(let n=0;n<e.subnav.length;n++)if(e.subnav[n]?.badge){a=!0;break}e.badge=a}}return this.model.isOpen?!e?.url?.length&&e?.subnav?.length?t=r`
                    <div class="link">
                        <label sfx="button" for="${s}">
                            ${this.renderIcon(e)}
                            <span>${e.label}</span>
                        </label>
                        <input ?checked=${i} type="checkbox" name="${s}" id="${s}" />
                        <div class="sub">${e.subnav.map(a=>this.renderLink(a))}</div>
                    </div>
                `:t=r`
                    <a
                        sfx="button"
                        class="${this.model.currentPage===e.url.replace(/^\//,"".trim())?"is-active":""}"
                        href="${e.url}"
                        target="_${e?.target?.length?e.target:"self"}"
                    >
                        ${this.renderIcon(e)}
                        <span>${e.label}</span>
                    </a>
                `:!e?.url?.length&&e?.subnav?.length?t=r`
                    <div class="link">
                        <label sfx="button" for="${s}" tooltip="${e.label}">
                            ${this.renderIcon(e)}
                            <span>${e.label}</span>
                        </label>
                        <input ?checked=${i} type="checkbox" name="${s}" id="${s}" />
                        <div class="sub">${e.subnav.map(a=>this.renderLink(a))}</div>
                    </div>
                `:t=r`
                    <a
                        sfx="button"
                        class="${this.model.currentPage===e.url.replace(/^\//,"".trim())?"is-active":""}"
                        tooltip="${e.label}"
                        href="${e.url}"
                        target="_${e?.target?.length?e.target:"self"}"
                    >
                        ${this.renderIcon(e)}
                        <span>${e.label}</span>
                    </a>
                `,t}render(){this.style.cssText=this.model.css,this.className=this.model.class,Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),this.setAttribute("state",this.model.isOpen?"open":"closed");const e=this.model.name.split(" ").map(s=>s[0]).join(""),t=r`
            <div class="container">
                <header>
                    <div flex="row nowrap items-center">
                        ${this.model.logo?.length?r`<img src="${this.model.logo}" />`:""}
                        <h1>${this.model.title}</h1>
                    </div>
                    <button sfx="button" @click=${this.handleMenuClick} tooltip="${this.model.isOpen?"Collapse menu":"Open menu"}" class="menu">
                        ${this.renderMenuIcon()}
                    </button>
                </header>
                <nav>
                    ${this.model.nav.map(s=>this.renderLink(s))}
                </nav>
                <footer>
                    <div flex="row nowrap items-center">
                        <div class="avatar">
                            ${this.model.avatar?.length?r`<img src="${this.model.avatar}" alt="profile photo of ${this.model.name}" title="Profile photo of ${this.model.name}" />`:""}
                            <span>${e}</span>
                        </div>
                        <div class="details">
                            <h3 title="${this.model.name}">${this.model.name}</h3>
                            ${this.model.role?.length?r`<h4 title="${this.model.role}">${this.model.role}</h4>`:""}
                        </div>
                    </div>
                    <button sfx="button" class="logout" tooltip="Logout">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </footer>
            </div>
        `;d(t,this)}}o.mount("side-nav",l);export{l as default};
