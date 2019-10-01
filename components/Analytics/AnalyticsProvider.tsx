import getConfig from 'next/config'
import Router from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { useEventListener } from '../Hook'

const {
  publicRuntimeConfig: { SEGMENT_KEY }
} = getConfig()

export const AnalyticsProvider: FC = ({ children }) => {
  const [sessionStarted, setSessionStarted] = useState(false)
  useEffect(() => {
    // injects analytics var into global scope
    // ref: https://github.com/segmentio/analytics-react#%EF%B8%8F-step-1-copy-the-snippet

    /* tslint:disable */
    // @ts-ignore
    !(function() {
      var analytics = (window.analytics = window.analytics || [])
      if (!analytics.initialize)
        if (analytics.invoked) {
          window.console &&
            console.error &&
            console.error('Segment snippet included twice.')
        } else {
          analytics.invoked = !0
          analytics.methods = [
            'trackSubmit',
            'trackClick',
            'trackLink',
            'trackForm',
            'pageview',
            'identify',
            'reset',
            'group',
            'track',
            'ready',
            'alias',
            'debug',
            'page',
            'once',
            'off',
            'on'
          ]
          /* tslint:disable */
          // @ts-ignore
          analytics.factory = function(t) {
            return function() {
              var e = Array.prototype.slice.call(arguments)
              e.unshift(t)
              analytics.push(e)
              return analytics
            }
          }
          for (var t = 0; t < analytics.methods.length; t++) {
            var e = analytics.methods[t]
            analytics[e] = analytics.factory(e)
          }
          /* tslint:disable */
          // @ts-ignore
          analytics.load = function(t, e) {
            var n = document.createElement('script')
            n.type = 'text/javascript'
            n.async = !0
            n.src =
              'https://cdn.segment.com/analytics.js/v1/' +
              t +
              '/analytics.min.js'
            var a = document.getElementsByTagName('script')[0]
            /* tslint:disable */
            // @ts-ignore
            a.parentNode.insertBefore(n, a)
            analytics._loadOptions = e
          }
          analytics.SNIPPET_VERSION = '4.1.0'
          analytics.load(SEGMENT_KEY || '3gE20MjzN9qncFqlKV0pDvNO7Cp2gWU3')
        }
    })()
  })

  useEffect(() => {
    // initial
    if (!sessionStarted) {
      analytics.identifyUser()
      analytics.trackPage({ path: window.location.pathname })
      setSessionStarted(true)
    }
    Router.onRouteChangeComplete = (path: string) => {
      analytics.trackPage({ path })
    }
  })

  useEventListener('beforeunload', () => {
    analytics.trackEvent(ANALYTICS_EVENTS.SESSION_END)
  })

  return <>{children}</>
}
