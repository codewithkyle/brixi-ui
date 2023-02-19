/**
 * A generic no operation (noop) function.
 */
export function noop(): void {
    return;
}

/**
 * Debounce a function callback.
 */
export const debounce = (callback: Function, wait: number): Function => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
};

/**
 * Maps a `DOMStringMap` onto an object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
export function parseDataset<T>(dataset: DOMStringMap, model: T): T {
    let out: T = { ...model };
    Object.keys(dataset).map((key) => {
        // @ts-ignore
        if (key in out) {
            try {
                out[key] = JSON.parse(dataset[key]);
            } catch (e) {
                out[key] = dataset[key];
            }
        }
    });
    return out;
}
