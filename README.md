![Brixi UI - A sleek & slender design system built on web components.](https://repository-images.githubusercontent.com/271347483/e0cb9434-2f3d-451b-b803-1cf14fa6e05d)

## Figma

[Click here](https://www.figma.com/file/mvBHgmtgyS0HdIJo7tsGxQ/Brixi-UI?type=design&mode=design&t=4KvDY1GHhJNstcqf-1) to view the Figma file.

## Installation

Install the NPM packages.

```
npm i -D brixi-ui
```

Install peer dependencies.

```
npm i -D flatpickr@4 fuse.js@6 tooltipper@1 @codewithkyle/notifyjs@3 @codewithkyle/pubsub@1 @codewithkyle/supercomponent@1 @codewithkyle/uuid@1 brixi@latest dayjs@1 lit-html@2
```

Create the install scripts.

```
"install:ui": "install-ui --audio=./public/audio --framework=./src/framework",
"install:brixi": "brixi"
```

Install UI components.

```
npm run install:ui
```

Configure Brixi CSS.

```javascript
// brixi.config.js
module.exports = {
    outDir: "./brixi",
    important: true,
    output: "production",
    colors: {
        white: "#ffffff",
        black: "#000000",
        "off-black": "#212121",
        grey: {
            50: "#FAFAFA",
            100: "#F4F4F5",
            200: "#E4E4E7",
            300: "#D4D4D8",
            400: "#A1A1AA",
            500: "#71717A",
            600: "#52525B",
            700: "#3F3F46",
            800: "#27272A",
            900: "#18181B",
            950: "#09090b",
        },
        primary: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            300: "#93C5FD",
            400: "#60A5FA",
            500: "#3B82F6",
            600: "#2563EB",
            700: "#1D4ED8",
            800: "#1E40AF",
            900: "#1E3A8A",
            950: "#172554",
        },
        success: {
            50: "#ECFDF5",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#10B981",
            600: "#059669",
            700: "#047857",
            800: "#065F46",
            900: "#064E3B",
            950: "#022c22",
        },
        danger: {
            50: "#FFF1F2",
            100: "#FFE4E6",
            200: "#FECDD3",
            300: "#FDA4AF",
            400: "#FB7185",
            500: "#F43F5E",
            600: "#E11D48",
            700: "#BE123C",
            800: "#9F1239",
            900: "#881337",
            950: "#4c0519",
        },
        warning: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706",
            700: "#B45309",
            800: "#92400E",
            900: "#78350F",
            950: "#451a03",
        },
    },
    borders: {
        units: "px",
        styles: ["solid"],
        widths: [1],
        radius: [0.125, 0.25, 0.5],
    },
    variables: {
        "focus-ring": "1px auto var(--primary-500)",
        "focus-ring-offset": "5px",
        "bevel": "0 1px 0 hsl(0deg 0% 0% / 0.1)",
        "input-border": "1px solid var(--grey-300)",
        "button-shadow": "0px 1px 2px -1px rgba(0, 0, 0, 0.09), inset 0px -1px 0px 1px rgba(0, 0, 0, 0.06)",
    },
    shadows: {
        colors: {
            black: "var(--black-hsl)",
        },
        sizes: {
            sm: `
                0px 1px 2px hsl(var(--shadow-color) / 0.1)
            `,
            md: `
                0px 2px 2px hsl(var(--shadow-color) / 0.1),
                0px 4px 4px hsl(var(--shadow-color) / 0.1),
                0px 6px 6px hsl(var(--shadow-color) / 0.1)
            `,
            lg: `
                0px 2px 2px hsl(var(--shadow-color) / 0.1),
                0px 4px 4px hsl(var(--shadow-color) / 0.1),
                0px 8px 8px hsl(var(--shadow-color) / 0.1),
                0px 16px 16px hsl(var(--shadow-color) / 0.1),
                0px 32px 32px hsl(var(--shadow-color) / 0.1)
            `,
            xl: `
                0px 2px 2px hsl(var(--shadow-color) / 0.1),
                0px 4px 4px hsl(var(--shadow-color) / 0.1),
                0px 8px 8px hsl(var(--shadow-color) / 0.1),
                0px 16px 16px hsl(var(--shadow-color) / 0.1),
                0px 32px 32px hsl(var(--shadow-color) / 0.1),
                0px 48px 48px hsl(var(--shadow-color) / 0.1),
                0px 64px 64px hsl(var(--shadow-color) / 0.1)
            `,
        },
    },
    prefixes: {
        dark: {
            features: ["backgrounds", "fonts", "borders", "shadows"],
            rule: "prefers-color-scheme: dark",
        },
    },
};
```

Compile Brixi CSS.

```
npm run install:brixi
```

Create the TypeScript config.

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["DOM", "ES2020"],
        "allowJs": true,
        "checkJs": false,
        "module": "ES2020",
        "moduleResolution": "Node",
        "baseUrl": "src",
        "paths": {
            "~brixi/*": ["framework/*"]
        },
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "_types"
    },
    "include": ["src"]
}
```
