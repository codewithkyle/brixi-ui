export function randomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export function randomFloat(min: number, max: number, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

/**
 * Converts numbers to a percentage.
 * @example (4, 10) => 40
 */
export function calcPercent(value: number, max: number): number {
    const percent = (value / max) * 100;
    return Math.round(percent);
}
