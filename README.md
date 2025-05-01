# matters-web

![Deployment Status](https://github.com/thematters/matters-web/workflows/Deployment/badge.svg) ![Build Status](https://github.com/thematters/matters-web/workflows/Test%20Build/badge.svg) ![Test Status](https://github.com/thematters/matters-web/workflows/Test%20E2E/badge.svg) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Getting Started

### Start local dev

- Install [commitizen](https://github.com/commitizen/cz-cli) globally: `npm install commitizen -g`
- Install dependencies: `npm i`
- Environment variables: `cp .env.local.example .env.local`
- Run `npm run gen:type`
- Run `npm run i18n`
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

## Testing

See [Playwright Testing Guide](https://www.notion.so/matterslab/Playwright-Testing-Guide-60caa248d5ce4d70938b7b2f2c7e9139).

## Conventions

See `.cursor/rules` and [Team Wiki](https://www.notion.so/matterslab/Conventions-acbed6763f6746319396978c19340d78).

## Tools

### VS Code

#### Settings

See `.vscode/settings.json`

#### Extensions

See `.vscode/extensions.json`

### Vim

#### Settings

For vim users, you might want to see `.vim/.vimrc` (using vim-plug).
