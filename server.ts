/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import dotenv from 'dotenv'
import express from 'express'
import 'module-alias/register'
import next from 'next'

import { ROUTES } from '~/common/enums'

// load environment variables from .env
const dotEnvResult = dotenv.config()
if (dotEnvResult.error) {
  console.error(dotEnvResult.error)
}

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

    ROUTES.forEach(({ href, as }) => {
      server.get(as, (req, res) =>
        app.render(req, res, href, { ...req.query, ...req.params })
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
