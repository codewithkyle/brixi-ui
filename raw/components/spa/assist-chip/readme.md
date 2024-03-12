```html
<brixi-assist-chip
    data-label="Reserve a table"
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M16 3l0 4"></path><path d="M8 3l0 4"></path><path d="M4 11l16 0"></path><path d="M8 15h2v2h-2z"></path></svg>'
></brixi-assist-chip>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | ✅ |
| icon | string | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Event Listeners

The `click` event will fire when the user clicks on the chip.

```typescript
document.querySelector('brixi-assist-chip').addEventListener('click', () => {
    console.log('Chip clicked');
});
```
