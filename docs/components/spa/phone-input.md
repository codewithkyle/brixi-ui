```html
<brixi-phone-input
    data-label="Phone Number"
    data-name="phone"
></brixi-phone-input>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| instructions | string | |
| icon | string | |
| required | boolean | |
| autocomplete | string | |
| placeholder | string | |
| value | string | |
| disabled | boolean | |
| datalist | string[] | |
| autofocus | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

Not sure what `autocomplete` values you can use? Learn about the [autocomplete attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

### Event Listeners

The `input` event will fire while the user types.

```typescript
document.body.querySelector('brixi-phone-input').addEventListener('input', (e) => {
    const { name, value } = e.detail;
});
```

The `focus` event will fire when the user focuses the input.

```typescript
document.body.querySelector('brixi-phone-input').addEventListener('focus', (e) => {
    const { name, value } = e.detail;
});
```

The `blur` event will fire when the user blurs the input.

```typescript
document.body.querySelector('brixi-phone-input').addEventListener('blur', (e) => {
    const { name, value } = e.detail;
});
```
