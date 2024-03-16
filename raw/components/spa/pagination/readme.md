```html
<brixi-pagination
    data-total-pages="10"
    data-active-page="1"
></brixi-pagination>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| totalPages | number | ✅ |
| activePage | number | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `change` event will fire when the user clicks to change pages.

```typescript
document.body.querySelector('brixi-pagination').addEventListener('change', (e) => {
    console.error(e.detail.page);
});
```
