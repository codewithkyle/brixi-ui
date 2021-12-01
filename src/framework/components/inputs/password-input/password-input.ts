import { html, render } from "lit-html";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import { IInput, InputSettings, default as Input } from "../input/input";

interface IPasswordInput extends IInput {
    type: "text" | "password";
}
export default class PasswordInput extends Input {
    override model: IPasswordInput;

    constructor(settings: InputSettings) {
        super(settings);
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
            label: "",
            instructions: null,
            readOnly: false,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: "",
            disabled: false,
            maxlength: 9999,
            minlength: 0,
            type: "password",
            css: "",
            class: "",
            callback: noop,
            attributes: {},
        };
        this.model = parseDataset<IPasswordInput>(this.dataset, this.model);
        env.css("input").then(() => {
            this.update(settings);
        });
    }

    override validate(
        input: HTMLInputElement = null,
        clearOnly = false
    ): boolean {
        if (!input) {
            input = this.querySelector("input");
        }
        let isValid = true;
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        if (
            this.model.required ||
            (!this.model.required && input.value.length)
        ) {
            if (this.model.minlength > input.value.length) {
                console.log(input.value);
                isValid = false;
                this.setError(
                    `This input requires a least ${this.model.minlength} characters.`,
                    clearOnly
                );
            } else if (this.model.maxlength < input.value.length) {
                isValid = false;
                this.setError(
                    `This input requires a least ${this.model.minlength} characters.`,
                    clearOnly
                );
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    private toggleVisibility: EventListener = (e: Event) => {
        switch (this.model.type) {
            case "password":
                this.update({
                    // @ts-ignore
                    type: "text",
                });
                break;
            case "text":
                this.update({
                    // @ts-ignore
                    type: "password",
                });
                break;
        }
    };

    private renderEyeIcon() {
        switch (this.model.type) {
            case "password":
                return html`<svg
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>`;
            case "text":
                return html`<svg
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                </svg>`;
        }
    }

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${
            this.model.name
        }`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    type="${this.model.type}"
                    id="${id}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                />
                <button
                    type="button"
                    @click=${this.toggleVisibility}
                    class="eye"
                >
                    ${this.renderEyeIcon()}
                </button>
            </input-container>
        `;
        this.setAttribute("state", this.state);
        this.className = `input js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.mount("password-input-component", PasswordInput);
