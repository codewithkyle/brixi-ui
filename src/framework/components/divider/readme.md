```html
<divider-component
    data-label="Dashed Divider"
    data-color="grey"
    data-type="dashed"
></divider-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| color | DividerColor | |
| type | DividerType | |
| layout | DividerLayout | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type DividerColor = "primary" | "success" | "warning" | "danger" | "black" | "grey";
type DividerType = "solid" | "dashed" | "dotted";
type DividerLayout = "horizontal" | "vertical";
```

