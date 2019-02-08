const express = require('express')
const next = require('next')

const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev: !IS_PROD })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => app.render(req, res, '/'))
    server.get('/follow', (req, res) => app.render(req, res, '/Follow'))
    server.get('/authors', (req, res) => app.render(req, res, '/Authors'))
    server.get('/search', (req, res) =>
      app.render(req, res, '/Search', req.query)
    )

    // tag
    server.get('/tags', (req, res) => app.render(req, res, '/Tags'))
    server.get('/tags/:id', (req, res) =>
      app.render(req, res, '/TagDetail', req.params)
    )

    // user
    server.get('/@:username', (req, res) =>
      app.render(req, res, '/User/Articles')
    )
    server.get('/@:username/comments', (req, res) =>
      app.render(req, res, '/User/Comments')
    )
    server.get('/@:username/followers', (req, res) =>
      app.render(req, res, '/User/Followers')
    )
    server.get('/@:username/followees', (req, res) =>
      app.render(req, res, '/User/Followees')
    )

    // article detail
    server.get('/@:username/:article', (req, res) => {
      const { article } = req.params
      const id = article.split('-').pop() // TODO: mediaHash
      return app.render(req, res, '/ArticleDetail', { id })
    })

    // me
    server.get('/me', (req, res) => app.render(req, res, '/Me/Articles'))
    server.get('/me/comments', (req, res) =>
      app.render(req, res, '/Me/Comments')
    )
    server.get('/me/bookmarks', (req, res) =>
      app.render(req, res, '/Me/Bookmarks')
    )
    server.get('/me/history', (req, res) => app.render(req, res, '/Me/History'))
    server.get('/me/invitations', (req, res) =>
      app.render(req, res, '/Me/Invitations')
    )
    server.get('/me/wallet', (req, res) => app.render(req, res, '/Me/Wallet'))
    server.get('/me/notifications', (req, res) =>
      app.render(req, res, '/Me/Notifications')
    )

    // draft & editor
    server.get('/me/drafts', (req, res) => app.render(req, res, '/Me/Drafts'))
    server.get('/me/drafts/:id', (req, res) =>
      app.render(req, res, '/Me/DraftDetail', req.params)
    )
    server.get('/editor', (req, res) => app.render(req, res, '/Editor'))

    // settings
    server.get('/me/settings/account', (req, res) =>
      app.render(req, res, '/Me/Settings/Account')
    )
    server.get('/me/settings/notification', (req, res) =>
      app.render(req, res, '/Me/Settings/Notification')
    )
    server.get('/me/settings/wallet', (req, res) =>
      app.render(req, res, '/Me/Settings/Wallet')
    )

    // auth
    server.get('/login', (req, res) => app.render(req, res, '/Auth/Login'))
    server.get('/signup', (req, res) => app.render(req, res, '/Auth/SignUp'))

    // misc
    server.get('/about', (req, res) => app.render(req, res, '/Misc/About'))
    server.get('/faq', (req, res) => app.render(req, res, '/Misc/FAQ'))
    server.get('/tos', (req, res) => app.render(req, res, '/Misc/ToS'))
    server.get('/guide', (req, res) => app.render(req, res, '/Misc/Guide'))

    // fallback
    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + PORT)
    })
  })
  .catch(error => {
    console.error(error.stack)
    process.exit(1)
  })
