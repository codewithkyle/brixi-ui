```html
<progress-badge
    data-total="100"
    data-label="Saving"
    data-color="primary"
></progress-badge>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| total | number | ✅ |
| label | string | ✅ |
| color | Color | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Color = "grey" | "primary" | "success" | "warning" | "danger";
```

### Event Listeners

The `tick` event will fire when the `tick()` method is called.

```typescript
document.body.querySelector('progress-badge').addEventListener('tick', (e) => {
    console.error(e.detail.tick); // Current tick
});
```

The `finished` event will fire when the desired (total) number of ticks has been reached.

```typescript
document.body.querySelector('progress-badge').addEventListener('finished', (e) => {
    // ...snip...
});
```
