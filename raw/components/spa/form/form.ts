import env from "~brixi/controllers/env";
import Component from "~brixi/component";

const FORM_INPUT_SELECTOR = "[form-input]";

env.css(["form"]);

export interface IForm {}
export default class Form extends Component<IForm> {
    override connected(): void {
        this.render();
        this.setAttribute("role", "form");
        this.addEventListener("reset", this.handleReset);
    }

    public start() {
        const el = this.querySelector("submit-button");
        if (el) {
            // @ts-ignore
            el.trigger("START");
        }
    }

    public stop() {
        const el = this.querySelector('submit-button[state="SUBMITTING"]');
        if (el) {
            // @ts-ignore
            el.trigger("STOP");
        }
    }

    public reset() {
        this.querySelectorAll(FORM_INPUT_SELECTOR).forEach((el) => {
            // @ts-ignore
            el.reset();
        });
    }

    public serialize() {
        this.start();
        const data = {};
        this.querySelectorAll(FORM_INPUT_SELECTOR).forEach((el) => {
            // @ts-ignore
            const name = el.getName();
            if (name == null || name === "") {
                console.error("Form input is missing a name attribute.", el);
            } else {
                // @ts-ignore
                data[name] = el.getValue();
            }
        });
        return data;
    }

    public checkValidity(): boolean {
        let allValid = true;
        this.querySelectorAll(FORM_INPUT_SELECTOR).forEach((el) => {
            // @ts-ignore
            if (!el.validate()) {
                allValid = false;
            }
        });
        return allValid;
    }

    public fail(errors: { [name: string]: string }) {
        const inputs = {};
        this.querySelectorAll(FORM_INPUT_SELECTOR).forEach((el) => {
            // @ts-ignore
            inputs[el.getName()] = el;
        });
        for (const name in errors) {
            inputs?.[name]?.setError(errors[name]);
        }
        this.stop();
    }

    private handleReset: EventListener = (e) => {
        e.preventDefault();
        this.reset();
    };
}
env.bind("form-component", Form);
