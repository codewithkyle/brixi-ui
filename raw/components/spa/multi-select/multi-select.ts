import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import "~brixi/components/checkbox/checkbox";
import { UUID } from "@codewithkyle/uuid";
import Fuse from "fuse.js";
import pos from "~brixi/controllers/pos";
import Component from "~brixi/component";

env.css("multi-select");

export type MultiSelectOption = {
    label: string;
    value: string | number;
    checked?: boolean;
    uid?: string;
};

export interface IMultiSelect {
    label: string;
    icon: string;
    instructions: string;
    options: Array<MultiSelectOption>;
    required: boolean;
    name: string;
    error: string;
    disabled: boolean;
    query: string;
    placeholder: string;
    search: "fuzzy" | "strict" | null;
    separator: string;
}
export default class MultiSelect extends Component<IMultiSelect> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.stateMachine = {
            IDLING: {
                ERROR: "ERROR",
                DISABLE: "DISABLED",
            },
            ERROR: {
                RESET: "IDLING",
                ERROR: "ERROR",
            },
            DISABLED: {
                ENABLE: "IDLING",
            },
        };
        this.model = {
            label: "",
            name: "",
            icon: "",
            instructions: "",
            options: [],
            required: false,
            error: null,
            disabled: false,
            query: "",
            placeholder: "",
            search: null,
            separator: null,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-icon",
            "data-instructions",
            "data-options",
            "data-required",
            "data-name",
            "data-disabled",
            "data-query",
            "data-placeholder",
            "data-search",
            "data-separator",
        ];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        for (let i = 0; i < settings.options.length; i++) {
            if (!settings.options[i]?.checked) {
                settings.options[i].checked = false;
            }
            settings.options[i].uid = UUID();
        }
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
    }

    public clearError() {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string) {
        this.set({
            error: error,
        });
        this.trigger("ERROR");
        soundscape.play("error");
    }

    public reset(): void {
        const updated = this.get();
        for (let i = 0; i < updated.options.length; i++) {
            updated.options[i].checked = false;
        }
        this.set(updated);
    }

    public getName() {
        return this.model.name;
    }

    public getValue() {
        const selected = [];
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i].checked) {
                selected.push(this.model.options[i].value);
            }
        }
        return selected;
    }

    public validate(): boolean {
        let isValid = true;
        if (this.model.required && !this.hasOneCheck()) {
            isValid = false;
            this.setError("This field is required.");
        } else {
            this.clearError();
        }
        return isValid;
    }

    private hasOneCheck() {
        let checked = false;
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i]?.checked) {
                checked = true;
                break;
            }
        }
        return checked;
    }

    private calcSelected() {
        let selected = 0;
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i].checked) {
                selected++;
            }
        }
        return selected;
    }

    private filterOptions(): Array<MultiSelectOption> {
        let options = [...this.model.options];
        if (this.model.query?.length) {
            if (this.model.search === "strict") {
                const queryValues = this.model.separator === null ? [this.model.query] : this.model.query.trim().split(this.model.separator);
                for (let i = options.length - 1; i >= 0; i--) {
                    let foundOne = false;
                    for (let q = 0; q < queryValues.length; q++) {
                        if (options[i].value.toString().toLowerCase().trim() === queryValues[q].toString().toLowerCase().trim()) {
                            foundOne = true;
                            break;
                        }
                    }
                    if (!foundOne) {
                        options.splice(i, 1);
                    }
                }
            } else {
                const fuse = new Fuse(options, {
                    ignoreLocation: true,
                    threshold: 0.0,
                    keys: ["label"],
                });
                const results = fuse.search(this.model.query);
                options = [];
                for (let i = 0; i < results.length; i++) {
                    options.push(results[i].item);
                }
            }
        }
        return options;
    }

    private updateQuery(value: string) {
        this.set({
            query: value,
        });
    }
    private debounceFilterInput = this.debounce(this.updateQuery.bind(this), 300);
    private handleFilterInput: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value;
        this.debounceFilterInput(value);
    };

    private checkAllCallback: EventListener = (e: CustomEvent) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        const { name, checked, value } = e.detail;
        const updatedModel = this.get();
        const out = [];
        this.querySelectorAll(".options checkbox-component").forEach((checkbox) => {
            for (let j = 0; j < updatedModel.options.length; j++) {
                // @ts-ignore
                if (updatedModel.options[j].uid === checkbox.getName()) {
                    updatedModel.options[j].checked = checked;
                    break;
                }
            }
        });
        for (let i = 0; i < updatedModel.options.length; i++) {
            if (updatedModel.options[i].checked) {
                out.push(updatedModel.options[i].value);
            }
        }
        this.set(updatedModel);
        this.validate();
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    name: this.model.name,
                    value: out,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private checkboxCallback: EventListener = (e: CustomEvent) => {
        const { value, name, checked } = e.detail;
        const updatedModel = this.get();
        for (let i = 0; i < updatedModel.options.length; i++) {
            if (updatedModel.options[i].uid === name) {
                updatedModel.options[i].checked = checked;
                break;
            }
        }
        const out = [];
        for (let j = 0; j < updatedModel.options.length; j++) {
            if (updatedModel.options[j].checked) {
                out.push(updatedModel.options[j].value);
            }
        }
        this.set(updatedModel);
        this.validate();
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    name: this.model.name,
                    value: out,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    public renderCopy() {
        let output: string | TemplateResult = "";
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        }
        return output;
    }

    public renderIcon() {
        let output: string | TemplateResult = "";
        if (this.model.icon?.length) {
            output = html` <i class="icon"> ${unsafeHTML(this.model.icon)} </i> `;
        }
        return output;
    }

    public renderLabel() {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${this.inputId}">${this.model.label}</label>`;
        }
        return output;
    }

    private renderSearch() {
        let out: string | TemplateResult = "";
        if (this.model.search !== null) {
            out = html`
                <div class="search">
                    <checkbox-component
                        data-checked="${this.hasOneCheck()}"
                        data-type="line"
                        class="inline-flex mr-0.5 js-master-checkbox"
                        style="width:24px;height:24px;"
                        data-value="all"
                        @change=${this.checkAllCallback}
                    ></checkbox-component>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </i>
                    <input
                        @change=${(e) => {
                            e.stopImmediatePropagation();
                        }}
                        @input=${this.handleFilterInput}
                        type="text"
                        placeholder="Search..."
                        .value=${this.model.query}
                    />
                </div>
            `;
        }
        return out;
    }

    render() {
        this.setAttribute("state", this.state);
        const selected = this.calcSelected();
        const options = this.filterOptions();
        this.tabIndex = 0;
        let label: string;
        if (selected === this.model.options.length) {
            label = "All options selected";
        } else if (selected === 0) {
            label = this.model.placeholder || "Select options";
        } else {
            label = `${selected} selected`;
        }
        const view = html`
            ${this.renderLabel()} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select">${label}</span>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                ${this.renderSearch()}
                <div class="options">
                    ${options.map((option) => {
                        return html`
                            <checkbox-component
                                data-name="${option.uid}"
                                data-checked="${option.checked}"
                                data-label="${option.label}"
                                data-value="${option.value}"
                                @change=${this.checkboxCallback}
                            ></checkbox-component>
                        `;
                    })}
                </div>
            </multiselect-options>
        `;
        render(view, this);
        const optionsEl = this.querySelector("multiselect-options") as HTMLElement;
        if (optionsEl) {
            optionsEl.style.width = `${this.scrollWidth}px`;
            pos.positionElementToElement(optionsEl, this, 8);
        }
        // Workaround for native checkbox getting out of sync with our state
        // This is an annoying side effect of using native checkboxes
        if (selected > 0) {
            // @ts-ignore
            this.querySelector(".js-master-checkbox").set({ checked: true });
        }
    }
}
env.bind("multi-select-component", MultiSelect);
