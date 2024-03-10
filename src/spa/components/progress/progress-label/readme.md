```html
<progress-label
    data-total="100"
    data-title="Example label"
    data-subtitle="0 of 100"
></progress-label>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| total | number | ✅ |
| title | string | ✅ |
| subtitle | string | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `tick` event will fire when the `tick()` method is called.

```typescript
document.body.querySelector('progress-label').addEventListener('tick', (e) => {
    console.error(e.detail.tick); // Current tick
});
```

The `finished` event will fire when the desired (total) number of ticks has been reached.

```typescript
document.body.querySelector('progress-label').addEventListener('finished', (e) => {
    // ...snip...
});
```
