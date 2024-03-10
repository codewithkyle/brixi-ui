let reader: ReadableStreamDefaultReader<Uint8Array> = null;
let buffer: Uint8Array = null;
let total: number = 0;
let recieved: number = 0;
let running: boolean = false;

function tick(bytes: number) {
    recieved += bytes;
    //@ts-ignore
    self.postMessage({
        type: "tick",
        data: bytes,
    });
}

function start(totalBytes: number) {
    total = totalBytes;
    //@ts-ignore
    self.postMessage({
        type: "start",
        data: total,
    });
}

function fail(error) {
    //@ts-ignore
    self.postMessage({
        type: "error",
        data: error,
    });
}

function done() {
    //@ts-ignore
    self.postMessage({
        type: "done",
        data: buffer,
    });
}

async function fetchData(url: RequestInfo, options: RequestInit) {
    try {
        running = true;
        const response = await fetch(url, options);
        if (response.ok) {
            start(parseInt(response.headers.get("content-length")));
            const stream = response.body;
            reader = stream.getReader();
            recieved = 0;
            buffer = new Uint8Array(total);
            while (recieved < total) {
                const { done, value } = await reader.read();
                buffer.set(value, recieved);
                tick(value.byteLength);
                if (done) {
                    break;
                }
            }
            done();
        } else {
            fail(response.statusText);
        }
    } catch (e) {
        fail(e);
    }
}
self.onmessage = (e: MessageEvent) => {
    if (!running) {
        const { url, options } = e.data;
        fetchData(url, options);
    }
};
