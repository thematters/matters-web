import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'

const trackAs = (type: string) => (...args: EventArgs) => {
  // construct event with details
  const event = new CustomEvent(ANALYTICS, {
    detail: { args, type },
  })

  // dispatch event
  window.dispatchEvent(event)
}

export const analytics = {
  trackEvent: trackAs(ANALYTIC_TYPES.TRACK),
  trackPage: trackAs(ANALYTIC_TYPES.PAGE),
  identifyUser: trackAs(ANALYTIC_TYPES.IDENTIFY),
}

type EventArgs =
  | [] // identify user
  | ['page_view'] // pageview
  | ['pull_to_refresh']
  | ['click_feed', ClickFeedProp]
  | ['click_button', ClickButtonProp]
  | ['load_more', LoadMoreProp]
  | ['share', ShareProp]
  | ['purchase', PurchaseProp]

type ClickFeedProp = ArticleFeedProp | UserFeedProp | TagFeedProp

interface ClickButtonProp {
  type:
    | 'checkout' // `next step` after top up dialog
    | 'donate'
    | 'share_article'
    | 'share_user'
    | 'signup'
    | 'top_up'
    | 'translation' // translation button
    | 'write'
    | 'write_collection'
}

interface LoadMoreProp {
  type: ArticleFeedType | UserFeedType | TagFeedType
  location: number
}

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
  amount: number | undefined
  success: boolean
  message?: string
}

interface ArticleFeedProp {
  type: ArticleFeedType

  contentType: 'article'
  styleType:
    | 'card' // cover photo as background, such as related articles
    | 'large_cover'
    | 'small_cover'
    | 'no_cover'
    | 'title'
    | 'comment' // comment in follow feed
  location: number
}

interface UserFeedProp {
  type: UserFeedType
  contentType: 'user'
  styleType: 'subtitle' | 'card'
  location: number
}

interface TagFeedProp {
  type: TagFeedType
  contentType: 'tag'
  styleType: 'title' | 'article'
  location: number
}

type ArticleFeedType =
  | 'all_authors'
  | 'appreciations_sent'
  | 'appreciations_received'
  | 'all_icymi'
  | 'all_topics'
  | 'authors' // author feed on home page
  | 'collection'
  | 'follow'
  | 'hottest'
  | 'icymi'
  | 'newest'
  | 'read_history'
  | 'related_article'
  | 'search'
  | 'search_article'
  | 'tag_detail_latest'
  | 'tag_detail_selected'
  | 'tags' // tag feed with articles on home page
  | 'transaction' // transaction history
  | 'topics'
  | 'user_article'
  | 'wallet'

type UserFeedType =
  | 'all_authors'
  | 'all_icymi'
  | 'all_topics'
  | 'appreciations_sent'
  | 'appreciations_received'
  | 'appreciators'
  | 'authors' // author list on home page
  | 'collection'
  | 'follow'
  | 'followee'
  | 'follower'
  | 'hottest'
  | 'icymi'
  | 'newest'
  | 'read_history'
  | 'related_article'
  | 'search'
  | 'search_user'
  | 'tag_detail_latest'
  | 'tag_detail_selected'
  | 'transaction'

type TagFeedType =
  | 'all_tags' // all tags page
  | 'search'
  | 'search_tag'
  | 'tags' // tag feed on home page
