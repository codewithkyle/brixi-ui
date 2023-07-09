```html
<select-component></select-component>
```

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| icon | string or HTMLElement | |
| instructions | string | |
| options | SelectOption[] | ✅ |
| required | boolean | |
| name | string | ✅ |
| error | string | |
| value | string or number | |
| disabled | boolean | |
| autofocus | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Select Option

```typescript
type SelectOption = {
    label: string;
    value: string | number;
}
```
