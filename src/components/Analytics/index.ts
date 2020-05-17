import gql from 'graphql-tag'

import { ANALYTIC_TYPES, ANALYTICS, GA_TRACKING_ID } from '~/common/enums'
import { deferTry } from '~/common/utils'

import { useEventListener } from '../Hook'

import { AnalyticsUser } from './__generated__/AnalyticsUser'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
    gtag: any
    firebaseAnalytics: firebase.analytics.Analytics & {
      logEvent: (
        eventName: string,
        eventParams?: {
          [key: string]: any
        },
        options?: firebase.analytics.AnalyticsCallOptions
      ) => void
    }
  }
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
    // GA & firebase tracking
    if (type === ANALYTIC_TYPES.PAGE) {
      const path = window.location.pathname
      window.gtag('config', GA_TRACKING_ID, {
        page_location: path,
      })

      window.firebaseAnalytics.logEvent('page_view')
    } else {
      window.firebaseAnalytics.logEvent(args[0], args[1])
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
