```typescript
import OverflowMenu from "~brixi/components/overflow-menu/overflow-menu";
new OverflowMenu("test", [
        {
            label: "Example",
            id: "example",
        },
        {
            label: "Example",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>`,
            id: "example2",
        },
        null,
        {
            danger: true,
            label: "Example",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
            id: "example3",
        },
    ],
);
```

> **Note**: you can render `null` instead of a `ContextItem` to render a horizontal rule.

### Data Attributes

| Key | Type | Required |
| --- | ---- | -------- |
| items | OverflowItem[] | ✅ |
| callback | `(id: string) => void` | ✅ |
| target | HTMLElement | ✅ |
| uid | string | ✅ |
| offset | number | |

### Types

```typescript
type OverflowItem = {
    label: string;
    id: string;
    icon?: string;
    danger?: boolean;
}
```
