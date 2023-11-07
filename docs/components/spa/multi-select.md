```html
<multi-select-component
    data-label="Fruit"
    data-name="fruit"
    data-search="fuzzy"
    data-options='[
        {
            "label": "Apples",
            "value": "apples"
        },
        {
            "label": "Pears",
            "value": "pears"
        },
        {
            "label": "Bananas",
            "value": "bananas"
        }
    ]'
></multi-select-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| options | MultiSelectOption[] | ✅ |
| label | string | |
| icon | string | |
| instructions | string | |
| required | boolean | |
| disabled | boolean | |
| query | string | |
| placeholder | string | |
| search | "fuzzy" or "strict" | |
| separator | string | |


Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type MultiSelectOption = {
    label: string;
    value: string | number;
    checked?: boolean;
};
```

### Event Listeners

The `change` event will fire when the user checks/unchecks options.

```typescript
document.body.querySelector('multi-select-component').addEventListener('change', (e) => {
    const { name, value } = e.detail;
});
```
