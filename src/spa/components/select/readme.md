```html
<select-component 
    data-label="Example Select" 
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>'
    data-instructions="This is an example select component" 
    data-options='[{"label":"Option 1","value":"option1"},{"label":"Option 2","value":"option2"}]' 
    data-required="false"
    data-name="example"
    data-value="option1"
    data-disabled="false"
    data-autofocus="true"
></select-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| icon | string or HTMLElement | |
| instructions | string | |
| options | SelectOption[] | ✅ |
| required | boolean | |
| name | string | ✅ |
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

### Event Listeners

The `change` event will fire when the user changes the selected option.

```typescript
document.body.querySelector('select-component').addEventListener('change', (e) => {
    const { name, value } = e.detail;
});
```
