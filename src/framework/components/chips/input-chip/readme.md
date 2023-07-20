```html
<input-chip
    data-label="Example"
    data-value="example"
></input-chip>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | ✅ |
| value | string or number | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `remove` event will fire when the user clicks to remove the chip.

```typescript
document.querySelector('input-chip').addEventListener('remove', (event) => {
    console.log(event.detail.value);
});
```
