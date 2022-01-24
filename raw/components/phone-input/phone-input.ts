import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import { IInput, InputSettings, default as Input } from "../input/input";

export default class PhoneInput extends Input {
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
            this.set(settings, true);
            this.render();
        });
    }

    override validate(input: HTMLInputElement = null, clearOnly = false): boolean {
        if (!input) {
            input = this.querySelector("input");
        }
        let isValid = true;
        const PhoneNumberCheck = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        if ((!this.model.required && input.value.length) || this.model.required) {
            if (!PhoneNumberCheck.test(`${this.model.value}`)) {
                isValid = false;
                this.setError(`Invalid phone number.`, clearOnly);
            } else if (this.model.minlength > input.value.length) {
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

    /**
     * Formats phone number string (US)
     * @see https://stackoverflow.com/a/8358141
     * @license https://creativecommons.org/licenses/by-sa/4.0/
     */
    private formatPhoneNumber(phoneNumber: string) {
        var cleaned = ("" + phoneNumber).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "";
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return phoneNumber;
    }

    override handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        const formattedValue = this.formatPhoneNumber(input.value);
        this.update({
            value: formattedValue,
        });
        this.validate(input);
    };

    private handleFocus: EventListener = (e: Event) => {
        this.update({
            value: this.model.value.toString().replace(/[\-\+\s\(\)]/g, ""),
        });
    };

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
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
env.mount("phone-input-component", PhoneInput);
