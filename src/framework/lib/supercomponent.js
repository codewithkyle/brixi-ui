class SuperComponent extends HTMLElement {
    constructor() {
        super();
        this.debounce = (callback, wait) => {
            let timeoutId = null;
            return (...args) => {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    callback.apply(null, args);
                }, wait);
            };
        };
        this.debounceRender = this.debounce(this.updated.bind(this), 80);
        this.debounceUpdate = this.debounce(this.render.bind(this), 80);
        // @ts-ignore
        this.model = {};
        this.data = this.model;
        this.state = "INACTIVE";
        this.stateMachine = {};
    }
    update(model) {
        this.model = Object.assign(this.model, model);
        this.data = this.model;
        this.debounceRender();
        this.debounceUpdate();
    }
    trigger(trigger) {
        this.state = this.stateMachine?.[this.state]?.[trigger] ?? "ERROR";
        this.debounceRender();
        this.debounceUpdate();
    }
    render() { }
    updated() { }
    connected() { }
    connectedCallback() {
        this.connected();
    }
    disconnected() { }
    disconnectedCallback() {
        this.disconnected();
    }
}

export default SuperComponent;
