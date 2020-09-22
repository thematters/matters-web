# matters-web

![Deployment Status](https://github.com/thematters/matters-web/workflows/Deployment/badge.svg) ![Test Status](https://github.com/thematters/matters-web/workflows/Test/badge.svg) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Getting Started

### Start local dev

- Install dependencies: `npm i`
- Environment variables: `cp .env.local.example .env.local`
- Run `npm run gen:type` or `npm run gen:watch`
- Run `npm run dev`, then go to `http://localhost:3000/`

### Build and run production server

`npm run build && npm run start`

### Start local dev with Docker

- Environment variables: `cp .env.local.example .env`
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
- [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [ricard.postcss](https://marketplace.visualstudio.com/items?itemName=ricard.PostCSS)

##### Optional

- [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [wix.vscode-import-cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [oderwat.indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [CoenraadS.bracket-pair-colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [naumovs.color-highlight]()

### Vim

#### Settings

For vim users, you might want to see `.vim/.vimrc` (using vim-plug).

## Troubleshooting

1. If `styled-jsx` is installed in both `next` and our own `package.json`, the built-in `styled-jsx` SSR of Next.js will fail. See [#533](https://github.com/zeit/styled-jsx/issues/533).
