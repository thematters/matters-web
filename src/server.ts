/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import 'module-alias/register'
import next from 'next'

import { ROUTES, toExpressPath } from '~/common/enums'

// load environment variables from .env
// skip error for CI
try {
  const dotEnvResult = dotenv.config()
  if (dotEnvResult.error) {
    console.log('error loading .env file', dotEnvResult.error)
  }
} catch (err) {
  console.log('error loading .env file', err)
}

const isProd = process.env.ENV === 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev: !isProd })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // middlewares
    server.use(helmet())

    // routes
    ROUTES.forEach(({ pathname, handler }) => {
      server.get(toExpressPath(pathname), async (req, res, nx) => {
        if (handler) {
          await handler(req, res, nx)
        }

        return app.render(req, res, pathname, {
          ...req.query,
          ...req.params,
        })
      })
    })

    // fallback
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT as number, (err: any) => {
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
