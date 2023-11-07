```html
<filter-chip
    data-label="Example"
    data-value="example"
></filter-chip>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | ✅ |
| value | string | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `change` event will fire when the user clicks the chip.

```typescript
document.body.querySelector('filter-chip').addEventListener('change', (e) => {
    const { checked, value } = e.detail;
});
```
