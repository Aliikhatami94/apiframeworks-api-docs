# apiframeworks-api-docs

A reusable React component library for rendering OpenAPI documentation UIs. Easily embed beautiful, interactive API docs in your React or Next.js projects.

## Features
- Sidebar navigation grouped by tags
- Endpoint details with parameters, request/response info
- Customizable and theme-friendly
- TypeScript support

## Installation

```
npm install apiframeworks-api-docs
```

> **Note:** `react` and `clsx` are required as peer dependencies.

## Usage

```tsx
import React from 'react';
import { ApiFrameworksDoc } from 'apiframeworks-api-docs';

const openApiSpec = {/* ...your OpenAPI spec object... */};

export default function ApiDocsPage() {
  return <ApiFrameworksDoc spec={openApiSpec} isExpanded={true} />;
}
```

### Sidebar Only

```tsx
import { ApiDocsSidebar } from 'apiframeworks-api-docs';

// ...
<ApiDocsSidebar tags={/* see below */} onNavigate={id => { /* scroll logic */ }} />
```

### Endpoint Section Only

```tsx
import { EndpointSection } from 'apiframeworks-api-docs';

// ...
<EndpointSection path="/pets" method="get" operation={/* OpenAPI operation object */} />
```

## API

### `<ApiFrameworksDoc spec isExpanded />`
- `spec`: OpenAPI v3 spec object
- `isExpanded`: (optional) boolean for layout style

### `<ApiDocsSidebar tags onNavigate />`
- `tags`: `{ [tag: string]: { path, method, summary }[] }` (see `groupEndpointsByTag` in source)
- `onNavigate`: function called with anchor id

### `<EndpointSection path method operation />`
- `path`: string
- `method`: one of `get`, `post`, `put`, `delete`, `patch`, `options`, `head`
- `operation`: OpenAPI operation object

## Customization & Styling

apiframeworks-api-docs is designed to be as customizable as shadcn/ui. All components accept `className` and/or `classes`/`classNames` props so you can override any part of the UI with your own Tailwind or custom classes.

### Main Doc Component: ApiFrameworksDoc

```tsx
import { ApiFrameworksDoc } from 'apiframeworks-api-docs';

<ApiFrameworksDoc
  spec={openApiSpec}
  isExpanded
  classNames={{
    root: "rounded-xl border shadow-lg bg-white",
    sidebar: "bg-muted border-r",
    main: "p-8",
    header: "border-b-2 border-primary/20",
    title: "text-4xl text-primary font-extrabold",
    description: "text-base text-gray-500",
    section: "space-y-8",
    path: "bg-gray-50 px-2 py-1 rounded text-gray-800",
    endpointSection: "border-l-4 border-primary/30 pl-4 my-2"
  }}
/>
```

#### `classNames` prop keys:
- `root`: Main wrapper
- `sidebar`: Sidebar container
- `main`: Main content area
- `header`: Header section
- `title`: API title
- `description`: API description
- `section`: Section wrapper for endpoints
- `path`: Path heading
- `endpointSection`: Each endpoint's section

### Sidebar: ApiDocsSidebar

```tsx
import { ApiDocsSidebar } from 'apiframeworks-api-docs';

<ApiDocsSidebar
  tags={tags}
  classes={{
    root: "bg-muted border-r",
    sectionTitle: "text-xs text-muted-foreground",
    tag: "text-primary font-bold",
    endpointList: "space-y-2",
    endpointItem: "rounded hover:bg-primary/5",
    endpointLink: "hover:text-primary",
    method: "text-xs font-mono text-primary",
    path: "text-gray-700",
    summary: "text-xs text-muted-foreground"
  }}
/>
```

#### `classes` prop keys:
- `root`: Sidebar nav container
- `sectionTitle`: Title for endpoints section
- `tag`: Tag group title
- `endpointList`: List of endpoints
- `endpointItem`: List item for endpoint
- `endpointLink`: Link for endpoint
- `method`: HTTP method badge
- `path`: Path text
- `summary`: Endpoint summary

### Endpoint Section: EndpointSection

```tsx
import { EndpointSection } from 'apiframeworks-api-docs';

<EndpointSection
  path="/pets"
  method="get"
  operation={operation}
  classes={{
    root: "bg-white border shadow-sm rounded-lg",
    header: "flex gap-2 items-center",
    method: "bg-green-100 text-green-700 border-green-300",
    path: "text-base text-primary",
    summary: "text-lg font-semibold text-primary",
    description: "text-gray-500",
    parameters: "mt-4",
    requestBody: "mt-4",
    responses: "mt-4",
    table: "border border-gray-200",
    th: "bg-muted px-2 py-1",
    td: "px-2 py-1"
  }}
/>
```

#### `classes` prop keys:
- `root`: Main endpoint section
- `header`: Header row (method, path, summary)
- `method`: HTTP method badge
- `path`: Path text
- `summary`: Endpoint summary
- `description`: Endpoint description
- `parameters`: Parameters section
- `requestBody`: Request body section
- `responses`: Responses section
- `table`: Table element
- `th`: Table header cell
- `td`: Table data cell

### HTTP Method Badge: HttpMethodBadge

```tsx
import { HttpMethodBadge } from 'apiframeworks-api-docs';

<HttpMethodBadge method="post" className="bg-blue-100 text-blue-700 border-blue-300" />
```

#### `className` prop:
- Styles the badge for the HTTP method (GET, POST, etc.)

### Default Styles

All components ship with sensible Tailwind defaults. You can override as much or as little as you want.

### Tailwind Setup

If you want to match the default look, ensure your Tailwind config includes the following colors:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        card: '#fff',
        'card-foreground': '#18181b',
        muted: '#f4f4f5',
        'muted-foreground': '#71717a',
        border: '#e4e4e7',
      },
    },
  },
};
```

## Styling

To apply the default styles, import the global CSS in your app's entry point (e.g., `src/app/layout.tsx` or `src/pages/_app.tsx` for Next.js):

```ts
import 'apiframeworks-api-docs/styles/globals.css';
```

This ensures all components from `apiframeworks-api-docs` are styled correctly. If you want to override styles, use CSS variables or custom classes as needed.

## Development

- Build: `npm run build`
- Publish: `npm publish`

## License

MIT