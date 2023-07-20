import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import ProgressIndicator from "~brixi/components/progress/progress-indicator/progress-indicator";
import Component from "~brixi/component";
import type { ButtonColor, ButtonKind, ButtonShape, ButtonSize } from "../button/button";

env.css(["button", "download-button"]);

export interface IDownloadButton {
    label: string;
    icon: string;
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    url: RequestInfo;
    options: RequestInit;
    downloadingLabel: string;
    workerURL: string;
}
export default class DownloadButton extends Component<IDownloadButton> {
    private indicator: ProgressIndicator;
    private downloading: boolean;

    constructor() {
        super();
        this.downloading = false;
        this.model = {
            label: "",
            downloadingLabel: "downloading",
            kind: "solid",
            color: "primary",
            shape: "default",
            size: "default",
            icon: "",
            url: location.origin,
            options: {
                method: "GET",
            },
            workerURL: "/js/file-download-worker.js",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-icon", "data-kind", "data-color", "data-shape", "data-size", "data-url", "data-options", "data-worker-url", "data-downloading-label"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keyup", this.handleKeyup);
    }

    private async fetchData() {
        if (this.downloading) {
            return;
        }
        this.downloading = true;
        const icon: HTMLElement = this.querySelector("svg, img");
        if (icon) {
            icon.style.display = "none";
        }
        const label: HTMLElement = this.querySelector("span");
        if (label) {
            label.innerText = this.model.downloadingLabel;
        }
        const worker = new Worker(this.model.workerURL);
        worker.onmessage = (e: MessageEvent) => {
            const { type, data } = e.data;
            switch (type) {
                case "tick":
                    // @ts-ignore
                    this.indicator.tick(data);
                    break;
                case "start":
                    this.indicator = new ProgressIndicator();
                    this.indicator.className = "mr-0.5";
                    this.indicator.style.marginLeft = "-0.25rem";
                    // @ts-ignore
                    this.indicator.set({
                        total: data,
                        color: "grey",
                    });
                    this.insertBefore(this.indicator, this.childNodes[0]);
                    break;
                case "done":
                    this.dispatchEvent(
                        new CustomEvent("download", {
                            detail: {
                                blob: new Blob([data]),
                            },
                            bubbles: true,
                            cancelable: true,
                        })
                    );
                    this.indicator.remove();
                    label.innerText = this.model.label;
                    if (icon) {
                        icon.style.display = "inline-block";
                    }
                    worker.terminate();
                    this.downloading = false;
                    break;
                case "error":
                    this.dispatchEvent(
                        new CustomEvent("error", {
                            detail: {
                                error: data,
                            },
                            bubbles: true,
                            cancelable: true,
                        })
                    );
                    worker.terminate();
                    this.indicator.remove();
                    label.innerText = this.model.label;
                    if (icon) {
                        icon.style.display = "inline-block";
                    }
                    this.downloading = false;
                    break;
                default:
                    console.warn(`Unhandled file download worker message type: ${type}`);
                    break;
            }
        };
        worker.postMessage({
            url: this.model.url,
            options: this.model.options,
        });
    }

    private handleClick: EventListener = (e: Event) => {
        this.fetchData();
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                this.classList.add("is-active");
            }
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                this.classList.remove("is-active");
                this.fetchData();
            }
        }
    };

    private renderIcon() {
        let icon: string | TemplateResult;
        if (this.model.icon.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    override render() {
        const view = html` ${this.renderIcon()} <span>${this.model.label}</span> `;
        this.classList.add("bttn");
        this.setAttribute("role", "button");
        this.tabIndex = 0;
        this.setAttribute("color", this.model.color);
        this.setAttribute("size", this.model.size);
        this.setAttribute("kind", this.model.kind);
        this.setAttribute("shape", this.model.shape);
        if (this.model.icon?.length) {
            this.setAttribute("icon", "left");
        }
        this.setAttribute("sfx", "button");
        render(view, this);
    }
}
env.bind("download-button-component", DownloadButton);
