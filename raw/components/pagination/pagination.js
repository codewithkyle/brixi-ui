import{html as i,render as n}from"./lit-html.js";import l from"./supercomponent.js";import s from"./env.js";import{noop as r,parseDataset as c}from"./general.js";import"./button.js";class o extends l{constructor(e){super();this.handleBack=()=>{this.back()};this.handleForward=()=>{this.forward()};this.model={css:"",class:"",attributes:{},totalPages:0,callback:r,activePage:1},this.model=c(this.dataset,this.model),s.css(["pagination","button"]).then(()=>{this.set(e,!0),this.render()})}back(){this.processPageChange(this.model.activePage-1)}forward(){this.processPageChange(this.model.activePage+1)}jumpToPage(e){this.processPageChange(e)}processPageChange(e){const t=this.get();t.activePage=e,t.activePage<0?t.activePage=0:t.activePage>t.totalPages&&(t.activePage=t.totalPages),this.set(t),this.model.callback(t.activePage)}calcVisiblePageNumbers(){let e=[];if(this.model.totalPages<=5)for(let t=1;t<=this.model.totalPages;t++)e.push(t);else this.model.activePage<=2?e=[1,2,3,4,5]:this.model.activePage>=this.model.totalPages-2?e=[this.model.totalPages-4,this.model.totalPages-3,this.model.totalPages-2,this.model.totalPages-1,this.model.totalPages]:e=[this.model.activePage-2,this.model.activePage-1,this.model.activePage,this.model.activePage+1,this.model.activePage+2];return e}render(){this.className=this.model.class,this.style.cssText=this.model.css,Object.keys(this.model.attributes).map(a=>{this.setAttribute(a,`${this.model.attributes[a]}`)});const e=this.calcVisiblePageNumbers(),t=i`
            <button-component
                data-kind="text"
                data-color="grey"
                data-size="slim"
                tooltip="Back"
                data-icon-position="center"
                data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg>'
                @click=${this.handleBack}
                data-disabled="${this.model.activePage===1}"
            ></button-component>
            ${e.map(a=>i`
                    <button-component
                        data-kind="text"
                        data-color="grey"
                        data-label="${a}"
                        class="${a===this.model.activePage?"is-active":""}"
                        style="min-width: 36px;"
                        @click=${this.jumpToPage.bind(this,a)}
                    ></button-component>
                `)}
            <button-component
                data-kind="text"
                data-color="grey"
                data-size="slim"
                tooltip="Next"
                data-icon-position="center"
                data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg>'
                data-disabled="${this.model.activePage===this.model.totalPages}"
                @click=${this.handleForward}
            ></button-component>
        `;n(t,this)}}s.bind("pagination-component",o);export{o as default};
