```html
<!-- This is a primary action button -->
<button class="bttn" kind="solid" color="primary">Example</button>

<!-- This is a primary action button using the web component -->
<button-component
    data-kind="solid"
    data-color="primary"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>'
    data-label="Example"
>
</button-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| icon | string | |
| iconPosition | ButtonPositions | |
| kind | ButtonKind | ✅ |
| color | ButtonColor | ✅ |
| shape | ButtonShape | |
| size | ButtonSize | |
| disabled | boolean | | 
| type | ButtonType | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type ButtonPositions = "left" | "right" | "center";
type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "white";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";
type ButtonType = "submit" | "button" | "reset";
```
