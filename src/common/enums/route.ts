import { NextFunction, Request, Response } from 'express'
import _get from 'lodash/get'

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
  | 'ICYMI'
  | 'SEARCH'
  | 'TAGS'
  | 'TAG_DETAIL'
  | 'USER_ARTICLES'
  | 'USER_COMMENTS'
  | 'USER_FOLLOWERS'
  | 'USER_FOLLOWEES'
  | 'ARTICLE_DETAIL'
  | 'ARTICLE_DETAIL_LEGACY'
  | 'ME_DRAFTS'
  | 'ME_BOOKMARKS'
  | 'ME_HISTORY'
  | 'ME_APPRECIATIONS_SENT'
  | 'ME_APPRECIATIONS_RECEIVED'
  | 'ME_NOTIFICATIONS'
  | 'ME_SETTINGS'
  | 'ME_SETTINGS_CHANGE_USERNAME'
  | 'ME_SETTINGS_CHANGE_EMAIL'
  | 'ME_SETTINGS_CHANGE_PASSWORD'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_SETTINGS_BLOCKED'
  | 'ME_DRAFT_DETAIL'
  | 'RECOMMENDATION'
  | 'AUTH_LOGIN'
  | 'AUTH_SIGNUP'
  | 'AUTH_FORGET'
  | 'OAUTH_AUTHORIZE'
  | 'OAUTH_CALLBACK_SUCCESS'
  | 'OAUTH_CALLBACK_FAILURE'
  | 'HELP'
  | 'MIGRATION'
  | 'ABOUT'
  | 'GUIDE'
  | 'COMMUNITY'
  | 'TOS'

export const ROUTES: Array<{
  key: ROUTE_KEY
  pathname: string
  handler?: (req: Request, res: Response, next: NextFunction) => any
}> = [
  {
    key: 'HOME',
    pathname: '/',
  },
  {
    key: 'FOLLOW',
    pathname: '/follow',
  },
  {
    key: 'AUTHORS',
    pathname: '/authors',
  },
  {
    key: 'TOPICS',
    pathname: '/topics',
  },
  {
    key: 'ICYMI',
    pathname: '/icymi',
  },
  {
    key: 'SEARCH',
    pathname: '/search',
  },
  // experient page for recommendation engine testing
  {
    key: 'RECOMMENDATION',
    pathname: '/recommendation',
  },

  // Tag
  {
    key: 'TAGS',
    pathname: '/tags',
  },
  {
    key: 'TAG_DETAIL',
    pathname: '/tags/[id]',
  },

  // User
  {
    key: 'USER_ARTICLES',
    pathname: '/@[username]',
  },
  {
    key: 'USER_COMMENTS',
    pathname: '/@[username]/comments',
  },
  {
    key: 'USER_FOLLOWERS',
    pathname: '/@[username]/followers',
  },
  {
    key: 'USER_FOLLOWEES',
    pathname: '/@[username]/followees',
  },

  // Article
  {
    key: 'ARTICLE_DETAIL',
    pathname: '/@[userName]/*-[mediaHash]',
  },

  // Me
  {
    key: 'ME_DRAFTS',
    pathname: '/me/drafts',
  },
  {
    key: 'ME_BOOKMARKS',
    pathname: '/me/bookmarks',
  },
  {
    key: 'ME_HISTORY',
    pathname: '/me/history',
  },
  {
    key: 'ME_APPRECIATIONS_SENT',
    pathname: '/me/appreciations/sent',
  },
  {
    key: 'ME_APPRECIATIONS_RECEIVED',
    pathname: '/me/appreciations/received',
  },
  {
    key: 'ME_NOTIFICATIONS',
    pathname: '/me/notifications',
  },

  // Settings
  {
    key: 'ME_SETTINGS',
    pathname: '/me/settings',
  },
  {
    key: 'ME_SETTINGS_CHANGE_USERNAME',
    pathname: '/me/settings/change-username',
  },
  {
    key: 'ME_SETTINGS_CHANGE_EMAIL',
    pathname: '/me/settings/change-email',
  },
  {
    key: 'ME_SETTINGS_CHANGE_PASSWORD',
    pathname: '/me/settings/change-password',
  },
  {
    key: 'ME_SETTINGS_NOTIFICATION',
    pathname: '/me/settings/notification',
  },
  {
    key: 'ME_SETTINGS_BLOCKED',
    pathname: '/me/settings/blocked',
  },

  // Draft
  {
    key: 'ME_DRAFT_DETAIL',
    pathname: '/me/drafts/*-[id]',
  },

  // Auth
  {
    key: 'AUTH_LOGIN',
    pathname: '/login',
  },
  {
    key: 'AUTH_SIGNUP',
    pathname: '/signup',
  },
  {
    key: 'AUTH_FORGET',
    pathname: '/forget',
  },

  // OAuth
  {
    key: 'OAUTH_AUTHORIZE',
    pathname: '/oauth/authorize',
  },
  {
    key: 'OAUTH_CALLBACK_SUCCESS',
    pathname: '/oauth/[provider]/success',
  },
  {
    key: 'OAUTH_CALLBACK_FAILURE',
    pathname: '/oauth/[provider]/failure',
  },

  // Misc
  {
    key: 'HELP',
    pathname: '/help',
  },
  {
    key: 'MIGRATION',
    pathname: '/migration',
  },
  {
    key: 'ABOUT',
    pathname: '/about',
  },
  {
    key: 'GUIDE',
    pathname: '/guide',
  },
  {
    key: 'COMMUNITY',
    pathname: '/community',
  },
  {
    key: 'TOS',
    pathname: '/tos',
  },
]

export const UrlFragments = {
  COMMENTS: 'comments',
}

export const PATHS = {} as {
  [key in ROUTE_KEY]: { href: string }
}
ROUTES.forEach(({ key, pathname }) => {
  PATHS[key] = {
    href: pathname,
  }
})
