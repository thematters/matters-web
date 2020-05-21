export type AnalyticEvent =
  | 'click-feed'
  | 'click-button'
  | 'load-more'
  | 'share'
  | 'purchase'

export type EventProp =
  | ClickButtonProp
  | ClickFeedProp
  | LoadMoreProp
  | PurchaseProp
  | ShareProp

interface ShareProp {
  type:
    | 'line'
    | 'whatsapp'
    | 'telegram'
    | 'wechat'
    | 'twitter'
    | 'email'
    | 'facebook'
    | 'weibo'
    | 'douban'
    | 'copy-url'
}

interface PurchaseProp {
  amount: number
}

interface LoadMoreProp {
  type: ArticleFeedType | UserFeedType
}

interface ClickButtonProp {
  type:
    | 'write'
    | 'write_collection'
    | 'donate'
    | 'add_value'
    | 'share_article'
    | 'share_user'
    | 'signup'
}

type ClickFeedProp = ArticleFeedProp | UserFeedProp

interface ArticleFeedProp {
  type: ArticleFeedType

  contentType: 'article'
  styleType: 'card' | 'large-cover' | 'small-cover' | 'no-cover' | 'title'
  location: number
}

type ArticleFeedType =
  | 'all-authors'
  | 'all-icymi'
  | 'all-tags'
  | 'all-topics'
  | 'authors'
  | 'collection'
  | 'follow'
  | 'hottest'
  | 'icymi'
  | 'newest'
  | 'read-history'
  | 'related-article'
  | 'tag-detail'
  | 'tags'
  | 'topics'
  | 'user-article'
  | 'wallet'

interface UserFeedProp {
  type: UserFeedType
  contentType: 'user'
  styleType: 'subtitle' | 'card'
  location: number
}

type UserFeedType =
  | 'all-authors'
  | 'all-icymi'
  | 'all-topics'
  | 'appreciator'
  | 'authors'
  | 'collection'
  | 'follow'
  | 'followee'
  | 'follower'
  | 'hottest'
  | 'icymi'
  | 'newest'
  | 'read-history'
  | 'related-article'
  | 'tag-detail'
  | 'wallet'

export const GA_TRACKING_ID = 'UA-127561991-1'

export const ANALYTIC_TYPES = {
  TRACK: 'track',
  PAGE: 'page',
  IDENTIFY: 'identify',
}

export const ANALYTICS_EVENTS = {
  CLICK_FEED: 'click-feed',
  CLCIK_BOTTON: 'click-button',
  LOAD_MORE: 'load-more',
  PURCHASE: 'purchase',
  EXCEPTION: 'exception',

  CLICK_WRITE_BUTTON: 'click-write-button',
  CLICK_ENTER_AFTER_SIGNUP: 'click-enter-after-signup',
  CLICK_PUBLISH_BUTTON: 'click-publish-button',
  CLICK_SAVE_DRAFT_IN_MODAL: 'click-save-draft-in-modal',
  CLICK_PUBLISH_IN_MODAL: 'click-publish-in-modal',
  CLICK_DRAFT: 'click-draft',
  CLICK_FREQUENT_SEARCH: 'click-frequent-search',
  CLICK_SEARCH_HISTORY: 'click-search-history',
  CLICK_VIEW_MODE: 'click-view-mode',
  UPLOAD_DRAFT: 'upload-draft',
  COMMENT_EDITOR_CHANGE: 'comment-editor-change',
  ARTICLE_BOTTOM_CROSS: 'article-bottom-cross',
  PUBLISH_ERROR: 'publish-error',
  PULL_TO_REFRESH: 'pull-to-refresh',
  DISPLAY_ALL: 'display-all',
  SHUFFLE_AUTHOR: 'shuffle-author',
  ENTER_ARTICLE: 'enter-article',
  LEAVE_ARTICLE: 'leave-article',
  FINISH_ARTICLE: 'finish-article',
  FINISH_COMMENTS: 'finish-comments',
  OPEN_COMMENTS: 'open-comments',
  LOG_OUT: 'log-out',
  LOG_IN: 'log-in',
  LOG_IN_FAILED: 'log-in-failed',
  OPEN_COLLECTION: 'open-collection',
  OPEN_COLLECTED: 'open-collected',
  SHARE: 'share',
  SIGNUP_START: 'signup-start',
  SIGNUP_SUCCESS: 'signup-success',
  FOLLOW_USER: 'follow-user',
  UNFOLLOW_USER: 'unfollow-user',
  OPEN_CIVIC_LIKER_MODAL: 'open-civic-liker-modal',
  CLOSE_CIVIC_LIKER_MODAL: 'close-civic-liker-modal',
  CLOSE_SIGNUP_MODAL: 'close-signup-modal',
  SIGNUP_STEP_FINISH: 'signup-step-finish',
  LIKECOIN_STEP_CHANGE: 'likecoin-step-change',
  LIKECOIN_STEP_RETRY: 'likecoin-step-retry',
}

export const SHARE_TYPE = {
  LINE: 'line',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  WECHAT: 'wechat',
  TWITTER: 'twitter',
  EMAIL: 'email',
  FACEBOOK: 'facebook',
  WEIBO: 'weibo',
  DOUBAN: 'douban',
  ROOT: 'root',
}

export const FEED_TYPE = {
  // article
  TODAY: 'today',
  HOTTEST: 'hottest',
  NEWEST: 'newest',
  TOPICS: 'topics',
  ICYMI: 'icymi',
  ALL_TOPICS: 'all-topics',
  ALL_ICYMI: 'all-icymi',
  TAG_DETAIL: 'tag-detail',
  FOLLOW: 'follow',
  USER_ARTICLE: 'user-article',
  SEARCH_ARTICLE: 'search-article',
  READ_HISTORY: 'read-history',
  RELATED_ARTICLE: 'related-article',
  COLLECTION: 'collection',
  COLLECTED: 'collected',
  // user
  AUTHORS: 'authors',
  ALL_AUTHORS: 'all-authors',
  FOLLOWEE: 'followee',
  FOLLOWER: 'follower',
  APPRECIATOR: 'appreciator',
  SEARCH_USER: 'search-user',
  BLOCK_LIST: 'block-list',
  // tags
  TAGS: 'tags',
  ALL_TAGS: 'all-tags',
  SEARCH_TAG: 'search-tag',
}

export const SIGNUP_TYPE = {
  GENERAL: 'general',
  AD_WALL: 'ad-wall',
}
