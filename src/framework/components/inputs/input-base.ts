import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";

export interface IInputBase {
    name: string;
    error: string;
    required: boolean;
    value: any;
    disabled: boolean;
}
export class InputBase<T> extends Component<T> {
    constructor() {
        super();
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
        // @ts-ignore
        this.model = {
            error: null,
            name: "",
            required: false,
            value: "",
            disabled: false,
        };
        this.setAttribute("form-input", "");
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        // @ts-ignore
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
    }

    public reset(): void {
        this.set({
            // @ts-ignore
            value: null,
        });
        const input = this.querySelector("input") as HTMLInputElement;
        if (input) {
            input.value = "";
        }
    }

    public clearError(): void {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string): void {
        if (error?.length) {
            this.set({
                // @ts-ignore
                error: error,
            });
            this.trigger("ERROR");
            soundscape.play("error");
        }
    }

    public validate(): boolean {
        let isValid = true;
        // @ts-ignore
        if (this.model.required && !this.model.value) {
            isValid = false;
            this.setError("This field is required.");
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    public getName(): string {
        // @ts-ignore
        return this.model?.name ?? "";
    }

    public getValue(): any {
        // @ts-ignore
        return this.model?.value ?? null;
    }
}
