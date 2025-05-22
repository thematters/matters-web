import {
  Analytics,
  getAnalytics,
  logEvent,
  setUserId,
} from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import _get from 'lodash/get'
import { useEffect, useRef } from 'react'

import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'
import { deferTry } from '~/common/utils'
import { useEventListener } from '~/components'
import { AnalyticsUserFragment } from '~/gql/graphql'

import { fragments } from './gql'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

export type AnalyticsListenerProps = {
  user: AnalyticsUserFragment | {}
}

const FIREBASE_CONFIG = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_CONFIG, 'base64').toString()
    )
  : {}

const analyticsDebugger = (event: string, params: unknown) => {
  if (isLocal) {
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
  user: AnalyticsUserFragment | {}
  analytics?: Analytics | null
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
      const mode = _get(args[1], 'mode')

      /* window.gtag('config', GA_TRACKING_ID, {
        page_location: path,
        page_referrer: referrer,
      }) */

      const eventData = {
        page_referrer: referrer,
        user_id: id,
        mode: mode,
      }
      if (analytics) {
        logEvent(analytics, 'page_view', eventData)
      }
      analyticsDebugger('page_view', eventData)
    } else {
      const eventData = {
        user_id: id,
        ...args[1],
      }
      if (analytics) {
        logEvent(analytics, args[0], eventData)
      }
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

      if (analytics) {
        setUserId(analytics, id, { global: true })
      }

      analyticsDebugger(ANALYTIC_TYPES.IDENTIFY, {
        id,
      })
    }
  }
}

export const AnalyticsListener = ({ user }: AnalyticsListenerProps) => {
  const analyticsRef = useRef<Analytics | null>(null)

  const initAnalytics = async () => {
    const app = initializeApp(FIREBASE_CONFIG)
    const analytics = getAnalytics(app)
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

AnalyticsListener.fragments = fragments
