import{html as t,render as s}from"./lit-html.js";import l from"./env.js";import{parseDataset as a}from"./general.js";import{unsafeHTML as d}from"./unsafe-html.js";import c from"./component.js";l.css(["breadcrumb-trail"]);class o extends c{constructor(){super();this.handleClick=e=>{const r=new CustomEvent("navigate",{detail:{id:e.currentTarget.dataset.id},bubbles:!0,cancelable:!0});this.dispatchEvent(r)};this.model={links:[]}}static get observedAttributes(){return["data-links"]}async connected(){const e=a(this.dataset,this.model);this.set(e)}renderIcon(e){let r="";return e.length?r=t` <i class="icon">${d(decodeURI(e))}</i> `:r="",r}renderLink(e,r=!1){return!e?.label&&!e?.icon?"":t`
            <button sfx="button" type="button" @click=${this.handleClick} data-id="${e.id}" aria-label="${e?.ariaLabel??""}">
                ${this.renderIcon(e?.icon??"")} ${e?.label?.length?t` <span>${e.label}</span> `:""}
            </button>
            ${r?t`
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
        `}render(){let e;this.model.links.length<=3?e=t`
                ${this.model.links.map((r,n)=>{let i=!0;return n===this.model.links.length-1&&(i=!1),this.renderLink(r,i)})}
            `:e=t`
                ${this.renderLink(this.model.links[0],!0)}
                <breadcrumb-overflow-menu>
                    <button aria-label="Open hidden link menu" sfx="button">
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
                        ${this.model.links.map((r,n)=>{if(n!==0&&n!==this.model.links.length-1)return this.renderLink(r)})}
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
                ${this.renderLink(this.model.links[this.model.links.length-1])}
            `,s(e,this)}}l.bind("brixi-breadcrumb-trail",o);export{o as default};
