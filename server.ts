/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import 'module-alias/register'

// load environment variables from .env
import dotenv from 'dotenv'
const dotEnvResult = dotenv.config()
if (dotEnvResult.error) {
  console.error(dotEnvResult.error)
}

import express from 'express'
import next from 'next'

import { ROUTES } from '~/common/enums'

const isProd = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const ASSET_PREFIX = process.env.ASSET_PREFIX
const app = next({ dev: !isProd })
const handle = app.getRequestHandler()

if (ASSET_PREFIX) {
  app.setAssetPrefix(ASSET_PREFIX)
}

app
  .prepare()
  .then(() => {
    const server = express()

    ROUTES.forEach(({ fs, url }) => {
      server.get(url, (req, res) =>
        app.render(req, res, fs, { ...req.query, ...req.params })
      )
    })

    // fallback
    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, (err: any) => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + PORT)
    })
  })
  .catch((err: any) => {
    console.error(err.stack)
    process.exit(1)
  })
