```html
<status-badge
    data-color="primary"
    data-label="Example"
    data-dot="left"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>'
></status-badge>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| color | BadgeColor | ✅ |
| label | string | ✅ |
| dot | BadgeDot | |
| icon | string | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Badge Color

```typescript
type BadgeColor = "grey" | "primary" | "success" | "warning" | "danger";
```

### Badge Dot

```typescript
type BadgeDot = "right" | "left" | null;
```
