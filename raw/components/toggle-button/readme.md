```html
<toggle-button
    data-instructions="Delete your account."
    data-state="IDLING"
    data-states='["IDLING", "CONFIRM"]'
    data-buttons='{"IDLING":{"label":"Delete","color":"grey","kind":"solid","id":"delete"},"CONFIRM":{"label":"Are you sure?","color":"danger","kind":"solid","id":"confirm"}}'
></toggle-button>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| state | string | ✅ |
| states | string[] | ✅ |
| buttons | Buttons | ✅ |
| instructions | string | |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Types

```typescript
type Buttons = {
    [state:string]: Button;
};
type Button = {
    label: string;
    icon: string;
    iconPosition: ButtonPosition;
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    type: ButtonType;
}
type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "white";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";
type ButtonType = "submit" | "button" | "reset";
type ButtonPosition = "left" | "right" | "center";
```

### HTML Content

You can render HTML content for a button icon by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <toggle-button
        data-buttons='{"IDLING":{"icon":"${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}","label":"Delete","color":"grey","kind":"solid","id":"delete"}}'
    ></toggle-button>
`
```

### Event Listeners

The `action` event will fire when the user clicks on one of the buttons.

```typescript
document.body.querySelector('toggle-button').addEventListener('action', (e) => {
    console.log(e.detail.id);
});
```
