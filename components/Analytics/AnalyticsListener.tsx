import gql from 'graphql-tag'
import getConfig from 'next/config'

import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'

import { useEventListener } from '../Hook'
import { AnalyticsUser } from './__generated__/AnalyticsUser'

let GA_TRACKING_ID = ''
if (process.env.NODE_ENV !== 'test') {
  const { publicRuntimeConfig } = getConfig()
  GA_TRACKING_ID = publicRuntimeConfig.GA_TRACKING_ID
}

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
    gtag: any
  }
}

export const AnalyticsListener = ({ user }: { user: AnalyticsUser | {} }) => {
  useEventListener(ANALYTICS, (detail: CustomEvent['detail']) => {
    // get the information out of the tracked event
    const { type, args } = detail

    // if we have an event of type track or page
    if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
      window.analytics[type](args)
      // GA tracking
      window.gtag('config', GA_TRACKING_ID, {
        page_location: args.url
      })
    }

    // if we have an event of type identify
    if (type === ANALYTIC_TYPES.IDENTIFY) {
      // logged in
      if ('id' in user && 'info' in user) {
        const { info, id } = user as AnalyticsUser
        window.analytics.identify(id, {
          email: info.email,
          ...args
        })
        window.gtag('config', GA_TRACKING_ID, {
          user_id: id
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
