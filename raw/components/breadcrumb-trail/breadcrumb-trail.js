import{html as n,render as o}from"./lit-html.js";import a from"./supercomponent.js";import i from"./env.js";import{parseDataset as c}from"./general.js";import{unsafeHTML as d}from"./unsafe-html.js";class l extends a{constructor(e){super();this.handleClick=e=>{const r=e.currentTarget,t=parseInt(r.dataset.index);this.model.links[t].callback()};this.model={css:"",class:"",attributes:{},links:[]},this.model=c(this.dataset,this.model),i.css(["breadcrumb-trail"]).then(()=>{this.set(e,!0),this.render()})}renderIcon(e){let r;return e instanceof HTMLElement?r=n` <i class="icon">${e}</i> `:typeof e=="string"&&e.length?r=n` <i class="icon">${d(e)}</i> `:r="",r}renderLink(e,r,t=!1){return!e?.label&&!e?.icon?"":n`
            <button type="button" @click=${this.handleClick} data-index="${r}" aria-label="${e?.ariaLabel??""}">
                ${this.renderIcon(e?.icon??"")} ${e?.label?.length?n` <span>${e.label}</span> `:""}
            </button>
            ${t?n`
                      <svg
                          class="arrow"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <polyline points="9 6 15 12 9 18"></polyline>
                      </svg>
                  `:""}
        `}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(r=>{this.setAttribute(r,`${this.model.attributes[r]}`)});let e;this.model.links.length<=3?e=n`
                ${this.model.links.map((r,t)=>{let s=!0;return t===this.model.links.length-1&&(s=!1),this.renderLink(r,t,s)})}
            `:e=n`
                ${this.renderLink(this.model.links[0],0,!0)}
                <breadcrumb-overflow-menu>
                    <button aria-label="Open hidden link menu">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="5" cy="12" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                        </svg>
                    </button>
                    <breadcrumb-menu>
                        ${this.model.links.map((r,t)=>{if(t!==0&&t!==this.model.links.length-1)return this.renderLink(r,t)})}
                    </breadcrumb-menu>
                </breadcrumb-overflow-menu>
                <svg
                    class="arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <polyline points="9 6 15 12 9 18"></polyline>
                </svg>
                ${this.renderLink(this.model.links[this.model.links.length-1],this.model.links.length-1)}
            `,o(e,this)}}i.bind("breadcrumb-trail",l);export{l as default};
