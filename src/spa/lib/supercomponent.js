class SuperComponent extends HTMLElement {
    model;
    state;
    stateMachine;
    _scRenderTimeoutId;
    constructor() {
        super();
        this.model = {};
        this.state = "INACTIVE";
        this.stateMachine = {};
        this._scRenderTimeoutId = null;
    }
    snapshot() {
        const snapshot = {
            state: this.state,
            model: this.get(),
        };
        return snapshot;
    }
    debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args);
            }, wait);
        };
    };
    debounceRender() {
        if (this._scRenderTimeoutId) {
            window.cancelAnimationFrame(this._scRenderTimeoutId);
        }
        this._scRenderTimeoutId = window.requestAnimationFrame(this.render.bind(this));
    }
    set(model, skipRender = false) {
        this.model = Object.assign(this.model, model);
        if (!skipRender) {
            this.debounceRender();
        }
    }
    get() {
        return { ...this.model };
    }
    trigger(trigger) {
        this.state = this.stateMachine?.[this.state]?.[trigger] ?? "ERROR";
        this.debounceRender();
    }
    render() { }
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
