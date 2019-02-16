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
  | 'ME_ARTICLES'
  | 'ME_COMMENTS'
  | 'ME_BOOKMARKS'
  | 'ME_HISTORY'
  | 'ME_INVITATION'
  | 'ME_WALLET'
  | 'ME_NOTIFICATION'
  | 'ME_SETTINGS_ACCOUNT'
  | 'ME_SETTINGS_NOTIFICATION'
  | 'ME_SETTINGS_WALLET'
  | 'ME_DRAFTS'
  | 'ME_DRAFT_DETAIL'
  | 'EDITOR'
  | 'AUTH_LOGIN'
  | 'AUTH_SIGNUP'
  | 'MISC_ABOUT'
  | 'MISC_FAQ'
  | 'MISC_TOS'
  | 'MISC_GUIDE'

export const ROUTES: Array<{ key: ROUTE_KEY; fs: string; url: string }> = [
  {
    key: 'HOME',
    fs: '/Home',
    url: '/'
  },
  {
    key: 'FOLLOW',
    fs: '/Follow',
    url: '/follow'
  },
  {
    key: 'AUTHORS',
    fs: '/Authors',
    url: '/authors'
  },
  {
    key: 'SEARCH',
    fs: '/Search',
    url: '/search'
  },

  // Tag
  {
    key: 'TAGS',
    fs: '/Tags',
    url: '/tags'
  },
  {
    key: 'TAG_DETAIL',
    fs: '/TagDetail',
    url: '/tags/:id'
  },

  // User
  {
    key: 'USER_ARTICLES',
    fs: '/User/Articles',
    url: '/@:userName'
  },
  {
    key: 'USER_COMMENTS',
    fs: '/User/Comments',
    url: '/@:userName/comments'
  },
  {
    key: 'USER_FOLLOWERS',
    fs: '/User/Followers',
    url: '/@:userName/followers'
  },
  {
    key: 'USER_FOLLOWEES',
    fs: '/User/Followees',
    url: '/@:userName/followees'
  },

  // Article
  {
    key: 'ARTICLE_DETAIL',
    fs: '/ArticleDetail',
    url: '/@:userName/*-:mediaHash'
  },

  // Me
  {
    key: 'ME_ARTICLES',
    fs: '/Me/Articles',
    url: '/me'
  },
  {
    key: 'ME_COMMENTS',
    fs: '/Me/Comments',
    url: '/me/comments'
  },
  {
    key: 'ME_BOOKMARKS',
    fs: '/Me/Bookmarks',
    url: '/me/bookmarks'
  },
  {
    key: 'ME_HISTORY',
    fs: '/Me/History',
    url: '/me/history'
  },
  {
    key: 'ME_INVITATION',
    fs: '/Me/Invitations',
    url: '/me/invitations'
  },
  {
    key: 'ME_WALLET',
    fs: '/Me/Wallet',
    url: '/me/wallet'
  },
  {
    key: 'ME_NOTIFICATION',
    fs: '/Me/Notifications',
    url: '/me/notification'
  },

  // Settings
  {
    key: 'ME_SETTINGS_ACCOUNT',
    fs: '/Me/Settings/Account',
    url: '/me/settings/account'
  },
  {
    key: 'ME_SETTINGS_NOTIFICATION',
    fs: '/Me/Settings/Notification',
    url: '/me/settings/notification'
  },
  {
    key: 'ME_SETTINGS_WALLET',
    fs: '/Me/Settings/Wallet',
    url: '/me/settings/wallet'
  },

  // Draft
  {
    key: 'ME_DRAFTS',
    fs: '/Me/Drafts',
    url: '/me/drafts'
  },
  {
    key: 'ME_DRAFT_DETAIL',
    fs: '/Me/DraftDetail',
    url: '/me/drafts/:id'
  },
  {
    key: 'EDITOR',
    fs: '/Editor',
    url: '/editor'
  },

  // Auth
  {
    key: 'AUTH_LOGIN',
    fs: '/Auth/Login',
    url: '/login'
  },
  {
    key: 'AUTH_SIGNUP',
    fs: '/Auth/SignUp',
    url: '/signup'
  },

  // Misc
  {
    key: 'MISC_ABOUT',
    fs: '/Misc/About',
    url: '/about'
  },
  {
    key: 'MISC_FAQ',
    fs: '/Misc/FAQ',
    url: '/faq'
  },
  {
    key: 'MISC_TOS',
    fs: '/Misc/ToS',
    url: '/tos'
  },
  {
    key: 'MISC_GUIDE',
    fs: '/Misc/Guide',
    url: '/guide'
  }
]

export const PATHS = {} as { [key in ROUTE_KEY]: { fs: string; url: string } }
ROUTES.forEach(({ key, url, fs }) => {
  PATHS[key] = { fs, url }
})
