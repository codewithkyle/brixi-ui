type ILoginResponse = {
    success: boolean;
    errors: {
        [fieldName: string]: string;
    };
};

interface IFormField extends HTMLElement {
    validate: () => boolean;
    reportError: (error: string) => void;
}

export default class FormComponent extends HTMLElement {
    private form: HTMLFormElement;

    constructor() {
        super();
        this.form = this.querySelector("form");
    }

    public validate(): boolean {
        const fields: Array<IFormField> = Array.from(
            this.form.querySelectorAll(
                "input-component, select-component, textarea-component, radio-group, checkbox-group, pin-component, phone-component, password-component, email-component, date-picker, date-component"
            )
        );
        let isValid = true;
        for (let i = 0; i < fields.length; i++) {
            const fieldIsValid = fields[i]?.validate() ?? true;
            if (!fieldIsValid) {
                isValid = false;
            }
        }
        return isValid;
    }

    private handleSubmit: EventListener = async (e: Event) => {
        e.preventDefault();
        if (this.validate()) {
            const data = new FormData(this.form);
            const request = await fetch(`${location.origin}/login/route`, {
                method: "POST",
                headers: new Headers({
                    Accept: "application/json",
                }),
                body: data,
            });
            const response: ILoginResponse = await request.json();
            if (request.ok) {
                if (response.success) {
                    location.reload();
                } else {
                    for (const fieldName in response.errors) {
                        const field: IFormField = this.form.querySelector(`[name="${fieldName}"]`)?.closest("[web-component]") ?? null;
                        if (field && field?.reportError) {
                            field.reportError(response.errors[fieldName]);
                        } else {
                            console.error(`Failed to locate a web component containing: [name="${fieldName}"]`);
                        }
                    }
                }
            } else {
                console.error(`A network or server error occured. ${request.status}: ${request.statusText}`);
            }
        }
    };

    connectedCallback() {
        this.form.addEventListener("submit", this.handleSubmit);
    }
}
