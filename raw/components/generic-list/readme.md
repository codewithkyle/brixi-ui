```html
<generic-list
    data-list='{"type":"unordered","style":"custom","icon":"1F525","items":["Item 1","Item 2","Item 3"]}'
></generic-list>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| list | List | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type ItemStyle = "disc" | "circle" | "decimal" | "leading-zero" | "square" | "custom";
type ListType = "ordered" | "unordered";
type List = {
    type: ListType;
    style?: ItemStyle;
    items: Array<string>;
    sub?: List;
    icon?: string;
};
```

### HTML Content

You can render HTML content in a list item by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <generic-list
        data-list='{"type":"unordered","style":"custom","icon":"1F525","items":["${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}"]}'
    ></generic-list>
`
```
