import { renderMarkdown } from "./utils/markdown";
import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";

type DocViewerData = {
    html: string;
};
export default class DocViewer extends SuperComponent<DocViewerData> {
    private component: string;
    constructor(component: string) {
        super();
        this.component = component;
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                SUCCESS: "IDLING",
            },
        };
        this.model = {
            html: "",
        };
        this.render();
        this.fetchDoc();
    }

    private async fetchDoc() {
        const request = await fetch(`/docs/components/${this.component}.md`);
        if (request.ok) {
            const markdown = await request.text();
            const html = await renderMarkdown(markdown);
            this.set({
                html: html,
            });
        } else {
            this.set({
                html: `<p class="font-danger-700 dark:font-danger-400 absolute center">This component is missing documentation.</p>`,
            });
        }
        this.trigger("SUCCESS");
    }

    render() {
        if (this.state === "LOADING") {
            const view = html`
                <txt-skel class="w-1/4 mb-1" style="height:42px;"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-3/4 mb-0.5"></txt-skel>
            `;
            render(view, this);
        } else {
            this.innerHTML = this.model.html;
            this.querySelectorAll("pre code").forEach((el) => {
                // @ts-ignore
                hljs?.highlightElement(el);
            });
        }
    }
}
