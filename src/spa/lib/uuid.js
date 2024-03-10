/**
 * @returns current UTC time in nanoseconds.
 */
function timestamp() {
    // More information on timestamp retrieval: https://stackoverflow.com/a/18197438/7346359  
    const loadTimeInMS = new Date().getTime();
    const time = (loadTimeInMS + performance.now()) * 100;
    return Math.round(time);
}
/**
 * Generate a UUIDv4 string with 122 bigs of randomness.
 * @returns UUIDv4 string.
 */
function UUID() {
    let uuid;
    if ("randomUUID" in crypto) {
        // @ts-expect-error
        uuid = crypto.randomUUID();
    }
    else if ("getRandomValues" in crypto) {
        // @ts-expect-error
        uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
    }
    else {
        uuid = Array.from(Array(32))
            .map((e, i) => {
            let someRandomValue = i === 12 ? 4 : (+new Date() + Math.random() * 16) % 16 | 0;
            return `${~[8, 12, 16, 20].indexOf(i) ? "-" : ""}${(i === 16 ? someRandomValue & 0x3 | 0x8 : someRandomValue).toString(16)}`;
        }).join("");
    }
    return uuid.toString();
}
/**
 * Generate a orderable UUIDv4 UTC based string.
 * The first 48 bits is a hex encoded timestamp.
 * The last 72 bits are random.
 * @returns UTC time ordered UUIDv4 string.
 */
function orderedUUID() {
    const time = timestamp();
    const hexTime = time.toString(16);
    const uuid = UUID();
    const segments = uuid.split("-");
    segments[0] = hexTime.slice(0, 8);
    segments[1] = hexTime.slice(8, 12);
    return segments.join("-");
}

export { UUID, orderedUUID };
