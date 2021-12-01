/**
 * Generate a UUID.
 * @returns UUIDv4
 * @see https://stackoverflow.com/a/2117523
 * @license CC-BY-SA-4.0
 * @deprecated Use \@codewithkyle/uuid instead.
 */
export function uuid(): string {
	// @ts-ignore
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}

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
