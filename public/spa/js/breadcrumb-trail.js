import{html as r,render as s}from"./lit-html.js";import l from"./env.js";import{parseDataset as a}from"./general.js";import{unsafeHTML as d}from"./unsafe-html.js";import c from"./component.js";l.css(["breadcrumb-trail"]);class o extends c{constructor(){super();this.handleClick=e=>{const t=new CustomEvent("navigate",{detail:{id:e.currentTarget.dataset.id},bubbles:!0,cancelable:!0});this.dispatchEvent(t)};this.model={links:[]}}static get observedAttributes(){return["data-links"]}async connected(){const e=a(this.dataset,this.model);this.set(e)}renderIcon(e){let t="";return e.length?t=r` <i class="icon">${d(decodeURI(e))}</i> `:t="",t}renderLink(e,t=!1){return!e?.label&&!e?.icon?"":r`
            <button sfx="button" type="button" @click=${this.handleClick} data-id="${e.id}" aria-label="${e?.ariaLabel??""}">
                ${this.renderIcon(e?.icon??"")} ${e?.label?.length?r` <span>${e.label}</span> `:""}
            </button>
            ${t?r`
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
        `}render(){let e;this.model.links.length<=3?e=r`
                ${this.model.links.map((t,n)=>{let i=!0;return n===this.model.links.length-1&&(i=!1),this.renderLink(t,i)})}
            `:e=r`
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
                        ${this.model.links.map((t,n)=>{if(n!==0&&n!==this.model.links.length-1)return this.renderLink(t)})}
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
            `,s(e,this)}}l.bind("breadcrumb-trail",o);export{o as default};
