import { NextFunction, Request, Response } from 'express'
import fetch from 'isomorphic-unfetch'
import _get from 'lodash/get'
import getConfig from 'next/config'

/**
 * Route paths for Next.js custom routing
 *
 * Note: path order is matters
 *
 * Test route at https://forbeslindesay.github.io/express-route-tester/
 */
type ROUTE_KEY =
  | 'HOME'
  | 'FOLLOW'
  | 'AUTHORS'
  | 'TOPICS'
  | 'SEARCH'
  | 'TAGS'
  | 'TAG_DETAIL'
  | 'USER_ARTICLES'
  | 'USER_COMMENTS'
  | 'USER_DRAFTS'
  | 'USER_BOOKMARKS'
  | 'USER_HISTORY'
  | 'USER_FOLLOWERS'
  | 'USER_FOLLOWEES'
  | 'ARTICLE_DETAIL'
  | 'ARTICLE_DETAIL_LEGACY'
  | 'ME_APPRECIATIONS_SENT'
  | 'ME_APPRECIATIONS_RECEIVED'
  | 'ME_NOTIFICATIONS'
  | 'ME_SETTINGS_ACCOUNT'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_DRAFT_DETAIL'
  // | 'EDITOR'
  | 'AUTH_LOGIN'
  | 'AUTH_SIGNUP'
  | 'AUTH_FORGET'
  | 'OAUTH_AUTHORIZE'
  | 'OAUTH_CALLBACK_SUCCESS'
  | 'OAUTH_CALLBACK_FAILURE'
  | 'OAUTH_LIKECOIN_POLLING'
  | 'MISC_ABOUT'
  | 'MISC_FAQ'
  | 'MISC_TOS'
  | 'MISC_GUIDE'

export const ROUTES: Array<{
  key: ROUTE_KEY
  href: string
  as: string
  handler?: (req: Request, res: Response, next: NextFunction) => any
}> = [
  {
    key: 'HOME',
    href: '/Home',
    as: '/'
  },
  {
    key: 'FOLLOW',
    href: '/Follow',
    as: '/follow'
  },
  {
    key: 'AUTHORS',
    href: '/Authors',
    as: '/authors'
  },
  {
    key: 'TOPICS',
    href: '/Topics',
    as: '/topics'
  },
  {
    key: 'SEARCH',
    href: '/Search',
    as: '/search'
  },

  // Tag
  {
    key: 'TAGS',
    href: '/Tags',
    as: '/tags'
  },
  {
    key: 'TAG_DETAIL',
    href: '/TagDetail',
    as: '/tags/:id'
  },

  // User
  {
    key: 'USER_ARTICLES',
    href: '/UserArticles',
    as: '/@:userName'
  },
  {
    key: 'USER_COMMENTS',
    href: '/UserComments',
    as: '/@:userName/comments'
  },
  {
    key: 'USER_DRAFTS',
    href: '/UserDrafts',
    as: '/@:userName/drafts'
  },
  {
    key: 'USER_BOOKMARKS',
    href: '/UserBookmarks',
    as: '/@:userName/bookmarks'
  },
  {
    key: 'USER_HISTORY',
    href: '/UserHistory',
    as: '/@:userName/history'
  },
  {
    key: 'USER_FOLLOWERS',
    href: '/UserFollowers',
    as: '/@:userName/followers'
  },
  {
    key: 'USER_FOLLOWEES',
    href: '/UserFollowees',
    as: '/@:userName/followees'
  },

  // Article
  {
    key: 'ARTICLE_DETAIL',
    href: '/ArticleDetail',
    as: '/@:userName/*-:mediaHash'
  },
  {
    key: 'ARTICLE_DETAIL_LEGACY',
    href: '/ArticleDetail',
    as: '/forum',
    handler: async (req, res) => {
      if (!req.query || !req.query.post) {
        return res.redirect(302, '/')
      }

      const {
        publicRuntimeConfig: { API_URL }
      } = getConfig()

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                article(input: { uuid: "${req.query.post}" }) {
                  slug
                  mediaHash
                  author {
                    userName
                  }
                }
              }
            `
          })
        })
        const data = await response.json()
        const slug = _get(data, 'data.article.slug')
        const mediaHash = _get(data, 'data.article.mediaHash')
        const userName = _get(data, 'data.article.author.userName')

        if (mediaHash && userName) {
          return res.redirect(301, `/@${userName}/${slug}-${mediaHash}`)
        } else {
          return res.redirect(302, '/')
        }
      } catch (e) {
        console.error(e)
        return res.redirect(302, '/')
      }
    }
  },

  // Me
  {
    key: 'ME_APPRECIATIONS_SENT',
    href: '/MeAppreciationsSent',
    as: '/me/appreciations/sent'
  },
  {
    key: 'ME_APPRECIATIONS_RECEIVED',
    href: '/MeAppreciationsReceived',
    as: '/me/appreciations/received'
  },
  {
    key: 'ME_NOTIFICATIONS',
    href: '/MeNotifications',
    as: '/me/notifications'
  },

  // Settings
  {
    key: 'ME_SETTINGS_ACCOUNT',
    href: '/MeSettingsAccount',
    as: '/me/settings/account'
  },
  {
    key: 'ME_SETTINGS_NOTIFICATION',
    href: '/MeSettingsNotification',
    as: '/me/settings/notification'
  },

  // Draft
  {
    key: 'ME_DRAFT_DETAIL',
    href: '/MeDraftDetail',
    as: '/me/drafts/*-:id'
  },
  // {
  //   key: 'EDITOR',
  //   href: '/Editor',
  //   as: '/editor'
  // },

  // Auth
  {
    key: 'AUTH_LOGIN',
    href: '/AuthLogin',
    as: '/login'
  },
  {
    key: 'AUTH_SIGNUP',
    href: '/AuthSignUp',
    as: '/signup'
  },
  {
    key: 'AUTH_FORGET',
    href: '/AuthForget',
    as: '/forget'
  },

  // OAuth
  {
    key: 'OAUTH_AUTHORIZE',
    href: '/OAuthAuthorize',
    as: '/oauth/authorize'
  },
  {
    key: 'OAUTH_CALLBACK_SUCCESS',
    href: '/OAuthCallbackSuccess',
    as: '/oauth/:provider/success'
  },
  {
    key: 'OAUTH_CALLBACK_FAILURE',
    href: '/OAuthCallbackFailure',
    as: '/oauth/:provider/failure'
  },

  // Misc
  {
    key: 'MISC_ABOUT',
    href: '/MiscAbout',
    as: '/about'
  },
  {
    key: 'MISC_FAQ',
    href: '/MiscFAQ',
    as: '/faq'
  },
  {
    key: 'MISC_TOS',
    href: '/MiscToS',
    as: '/tos'
  },
  {
    key: 'MISC_GUIDE',
    href: '/MiscGuide',
    as: '/guide'
  }
]

export const UrlFragments = {
  COMMENTS: 'comments'
}

export const PATHS = {} as { [key in ROUTE_KEY]: { href: string; as: string } }
ROUTES.forEach(({ key, as, href }) => {
  PATHS[key] = { href, as }
})
