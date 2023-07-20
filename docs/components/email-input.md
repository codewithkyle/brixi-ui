```html
<email-input-component
    data-name="email"
    data-label="Example"
    data-required="true"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>'   
></email-input-component>
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
| autocapitalize | "on" or "off" | |
| placeholder | string | |
| value | string | |
| maxlength | number | |
| minlength | number | |
| disabled | boolean | |
| readOnly | boolean | |
| datalist | string[] | |
| autofocus | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

Not sure what `autocomplete` values you can use? Learn about the [autocomplete attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

### Event Listeners

The `input` event will fire while the user types.

```typescript
document.body.querySelector('email-input-component').addEventListener('input', (e) => {
    const { name, value } = e.detail;
});
```

The `focus` event will fire when the user focuses the input.

```typescript
document.body.querySelector('email-input-component').addEventListener('focus', (e) => {
    const { name, value } = e.detail;
});
```

The `blur` event will fire when the user blurs the input.

```typescript
document.body.querySelector('email-input-component').addEventListener('blur', (e) => {
    const { name, value } = e.detail;
});
```
