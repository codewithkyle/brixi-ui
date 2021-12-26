import { UUID } from "@codewithkyle/uuid";

export type NetworkType = "4g" | "3g" | "2g" | "slow-2g";

export type DOMState = "loading" | "idling" | "booting";

export type Browser = "chrome" | "safari" | "edge" | "chromium-edge" | "ie" | "firefox" | "unknown" | "opera";

class Environment {
    public connection: NetworkType;
    public cpu: number;
    public memory: number | null;
    public domState: DOMState;
    public dataSaver: boolean;
    public browser: Browser;
    private tickets: Array<string>;

    constructor() {
        this.memory = 4;
        this.cpu = window.navigator?.hardwareConcurrency || 2;
        this.connection = "4g";
        this.domState = "booting";
        this.dataSaver = false;
        this.browser = "unknown";
        this.tickets = [];
    }

    public boot() {
        this.setBrowser();

        if ("connection" in navigator) {
            // @ts-ignore
            this.connection = window.navigator.connection.effectiveType;
            // @ts-ignore
            this.dataSaver = window.navigator.connection.saveData;
            // @ts-ignore
            navigator.connection.onchange = this.handleNetworkChange.bind(this);
        }

        if ("deviceMemory" in navigator) {
            // @ts-ignore
            this.memory = window.navigator.deviceMemory;
        }

        if (this.tickets.length) {
            this.setDOMState("loading");
        } else {
            this.setDOMState("idling");
        }
    }

    private handleNetworkChange: EventListener = () => {
        // @ts-ignore
        this.connection = window.navigator.connection.effectiveType;
        sessionStorage.removeItem("connection-choice");
    };

    /**
     * Attempts to set the DOM to the `idling` state. The DOM will only idle when all `startLoading()` methods have been resolved.
     * @param ticket - the `string` the was provided by the `startLoading()` method.
     */
    public stopLoading(ticket: string): void {
        if (!ticket || typeof ticket !== "string") {
            console.error(`A ticket with the typeof 'string' is required to end the loading state.`);
            return;
        }

        const index = this.tickets.indexOf(ticket);
        if (index !== -1) {
            this.tickets.splice(index);
        }

        if (this.tickets.length === 0 && this.domState === "loading") {
            this.setDOMState("idling");
        }
    }

    /**
     * Sets the DOM to the `soft-loading` state.
     * @returns a ticket `string` that is required to stop the loading state.
     */
    public startLoading(): string {
        if (this.domState === "idling") {
            this.setDOMState("loading");
        }
        const ticket = UUID();
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * Sets the DOMs state attribute.
     * DO NOT USE THIS METHOD. DO NOT MANUALLY SET THE DOMs STATE.
     * @param newState - the new state of the document element
     */
    private setDOMState(newState: DOMState): void {
        this.domState = newState;
        if (this.domState !== "loading") {
            this.tickets = [];
        }
        document.documentElement.setAttribute("state", this.domState);
    }

    /**
     * Checks if the provided connection is greater than or equal to the current conneciton.
     * @param requiredConnection - network connection string
     */
    public checkConnection(requiredConnection): boolean {
        let passed = false;
        switch (requiredConnection) {
            case "4g":
                if (this.connection !== "2g" && this.connection !== "slow-2g" && this.connection !== "3g") {
                    passed = true;
                }
                break;
            case "3g":
                if (this.connection !== "2g" && this.connection !== "slow-2g") {
                    passed = true;
                }
                break;
            case "2g":
                if (this.connection !== "slow-2g") {
                    passed = true;
                }
                break;
            case "slow-2g":
                passed = true;
                break;
            default:
                passed = true;
                break;
        }
        return passed;
    }

    private setBrowser() {
        // @ts-ignore
        const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;

        // @ts-ignore
        const isFirefox = typeof InstallTrigger !== "undefined";

        const isSafari =
            // @ts-ignore
            /constructor/i.test(window.HTMLElement) ||
            (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
                // @ts-ignore
            })(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification));

        // @ts-ignore
        const isIE = /*@cc_on!@*/ false || !!document.documentMode;

        // @ts-ignore
        const isEdge = !isIE && !!window.StyleMedia;

        // @ts-ignore
        const isChrome = !!window.chrome;

        const isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

        if (isOpera) {
            this.browser = "opera";
        } else if (isFirefox) {
            this.browser = "firefox";
        } else if (isSafari) {
            this.browser = "safari";
        } else if (isIE) {
            this.browser = "ie";
        } else if (isEdge) {
            this.browser = "edge";
        } else if (isChrome) {
            this.browser = "chrome";
        } else if (isEdgeChromium) {
            this.browser = "chromium-edge";
        } else {
            this.browser = "unknown";
        }
        document.documentElement.setAttribute("browser", this.browser);
    }

    /**
     * Binds the custom element to the class.
     * @deprecated use `bind()` instead.
     */
    public mount(tagName: string, constructor: CustomElementConstructor) {
        this.bind(tagName, constructor);
    }
    /**
     * Registers a Web Component by binding the Custom Element's tag name to the provided class.
     */
    public bind(tagName: string, constructor: CustomElementConstructor) {
        if (!customElements.get(tagName)) {
            customElements.define(tagName, constructor);
        }
    }
    public css(files: string | string[]): Promise<void> {
        return new Promise(async (resolve) => {
            if (!Array.isArray(files)) {
                files = [files];
            }
            if (!files.length) {
                resolve();
            }
            let resolved = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let href: string;
                if (file.indexOf("https://") === 0 || file.indexOf("http://") === 0) {
                    href = file;
                } else if (file.indexOf("./") === 0 || file.indexOf("../") === 0 || file.indexOf("/") === 0) {
                    href = file;
                } else {
                    href = `${location.origin}/css/${file.replace(/\.css$/g, "").trim()}.css`;
                }
                let stylesheet: HTMLLinkElement = document.head.querySelector(`link[href="${href}"]`);
                if (!stylesheet) {
                    new Promise<void>((resolve) => {
                        stylesheet = document.createElement("link");
                        stylesheet.href = href;
                        stylesheet.rel = "stylesheet";
                        stylesheet.onload = () => {
                            resolve();
                        };
                        stylesheet.onerror = () => {
                            resolve();
                        };
                        document.head.appendChild(stylesheet);
                    }).then(() => {
                        resolved++;
                        if (resolved === files.length) {
                            resolve();
                        }
                    });
                } else {
                    resolved++;
                    if (resolved === files.length) {
                        resolve();
                    }
                }
            }
        });
    }
}
const env = new Environment();
export { env as default };
