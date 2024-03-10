```html
<steps-component
    data-step="profile"
    data-steps='[{"label":"Create account","description":"Vitae sed mi luctus laoreet.","name":"create"},{"label":"Profile information","description":"Cursus semper viverra facilisis et et some more.","name":"profile"},{"label":"Business information","description":"Penatibus eu quis ante.","name":"business"},{"label":"Review","name":"review"}]'
></steps-component>
```

### Data Attributes


| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| steps | Step[] | ✅ |
| step | string | |
| layout | "horizontal" or "vertical" | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Step = {
    label: string;
    name: string;
    description?: string;
}
```

### Event Listeners

The `step` event will fire when the user clicks to go back 1 or more steps.

```typescript
document.body.querySelector('steps-component').addEventListener('step', (e) => {
    console.error(e.detail.step);
});
```
