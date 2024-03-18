export default class DownloadButtonComponent extends HTMLElement {
    constructor(){
        super();
        this.downloading = false;
    }
    connectedCallback(){
        this.iconEl = this.querySelector("svg, img");
        this.spanEl = this.querySelector("span");
        this.progressEl = this.querySelector("brixi-progress-indicator");

        this.ogText = this.spanEl?.innerHTML;
        this.fileURL = this.getAttribute("data-file-url");
        this.workerURL = this.getAttribute("data-worker-url");

        if (!this.fileURL || !this.workerURL){
            console.error("DownloadButtonComponent: missing data-file-url or data-worker-url attribute");
            return;
        }

        this.addEventListener("click", this.onClick);
    }

    onClick = () => {
        if (this.downloading) return;
        this.downloading = true;

        const worker = new Worker(this.workerURL);
        worker.onmessage = (e) => {
            const { type, data } = e.data;
            switch (type) {
                case "start":
                    this.progressEl.setTotal(data);
                    if (this.iconEl != null){
                        this.iconEl.style.display = "none";
                    }
                    this.spanEl.innerHTML = "Downloading...";
                    this.progressEl.style.display = "inline-flex";
                    break;
                case "tick":
                    this.progressEl.progress(data);
                    break;
                case "done":
                    const blob = new Blob([data]);
                    this.dispatchEvent(
                        new CustomEvent("download", {
                            detail: {
                                blob: blob,
                            },
                            bubbles: true,
                            cancelable: true,
                        })
                    );
                    const a = document.createElement("a");
                    a.href= URL.createObjectURL(blob);
                    a.download = this.fileURL.split("/").pop();
                    a.click();
                    URL.revokeObjectURL(a.href);
                    this.reset();
                    worker.terminate();
                    this.downloading = false;
                    break;
                case "error":
                    this.dispatchEvent(
                        new CustomEvent("error", {
                            detail: {
                                error: data,
                            },
                            bubbles: true,
                            cancelable: true,
                        })
                    );
                    this.reset();
                    worker.terminate();
                    break;
                default:
                    console.warn(`Unhandled file download worker message type: ${type}`);
                    break;
            }
        };
        worker.postMessage({
            url: this.fileURL,
            options: {
                method: "GET",
            },
        });
    }

    reset(){
        this.progressEl.style.display = "none";
        this.spanEl.innerHTML = this.ogText;
        if (this.iconEl != null){
            this.iconEl.style.display = "inline-block";
        }
        this.downloading = false;
    }
}
