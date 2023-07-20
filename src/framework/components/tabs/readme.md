```html
<tabs-component
    data-sortable="true"
    data-expandable="true"
    data-tabs='[{"label":"List","value":"list"},{"label":"Board","value":"board"},{"label":"Calendar","value":"calendar","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22h-6%20w-6%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22currentColor%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M8%207V3m8%204V3m-9%208h10M5%2021h14a2%202%200%20002-2V7a2%202%200%2000-2-2H5a2%202%200%2000-2%202v12a2%202%200%20002%202z%22%20/%3E%3C/svg%3E"},{"label":"Files","value":"files"}]'
></tabs-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| tabs | Tab[] | ✅ |
| sortable | boolean | |
| expandable | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Tab = {
    label: string;
    value: string | number;
    icon?: string;
    active?: boolean;
}
```

### HTML Content

You can render HTML content in a tab icon by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <tabs-component
        data-tabs='[{"label":"Calendar","value":"calendar","icon":"${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}"}]'
    ></tabs-component>
`
```

### Event Listeners

The `sort` event will fire after the user changes the tab sort order.

```typescript
document.body.querySelector('tabs-component').addEventListener('sort', (e) => {
    console.error(e.detail.values);
});
```

The `add` event will fire after the user adds a new tab.

```typescript
document.body.querySelector('tabs-component').addEventListener('add', (e) => {
    const { label, value } = e.detail;
});
```

The `change` event will fire when the user changes tabs.

```typescript
document.body.querySelector('tabs-component').addEventListener('change', (e) => {
    console.log(e.detail.value);
});
```
