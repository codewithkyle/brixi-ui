```html
<form-component>
    <select-component
        data-name="example"
        data-label="Example"
        data-options='[{"label":"Option 1","value":"option1"},{"label":"Option 2","value":"option2"}]' 
        data-value="option1"
    ></select-component>
    <!-- ...snip... -->
    <submit-button></submit-button>
</form-component>
```

### Event Listeners

The `submit` event will fire when the form is submitted.

```typescript
document.querySelector('form-component').addEventListener('submit', (event) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()){
        console.log(form.serialize());
        setTimeout(() => {
            form.reset();
            form.stop();
        }, 1000);
    }
});
```

The `reset` event will fire when the form is reset.

```typescript
document.querySelector('form-component').addEventListener('reset', (event) => {
    // TODO: react to reset
});
```

### Querying Form Inputs

All form inputs can be queried using the `[form-input]` attribute.

```typescript
document.body.querySelectorAll("[form-input]").forEach(el => {
    const name = el.getName();
    const value = el.getValue();
    const isValid = el.validate();
    el.setError("Set a custom error message");
    el.clearError();
});
```
