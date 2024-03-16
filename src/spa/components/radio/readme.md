```html
<brixi-radio
    data-label="Example"
    data-name="example"
    data-value="example"
></brixi-radio>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| requried | boolean | |
| checked | boolean | |
| disabled | boolean | |
| value | string or number | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `change` event will fire as users interact with the radio inputs.

```typescript
document.body.querySelector('brixi-radio').addEventListener('change', (e) => {
    const { name, value } = e.detail;
});
```
