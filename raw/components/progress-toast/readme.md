```html
<progress-toast
    data-title="Downloading messages"
    data-subtitle="0 of 1000"
    data-total="1000"
></progress-toast>
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
document.body.querySelector('progress-toast').addEventListener('tick', (e) => {
    console.error(e.detail.tick); // Current tick
});
```

