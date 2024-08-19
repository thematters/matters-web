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
  | 'SETTINGS'
  // Tag
  | 'TAGS'
  | 'TAG_DETAIL'
  // Article
  | 'ARTICLE_DETAIL'
  | 'ARTICLE_DETAIL_EDIT'
  | 'ARTICLE_DETAIL_HISTORY'
  // User
  | 'USER_ARTICLES'
  | 'USER_COLLECTIONS'
  | 'USER_COLLECTION_DETAIL'
  // Circle
  | 'CIRCLE_DETAIL'
  | 'CIRCLE_DISCUSSION'
  | 'CIRCLE_BROADCAST'
  | 'CIRCLE_SETTINGS'
  | 'CIRCLE_SETTINGS_EDIT_PROFILE'
  | 'CIRCLE_SETTINGS_MANAGE_INVITATION'
  | 'CIRCLE_CREATION'
  // Me
  | 'ME_DRAFTS'
  | 'ME_PUBLISHED'
  | 'ME_ARCHIVED'
  | 'ME_BOOKMARKS'
  | 'ME_HISTORY'
  | 'ME_HISTORY_COMMENTS'
  | 'ME_HISTORY_LIKES_SENT'
  | 'ME_HISTORY_LIKES_RECEIVED'
  | 'ME_NOTIFICATIONS'
  | 'ME_ANALYTICS'
  | 'ME_WALLET'
  | 'ME_WALLET_TRANSACTIONS'
  | 'ME_SETTINGS'
  | 'ME_SETTINGS_NOTIFICATIONS'
  | 'ME_SETTINGS_MISC'
  | 'ME_SETTINGS_BLOCKED'
  | 'ME_DRAFT_NEW'
  | 'ME_DRAFT_DETAIL'
  | 'ME_SETTINGS_NOTIFICATIONS_CIRCLE'
  // Form
  | 'LOGIN'
  | 'SIGNUP'
  | 'FORGET'
  // OAuth
  | 'OAUTH_AUTHORIZE'
  | 'OAUTH_CALLBACK_SUCCESS'
  | 'OAUTH_CALLBACK_FAILURE'
  | 'PAY_CALLBACK_SUCCESS'
  | 'PAY_CALLBACK_FAILURE'
  | 'CALLBACK_PROVIDER'
  // Misc
  | 'MIGRATION'
  | 'ABOUT'
  | 'GUIDE'
  | 'COMMUNITY'
  | 'TOS'
  | 'RECOMMENDATION'

export const ROUTES: {
  key: ROUTE_KEY
  pathname: string
  handler?: (req: Request, res: Response, next: NextFunction) => any
}[] = [
  /**
   * Public
   */
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
  { key: 'USER_ARTICLES', pathname: '/[name]' },
  { key: 'USER_COLLECTIONS', pathname: '/[name]/collections' },
  {
    key: 'USER_COLLECTION_DETAIL',
    pathname: '/[name]/collections/[collectionId]',
  },

  // Article
  { key: 'ARTICLE_DETAIL', pathname: '/a/[shortHash]' },
  { key: 'ARTICLE_DETAIL_EDIT', pathname: '/a/[shortHash]/edit' },
  { key: 'ARTICLE_DETAIL_HISTORY', pathname: '/a/[shortHash]/history' },

  // Circle
  { key: 'CIRCLE_DETAIL', pathname: '/[name]' },
  { key: 'CIRCLE_DISCUSSION', pathname: '/[name]/discussion' },
  { key: 'CIRCLE_BROADCAST', pathname: '/[name]/broadcast' },
  { key: 'CIRCLE_SETTINGS', pathname: '/[name]/settings' },
  {
    key: 'CIRCLE_SETTINGS_EDIT_PROFILE',
    pathname: '/[name]/settings/edit-profile',
  },
  {
    key: 'CIRCLE_SETTINGS_MANAGE_INVITATION',
    pathname: '/[name]/settings/manage-invitation',
  },
  { key: 'CIRCLE_CREATION', pathname: '/circles/create' },

  // Auth
  { key: 'LOGIN', pathname: '/login' },
  { key: 'SIGNUP', pathname: '/signup' },
  { key: 'FORGET', pathname: '/forget' },
  { key: 'CALLBACK_PROVIDER', pathname: '/callback/[provider]' },

  // Misc
  { key: 'MIGRATION', pathname: '/migration' },
  { key: 'ABOUT', pathname: '/about' },
  { key: 'GUIDE', pathname: '/guide' },
  { key: 'COMMUNITY', pathname: '/community' },
  { key: 'TOS', pathname: '/tos' },

  /**
   * Protected
   */
  // Me
  { key: 'ME_DRAFTS', pathname: '/me/drafts' },
  { key: 'ME_PUBLISHED', pathname: '/me/published' },
  { key: 'ME_ARCHIVED', pathname: '/me/archived' },
  { key: 'ME_BOOKMARKS', pathname: '/me/bookmarks' },
  { key: 'ME_HISTORY', pathname: '/me/history' },
  { key: 'ME_HISTORY_COMMENTS', pathname: '/me/history/comments' },
  { key: 'ME_HISTORY_LIKES_SENT', pathname: '/me/history/likes/sent' },
  { key: 'ME_HISTORY_LIKES_RECEIVED', pathname: '/me/history/likes/received' },
  { key: 'ME_NOTIFICATIONS', pathname: '/me/notifications' },
  { key: 'ME_WALLET', pathname: '/me/wallet' },
  { key: 'ME_WALLET_TRANSACTIONS', pathname: '/me/wallet/transactions' },
  { key: 'ME_ANALYTICS', pathname: '/me/analytics' },

  // Settings
  { key: 'ME_SETTINGS', pathname: '/me/settings' },
  { key: 'ME_SETTINGS_NOTIFICATIONS', pathname: '/me/settings/notifications' },
  {
    key: 'ME_SETTINGS_NOTIFICATIONS_CIRCLE',
    pathname: '/me/settings/notifications/circle',
  },
  {
    key: 'ME_SETTINGS_MISC',
    pathname: '/me/settings/misc',
  },
  { key: 'ME_SETTINGS_BLOCKED', pathname: '/me/settings/blocked' },

  // Draft
  { key: 'ME_DRAFT_NEW', pathname: '/me/drafts/new' },
  { key: 'ME_DRAFT_DETAIL', pathname: '/me/drafts/[draftId]' },

  // OAuth
  { key: 'OAUTH_AUTHORIZE', pathname: '/oauth/authorize' },
  { key: 'OAUTH_CALLBACK_SUCCESS', pathname: '/oauth/[provider]/success' },
  { key: 'OAUTH_CALLBACK_FAILURE', pathname: '/oauth/[provider]/failure' },

  // Pay
  { key: 'PAY_CALLBACK_SUCCESS', pathname: '/pay/[provider]/success' },
  { key: 'PAY_CALLBACK_FAILURE', pathname: '/pay/[provider]/failure' },
]

export const PATHS = {} as {
  [key in ROUTE_KEY]: string
}
ROUTES.forEach(({ key, pathname }) => {
  PATHS[key] = pathname
})
