```html
<number-input-component
    data-label="Example"
    data-required="true"
    data-instructions="This is an example input."
    data-step="5"
    data-min="-50"
    data-max="50"
    data-value="5"
    data-name="example"
></number-input-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| instructions | string | |
| icon | string | |
| required | boolean | |
| placeholder | string | |
| value | number | |
| min | number | |
| max | number | |
| step | number | |
| disabled | boolean | |
| autofocus | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `input` event will fire while the user types.

```typescript
document.body.querySelector('number-input-component').addEventListener('input', (e) => {
    const { name, value } = e.detail;
});
```

The `focus` event will fire when the user focuses the input.

```typescript
document.body.querySelector('number-input-component').addEventListener('focus', (e) => {
    const { name, value } = e.detail;
});
```

The `blur` event will fire when the user blurs the input.

```typescript
document.body.querySelector('number-input-component').addEventListener('blur', (e) => {
    const { name, value } = e.detail;
});
```
