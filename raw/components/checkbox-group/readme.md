```html
<checkbox-group
    data-label="Example"
    data-name="example"
    data-instructions="Lorem ipsum and wat knot..."
    data-options='[{"label": "Example 1","value":"example1"},{"label": "Example 2","value":"example2"},{"label": "Example 3","checked": true,"value":"example3"}]'
    data-disabled="false"
></checkbox-group>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| options | Checkbox[] | ✅ |
| label | string | |
| instructions | string | |
| disabled | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Checkbox = {
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
};
```

### Event Listeners

The `change` event will fire when the checkbox value changes.

```typescript
document.body.querySelector('checkbox-group').addEventListener('change', (e) => {
    const { checked, name, value } = e.detail;
});
```

### Querying Form Inputs

All form inputs can be queried using the `[form-input]` attribute.

```typescript
document.body.querySelectorAll("[form-input]").forEach(el => {
    const name = el.getName();
    const value = el.getValue();
    const isValid = el.validate();
    el.setError("Set a custom error message");
    el.clearError();
});
```
