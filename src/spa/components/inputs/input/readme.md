```html
<input-component
    data-label="Example"
    data-required="true"
    data-instructions="This is an example input."
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>'S
    data-type="text"
    data-minlength="2"
    data-maxlength="5"
></input-component>
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
document.body.querySelector('input-component').addEventListener('input', (e) => {
    const { name, value } = e.detail;
});
```

The `focus` event will fire when the user focuses the input.

```typescript
document.body.querySelector('input-component').addEventListener('focus', (e) => {
    const { name, value } = e.detail;
});
```

The `blur` event will fire when the user blurs the input.

```typescript
document.body.querySelector('input-component').addEventListener('blur', (e) => {
    const { name, value } = e.detail;
});
```
