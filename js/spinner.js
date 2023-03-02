import{html as i,render as o}from"./lit-html.js";import n from"./supercomponent.js";import e from"./env.js";import{parseDataset as a}from"./general.js";class r extends n{constructor(t={}){super(),this.model={color:"grey",size:18,css:"",class:"",attributes:{}},this.model=a(this.dataset,this.model),e.css(["spinner"]).then(()=>{this.set(t,!0),this.render()})}render(){Object.keys(this.model.attributes).map(s=>{this.setAttribute(s,`${this.model.attributes[s]}`)}),this.style.cssText=`${this.model.css}`,this.className=this.model.class,this.model.color!=="white"?this.style.color=`var(--${this.model.color}-700)`:this.style.color="var(--white)",this.style.width="",this.style.height=`${this.model.size}px`;const t=i`
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g class="fa-group">
                    <path
                        class="fa-secondary"
                        fill="currentColor"
                        d="M478.71 364.58zm-22 6.11l-27.83-15.9a15.92 15.92 0 0 1-6.94-19.2A184 184 0 1 1 256 72c5.89 0 11.71.29 17.46.83-.74-.07-1.48-.15-2.23-.21-8.49-.69-15.23-7.31-15.23-15.83v-32a16 16 0 0 1 15.34-16C266.24 8.46 261.18 8 256 8 119 8 8 119 8 256s111 248 248 248c98 0 182.42-56.95 222.71-139.42-4.13 7.86-14.23 10.55-22 6.11z"
                        opacity="0.4"
                    ></path>
                    <path
                        class="fa-primary"
                        fill="currentColor"
                        d="M271.23 72.62c-8.49-.69-15.23-7.31-15.23-15.83V24.73c0-9.11 7.67-16.78 16.77-16.17C401.92 17.18 504 124.67 504 256a246 246 0 0 1-25 108.24c-4 8.17-14.37 11-22.26 6.45l-27.84-15.9c-7.41-4.23-9.83-13.35-6.2-21.07A182.53 182.53 0 0 0 440 256c0-96.49-74.27-175.63-168.77-183.38z"
                    ></path>
                </g>
            </svg>
        `;o(t,this)}}e.bind("spinner-component",r);export{r as default};
