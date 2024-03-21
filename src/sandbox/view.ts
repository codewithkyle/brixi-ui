import SuperComponent from "@codewithkyle/supercomponent";
import { register, InboxEvent } from "@codewithkyle/messaging";
import { html, render } from "lit-html";

import DocViewer from "./doc-viewer";
customElements.define("docs-view", DocViewer);

import Resizer from "./resizer";
customElements.define("iframe-resizer", Resizer);

import CodeViewer from "./code-viewer";
customElements.define("code-view", CodeViewer);

import "./tabs";

type ViewData = {
    component: string;
    view: "demo" | "docs" | "code";
    tab: "overview" | "spa" | "mpa";
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
            tab: "overview",
        };
        this.inboxId = register("view", this.inbox.bind(this));
        this.render();
    }

    private inbox(e: InboxEvent) {
        const { data } = e;
        this.load(data);
    }

    private async load(component: string) {
        if (component === "mpa/" || component === "spa/" || component === "/") {
            return;
        }
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

    private switchTab = (e: CustomEvent) => {
        const value = e.detail.value;
        this.set({ tab: value });
    }

    private renderOverview() {
        if (this.model.tab !== "overview") {
            return "";
        }
        return html`
            <p class=" mb-2 font-sm line-normal">
                Brixi UI is a sleek & slender design system built on the
                <a class="link" href="https://brixi.dev/" target="_blank" rel="noopener">Brixi CSS framework</a>. The goal of Brixi UI is to provide <a class="link" href="https://kyleandrews.dev/" target="_blank">me</a> with a lightweight
                accessibility-conscious design system built on web standards such as ES Modules and Web Components.
            </p>
            <h2 class="block font-lg font-bold mb-0.5 line-normal">Who should use Brixi UI?</h2>
            <p class=" mb-4 font-sm line-normal">
                The Brixi UI design system is a personal component library I bulilt to assist with building web applications. All of the components are licensed
                under MIT. Feel free to download and use any component for any commercial/non-commercial project.
            </p>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Why create a custom CSS framework?</h2>
            <p class=" mb-0.5 font-sm line-normal">
                Like most framework authors I wanted something that solved my specific problem. I noticed while using
                <a class="link" href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>
                that I often only used a handful of classes, such as font, text, border, background, margin, and padding. At the time I was working on a server-side
                rendered PHP project and I decided it would be easier to create my own lightweight utility-first CSS framework than it would be to figure out how to use
                <a class="link" href="https://purgecss.com/" target="_blank" rel="noopener">Purge CSS</a>
                with my templating and content management system.
            </p>
            <p class=" mb-4 font-sm line-normal">
                After building the CSS framework I created
                <a class="link" href="https://github.com/codewithkyle/supercomponent" target="_blank" rel="noopener">SuperComponents</a>. I wanted something that used Web
                Components while providing similar functionality to
                <a href="https://reactjs.org/" class="link" target="_blank" rel="noopener">React</a>
                without the overhead of the virtual DOM. Super Components separate the components state and model allowing developers to define and trigger state
                transitions without touching the components data model.
            </p>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Why Web Components?</h2>
            <p class=" mb-4 font-sm line-normal">
                Web Components are (and have been) supported in
                <a class="link" href="https://caniuse.com/custom-elementsv1" target="_blank" rel="noopener">every major browser</a>
                for a while. They provide native component mount/unmount functionality and with the way Web Components bind to the DOM nodes they can be queried and their
                functions can be immediately invoked from the element(s) returned from the query. This means you don't need to provide state/prop callbacks between
                components, just
                <code class="inline-block font-xs font-warning-700 dark:font-warning-300 bg-warning-100 dark:bg-warning-100/15 px-0.25 radius-0.25">querySelector</code>
                your component's custom element name to gain access to any of it's public methods.
            </p>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Contributing to Brixi UI.</h2>
            <p class=" mb-4 font-sm line-normal">
                Contributions are welcome, however, this is my personal design system. Any contributions are likely to be subject to scrutiny and multiple revisions until I
                feel like the component fits the look and feel of the overall design system.
            </p>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Attribution and Inspiration.</h2>
            <p class=" mb-1 font-sm line-normal">Brixi UI was built on the shoulders of giants like:</p>
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
        `;
    }

    private renderSPA() {
        if (this.model.tab !== "spa") {
            return "";
        }
        return html`
            <p class=" mb-0.5 font-sm line-normal">
                The SPA (single page app) version of Brixi UI is built on two primary NPM packages:
                <a class="link" href="https://lit.dev/docs/libraries/standalone-templates/" target="_blank" rel="noopener">lit-html</a>
                and
                <a class="link" href="https://github.com/codewithkyle/supercomponent" target="_blank" rel="noopener">SuperComponents</a>.
            </p>
            <p class=" mb-0.5 font-sm line-normal">
                The lit-html library renders HTML templates in JavaScript using template literals with embedded JavaScript expressions. lit-html identifies the static and
                dynamic HTML to efficiently update just the changed portions without using a virtual DOM. lit-html is not tied to any component model, it focuses only on
                creating and updating DOM.
            </p>
            <p class=" mb-0.5 font-sm line-normal">
                The SuperComponent library gives your Web Components modern-day superpowers like creating stateful Web Components (similar to
                <a href="https://reactjs.org/" class="link" target="_blank" rel="noopener">React</a>
                components) along with the ability to manage your components state with an
                <a href="https://xstate.js.org/" class="link" target="_blank" rel="noopener">xstate</a>
                inspired state machine.
            </p>
            <p class=" mb-0.5 font-sm line-normal">
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

            <h2 class="block font-lg font-bold mb-0.5 line-normal">What does Brixi UI provide?</h2>
            <ul class="font-sm line-normal mb-4 list">
                <li>Dozens of pre-built Web Components.</li>
                <li>
                    An enviroment class which can be used to bootstrap new components or load CSS along with other goodies such as browser detection, global loading state
                    tracking, and network type detection.
                </li>
                <li>
                    A soundscape class which provides generic sound effects such as hover, tap, notifications, and toggles along with methods to load, play, pause, and
                    disable custom audio files.
                </li>
                <li>Utility functions such as native UUID v4 generation and a debounce function.</li>
                <li>A modal class for creating and destroying various modals such as passive modals, confirmation modals, and form modals.</li>
                <li>A form component that handles serializing form data, submission animations, client side validation, and error reporting.</li>
                <li>A window component that can be reposition anywhere within the browser along with resizing, maximizing, and minimizing.</li>
            </ul>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">What doesn't Brixi UI provide?</h2>
            <ul class="font-sm line-normal mb-4 list">
                <li>Tools for compiling/bundling your JavaScript or CSS.</li>
                <li>A built in web server for developing or demoing your project.</li>
                <li>A Web Component based router.</li>
            </ul>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Installing Brixi UI.</h2>
            <p class=" mb-0.5 font-sm line-normal">
                There are two ways to install Brixi UI SPA components. All of the components can be installed into a project via NPM using the command
                <code class="inline-block font-xs font-warning-700 dark:font-warning-300 bg-warning-100 dark:bg-warning-100/15 px-0.25 radius-0.25">npm i -D brixi-ui</code>
                You could also browse the source code of individual components using the menu on the left. Each component is contained within separate JavaScript files that
                define a custom HTML element as a Web Component.
            </p>
            <p class=" mb-4 font-sm line-normal">
                The benifit of downloading the UI package instead of cherry-picking individual components is all the extra utility classes that the library provides.
            </p>
        `;
    }

    private renderMPA() {
        if (this.model.tab !== "mpa") {
            return "";
        }
        return html`
            <p class=" mb-2 font-sm line-normal">
                The MPA (multi page app) version of Brixi UI is built on
                <a class="link" href="https://alpinejs.dev/" target="_blank" rel="noopener">Alpine.js</a> and
                <a class="link" href="https://github.com/codewithkyle/lazy-loader" target="_blank" rel="noopener">Lazy Loader</a> but also
                works well with libraries like <a class="link" href="https://htmx.org/" target="_blank" rel="noopener">HTMX</a>.
            </p>

            <h2 class="block font-lg font-bold mb-0.5 line-normal">Installing Brixi UI.</h2>
            <p class=" mb-0.5 font-sm line-normal">
                The MPA version of Brixi UI components can be added into your project by including the HTML, CSS, and occasionally JavaScript files into your project. The source code for each component is available in "Source" viewer mode.
            </p>
            <p class=" mb-1 font-sm line-normal">
                You can bootstrap the Lazy Loader library and Alpine.js by including the following script tags in the head of your HTML document.
            </p>

<pre class="language-html mb-0.5">
<code>&lt;script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"&gt;&lt;/script&lt;
&lt;script type="module"&gt;
    import { configure, update, mount, css } from "https://cdn.jsdelivr.net/npm/@codewithkyle/lazy-loader@1/lazy-loader.min.mjs";
    configure({
        jsDir: "/path/to/pubilc/js",
        cssDir: "/path/to/public/css",
        default: "eager"
    });
&lt;/script&gt;
</code>
</pre>

            <p class=" mb-0.5 font-sm line-normal">
                With the dependencies squared away you can begin adding components by switching the site into "MPA" mode using the button located at the top right of the site.
                Then click into a component from the menu on the left. After demoing the component you can switch to "Source" viewer mode to see the HTML, CSS, and JavaScript required to use the component in your project.
                Note that only a few components require JavaScript most of the client side functionality is implemented with Alpine.
            </p>
        `;
    }

    render() {
        let view = html`
            <div class="block w-full h-screen scroll-y-auto px-1 pb-4">
                <div class="w-full max-w-768 mx-auto block py-4">
                    <brixi-tabs
                        class="w-full mb-1 border-b-1 border-b-solid border-b-grey-300 dark:border-b-grey-700"
                        data-tabs='[{"label":"Overview","value":"overview","active":true},{"label":"SPA","value":"spa"},{"label":"MPA","value":"mpa"}]'
                        @change=${this.switchTab}
                    ></brixi-tabs> 
                    ${this.renderOverview()}
                    ${this.renderSPA()}
                    ${this.renderMPA()}
                </div>
            </div>
        `;
        if (this.model.component) {
            view = html`
                <div class="head mb-1 text-capitalize scroll-x-auto" flex="row nowrap justify-between items-center">
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
                <div class="w-full" style="height:calc(100vh - 52px - 3rem - 40px);display:block;overflow:hidden;">${this.renderContent()}</div>
            `;
        }
        render(view, this);
        document.body.querySelectorAll("pre code").forEach((el) => {
            // @ts-ignore
            hljs?.highlightElement(el);
        });
    }
}
