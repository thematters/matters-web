# matters-web

## Getting Started

### Start local dev

- Install dependencies: `npm i`
- Environment variables: `cp .env.example .env`
- Run `npm run dev`, then go to `http://localhost:3000/`

### Build and run production server

`npm run build && npm run start`

### Start local dev with docker

- Environment variables: `cp .env.example .env`
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

## Release a new version

1. Update `CHANGELOG.md`
2. Update `version` field of `package.json`
3. Create a new release and tag in [GitHub Releases](https://github.com/thematters/matters-web/releases)

## Troubleshooting

1. If `styled-jsx` is installed in both `next` and our own `package.json`, the built-in `styled-jsx` SSR of Next.js will fail. See [#533](https://github.com/zeit/styled-jsx/issues/533).
