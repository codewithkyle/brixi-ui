/**
 * Generate a UUID.
 * @returns UUIDv4
 * @see https://stackoverflow.com/a/2117523
 * @license CC-BY-SA-4.0
 */
export function uuid():string {
    // @ts-ignore
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * A generic no operation (noop) function.
 */
export function noop():void{
    return;
}

/**
 * Converts numbers to a percentage.
 * @example (4, 10) => 40
 */
export function calcPercent(value:number, max:number):number {
    const percent = value / max * 100;
    return percent;
};

/**
 * Debounce a function callback.
 */
export const debounce = (callback:Function, wait:number):Function => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export function randomInt(min:number, max:number){
  return Math.round(Math.random() * (max - min) + min);
}

export function randomFloat(min:number, max:number, decimals = 2){
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}