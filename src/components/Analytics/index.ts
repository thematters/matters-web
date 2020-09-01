import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useEffect, useRef } from 'react'

import { ANALYTIC_TYPES, ANALYTICS, GA_TRACKING_ID } from '~/common/enums'
import { deferTry, initializeFirebase } from '~/common/utils'

import { useEventListener } from '../Hook'

import { AnalyticsUser } from './__generated__/AnalyticsUser'

declare global {
  interface Window {
    gtag: any
  }
}

const handleAnalytics = async ({
  detail,
  user,
  analytics,
}: {
  detail: CustomEvent['detail']
  user: AnalyticsUser | {}
  analytics?: firebase.analytics.Analytics
}) => {
  // get the information out of the tracked event
  const { type, args } = detail

  // if we have an event of type track or page
  if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
    // GA & firebase tracking
    if (type === ANALYTIC_TYPES.PAGE) {
      const path = window.location.pathname
      const referrer = _get(args[1], 'page_referrer')

      window.gtag('config', GA_TRACKING_ID, {
        page_location: path,
        page_referrer: referrer,
      })

      analytics?.logEvent('page_view', {
        page_referrer: referrer,
      })
    } else {
      analytics?.logEvent(args[0], args[1])
    }
  }

  // if we have an event of type identify
  if (type === ANALYTIC_TYPES.IDENTIFY) {
    // logged in
    if (user && 'id' in user && 'info' in user) {
      const { id } = user as AnalyticsUser
      window.gtag('config', GA_TRACKING_ID, {
        user_id: id,
      })
      analytics?.setUserId(id, { global: true })
    } else {
      // visitor
    }
  }
}

export const AnalyticsListener = ({ user }: { user: AnalyticsUser | {} }) => {
  const analyticsRef = useRef<firebase.analytics.Analytics>()

  const initAnalytics = async () => {
    const firebase = await initializeFirebase()
    await import('firebase/analytics')

    const analytics = firebase?.analytics()
    analyticsRef.current = analytics
  }

  useEffect(() => {
    initAnalytics()
  }, [])

  useEventListener(ANALYTICS, (detail: CustomEvent['detail']) => {
    deferTry(() =>
      handleAnalytics({ detail, user, analytics: analyticsRef.current })
    )
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
