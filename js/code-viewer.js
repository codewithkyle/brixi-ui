import l from"./supercomponent.js";import{html as i,render as n}from"./lit-html.js";class h extends l{constructor(e){super();this.switchSource=e=>{const s=e.currentTarget.dataset.ext;console.log(s),this.set({activeExt:s})};this.copyToClipboard=e=>{let t;const s=e.currentTarget;for(let o=0;o<this.model.sourceCode.length;o++)if(this.model.sourceCode[o].ext===this.model.activeExt){t=this.model.sourceCode[o];break}navigator.clipboard.writeText(t.raw).then(()=>{s.classList.add("is-success"),setTimeout(()=>{s.classList.remove("is-success")},3e3)})};this.component=e.replace(/(mpa)|(spa)\//g,""),this.state="LOADING",this.stateMachine={LOADING:{SUCCESS:"IDLING"}},this.model={sourceCode:[],activeExt:null},this.render(),this.fetchFiles()}async fetchFiles(){const e=[`${this.component}/readme.md`,`${this.component}.html`,`${this.component}.ts`,`${this.component}.scss`,`${this.component}.css`,`${this.component}.js`];let t=0;const s={...this.model};for(let o=0;o<e.length;o++)new Promise(async c=>{const r=await fetch(`/raw/components/${location.pathname.replace(/\/.*/,"")}/${this.component}/${e[o]}`);if(r.ok){const a=await r.text();s.sourceCode.push({ext:e[o].match(/\.[0-9a-z]+$/)?.[0]??"plaintext",raw:a})}c()}).then(()=>{t++,e.length===t&&(s.activeExt=s.sourceCode[0].ext,s.sourceCode.sort((c,r)=>c.ext>r.ext),this.set(s),this.trigger("SUCCESS"))})}render(){let e;this.state==="LOADING"?e=i`
                <div class="my-1 block">
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                </div>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-3/4 mb-0.5"></txt-skel>
            `:e=i`
                <code-tabs>
                    ${this.model.sourceCode.map(t=>i`<button sfx="button" class="${t.ext===this.model.activeExt?"is-active":""}" @click=${this.switchSource} data-ext="${t.ext}">${t.ext.replace(/^\./,"").trim()}</button></button>`)}
                </code-tabs>
                <code-container>
                    ${this.model.sourceCode.map(t=>t.ext===this.model.activeExt?i`
                                  <pre class="language-${t.ext.replace(/^\./,"").trim()}">
                                <code>${t.raw}</code>
                            </pre
                                  >
                              `:"")}
                    <button @click=${this.copyToClipboard} aria-label="copy source code to clipboard" class="copy-to-clipboard">
                        <svg xmlns="http://www.w3.org/2000/svg" class="copy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </code-container>
            `,n(e,this),this.querySelectorAll("pre code").forEach(t=>{hljs?.highlightElement(t)})}}export{h as default};
