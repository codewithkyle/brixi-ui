```html
<textarea-component
    data-label="Example"
    data-required="true"
    data-name="example"
    data-instructions="This is an <a class='link' href='https://example.com' target='_blank'>example</a> input."
    data-placeholder="Send a message to our support team..."
    data-rows="3"
    data-maxlength="250"
></textarea-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| instructions | string | |
| required | boolean | |
| autocomplete | string | |
| placeholder | string | |
| value | string | |
| maxlength | number | |
| minlength | number | |
| disabled | boolean | |
| readOnly | boolean | |
| autofocus | boolean | |
| rows | number | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

Not sure what `autocomplete` values you can use? Learn about the [autocomplete attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

### Event Listeners

The `input` event will fire while the user types.

```typescript
document.body.querySelector('textarea-component').addEventListener('input', (e) => {
    const { name, value } = e.detail;
});
```

The `focus` event will fire when the user focuses the input.

```typescript
document.body.querySelector('textarea-component').addEventListener('focus', (e) => {
    const { name, value } = e.detail;
});
```

The `blur` event will fire when the user blurs the input.

```typescript
document.body.querySelector('textarea-component').addEventListener('blur', (e) => {
    const { name, value } = e.detail;
});
```
