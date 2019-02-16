# matters-web

## Getting Started

### Start local dev

- Install dependencies: `npm i`
- Run `npm run dev`, then go to `http://localhost:3000/`

### Build and run production server

`npm run build && npm run start`

## Routing

We customized routes with Express in `server.ts` and disabled [fs routing](https://github.com/zeit/next.js#disabling-file-system-routing).

Note that we need to specify `href` (the path inside pages directory + query string) and `as` (the path that will be renderer on browser URL bar) props in `<Link>` component.

For instances:

```jsx
// Home
<Link href="/Home" as="/">

// All Authors
<Link href="/Authors" as="/authors">

// User Comments
<Link href="/User/Comments?username=matty" as="/@matty/comments">

// Tag Detail
<Link href="/TagDetail?id=RHJhZnQ6MQ==" as="/tags/RHJhZnQ6MQ==">
```

See [next.js docs](https://github.com/zeit/next.js#routing) for more details.

## Conventions

[Matters Design System](https://paper.dropbox.com/doc/Matters-Design-System--AXX9x2tuPldQFCWTN0Mt~_itAQ-klFuV5yv3ZlqpqHL0w0kU)

### Naming

#### React Component/Page

foldername: `PascalCase`

filename: `camelCase`

```tree
├── pages
│   └── ArticleDetail
│       ├── styles.css
│       └── index.tsx
└── components
    └── Layout
        ├── styles.css
        └── index.tsx
```

## Tools

### VS Code

#### Settings

See `.vscode/settings.json`

#### Extensions

##### Recommdation

```bash
code --install-extension blanu.vscode-styled-jsx
code --install-extension EditorConfig.EditorConfig
code --install-extension esbenp.prettier-vscode
code --install-extension mikestead.dotenv
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension Prisma.vscode-graphql
code --install-extension ricard.postcss
```

##### Optional

```bash
code --install-extension cssho.vscode-svgviewer
code --install-extension wix.vscode-import-cost
code --install-extension oderwat.indent-rainbow
code --install-extension naumovs.color-highlight
```

## Troubleshooting

1. If `styled-jsx` is installed in both `next` and our own `package.json`, the built-in `styled-jsx` SSR of Next.js will fail. See [#533](https://github.com/zeit/styled-jsx/issues/533).
