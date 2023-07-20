```html
<split-button
    data-label="Demo Button"
    data-buttons='[{"label":"Example 1","id":"example-1"},null,{"label":"Example 2","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22%3E%3C/path%3E%3Cline%20x1=%224%22%20y1=%227%22%20x2=%2220%22%20y2=%227%22%3E%3C/line%3E%3Cline%20x1=%2210%22%20y1=%2211%22%20x2=%2210%22%20y2=%2217%22%3E%3C/line%3E%3Cline%20x1=%2214%22%20y1=%2211%22%20x2=%2214%22%20y2=%2217%22%3E%3C/line%3E%3Cpath%20d=%22M5%207l1%2012a2%202%200%200%200%202%202h8a2%202%200%200%200%202%20-2l1%20-12%22%3E%3C/path%3E%3Cpath%20d=%22M9%207v-3a1%201%200%200%201%201%20-1h4a1%201%200%200%201%201%201v3%22%3E%3C/path%3E%3C/svg%3E","danger":true,"id":"example-2"}]'
    data-id="demo-button"
    data-type="button"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>'
></split-button>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | ✅ |
| id | string | ✅ |
| type | ButtonType | |
| icon | string | |
| buttons | OverflowItem[] | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type OverflowItem = {
    label: string;
    id: string;
    icon?: string;
    danger?: boolean;
};
type ButtonType = "submit" | "button" | "reset";
```

### HTML Content

You can render HTML content for a overflow item icon by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <group-button-component
        data-buttons='[{"icon":"${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}","label":"Example 1","id":"example-1"}]'
    ></group-button-component>
`
```

### Event Listeners

The `action` event will fire when the user clicks on one of the buttons.

```typescript
document.body.querySelector('split-button').addEventListener('action', (e) => {
    console.error(e.detail.id);
});
```
