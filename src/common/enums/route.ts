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
  | 'SEARCH'
  | 'TAGS'
  | 'TAG_DETAIL'
  | 'USER_ARTICLES'
  | 'USER_COMMENTS'
  | 'USER_FOLLOWERS'
  | 'USER_FOLLOWEES'
  | 'ARTICLE_DETAIL'
  | 'ME_DRAFTS'
  | 'ME_BOOKMARKS'
  | 'ME_HISTORY'
  | 'ME_APPRECIATIONS_SENT'
  | 'ME_APPRECIATIONS_RECEIVED'
  | 'ME_NOTIFICATIONS'
  | 'ME_WALLET'
  | 'ME_WALLET_TRANSACTIONS'
  | 'ME_SETTINGS'
  | 'ME_SETTINGS_CHANGE_USERNAME'
  | 'ME_SETTINGS_CHANGE_EMAIL'
  | 'ME_SETTINGS_CHANGE_PASSWORD'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_SETTINGS_BLOCKED'
  | 'ME_DRAFT_DETAIL'
  | 'RECOMMENDATION'
  | 'LOGIN'
  | 'SIGNUP'
  | 'FORGET'
  | 'OAUTH_AUTHORIZE'
  | 'OAUTH_CALLBACK_SUCCESS'
  | 'OAUTH_CALLBACK_FAILURE'
  | 'HELP'
  | 'MIGRATION'
  | 'ABOUT'
  | 'GUIDE'
  | 'COMMUNITY'
  | 'TOS'
  | 'PAY_CALLBACK_SUCCESS'
  | 'PAY_CALLBACK_FAILURE'

export const ROUTES: Array<{
  key: ROUTE_KEY
  pathname: string
  handler?: (req: Request, res: Response, next: NextFunction) => any
}> = [
  { key: 'HOME', pathname: '/' },
  { key: 'FOLLOW', pathname: '/follow' },
  { key: 'AUTHORS', pathname: '/authors' },
  { key: 'SEARCH', pathname: '/search' },
  // experient page for recommendation engine testing
  { key: 'RECOMMENDATION', pathname: '/recommendation' },

  // Tag
  { key: 'TAGS', pathname: '/tags' },
  { key: 'TAG_DETAIL', pathname: '/tags/[tagId]' },

  // User
  { key: 'USER_ARTICLES', pathname: '/[userName]' },
  { key: 'USER_COMMENTS', pathname: '/[userName]/comments' },
  { key: 'USER_FOLLOWERS', pathname: '/[userName]/followers' },
  { key: 'USER_FOLLOWEES', pathname: '/[userName]/followees' },

  // Article
  { key: 'ARTICLE_DETAIL', pathname: '/[userName]/[mediaHash]' },

  // Me
  { key: 'ME_DRAFTS', pathname: '/me/drafts' },
  { key: 'ME_BOOKMARKS', pathname: '/me/bookmarks' },
  { key: 'ME_HISTORY', pathname: '/me/history' },
  { key: 'ME_APPRECIATIONS_SENT', pathname: '/me/appreciations/sent' },
  { key: 'ME_APPRECIATIONS_RECEIVED', pathname: '/me/appreciations/received' },
  { key: 'ME_NOTIFICATIONS', pathname: '/me/notifications' },
  { key: 'ME_WALLET', pathname: '/me/wallet' },
  { key: 'ME_WALLET_TRANSACTIONS', pathname: '/me/wallet/transactions' },

  // Settings
  { key: 'ME_SETTINGS', pathname: '/me/settings' },
  {
    key: 'ME_SETTINGS_CHANGE_USERNAME',
    pathname: '/me/settings/change-username',
  },
  { key: 'ME_SETTINGS_CHANGE_EMAIL', pathname: '/me/settings/change-email' },
  {
    key: 'ME_SETTINGS_CHANGE_PASSWORD',
    pathname: '/me/settings/change-password',
  },
  { key: 'ME_SETTINGS_NOTIFICATION', pathname: '/me/settings/notification' },
  { key: 'ME_SETTINGS_BLOCKED', pathname: '/me/settings/blocked' },

  // Draft
  { key: 'ME_DRAFT_DETAIL', pathname: '/me/drafts/[draftId]' },

  // Auth
  { key: 'LOGIN', pathname: '/login' },
  { key: 'SIGNUP', pathname: '/signup' },
  { key: 'FORGET', pathname: '/forget' },

  // OAuth
  { key: 'OAUTH_AUTHORIZE', pathname: '/oauth/authorize' },
  { key: 'OAUTH_CALLBACK_SUCCESS', pathname: '/oauth/[provider]/success' },
  { key: 'OAUTH_CALLBACK_FAILURE', pathname: '/oauth/[provider]/failure' },

  // Pay
  { key: 'PAY_CALLBACK_SUCCESS', pathname: '/pay/[provider]/success' },
  { key: 'PAY_CALLBACK_FAILURE', pathname: '/pay/[provider]/failure' },

  // Misc
  { key: 'HELP', pathname: '/help' },
  { key: 'MIGRATION', pathname: '/migration' },
  { key: 'ABOUT', pathname: '/about' },
  { key: 'GUIDE', pathname: '/guide' },
  { key: 'COMMUNITY', pathname: '/community' },
  { key: 'TOS', pathname: '/tos' },
]

export const UrlFragments = {
  COMMENTS: 'comments',
}

export const PATHS = {} as {
  [key in ROUTE_KEY]: string
}
ROUTES.forEach(({ key, pathname }) => {
  PATHS[key] = pathname
})
