import SuperComponent from "@codewithkyle/supercomponent";
import { register, InboxEvent } from "@codewithkyle/messaging";
import { html, render } from "lit-html";

import DocViewer from "./doc-viewer";
customElements.define("docs-view", DocViewer);

import Resizer from "./resizer";
customElements.define("iframe-resizer", Resizer);

import CodeViewer from "./code-viewer";
customElements.define("code-view", CodeViewer);

type ViewData = {
    component: string,
    view: "demo" | "docs" | "code",
};
export default class View extends SuperComponent<ViewData>{
    private inboxId: string;

    constructor(){
        super();
        this.state = "IDLING";
        this.stateMachine = {
            IDLING: {
                LOAD: "LOADING",
            },
            LOADING: {
                SUCCESS: "IDLING",
                FAIL: "ERROR",
            },
            ERROR: {
                LOAD: "LOADING",
            }
        };
        this.model = {
            component: null,
            view: "demo",
        };
        this.inboxId = register("view", this.inbox.bind(this));
        this.render();
    }

    private inbox(e:InboxEvent) {
        const { data } = e;
        this.load(data);
    }

    private async load(component:string){
        this.update({
            component: component,
            view: "demo",
        });
        if (this.state !== "LOADING"){
            this.trigger("LOAD");
        }
    }

    private switchView:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        const view = target.dataset.view;
        this.update({
            // @ts-ignore
            view: view,
        });
    }

    private renderContent(){
        switch (this.model.view){
            case "code":
                return new CodeViewer(this.model.component);
            case "demo":
                return html`
                    <iframe-resizer>
                        <resize-container>
                            <resize-bar>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                                </svg>
                            </resize-bar>
                            <iframe style="opacity:0;" onload="this.style.opacity = '1';" src="/components/${this.model.component}"></iframe>
                        </resize-container>
                    </iframe-resizer>
                `;
            case "docs":
                return new DocViewer(this.model.component);
        }
    }

    connected(){
        const slug = location.pathname.replace(/^\//, "").trim();
        this.load(slug);
    }

    render(){
        let view = html`<p class="font-grey-800 absolute center">Select a component to begin.</p>`;
        if (this.model.component){
            view = html`
                <div class="mb-0.5 text-capitalize px-1" flex="row nowrap justify-between items-center">
                    <h1 class="font-md font-bold">${this.model.component.replace(/.*\//, "").trim().replace(/\-/g, " ")}</h1>
                    <view-switcher>
                        <button @click=${this.switchView} data-view="demo" class="${this.model.view === "demo" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </i>
                            Preview
                        </button>
                        <button @click=${this.switchView} data-view="docs" class="${this.model.view === "docs" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </i>
                            Documentation
                        </button>
                        <button @click=${this.switchView} data-view="code" class="${this.model.view === "code" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </i>
                            Source
                        </button>
                    </view-switcher>
                </div>
                <div class="w-full" style="height:calc(100vh - 40px - 1.5rem);display:block;overflow:hidden;">
                    ${this.renderContent()}
                </div>
            `;
        }
        render(view, this);
    }
}