import React, { SFC, useEffect } from 'react'

const segmentKey =
  process.env.NODE_ENV === 'production'
    ? 'Yk2ao5JvhOCyvCh9SCVBT1iTN4kfTpy7'
    : '3gE20MjzN9qncFqlKV0pDvNO7Cp2gWU3'

export const AnalyticsProvider: SFC = ({ children }) => {
  useEffect(() => {
    // injects analytics var into global scope
    // ref: https://github.com/segmentio/analytics-react#%EF%B8%8F-step-1-copy-the-snippet

    /* tslint:disable */
    // @ts-ignore
    !(function() {
      // @ts-ignore
      const analytics = (window.analytics = window.analytics || [])
      if (!analytics.initialize) {
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
          analytics.factory = function(t: any) {
            return function() {
              let e = Array.prototype.slice.call(arguments)
              e.unshift(t)
              analytics.push(e)
              return analytics
            }
          }
          for (let t = 0; t < analytics.methods.length; t++) {
            let e = analytics.methods[t]
            analytics[e] = analytics.factory(e)
          }
          analytics.load = function(t: string, e: any) {
            let n = document.createElement('script')
            n.type = 'text/javascript'
            n.async = !0
            n.src =
              'https://cdn.segment.com/analytics.js/v1/' +
              t +
              '/analytics.min.js'
            let a = document.getElementsByTagName('script')[0]
            // @ts-ignore
            a.parentNode.insertBefore(n, a)
            analytics._loadOptions = e
          }
          analytics.SNIPPET_VERSION = '4.1.0'
          analytics.load(segmentKey)
        }
      }
    })()
  })

  return <>{children}</>
}
