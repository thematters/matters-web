// external
import React from 'react'
// internal
import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'
// local
import { EventListener } from '../EventListener'

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS & { [key: string]: any }
  }
}

export const AnalyticsListener = ({ viewer }: { viewer: any }) => (
  <EventListener event={ANALYTICS}>
    {evt => {
      // get the information out of the tracked event
      const { type, args } = evt.detail

      // if we have an event of type track or page
      if (type === ANALYTIC_TYPES.TRACK || type === ANALYTIC_TYPES.PAGE) {
        window.analytics[type](...args)
      }

      // if we have an event of type identify
      if (type === ANALYTIC_TYPES.IDENTIFY) {
        // logged in
        if (viewer && viewer.id) {
          const { info, id } = viewer
          window.analytics.identify(id, {
            email: info.email,
            ...args
          })
        } else {
          // visitor
          window.analytics.identify(args)
        }
      }

      return null
    }}
  </EventListener>
)
