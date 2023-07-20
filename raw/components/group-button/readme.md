```html
<group-button-component
    data-buttons='[{"label":"Example 1","id":"example-1"},{"label":"Example 2","id":"example-2"},{"label":"Example 3","id":"example-3"}]'
    data-active="example-1"
></group-button-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| active | string | |
| buttons | Button[] | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Button = {
    label: string;
    type?: ButtonType;
    icon?: string;
    id: string;
}
type ButtonType = "submit" | "button" | "reset";
```

### HTML Content

You can render HTML content for a button icon by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <group-button-component
        data-buttons='[{"icon":"${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}","label":"Example 1","id":"example-1"}]'
    ></group-button-component>
`
```

### Event Listeners

The `change` event will fire when the user clicks on one of the buttons.

```typescript
document.body.querySelector('group-button-component').addEventListener('change', (e) => {
    console.error(e.detail.id);
});
```
