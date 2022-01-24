Buttons are composed of the class `bttn` and several attributes. Typically butttons will look like one of the two examples below.

```html
<!-- This is a primary action button -->
<button class="bttn" kind="solid" color="primary">Example</button>

<!-- This is a primary action button with an icon on the left side -->
<button class="bttn" kind="solid" color="primary" icon="left">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z">
    </svg>
    <span>Example</span>
</button>
```


| Attribute | Values                                                              | Notes |
| --------- | ------------------------------------------------------------------- | ----- |
| `kind`    | `solid`, `outline`, `text`                                          | |
| `color`   | `primary`, `danger`, `warning`, `success`, `white`, `black`, `grey` | |
| `icon`    | `left`, `right`, `center`                                           | `center` option only works for icon-only buttons |
| `shape`   | `round`, `pill`, `sharp`                                            | |
| `size`    | `slim`                                                              | |