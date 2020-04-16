/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import MobileDetect from 'mobile-detect'
import 'module-alias/register'
import next from 'next'
import { join } from 'path'

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
    ROUTES.forEach(({ pathname, handler }) => {
      // convert Next.js pattern to Express pattern
      const path = pathname.replace(/\]/g, '').replace(/\[/g, ':')

      server.get(path, async (req, res, nx) => {
        if (handler) {
          await handler(req, res, nx)
        }

        const detect = new MobileDetect(req.headers['user-agent'] || '')
        req.clientInfo = {
          isPhone: !!detect.phone(),
          isTablet: !!detect.tablet(),
          isMobile: !!detect.mobile(),
        }

        return app.render(req, res, pathname, {
          ...req.query,
          ...req.params,
        })
      })
    })

    // fallback
    server.get('*', (req, res) => {
      if (req.path === '/service-worker.js') {
        const filePath = join('build', req.path)
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
