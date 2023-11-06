```html
<date-input-component
    data-label="Example"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
    data-mode="single"
></date-input-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| instructions | string | |
| autocomplete | string | |
| autocapitalize | "on" or "off" | |
| icon | string | |
| placeholder | string | |
| autofocus | boolean | |
| value | string | |
| dateFormat | string | |
| displayFormat | string | |
| enableTime | boolean | |
| minDate | string | |
| maxDate | string | |
| mode | "multiple" or "single" or "range" | |
| disableCalendar | boolean | |
| timeFormat | "24" or "12" | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

Not sure what `autocomplete` values you can use? Learn about the [autocomplete attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

### Event Listeners

The `change` event will fire when the user picks dates using the date picker.

```typescript
document.body.querySelector('date-input-component').addEventListener('change', (e) => {
    const { name, value } = e.detail; // mode: signle
    const { name, values } = e.detail; // mode: multiple
    const { name, start, end } = e.detail; // mode: range
});
```
