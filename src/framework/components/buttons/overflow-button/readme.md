```html
<overflow-button
    data-items='[{"label":"Example","id":"example"},{"label":"Example","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22h-6%20w-6%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22currentColor%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M5%208h14M5%208a2%202%200%20110-4h14a2%202%200%20110%204M5%208v10a2%202%200%20002%202h10a2%202%200%20002-2V8m-9%204h4%22%20/%3E%3C/svg%3E","id":"example2"},null,{"danger":true,"label":"Example","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22h-6%20w-6%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22currentColor%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M19%207l-.867%2012.142A2%202%200%200116.138%2021H7.862a2%202%200%2001-1.995-1.858L5%207m5%204v6m4-6v6m1-10V4a1%201%200%2000-1-1h-4a1%201%200%2000-1%201v3M4%207h16%22%20/%3E%3C/svg%3E","id":"example3"}]'
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>'
    data-icon-position="center"
    data-kind="solid"
    data-color="grey"
    data-shape="round"
    data-size="default"
    data-disabled="false"
></overflow-button>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| icon | string | |
| iconPosition | ButtonPositions | |
| kind | ButtonKind | ✅ |
| color | ButtonColor | ✅ |
| shape | ButtonShape | |
| size | ButtonSize | |
| disabled | boolean | |
| items | OverflowItem[] | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type ButtonPositions = "left" | "right" | "center";
type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "white";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";
type ButtonType = "submit" | "button" | "reset";
type OverflowItem = {
    label: string;
    id: string;
    icon?: string;
    danger?: boolean;
}
```

### HTML Content

You can render HTML content within a overflow item by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <overflow-button
        data-items='[{"label":"Example","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22h-6%20w-6%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22currentColor%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M5%208h14M5%208a2%202%200%20110-4h14a2%202%200%20110%204M5%208v10a2%202%200%20002%202h10a2%202%200%20002-2V8m-9%204h4%22%20/%3E%3C/svg%3E","id":"example2"}]'
    ></overflow-button>
`
```

### Horizontal Rules

You can render a horizontal rule within the overlfow item list by replacing the `OverflowItem` with a `null` value.

### Event Listeners

The `action` event will fire when the user clicks on one of the overflow item buttons.

```typescript
document.body.querySelector('overflow-button-component').addEventListener('action', (e) => {
    console.error(e.detail.id);
});
```
