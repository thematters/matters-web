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
  | 'ME_INVITATIONS'
  | 'ME_WALLET'
  | 'ME_NOTIFICATIONS'
  | 'ME_SETTINGS_ACCOUNT'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_DRAFT_DETAIL'
  // | 'EDITOR'
  | 'AUTH_LOGIN'
  | 'AUTH_SIGNUP'
  | 'AUTH_FORGET'
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
    href: '/User/Articles',
    as: '/@:userName'
  },
  {
    key: 'USER_COMMENTS',
    href: '/User/Comments',
    as: '/@:userName/comments'
  },
  {
    key: 'USER_DRAFTS',
    href: '/User/Drafts',
    as: '/@:userName/drafts'
  },
  {
    key: 'USER_BOOKMARKS',
    href: '/User/Bookmarks',
    as: '/@:userName/bookmarks'
  },
  {
    key: 'USER_HISTORY',
    href: '/User/History',
    as: '/@:userName/history'
  },
  {
    key: 'USER_FOLLOWERS',
    href: '/User/Followers',
    as: '/@:userName/followers'
  },
  {
    key: 'USER_FOLLOWEES',
    href: '/User/Followees',
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
    key: 'ME_INVITATIONS',
    href: '/Me/Invitations',
    as: '/me/invitations'
  },
  {
    key: 'ME_WALLET',
    href: '/Me/Wallet',
    as: '/me/wallet'
  },
  {
    key: 'ME_NOTIFICATIONS',
    href: '/Me/Notifications',
    as: '/me/notifications'
  },

  // Settings
  {
    key: 'ME_SETTINGS_ACCOUNT',
    href: '/Me/Settings/Account',
    as: '/me/settings/account'
  },
  {
    key: 'ME_SETTINGS_NOTIFICATION',
    href: '/Me/Settings/Notification',
    as: '/me/settings/notification'
  },

  // Draft
  {
    key: 'ME_DRAFT_DETAIL',
    href: '/Me/DraftDetail',
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
    href: '/Auth/Login',
    as: '/login'
  },
  {
    key: 'AUTH_SIGNUP',
    href: '/Auth/SignUp',
    as: '/signup'
  },
  {
    key: 'AUTH_FORGET',
    href: '/Auth/Forget',
    as: '/forget'
  },

  // Misc
  {
    key: 'MISC_ABOUT',
    href: '/Misc/About',
    as: '/about'
  },
  {
    key: 'MISC_FAQ',
    href: '/Misc/FAQ',
    as: '/faq'
  },
  {
    key: 'MISC_TOS',
    href: '/Misc/ToS',
    as: '/tos'
  },
  {
    key: 'MISC_GUIDE',
    href: '/Misc/Guide',
    as: '/guide'
  }
]

export const DOMAIN = 'matters.news'

export const PATHS = {} as { [key in ROUTE_KEY]: { href: string; as: string } }
ROUTES.forEach(({ key, as, href }) => {
  PATHS[key] = { href, as }
})
