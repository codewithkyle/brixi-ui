```html
<checkbox-component
    data-label="Example"
    data-name="example"
    data-required="false"
    data-checked="false"
    data-disabled="false"
    data-value="example"
    data-type="check"
></checkbox-component>
```

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| required | boolean | |
| checked | boolean | |
| disabled | boolean | |
| type | "check" or "line" | |
| value | string or number | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `change` event will fire when the checkbox value changes.

```typescript
document.body.querySelector('checkbox-component').addEventListener('change', (e) => {
    const { checked, name } = e.detail;
});
```
