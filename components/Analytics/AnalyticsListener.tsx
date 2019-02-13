// external imports
// local imports
import { EventListener } from 'client/components'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { DS_ANALYTICS, Types } from './enums'

export const AnalyticsListener = ({ root }) => (
  <EventListener event={DS_ANALYTICS}>
    {evt => {
      // get relevant props
      const { instance, viewer } = root
      // if the instance allows analytics
      if (instance.analytics.enabled) {
        // get the information out of the tracked event
        const { type, args } = evt.detail

        // if we have an event of type track or page
        if (type === Types.TRACK || type === Types.PAGE) {
          window.analytics[type](...args)
        }

        // if we have an event of type identify
        if (type === Types.IDENTIFY && viewer) {
          const { email } = viewer
          const { name: customer } = instance
          const id = `${email}:${customer}`
          window.analytics.identify(id, {
            email,
            customer
          })
        }
      }
    }}
  </EventListener>
)

export default createFragmentContainer(
  AnalyticsListener,
  graphql`
    fragment AnalyticsListener_root on Query {
      viewer {
        email
      }
      instance {
        name
        analytics: feature(name: "ANALYTICS") {
          enabled
        }
      }
    }
  `
)
