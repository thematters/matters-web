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
import path from 'path'

import { ROUTES } from '~/common/enums'

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
    ROUTES.forEach(({ href, as, handler }) => {
      server.get(as, async (req, res, nx) => {
        if (handler) {
          await handler(req, res, nx)
        }

        return app.render(req, res, href, { ...req.query, ...req.params })
      })
    })

    // fallback
    server.get('*', (req, res) => {
      if (req.path === '/service-worker.js') {
        const filePath = path.join('build', req.path)
        res.setHeader('Service-Worker-Allowed', '/')
        return app.serveStatic(req, res, filePath)
      }

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
