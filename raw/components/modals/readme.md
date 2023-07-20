You can get started with using the built in modals by importing the static `modals` class.

```typescript
import modals from "~brixi/controllers/modals";
```

After importing you can call one of the following modal types:

### Dangerous Modals

```typescript
modals.dangerous({
    title: "Delete Account",
    message: "Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.",
    confirm: "Delete Account",
    callbacks: {
        confirm: ()=>{
            console.log("Account deleted");
        },
        cancel: ()=>{
            console.log("Account not deleted");
        },
    },
});
```

### Passive Modals

```typescript
modals.passive({
    title: "Unable to connect your account",
    message: `
        Your changes were saved, but we could not connect your account due to a technical issue on our end. Please try reconnecting again. If the issue keeps happening, contact <a class="link" href="#">Customer Support</a>.
    `,
    actions: [
        {
            label: "Cancel",
            callback: ()=>{
                console.log("Canceling");
            },
        },
        {
            label: "Try Again",
            callback: ()=>{
                console.log("Trying again");
            },
        },
    ],
});
```

### Confirm Modals

```typescript
modals.confirm({
    title: "Submit Order",
    message: "Once your order is submitted production will begin automatically. This action cannot be undone.",
    callbacks: {
        confirm: ()=>{
            console.log("Order submitted");
        },
        cancel: ()=>{
            console.log("Order not submitted");
        },
    },
});
```

### Form Modals

```typescript
modals.form({
    title: "New Project",
    view: html`
        <input-component
            data-placeholder="Project Name"
            data-name="projectName"
            data-required="true"
        ></input-component>
    `,
    callbacks: {
        submit: (data, form, modal)=>{
            console.log(data, form, modal);
            modal.remove();
        },
        cancel: ()=>{
            console.log("Project not created");
        },
    },
});
```

### Raw Modals

```typescript
const modal = modals.raw({
    view: html`
        <div class="p-2">
            <iframe style="width:100%;aspect-ratio: 16/9;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
        </div>
    `,
    width: 768,
});
```
