import { NextFunction, Request, Response } from 'express'
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
  | 'ME_WALLET'
  | 'ME_NOTIFICATIONS'
  | 'ME_SETTINGS_ACCOUNT'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_DRAFT_DETAIL'
  // | 'EDITOR'
  | 'AUTH_LOGIN'
  | 'AUTH_SIGNUP'
  | 'AUTH_FORGET'
  | 'OAUTH_AUTHORIZE'
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
    handler: (req, res) => {
      if (!req.query || !req.query.post) {
        return res.redirect('/')
      }
    }
  },

  // Me
  {
    key: 'ME_WALLET',
    href: '/MeWallet',
    as: '/me/wallet'
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
