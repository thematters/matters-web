// external
import gql from 'graphql-tag'
// internal
import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'
// local
import { useEventListener } from '../Hook'
import { AnalyticsUser } from './__generated__/AnalyticsUser'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
  }
}

export const AnalyticsListener = ({ user }: { user: AnalyticsUser | {} }) => {
  useEventListener(ANALYTICS, (detail: CustomEvent['detail']) => {
    // get the information out of the tracked event
    const { type, args } = detail

    // if we have an event of type track or page
    if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
      window.analytics[type](args)
    }

    // if we have an event of type identify
    if (type === ANALYTIC_TYPES.IDENTIFY) {
      // logged in
      if ('info' in user) {
        const { info, id } = user as AnalyticsUser
        window.analytics.identify(id, {
          email: info.email,
          ...args
        })
      } else {
        // visitor
        window.analytics.identify(args)
      }
    }
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
