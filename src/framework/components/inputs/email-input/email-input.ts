import { html, render } from "lit-html";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import { IInput, InputSettings, default as Input } from "../input/input";

export default class EmailInput extends Input {
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
            css: "",
            class: "",
            callback: noop,
            attributes: {},
        };
        this.model = parseDataset<IInput>(this.dataset, this.model);
        env.css("input").then(() => {
            this.update(settings);
        });
    }

    override validate(input: HTMLInputElement = null, clearOnly = false): boolean {
        if (!input) {
            input = this.querySelector("input");
        }
        let isValid = true;
        const EmailTest = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm);
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        if (this.model.required || (!this.model.required && input.value.length)) {
            if (input.value.length && !EmailTest.test(input.value)) {
                isValid = false;
                this.setError(`Invalid email format.`, clearOnly);
            } else if (this.model.minlength > input.value.length) {
                console.log(input.value);
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`, clearOnly);
            } else if (this.model.maxlength < input.value.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`, clearOnly);
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="email"
                    type="email"
                    id="${id}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                />
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
env.mount("email-input-component", EmailInput);
