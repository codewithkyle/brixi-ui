Tooltips can be added to any HTML element by adding a `tooltip="Hello world"` attribute.

If you need to support aria-labels (like on SVGs) you can set the `aria-label="A tiny duck"` attribute with a blank `tooltip` attribute. When the `aria-label` attribute is set its value will always be used.

```html
<button tooltip="My awesome tooltip">
    <!-- snip -->
</button>

<button aria-label="A tiny duck" tooltip>
    <!-- snip -->
</button>
```

