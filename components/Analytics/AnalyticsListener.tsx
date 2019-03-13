import gql from 'graphql-tag'

import { ANALYTIC_TYPES, ANALYTICS, GA_TRACKING_ID } from '~/common/enums'

import { useEventListener } from '../Hook'
import { AnalyticsUser } from './__generated__/AnalyticsUser'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
    gtag: any
  }
}

const handleAnalytics = ({
  detail,
  user
}: {
  detail: CustomEvent['detail']
  user: AnalyticsUser | {}
}) => {
  // time out and try again
  if (!window.analytics || !window.gtag) {
    setTimeout(() => handleAnalytics({ detail, user }), 2000)
    return
  }

  // get the information out of the tracked event
  const { type, args } = detail

  // if we have an event of type track or page
  if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
    window.analytics[type](...args)
    // GA tracking
    if (type === ANALYTIC_TYPES.PAGE) {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: args.url
      })
    }
  }

  // if we have an event of type identify
  if (type === ANALYTIC_TYPES.IDENTIFY) {
    // logged in
    if ('id' in user && 'info' in user) {
      const { info, id } = user as AnalyticsUser
      window.analytics.identify(
        id,
        {
          email: info.email
        },
        ...args
      )
      window.gtag('config', GA_TRACKING_ID, {
        user_id: id
      })
      window.analytics.identify(id)
    } else {
      // visitor
      window.analytics.identify(args)
    }
  }
}

export const AnalyticsListener = ({ user }: { user: AnalyticsUser | {} }) => {
  useEventListener(ANALYTICS, (detail: CustomEvent['detail']) => {
    handleAnalytics({ detail, user })
  })

  return null
}

AnalyticsListener.fragments = {
  user: gql`
    fragment AnalyticsUser on User {
      id
      info {
        email
      }
    }
  `
}
