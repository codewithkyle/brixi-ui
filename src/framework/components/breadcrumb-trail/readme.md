```html
<breadcrumb-trail
    data-links='[{"ariaLabel":"Go to homepage","icon":"%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-home-2%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22%3E%3C/path%3E%3Cpath%20d=%22M5%2012l-2%200l9%20-9l9%209l-2%200%22%3E%3C/path%3E%3Cpath%20d=%22M5%2012v7a2%202%200%200%200%202%202h10a2%202%200%200%200%202%20-2v-7%22%3E%3C/path%3E%3Cpath%20d=%22M10%2012h4v4h-4z%22%3E%3C/path%3E%3C/svg%3E","id":"home"},{"label":"Example 1","id":"exmaple1"}]'
></breadcrumb-trail>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| links | BreadcrumbLink[] | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Breadcrumb Link

```typescript
type BreadcrumbLink = {
    label?: string;
    icon?: string;
    ariaLabel?: string;
    id: string;
}
```

### HTML Content

You can render HTML content for a link icon by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <breadcrumb-trail
        data-links='[{"icon":"${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M10 12h4v4h-4z"></path></svg>')}"}]'
    ></breadcrumb-trail>
`
```
