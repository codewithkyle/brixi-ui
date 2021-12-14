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
}
export default class DownloadButton extends SuperComponent<IDownloadButton> {
    private total: number;
    private recieved: number;
    private indicator: ProgressIndicator;

    constructor(settings: DownloadButtonSettings) {
        super();
        this.model = {
            label: "",
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
        this.indicator = new ProgressIndicator({
            total: 1,
        });
        const icon = this.querySelector("i");
        if (icon) {
            icon.remove();
        }
        this.insertBefore(this.indicator, this.childNodes[0]);
        const response = await fetch(this.model.url, this.model.options);
        if (response.ok) {
            this.total = parseInt(response.headers.get("content-length"));
            this.indicator.setTotal(this.total);
            const stream = response.body;
            const reader = stream.getReader();
            this.recieved = 0;
            while (this.recieved < this.total) {
                const { done, value } = await reader.read();
                this.recieved += value.byteLength;
                this.indicator.tick(value.byteLength);
                if (done) {
                    break;
                }
            }
            const blob = await response.blob();
            this.model.callback(blob);
            this.render();
        } else {
            this.model.callback(null);
        }
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
            icon = html` <i> ${unsafeHTML(this.model.icon)} </i> `;
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
