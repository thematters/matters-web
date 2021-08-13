import { ANALYTICS, ANALYTIC_TYPES } from '~/common/enums'

const trackAs =
  (type: string) =>
  (...args: EventArgs) => {
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
  | ['page_view', PageViewProp] // pageview
  | ['pull_to_refresh']
  | ['click_feed', ClickFeedProp]
  | ['click_button', ClickButtonProp]
  | ['load_more', LoadMoreProp]
  | ['share', ShareProp]
  | ['purchase', PurchaseProp]
  | ['subscribe', SubscribeProps]
  | ['view_add_credit_dialog', ViewDialogProp]
  | ['view_donation_dialog', ViewDialogProp]
  | ['view_subscribe_circle_dialog', ViewDialogProp]

/**
 * Event: Page View
 */
interface PageViewProp {
  page_referrer: string
}

/**
 * Event: Click Button
 */
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
    | 'google_search'
    | 'subscribe_circle_banner'
    | 'subscribe_circle_price'
    | 'subscribe_confirm'
    | 'create_circle'
    | 'finish_circle_creation'
  pageType?: PageType
}

/**
 * Event: Load More
 */
interface LoadMoreProp {
  type:
    | ArticleFeedType
    | CommentFeedType
    | UserFeedType
    | TagFeedType
    | CircleFeedType
  location: number
}

/**
 * Event: Share
 */
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

/**
 * Event: Purchase
 */
interface PurchaseProp {
  amount: number | undefined
  success: boolean
  message?: string
}

/**
 * Event: Subscribe
 */
interface SubscribeProps {
  id: string | undefined
  success: boolean
  message?: string
}

/**
 * Event: View Dialog
 */
interface ViewDialogProp {
  step: string
}

/**
 * Event: Click Feed
 */
interface ClickFeedProp {
  type: FeedType
  contentType: ContentType | ActivityType
  location: number
}

// content type
type ContentType = 'article' | 'comment' | 'circle' | 'user' | 'tag'
type ActivityType =
  | 'UserPublishArticleActivity'
  | 'UserBroadcastCircleActivity'
  | 'UserCreateCircleActivity'
  | 'UserCollectArticleActivity'
  | 'UserSubscribeCircleActivity'
  | 'UserFollowUserActivity'
  | 'UserDonateArticleActivity'
  | 'UserBookmarkArticleActivity'
  | 'UserAddArticleTagActivity'
  | 'RecommendArticleActivity'
  | 'ArticleRecommendationActivity'
  | 'CircleRecommendationActivity'
  | 'UserRecommendationActivity'

// feed type
type FeedType =
  | ArticleFeedType
  | CommentFeedType
  | UserFeedType
  | TagFeedType
  | CircleFeedType
  | 'following'

type ArticleFeedType =
  | 'all_authors'
  | 'appreciations_sent'
  | 'appreciations_received'
  | 'all_icymi'
  | 'all_topics'
  | 'authors' // author feed on home page
  | 'collection'
  // | 'follow-article'
  // | 'followee-donated-article'
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
  | 'related_donations'
  | 'circle_detail'

type CommentFeedType =
  //  'follow-comment' |
  'user_comment'

type UserFeedType =
  | 'all_authors'
  | 'all_icymi'
  | 'all_topics'
  | 'appreciations_sent'
  | 'appreciations_received'
  | 'appreciators'
  | 'donators'
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
  | 'tag_detail_community'
  | 'transaction'

type TagFeedType =
  | 'all_tags' // all tags page
  // | 'follow-tag'
  | 'search'
  | 'search_tag'
  | 'tags' // tag feed on home page
  | 'user_tag'

type CircleFeedType = 'user_circle' | 'circle_follower' | 'circle_member'

type PageType = 'article_detail' | 'user_profile' | 'circle_detail'
