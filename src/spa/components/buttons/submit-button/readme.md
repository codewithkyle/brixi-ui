```html
<submit-button
    data-label="Submit report"
    data-submitting-label="Uploading..."
    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-upload" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M12 11v6"></path><path d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path></svg>'
    data-size="default"
    data-disabled="false"
></submit-button>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| label | string | |
| submittingLabel | string | |
| size | ButtonSize | |
| icon | string | |
| disabled | boolean | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type ButtonSize = "default" | "slim" | "large";
```

### Event Listeners

The `submit` event will fire when the user clicks on one of the buttons.

```typescript
document.body.querySelector("submit-button").addEventListener("submit", (e) => {
    const el = e.currentTarget;
    el.trigger("START"); // Starts the submitting animation
    setTimeout(() => {
        el.trigger("STOP"); // Stops the animation
    }, 5000);
});
```
