import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useEffect, useRef } from 'react'

import { ANALYTICS, ANALYTIC_TYPES } from '~/common/enums'
import { deferTry, initializeFirebase } from '~/common/utils'

import { useEventListener } from '../Hook'

import { AnalyticsUser } from './__generated__/AnalyticsUser'

declare global {
  interface Window {
    gtag: any
  }
}

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const analyticsDebugger = (event: string, params: any) => {
  if (!isProd) {
    console.log(
      `%c[Analytics debugger]%c ${event} %cVariables`,
      'background: #800080; color: #fff',
      '',
      'color: #fff68f',
      params
    )
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
  let id
  if (user && 'id' in user) {
    id = user.id
  }

  // get the information out of the tracked event
  const { type, args } = detail

  // if we have an event of type track or page
  if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
    // GA & firebase tracking
    if (type === ANALYTIC_TYPES.PAGE) {
      // const path = window.location.pathname
      const referrer = _get(args[1], 'page_referrer')

      /* window.gtag('config', GA_TRACKING_ID, {
        page_location: path,
        page_referrer: referrer,
      }) */

      const eventData = {
        page_referrer: referrer,
        user_id: id,
      }
      analytics?.logEvent('page_view', eventData)
      analyticsDebugger('page_view', eventData)
    } else {
      const eventData = {
        user_id: id,
        ...args[1],
      }
      analytics?.logEvent(args[0], eventData)
      analyticsDebugger(args[0], eventData)
    }
  }

  // if we have an event of type identify
  if (type === ANALYTIC_TYPES.IDENTIFY) {
    // logged in
    if (id) {
      /* window.gtag('config', GA_TRACKING_ID, {
        user_id: id,
      }) */

      analytics?.setUserId(id, { global: true })
      analyticsDebugger(ANALYTIC_TYPES.IDENTIFY, {
        id,
      })
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

export * from './CardExposureTracker'
export * from './PageViewTracker'
export * from './TagExposureTracker'
