import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";

type SourceCode = {
    ext: string;
    raw: string;
};

type CodeViewerData = {
    sourceCode: Array<SourceCode>;
    activeExt: string;
};
export default class CodeViewer extends SuperComponent<CodeViewerData> {
    private component: string;
    constructor(component: string) {
        super();
        console.log(component);
        this.component = component.replace(/.*\//g, "");
        console.log(this.component);
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                SUCCESS: "IDLING",
            },
        };
        this.model = {
            sourceCode: [],
            activeExt: null,
        };
        this.render();
        this.fetchFiles();
    }

    private async fetchFiles() {
        const files = [`${this.component}/readme.md`, `${this.component}.html`, `${this.component}.ts`, `${this.component}.scss`, `${this.component}.css`, `${this.component}.js`];
        let requestsCompleted = 0;
        const update = { ...this.model };
        for (let i = 0; i < files.length; i++) {
            new Promise(async (resolve) => {
                const fileRequest = await fetch(`/raw/components/${location.pathname.includes("spa") ? "spa" : "mpa"}/${this.component}/${files[i]}`);
                if (fileRequest.ok) {
                    const raw = await fileRequest.text();
                    update.sourceCode.push({
                        ext: files[i].match(/\.[0-9a-z]+$/)?.[0] ?? "plaintext",
                        raw: raw,
                    });
                }
                // @ts-ignore
                resolve();
            }).finally(() => {
                requestsCompleted++;
                if (files.length === requestsCompleted) {
                    update.activeExt = update.sourceCode[0].ext;
                    // @ts-ignore
                    update.sourceCode.sort((a, b) => {
                        return a.ext > b.ext;
                    });
                    this.set(update);
                    this.trigger("SUCCESS");
                }
            });
        }
    }

    private switchSource: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const ext = target.dataset.ext;
        console.log(ext);
        this.set({
            activeExt: ext,
        });
    };

    private copyToClipboard: EventListener = (e: Event) => {
        let src;
        const target = e.currentTarget as HTMLElement;
        for (let i = 0; i < this.model.sourceCode.length; i++) {
            if (this.model.sourceCode[i].ext === this.model.activeExt) {
                src = this.model.sourceCode[i];
                break;
            }
        }
        navigator.clipboard.writeText(src.raw).then(() => {
            target.classList.add("is-success");
            setTimeout(() => {
                target.classList.remove("is-success");
            }, 3000);
        });
    };

    render() {
        let view;
        if (this.state === "LOADING") {
            view = html`
                <div class="my-1 block">
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                    <txt-skel class="mr-0.5" style="height:36px;width:128px;"></txt-skel>
                </div>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-full mb-0.5"></txt-skel>
                <txt-skel class="w-3/4 mb-0.5"></txt-skel>
            `;
        } else {
            view = html`
                <code-tabs>
                    ${this.model.sourceCode.map((src) => {
                        return html`<button sfx="button" class="${src.ext === this.model.activeExt ? "is-active" : ""}" @click=${this.switchSource} data-ext="${src.ext}">${src.ext
                            .replace(/^\./, "")
                            .trim()}</button></button>`;
                    })}
                </code-tabs>
                <code-container>
                    ${this.model.sourceCode.map((src) => {
                        return src.ext === this.model.activeExt
                            ? html`
                                  <pre class="language-${src.ext.replace(/^\./, "").trim()}">
                                <code>${src.raw}</code>
                            </pre
                                  >
                              `
                            : "";
                    })}
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
            `;
        }
        render(view, this);
        this.querySelectorAll("pre code").forEach((el) => {
            // @ts-ignore
            hljs?.highlightElement(el);
        });
    }
}
