```html
<suggestion-chip
    data-label="Example"
    data-value="example"
></suggestion-chip>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | ✅ |
| value | string or number | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `suggest` event will fire when the user clicks the chip.

```typescript
document.querySelector('suggestion-chip').addEventListener('suggest', (event) => {
    console.log(event.detail.value);
});
```
