/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import 'module-alias/register'

import express from 'express'
import next from 'next'

import { ROUTES } from '~/common/enums'

const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev: !IS_PROD })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    ROUTES.forEach(({ fs, url }) => {
      server.get(url, (req, res) => app.render(req, res, fs, req.params))
    })

    // // article detail
    // server.get('/@:username/:article', (req, res) => {
    //   const { article } = req.params
    //   const id = article.split('-').pop() // TODO: mediaHash
    //   return app.render(req, res, PATH.ARTICLE_DETAIL.fs, { id })
    // })

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
