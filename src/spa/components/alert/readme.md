```html
<alert-component 
    data-type="warning"
    data-heading="Attention needed"
    data-description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    data-list='["Lorem ipsum dolor sit amet.", "Consectetur adipiscing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]'
    data-closeable="true"
    data-actions='[{"label": "View status", "id": "view" }, {"label": "Details", "id": "details" }]'
></alert-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| type | AlertType | ✅ |
| heading | string | |
| description | string | |
| list | string[] | |
| closeable | boolean | |
| actions | ActionItem[] | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Alert Type

```typescript
type AlertType = "warning" | "info" | "danger" | "success";
```

### Action Item

```typescript
interface ActionItem {
    label: string;
    id: string;
}
```

### HTML Content

You can render HTML content within a section by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <alert-component 
        data-description="${encodeURI('<a href='#'>Learn more on MDN.</a>')"
        data-list="[${encodeURI('<a href='#'>Learn more on MDN.</a>')]"
    ></alert-component>
`
```
