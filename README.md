# apiframeworks-api-docs

A reusable React component library for rendering OpenAPI documentation UIs. Easily embed beautiful, interactive API docs in your React or Next.js projects.

## Features
- Sidebar navigation grouped by tags
- Endpoint details with parameters, request/response info
- Customizable and theme-friendly
- TypeScript support

## Installation

```sh
npm install apiframeworks-api-docs
```

> **Note:** `react`, `next`, `clsx`, `js-yaml`, `next-themes`, `@radix-ui/*`, and `shadcn/ui` are required as peer dependencies. Install them in your project if not already present.

## Usage

```tsx
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

## Exports

- `ApiFrameworksDoc` – Main documentation UI
- `ApiDocsSidebar` – Sidebar navigation
- `EndpointSection` – Endpoint details
- `ApiComponentSection`, `ComponentsSection`, `HttpMethodBadge`, `Button` (UI)

## Peer Dependencies

Make sure to install these in your app:

```
npm install react next clsx js-yaml next-themes @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip shadcn/ui
```

## Troubleshooting

- **Import errors:** Ensure your app's `tsconfig.json` includes `src` in `baseUrl` or uses correct import paths.
- **Styles:** Import `src/styles/globals.css` in your app if needed.
- **Component not found:** Check the [Exports](#exports) section for available components.

## Contributing

PRs and issues welcome!

## License

MIT