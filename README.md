# matters-web

![](https://github.com/thematters/matters-web/workflows/Deployment/badge.svg) ![](https://github.com/thematters/matters-web/workflows/Create%20Release/badge.svg)

## Getting Started

### Start local dev

- Install dependencies: `npm i`
- Environment variables: `cp .env.local.example .env.local`
- (Optional) Run `npm run gen:type` or `npm run gen:watch`
- Run `npm run dev`, then go to `http://localhost:3000/`

### Build and run production server

`npm run build && npm run start`

### Start local dev with docker

- Environment variables: `cp .env.local.example .env.local`
- Set command alias: `source bin/dc-alias`
- Build docker image: `dc build`
- Run:
  - `dc up` or `dc run --service-ports web npm run dev`
  - then go to `http://localhost:3000/`

> NOTE: If new packages are added to package.json, `dc up` will use `npm i` to install those packages. But if you are using `dc run --service-ports web npm run dev`, you need to run `dc run web npm i` manually to make sure that new packages are installed.

### Build with docker

- Set command alias: `source bin/dc-alias`
- `dc run web npm run build`

### Push and pull docker image

- Set command alias: `source bin/dc-alias`
- Build docker image: `dc build`
- aws configure, then input your access key and secret
- Login AWS ECR with `$(aws ecr get-login --no-include-email --region ap-southeast-1)`
- Push:
  - `docker push 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
  - `docker tag matters-web:latest 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
- Pull:
  - `docker pull 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
  - `docker tag 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest matters-web:latest`

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

[Matters 3.0: Design System](https://paper.dropbox.com/doc/Matters-3.0-Design-System--AqXF9GXfYqC18yjAQzN5l02BAg-Sp6ANp5EXAdnzSK3adqNS)

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

- [blanu.vscode-styled-jsx](https://marketplace.visualstudio.com/items?itemName=blanu.vscode-styled-jsx)
- [attilabuti.vscode-mjml](https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml)
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [mikestead.dotenv](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [ms-vscode.vscode-typescript-tslint-plugin]()
- [Prisma.vscode-graphql](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql)
- [ricard.postcss](https://marketplace.visualstudio.com/items?itemName=ricard.PostCSS)

##### Optional

- [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [wix.vscode-import-cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [oderwat.indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [CoenraadS.bracket-pair-colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [naumovs.color-highlight]()

## Release a new version

1. Update `CHANGELOG.md`
2. Update `version` field of `package.json`
3. Create a new release and tag in [GitHub Releases](https://github.com/thematters/matters-web/releases)

## Troubleshooting

1. If `styled-jsx` is installed in both `next` and our own `package.json`, the built-in `styled-jsx` SSR of Next.js will fail. See [#533](https://github.com/zeit/styled-jsx/issues/533).
