```html
<lightswitch-component
    data-name="example"
    data-value="example"
    data-enabled-label="On"
    data-disabled-label="Off"
    data-label="Exmaple Lightswitch"
    data-instructions="Lorem ipsum dolor amet."
></lightswitch-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| name | string | ✅ |
| label | string | |
| instructions | string | |
| required | boolean | |
| value | number | |
| disabled | boolean | |
| enabled | boolean | |
| color | Color | |
| enabledLabel | string | |
| disabledLabel | string | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Color = "primary" | "success" | "warning" | "danger";
```

### Event Listeners

The `change` event will fire when the user toggles the lightswitch.

```typescript
document.body.querySelector('lightswitch-component').addEventListener('change', (e) => {
    const { name, value, checked } = e.detail;
});
```

