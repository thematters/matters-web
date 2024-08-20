// Analytics
export const ANALYTICS = 'analytics'

// Article
export const REFETCH_RESPONSES = 'refetchResponses'
export const SYNC_APPRECIATE_BUTTON_COUNT = 'syncAppreciateButtonCount'
export const SYNC_QUOTE_COMMENT = 'syncQuoteComment'

// Tag
export const REFETCH_TAG_DETAIL_ARTICLES = 'refetchTagDetailArticles'

// Circle
export const REFETCH_CIRCLE_DETAIL_ARTICLES = 'refetchCircleDetailArticles'
export const REFETCH_CIRCLE_DETAIL = 'refetchCircleDetail'
export const REFETCH_CIRCLE_PENDING_INVITES = 'refetchCirclePendingInvites'

// Donators
export const REFETCH_DONATORS = 'refetchDonators'

// Dialogs
export const OPEN_UNIVERSAL_AUTH_DIALOG = 'openUniversalAuthDialog'
export const CLOSE_ACTIVE_DIALOG = 'closeActiveDialog'
export const OPEN_SUBSCRIBE_CIRCLE_DIALOG = 'openSubscribeCircleDialog'
export const OPEN_SET_USER_NAME_DIALOG = 'openSetUserNameDialog'
export const OPEN_NOMAD_BADGE_DIALOG = 'openNomadBadgeDialog'
export const OPEN_GRAND_BADGE_DIALOG = 'openGrandBadgeDialog'
export const OPEN_COMMENT_DETAIL_DIALOG = 'openCommentDetailDialog'
export const OPEN_SET_PAYMENT_PASSWORD_DIALOG = 'openSetPaymentPasswordDialog'
export const CLOSE_SET_PAYMENT_PASSWORD_DIALOG = 'closeSetPaymentPasswordDialog'
export const OPEN_COMMENT_LIST_DRAWER = 'openCommentListDrawer'
export const CLOSE_OTHER_DRAWERS = 'closeOtherDrawers'
export const BYPASS_SCROLL_LOCK = 'bypassScrollLock'
export const ENBABLE_SCROLL_LOCK = 'enableScrollLock'

// Toast
export const TOAST_SEND_EMAIL_VERIFICATION = 'toastSendEmailVerification'

// Support
export const SUPPORT_SUCCESS = 'supportSuccess'
export const SUPPORT_SUCCESS_USDT_VISITOR = 'supportSuccessUSDTVisitor'
export const SUPPORT_SUCCESS_ANIMATION = 'supportSuccessAnimation'

// Universal auth
export enum UNIVERSAL_AUTH_TRIGGER {
  appreciation = 'appreciation',
  bookmark = 'bookmark',
  circlePrice = 'circlePrice',
  circleSubscription = 'circleSubscription',
  collectArticle = 'collectArticle',
  reportIssues = 'reportIssues',
  comment = 'comment',
  createDraft = 'createDraft',
  error = 'error',
  followUser = 'followUser',
  followTag = 'followTag',
  followCircle = 'followCircle',
  migration = 'migration',
  nav = 'nav',
  replyComment = 'replyComment',
  sideNav = 'sideNav',
  support = 'support',
  visitorWall = 'visitorWall',
}

/**
 * Broadcast channel
 */
export const CHANNEL_VERIFIED_EMAIL = 'channel-verified-email'
