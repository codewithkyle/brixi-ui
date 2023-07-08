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
    component: string;
    view: "demo" | "docs" | "code";
};
export default class View extends SuperComponent<ViewData> {
    private inboxId: string;

    constructor() {
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
            },
        };
        this.model = {
            component: null,
            view: "demo",
        };
        this.inboxId = register("view", this.inbox.bind(this));
        this.render();
    }

    private inbox(e: InboxEvent) {
        const { data } = e;
        this.load(data);
    }

    private async load(component: string) {
        this.set({
            component: component,
            view: "demo",
        });
        if (this.state !== "LOADING") {
            this.trigger("LOAD");
        }
    }

    private switchView: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        const view = target.dataset.view;
        this.set({
            // @ts-ignore
            view: view,
        });
    };

    private renderContent() {
        switch (this.model.view) {
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
                            <iframe style="opacity:0;" onload="this.style.opacity = '1';" src="/components/${this.model.component}/index.html"></iframe>
                        </resize-container>
                    </iframe-resizer>
                `;
            case "docs":
                return new DocViewer(this.model.component);
        }
    }

    connected() {
        const slug = location.pathname.replace(/^\//, "").trim();
        this.load(slug);
    }

    render() {
        let view = html`
            <div class="block w-full h-screen scroll-y-auto px-1">
                <div class="w-full max-w-768 mx-auto block py-4">
                    <h1 class="block font-grey-700 font-3xl font-bold mb-0.5 line-normal">Howdy stranger!</h1>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        Brixi UI is a sleek & slender design system built on the
                        <a class="link" href="https://brixi.dev/" target="_blank" rel="noopener">Brixi
                        CSS framework</a>. The goal of Brixi UI is to provide me with a lightweight accessibility-conscious design system built on web standards such as ES Modules and
                        Web Components.
                    </p>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        Brixi UI is built on two primary NPM packages:
                        <a class="link" href="https://lit.dev/docs/libraries/standalone-templates/" target="_blank" rel="noopener">lit-html</a>
                        and
                        <a class="link" href="https://github.com/codewithkyle/supercomponent" target="_blank" rel="noopener">SuperComponents</a>.
                    </p>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        The lit-html library renders HTML templates in JavaScript using template literals with embedded JavaScript expressions. lit-html identifies the static and dynamic HTML to efficiently update just the changed portions without using a virtual DOM. lit-html is not tied to any component model, it focuses only
                        on creating and updating DOM.
                    </p>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        The SuperComponent library gives your Web Components modern-day superpowers like creating stateful Web Components (similar to
                        <a href="https://reactjs.org/" class="link" target="_blank" rel="noopener">React</a>
                        components) along with the ability to manage your components state with an
                        <a href="https://xstate.js.org/" class="link" target="_blank" rel="noopener">xstate</a>
                        inspired state machine.
                    </p>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        If you're interested in learning more about lit-html or xstate you can watch the videos below where the authors of each library provide insights and a deep
                        dive into the inner workings of their projects.
                    </p>
                    <div class="w-full mb-4" grid="columns 2 gap-1">
                        <iframe
                            class="w-full ar-16:9"
                            src="https://www.youtube.com/embed/Io6JjgckHbg"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <iframe
                            class="w-full ar-16:9"
                            src="https://www.youtube.com/embed/VU1NKX6Qkxc"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">How Brixi UI works.</h2>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        There are two ways to use Brixi UI. All the UI components can be installed into a project via NPM using the command
                        <code class="inline-block font-xs font-warning-700 bg-warning-100 px-0.25 radius-0.25">npm i -D brixi-ui</code>
                        or you can browse the source code of individual components using the menu on the left. Each component is contained in separate JavaScript file that defines a custom HTML element that can be appended to the DOM.
                    </p>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        The benifit of downloading the UI package instead of cherry-picking individual components is all the extra utility classes that the library provides.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">What does Brixi UI provide?</h2>
                    <ul class="font-sm line-normal mb-4 list">
                        <li>Dozens of Web Components that can be rendered/configured at runtime.</li>
                        <li>An enviroment class which can be used to bootstrap new components or load CSS.</li>
                        <li>A soundscape class which provides generic sound effects such as hover, tap, notifications, and toggles.</li>
                        <li>Utility functions such as native UUID v4 generation and a debounce function.</li>
                        <li>A Web Component based dynamic runtime router that can be used to build SPAs.</li>
                    </ul>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">What doesn't Brixi UI provide?</h2>
                    <ul class="font-sm line-normal mb-4 list">
                        <li>Tools for compiling/bundling your JavaScript or CSS.</li>
                        <li>A built in web server for developing or demoing your project.</li>
                    </ul>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">Who should use Brixi UI?</h2>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        Everybody, or maybe nobody. The Brixi UI design system is a tool I created for myself to build SPAs faster. All of the components are licensed
                        under MIT. Feel free to download and use any component for any commercial/non-commercial project.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">Why create a custom CSS framework?</h2>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        Like most framework authors I wanted something that solved my specific problem. I noticed while using
                        <a class="link" href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>
                        that I often only used a handful of classes, such as font, text, border, background, margin, and padding. At the time I was working on a server-side
                        rendered PHP project and I decided it would be easier to create my own lightweight utility-first CSS framework than it would be to figure out how to use
                        <a class="link" href="https://purgecss.com/" target="_blank" rel="noopener">Purge CSS</a>
                        with my templating system.
                    </p>
                    <p class=" mb-0.5 font-grey-700 font-sm line-normal">
                        After building the CSS framework I created
                        <a class="link" href="https://github.com/codewithkyle/supercomponent" target="_blank" rel="noopener">SuperComponents</a>. I wanted something that used Web
                        Components while providing similar functionality to
                        <a href="https://reactjs.org/" class="link" target="_blank" rel="noopener">React</a>
                        without the overhead of the virtual DOM. Super Components separate the components state and model allowing developers to define and trigger state
                        transitions without touching the components data model.
                    </p>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        I also didn't want to limit myself to JavaScript based UI frameworks. Using a tool like
                        <a class="link" href="https://github.com/codewithkyle/lazy-loader" target="_blank" rel="noopener">Lazy Loader</a>
                        I can create Super Components that will automatically load and mount on server-side rendered projects.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">Why Web Components?</h2>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        Web Components are (and have been) supported in
                        <a class="link" href="https://caniuse.com/custom-elementsv1" target="_blank" rel="noopener">every major browser</a>
                        for a while. They provide native component mount/unmount functionality and with the way Web Components bind to the DOM nodes they can be queried and their
                        functions can be immediately invoked from the element(s) returned from the query. This means you don't need to provide state/prop callbacks between components, just
                        <code class="inline-block font-xs font-warning-700 bg-warning-100 px-0.25 radius-0.25">querySelector</code>
                        your component's custom element name to gain access to any of it's public methods.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">What if I don't want to use your framework/libraries?</h2>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        That's fine. You can use the menu on the left to pick-and-choose what component you like and you can use the Source view to copy the SCSS and TypeScript
                        source code. Each component can (somewhat) easily be converted to use Vue, React, or any other JavaScript based UI framework.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">What if I use server-side rendering in a non-JavaScript framework?</h2>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        That works too. Every component is configured using
                        <a class="link" href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes" target="_blank" rel="noopener">data attributes</a>. On
                        the server all you need to do is render the empty custom element with the data attributes corresponding to the model objects keys. When the browser loads the component's JavaScript file
                        the component will be automatically mounted and rendered.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">Contributing to Brixi UI.</h2>
                    <p class=" mb-4 font-grey-700 font-sm line-normal">
                        Contributions are welcome, however, this is my personal design system. Any contributions are likely to be subject to scrutiny and multiple revisions until I
                        feel like the component fits the look and feel of the overall design system.
                    </p>

                    <h2 class="block font-grey-700 font-lg font-bold mb-0.5 line-normal">Attribution and Inspiration.</h2>
                    <p class=" mb-1 font-grey-700 font-sm line-normal">Brixi UI was built on the shoulders of giants like:</p>
                    <ul class="font-sm line-normal list">
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://tailwindui.com/" target="_blank" rel="noopener">Tailwind UI</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://getbootstrap.com/" target="_blank" rel="noopener">Bootstrap</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://polaris.shopify.com/" target="_blank" rel="noopener">Shopify Polaris</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://stripe.com/payments/elements" target="_blank" rel="noopener">Stripe</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://vuesax.com/" target="_blank" rel="noopener">Vuesax</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://lit-html.polymer-project.org/guide" target="_blank" rel="noopener">lit-html</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://flatpickr.js.org/" target="_blank" rel="noopener">flatpickr</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://day.js.org/" target="_blank" rel="noopener">day.js</a>
                        </li>
                        <li style="list-style-type:'\\1F517';">
                            <a class="link" href="https://fusejs.io/" target="_blank" rel="noopener">fuse.js</a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        if (this.model.component) {
            view = html`
                <div class="head mb-0.5 text-capitalize scroll-x-auto" flex="row nowrap justify-between items-center">
                    <h1 class="font-md font-bold mr-1">${this.model.component.replace(/.*\//, "").trim().replace(/\-/g, " ")}</h1>
                    <view-switcher>
                        <button sfx="button" @click=${this.switchView} data-view="demo" class="${this.model.view === "demo" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </i>
                            Preview
                        </button>
                        <button sfx="button" @click=${this.switchView} data-view="docs" class="${this.model.view === "docs" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </i>
                            Documentation
                        </button>
                        <button sfx="button" @click=${this.switchView} data-view="code" class="${this.model.view === "code" ? "is-selected" : ""}">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </i>
                            Source
                        </button>
                    </view-switcher>
                </div>
                <div class="w-full" style="height:calc(100vh - 40px - 1.5rem);display:block;overflow:hidden;">${this.renderContent()}</div>
            `;
        }
        render(view, this);
    }
}
