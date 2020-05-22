import {
  ANALYTIC_TYPES,
  ANALYTICS,
  ClickButtonProp,
  ClickFeedProp,
  LoadMoreProp,
  PurchaseProp,
  ShareProp,
} from '~/common/enums'
// | 'click-feed'
// | 'click-button'
// | 'load-more'
// | 'share'
// | 'purchase'
type EventArgs =
  | ['click_feed', ClickFeedProp]
  | ['click_button', ClickButtonProp]
  | ['load_more', LoadMoreProp]
  | ['share', ShareProp]
  | ['purchase', PurchaseProp]
  | [] // identify user
  | ['page_view'] // pageview

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
