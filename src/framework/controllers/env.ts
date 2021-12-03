class Environment {
    public mount(tagName: string, constructor: CustomElementConstructor) {
        if (!customElements.get(tagName)) {
            customElements.define(tagName, constructor);
        }
    }
    public css(files: string | string[]): Promise<void> {
        return new Promise(async (resolve) => {
            if (!Array.isArray(files)) {
                files = [files];
            }
            if (!files.length) {
                resolve();
            }
            let resolved = 0;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let href: string;
                if (file.indexOf("https://") === 0 || file.indexOf("http://") === 0) {
                    href = file;
                } else if (file.indexOf("./") === 0 || file.indexOf("../") === 0 || file.indexOf("/") === 0) {
                    href = file;
                } else {
                    href = `${location.origin}/css/${file.replace(/\.css$/g, "").trim()}.css`;
                }
                let stylesheet: HTMLLinkElement = document.head.querySelector(`link[href="${href}"]`);
                if (!stylesheet) {
                    new Promise<void>((resolve) => {
                        stylesheet = document.createElement("link");
                        stylesheet.href = href;
                        stylesheet.rel = "stylesheet";
                        stylesheet.onload = () => {
                            resolve();
                        };
                        stylesheet.onerror = () => {
                            resolve();
                        };
                        document.head.appendChild(stylesheet);
                    }).then(() => {
                        resolved++;
                        if (resolved === files.length) {
                            resolve();
                        }
                    });
                } else {
                    resolved++;
                    if (resolved === files.length) {
                        resolve();
                    }
                }
            }
        });
    }
}
const env = new Environment();
export { env as default };
