```html
<accordion-component 
    data-sections='[{"label":"Example","content":"Example 1 content."}]'
></accordion-component>
```

### Data Attributes

| Data Attribute | Type | Required |
| -------------- | ---- | -------- |
| sections | AccordionSection[] | ✅ |

Not sure what Data Attributes are? Learn about [Data Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).

### Accordion Section

```typescript
interface AccordionSection {
    label: string;
    content: string;
}
```

### HTML Content

You can render HTML content within a section by using the `encodeURI()` function. [Learn more about URI encoding on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI).

```javascript
html`
    <accordion-component 
        data-sections='[{"label":"Example","content":"${encodeURI('<a href="#">Learn more on MDN.</a>')}"}]'
    ></accordion-component>
`
```
