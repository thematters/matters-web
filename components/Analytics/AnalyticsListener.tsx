// external
import gql from 'graphql-tag'
// internal
import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'
// local
import { useEventListener } from '../Hook'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
  }
}

export const AnalyticsListener = ({ user }: { user: any }) => {
  useEventListener(ANALYTICS, (evt: CustomEvent) => {
    console.log('heard')
    if (evt.detail) {
      // get the information out of the tracked event
      const { type, args } = evt.detail

      // if we have an event of type track or page
      if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
        window.analytics[type](...args)
      }

      // if we have an event of type identify
      if (type === ANALYTIC_TYPES.IDENTIFY) {
        // logged in
        if (user && user.id) {
          const { info, id } = user
          window.analytics.identify(id, {
            email: info.email,
            ...args
          })
        } else {
          // visitor
          window.analytics.identify(args)
        }
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
