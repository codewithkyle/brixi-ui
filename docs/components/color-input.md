```html
<color-input 
    data-name="demo" 
    data-label="Background Color"
    data-value="#ff0000"
    data-disabled="false"
    data-read-only="false"
    data-required="false"
></color-input>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| value | string | |
| label | string | |
| disabled | boolean | |
| readOnly | boolean | |
| required | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `change` event will fire when the user changes the color.

```typescript
document.body.querySelector('color-input').addEventListener('change', (e) => {
    const { name, value } = e.detail;
});
```
