/**
 * Note: "module-alias" only used in "server.ts" to resolve `~` alias,
 */
import express from 'express'
import helmet from 'helmet'
import 'module-alias/register'
import next from 'next'

import { ROUTES, toExpressPath } from '~/common/enums'

const isProd = process.env.NODE_ENV === 'production'
const PORT = 3000
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
