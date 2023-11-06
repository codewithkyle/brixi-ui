```html
<download-button-component
    data-color="primary",
    data-label="Download file",
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>'
    data-url="/static/example.zip"
></download-button-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| icon | string | |
| kind | ButtonKind | ✅ |
| color | ButtonColor | ✅ |
| shape | ButtonShape | |
| size | ButtonSize | |
| disabled | boolean | | 
| url | string | ✅ |
| options | RequestInit | |
| downloadingLabel | string | |
| workerURL | string | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

Not sure what `RequestInit` is? Learn about [Requests on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request).

### Types

```typescript
type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "white";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";
```

### Event Listeners

#### Download

The `download` event will fire after the file has been downloaded and the [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) is ready to be used.

```typescript
document.body.querySelector('download-button-component').addEventListener('download', (e) => {
    const url = URL.createObjectURL(e.detail.blob);
    const a = document.createElement("a");
    a.download = "example.zip";
    a.href = url;
    a.target = "_blank";
    a.click();
    URL.revokeObjectURL(url);
});
```

#### Error

The `error` event will fire when the file fails to download.

```typescript
document.body.querySelector('download-button-component').addEventListener('error', (e) => {
    console.error(e.detail.error);
});
```
