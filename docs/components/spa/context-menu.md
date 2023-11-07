```typescript
import ContextMenu from "~brixi/components/context-menu/context-menu";
new ContextMenu({
    items: [
        {
            label: "Back",
            callback: () => {
                console.log("Back");
            },
        },
        {
            label: "Forward",
            callback: () => {
                console.log("Forward");
            },
        },
        {
            label: "Reload",
            hotkey: "Ctrl+R",
            callback: () => {
                location.reload();
            },
        },
        null,
        {
            label: "Action 1",
            callback: () => {
                console.log("Action 1");
            },
        },
        {
            label: "Action 2",
            callback: () => {
                console.log("Action 2");
            },
        },
    ],
    x: 24, // x offset from source pos
    y: 24, // y offset from source pos
});
```

> **Note**: you can render `null` instead of a `ContextItem` to render a horizontal rule.

### Data Attributes

| Key | Type | Required |
| --- | ---- | -------- |
| items | ContextItem[] | ✅ |
| x | number | |
| y | number | |

### Types

```typescript
type ContextItem = {
    label: string;
    hotkey?: string;
    callback: Function;
}
```
