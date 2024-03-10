```html
<radio-group
    data-label="Example"
    data-name="example"
    data-instructions="Lorem ipsum..."
    data-options='[{"label": "Example 1","value":"example1"},{"label":"Example 2","value":"example2"},{"label":"Example 3","checked": true,"value":"example3"}]'
></radio-group>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| options | Radio[] | ✅ |
| label | string | |
| instructions | string | |
| requried | boolean | |
| disabled | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Radio = {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    disabled: boolean;
    value: string | number;
}
```

### Event Listeners

The `change` event will fire as users interact with the radio inputs.

```typescript
document.body.querySelector('radio-component').addEventListener('change', (e) => {
    const { name, value } = e.detail;
});
```
