Notification messages can be created by importing the static `notifications` class and calling one of the following functions.

```typescript
import notifications from "~brixi/controllers/alerts";

notifications.alert("Something happened", "You did something that triggered this response.");

notifications.success("Success!", "Your request has been process.");

notifications.warn("Oh no", "Something is preventing us form processing your request.");

notifications.error("Error", "Your request has failed with a status code of 0x0001");
```

Notification messages also accept an array of actions.

```typescript
notifications.alert(
    "Something happened",
    "You did something that triggered this response.",
    [
        {
            label: "go to page",
            callback: () => {
                // ...snip...
            },
        },
    ]
);
```
