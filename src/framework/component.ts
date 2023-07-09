import SuperComponent from "@codewithkyle/supercomponent";

export default class Component<T> extends SuperComponent<T> {
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name.indexOf("data-") === 0) {
            name = name.substring(5);
            // @ts-ignore
            if (name in this.model) {
                let value: any;
                try {
                    value = JSON.parse(newValue);
                } catch (e) {
                    value = newValue;
                }
                const updated = this.get();
                updated[name] = value;
                this.set(updated);
            }
        }
    }
}
