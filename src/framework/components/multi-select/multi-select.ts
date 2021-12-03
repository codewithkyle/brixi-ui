import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import soundscape from "~controllers/soundscape";
import Checkbox from "~components/checkbox/checkbox";

export type MultiSelectOption = {
    label: string;
    value: string | number;
    checked?: boolean;
};

export interface IMultiSelect {
    label: string;
    icon: string | HTMLElement;
    instructions: string;
    options: Array<MultiSelectOption>;
    required: boolean;
    name: string;
    error: string;
    value: string;
    disabled: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    query: string;
    placeholder: string;
}
export interface MultiSelectOptions {
    label?: string;
    name: string;
    options: Array<MultiSelectOption>;
    icon?: string | HTMLElement;
    instructions?: string;
    required?: boolean;
    disabled?: boolean;
    callback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    placeholder: string;
}
export default class MultiSelect extends SuperComponent<IMultiSelect> {
    constructor(settings: MultiSelectOptions) {
        super();
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
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
            selected: null,
            label: "",
            name: "",
            icon: "",
            instructions: "",
            options: settings?.options ?? [],
            required: false,
            error: null,
            value: "",
            disabled: false,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
            query: "",
            placeholder: "",
        };
        this.model = parseDataset<IMultiSelect>(this.dataset, this.model);
        for (let i = 0; i < settings.options.length; i++) {
            if (!settings.options[i]?.checked) {
                settings.options[i].checked = false;
            }
        }
        env.css("select").then(() => {
            this.update(settings);
        });
    }

    public renderCopy() {
        let output;
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${this.model.instructions}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        } else {
            output = "";
        }
        return output;
    }

    public renderIcon() {
        let output;
        if (this.model.icon) {
            output = html`
                <i class="icon"> ${unsafeHTML(this.model.icon)} </i>
            `;
        } else {
            output = "";
        }
        return output;
    }

    public clearError() {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string, clearOnly: boolean) {
        if (clearOnly) {
            return;
        }
        this.update({
            error: error,
        });
        this.trigger("ERROR");
        soundscape.error();
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

    public validate(input, clearOnly: boolean = false): boolean {
        let isValid = true;
        if (this.model.required) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
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

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLSelectElement;
        const index = parseInt(target.dataset.index);
        this.update({
            selected: index,
            value: target.value,
        });
        this.validate(target, true);
        this.model.callback(target.value);
    };

    public handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLSelectElement;
        this.validate(input);
    };

    public renderLabel(id: string) {
        let output;
        if (this.model.label?.length) {
            output = html`<label for="${id}">${this.model.label}</label>`;
        } else {
            output = "";
        }
        return output;
    }

    render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${
            this.model.name
        }`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <multiselect-container>
                ${this.renderIcon()}
                <span class="select"
                    >${!selected
                        ? this.model.placeholder || "Select options"
                        : html`${this.calcSelected()} selected`}</span
                >
                <i class="selector">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                    </svg>
                </i>
            </multiselect-container>
            <multiselect-options>
                <div class="search">
                    ${new Checkbox({
                        name: `multiselect-checkall`,
                        checked: this.hasOneCheck(),
                        callback: this.checkAllCallback.bind(this),
                        type: "line",
                        className: "inline-flex mx-0.25 js-master-checkbox",
                        css: "width:24px;height:24px;",
                    })}
                    <i>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </i>
                    <input
                        @input=${this.filterOptions}
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div class="options">
                    ${options.map((option) => {
                        return html`${new Checkbox({
                            name: `${id}-${option.value}`,
                            label: option.label,
                            checked: option.checked,
                            callback: this.checkboxCallback.bind(this),
                        })}`;
                    })}
                </div>
            </multiselect-options>
        `;
        this.setAttribute("state", this.state);
        this.className = `multi-select js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        setTimeout(() => {
            render(view, this);
        }, 80);
    }
}
env.mount("multi-select-component", MultiSelect);
