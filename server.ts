/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import 'module-alias/register'

import express from 'express'
import next from 'next'

import { PATH } from '~/common/enums'

const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev: !IS_PROD })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => app.render(req, res, PATH.HOMEPAGE))
    server.get('/follow', (req, res) => app.render(req, res, PATH.FOLLOW))
    server.get('/authors', (req, res) => app.render(req, res, PATH.AUTHORS))
    server.get('/search', (req, res) =>
      app.render(req, res, PATH.SEARCH, req.query)
    )

    // tag
    server.get('/tags', (req, res) => app.render(req, res, PATH.TAGS))
    server.get('/tags/:id', (req, res) =>
      app.render(req, res, PATH.TAG_DETAIL, req.params)
    )

    // user
    server.get('/@:username', (req, res) =>
      app.render(req, res, PATH.USER_ARTICLES)
    )
    server.get('/@:username/comments', (req, res) =>
      app.render(req, res, PATH.USER_COMMENTS)
    )
    server.get('/@:username/followers', (req, res) =>
      app.render(req, res, PATH.USER_FOLLOWERS)
    )
    server.get('/@:username/followees', (req, res) =>
      app.render(req, res, PATH.USER_FOLLOWEES)
    )

    // article detail
    server.get('/@:username/:article', (req, res) => {
      const { article } = req.params
      const id = article.split('-').pop() // TODO: mediaHash
      return app.render(req, res, PATH.ARTICLE_DETAIL, { id })
    })

    // me
    server.get('/me', (req, res) => app.render(req, res, PATH.ME_ARTICLES))
    server.get('/me/comments', (req, res) =>
      app.render(req, res, PATH.ME_COMMENTS)
    )
    server.get('/me/bookmarks', (req, res) =>
      app.render(req, res, PATH.ME_BOOKMARKS)
    )
    server.get('/me/history', (req, res) =>
      app.render(req, res, PATH.ME_HISTORY)
    )
    server.get('/me/invitations', (req, res) =>
      app.render(req, res, PATH.ME_INVITATIONS)
    )
    server.get('/me/wallet', (req, res) => app.render(req, res, PATH.ME_WALLET))
    server.get('/me/notifications', (req, res) =>
      app.render(req, res, PATH.ME_NOTIFICATIONS)
    )

    // draft & editor
    server.get('/me/drafts', (req, res) => app.render(req, res, PATH.ME_DRAFTS))
    server.get('/me/drafts/:id', (req, res) =>
      app.render(req, res, PATH.ME_DRAFT_DETAIL, req.params)
    )
    server.get('/editor', (req, res) => app.render(req, res, PATH.EDITOR))

    // settings
    server.get('/me/settings/account', (req, res) =>
      app.render(req, res, PATH.ME_SETTINGS_ACCOUNT)
    )
    server.get('/me/settings/notification', (req, res) =>
      app.render(req, res, PATH.ME_SETTINGS_NOTIFICATION)
    )
    server.get('/me/settings/wallet', (req, res) =>
      app.render(req, res, PATH.ME_SETTINGS_WALLET)
    )

    // auth
    server.get('/login', (req, res) => app.render(req, res, PATH.AUTH_LOGIN))
    server.get('/signup', (req, res) => app.render(req, res, PATH.AUTH_SIGN_UP))

    // misc
    server.get('/about', (req, res) => app.render(req, res, PATH.MISC_ABOUT))
    server.get('/faq', (req, res) => app.render(req, res, PATH.MISC_FAQ))
    server.get('/tos', (req, res) => app.render(req, res, PATH.MISC_TOS))
    server.get('/guide', (req, res) => app.render(req, res, PATH.MISC_GUIDE))

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
