export interface Request {
    route: string;
    method?: Method;
    origin?: string;
    body?: BodyParams;
    headers?: Headers;
    params?: GetParams;
    output?: "JSON" | "Blob" | "Text";
}
export interface Response {
    title: string | null;
    message: string | null;
    status: number;
    code: string;
    data: any;
    success: boolean;
}
export type Headers = {
    [header: string]: string;
};
export type GetParams = {
    [param: string]: string | number | string[] | number[];
};
export type BodyParams = {
    [param: string]: any;
};
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "PURGE" | "DELETE" | "HEAD";

class API {
    private defaultHeaders: Headers;
    private defaultParams: GetParams;
    private defaultBody: BodyParams;
    private url: string;

    constructor() {
        this.defaultHeaders = {};
        this.defaultBody = {};
        this.defaultParams = {};
        this.setURL(location.origin);
    }

    public setURL(url: string): void {
        this.url = url.replace(/\/$/, "").trim();
    }

    public setHeaders(headers: Headers): void {
        this.defaultHeaders = headers;
    }

    public setBody(body: BodyParams): void {
        this.defaultBody = body;
    }

    public setGetParams(params: GetParams): void {
        this.defaultParams = params;
    }

    /**
     * Perform a fetch request.
     * @example const response = await api.fetch<ExampleResponse>({ method: "POST", route: "/v1/user", body: { name: "Jon Smith" } });
     */
    public async fetch<T>(request: Request) {
        let out: Response = {
            title: null,
            message: null,
            status: 200,
            code: "0x000",
            data: null,
            success: true,
        };
        try {
            if (request?.origin) {
                request.origin = request.origin.replace(/\/$/, "").trim();
            } else {
                request.origin = this.url;
            }
            let url = `${request.origin}/${request.route.replace(/.*?\//, "").replace(/\?.*/, "").trim()}`;
            url = this.attachGetParams(url, request);
            const options: RequestInit = this.buildRequestOptions(request);
            const body = this.buildBody(request);
            if (body !== null) {
                options.body = body;
            }
            const fetchRequest = await fetch(url, options);
            let response;
            switch (request?.output) {
                case "Blob":
                    response = await fetchRequest.blob();
                    response = URL.createObjectURL(response);
                    break;
                case "Text":
                    response = await fetchRequest.text();
                    break;
                default:
                    response = await fetchRequest.json();
                    break;
            }
            if (fetchRequest.ok) {
                out.success = true;
                if (typeof response === "object") {
                    out = response;
                } else {
                    out.data = response;
                }
            } else {
                if (response?.title && response?.message) {
                    out = response;
                } else {
                    out.title = "Server Error";
                    out.message = `A ${fetchRequest.status} error occurred.`;
                }
                out.success = false;
            }
        } catch (e) {
            console.error(e);
            out.success = false;
            out.title = "Network Error";
            out.message = "Failed to connect with the API. Check your network connection and try again.";
            out.status = 418;
            out.code = "1x418";
        }
        // @ts-ignore
        return out as T;
    }

    private buildBody(request: Request): string | null {
        if (request?.body) {
            if (typeof request.body === "object") {
                request.body = Object.assign(this.defaultBody, request.body);
            } else {
                request.body = this.defaultBody;
                console.warn("Invalid request body. Body must be an object.");
            }
        } else {
            request.body = this.defaultBody;
        }
        if (Object.keys(request.body).length) {
            return JSON.stringify(request.body);
        } else {
            return null;
        }
    }

    private buildRequestOptions(request: Request): RequestInit {
        if (request?.headers) {
            if (typeof request.headers === "object") {
                request.headers = Object.assign(this.defaultHeaders, request.headers);
            } else {
                request.headers = this.defaultHeaders;
                console.warn("Invalid request headers. Headers must be an object.");
            }
        } else {
            request.headers = this.defaultHeaders;
        }
        return {
            method: request?.method ?? "GET",
            headers: new Headers(request.headers),
        };
    }

    private attachGetParams(url: string, request: Request): string {
        if (request?.params) {
            if (typeof request.params === "object") {
                request.params = Object.assign(this.defaultParams, request.params);
            } else {
                request.params = this.defaultParams;
                console.warn("Invalid request params. Params must be an object.");
            }
        } else {
            request.params = this.defaultParams;
        }
        url += "?";
        for (const param in request.params) {
            const value = request.params[param];
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    url += `${param}=${value[i]}&`;
                }
            } else {
                url += `${param}=${request.params[param]}&`;
            }
        }
        return url.replace(/\&$/, "").trim();
    }
}
const api = new API();
export default api;
