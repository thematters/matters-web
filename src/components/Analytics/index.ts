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

export const deferTry = (fn: () => any, timesLeft = 10, defer = 2000) => {
  if (timesLeft > 0) {
    try {
      fn()
    } catch (err) {
      console.log(err)
      setTimeout(() => deferTry(fn, timesLeft - 1, defer), defer)
    }
  }
  return
}

const handleAnalytics = ({
  detail,
  user,
}: {
  detail: CustomEvent['detail']
  user: AnalyticsUser | {}
}) => {
  // get the information out of the tracked event
  const { type, args } = detail

  // if we have an event of type track or page
  if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
    window.analytics[type](...args)
    // GA tracking
    if (type === ANALYTIC_TYPES.PAGE) {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: args.url,
      })
    }
  }

  // if we have an event of type identify
  if (type === ANALYTIC_TYPES.IDENTIFY) {
    // logged in
    if (user && 'id' in user && 'info' in user) {
      const { info, id, userName } = user as AnalyticsUser
      window.analytics.identify(
        id,
        {
          email: info.email,
          username: userName,
        },
        ...args
      )
      window.gtag('config', GA_TRACKING_ID, {
        user_id: id,
      })
    } else {
      // visitor
      window.analytics.identify(args)
    }
  }
}

export const AnalyticsListener = ({ user }: { user: AnalyticsUser | {} }) => {
  useEventListener(ANALYTICS, (detail: CustomEvent['detail']) => {
    deferTry(() => handleAnalytics({ detail, user }))
  })
  return null
}

AnalyticsListener.fragments = {
  user: gql`
    fragment AnalyticsUser on User {
      id
      userName
      info {
        email
      }
    }
  `,
}
