import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import Component from "~brixi/component";

env.css(["suggestion-chip"]);

export interface ISuggestionChip {
    label: string;
    value: string | number;
}
export default class SuggestionChip extends Component<ISuggestionChip> {
    constructor() {
        super();
        this.model = {
            label: "",
            value: null,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-value"];
    }

    override connected(): void {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keyup", this.handleKeyup);
        this.addEventListener("keydown", this.handleKeydown);
    }

    private handleClick = () => {
        this.dispatchEvent(
            new CustomEvent("suggest", {
                detail: {
                    value: this.model.value,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            this.click();
        }
    };

    override render() {
        this.tabIndex = 0;
        this.setAttribute("role", "button");
        this.setAttribute("sfx", "button");
        const view = html` <span>${this.model.label}</span> `;
        render(view, this);
    }
}
env.bind("suggestion-chip", SuggestionChip);
