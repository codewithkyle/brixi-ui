import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import ProgressIndicator from "~components/progress/progress-indicator/progress-indicator";

export interface IDownloadButton {
    label: string;
    icon: string;
    kind: "solid" | "outline" | "text";
    color: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger";
    shape: "pill" | "round" | "sharp" | "default";
    size: "default" | "slim";
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    url: RequestInfo;
    options: RequestInit;
    downloadingLabel: string;
    workerURL: string;
}
export interface DownloadButtonSettings {
    label: string;
    callback: Function;
    url: RequestInfo;
    options: RequestInit;
    kind?: "solid" | "outline" | "text";
    color?: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger";
    shape?: "pill" | "round" | "sharp" | "default";
    size?: "default" | "slim";
    icon?: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    downloadingLabel?: string;
    workerURL?: string;
}
export default class DownloadButton extends SuperComponent<IDownloadButton> {
    private indicator: ProgressIndicator;
    private downloading: boolean;

    constructor(settings: DownloadButtonSettings) {
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
            callback: noop,
            css: "",
            class: "",
            attributes: {},
            url: location.origin,
            options: {
                method: "GET",
            },
            workerURL: "/file-download-worker.js",
        };
        this.model = parseDataset<IDownloadButton>(this.dataset, this.model);
        env.css(["button", "download-button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override connected() {
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
                    this.indicator.tick(data);
                    break;
                case "start":
                    this.indicator = new ProgressIndicator({
                        total: data,
                        class: "mr-0.5",
                        css: "margin-left:-0.25rem;",
                        color: this.model.color === "white" ? "grey" : "white",
                    });
                    this.insertBefore(this.indicator, this.childNodes[0]);
                    break;
                case "done":
                    this.model.callback(new Blob([data]));
                    this.indicator.remove();
                    label.innerText = this.model.label;
                    if (icon) {
                        icon.style.display = "inline-block";
                    }
                    worker.terminate();
                    this.downloading = false;
                    break;
                case "error":
                    console.error(data);
                    this.model.callback(null);
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
        let icon;
        if (this.model.icon.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderIcon()} <span>${this.model.label}</span> `;
        this.className = "bttn";
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
env.mount("download-button-component", DownloadButton);
