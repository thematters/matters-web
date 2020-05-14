import gql from 'graphql-tag'
import throttle from 'lodash/throttle'
import { useEffect, useRef, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { useMutation } from '~/components/GQL'

import { ANALYTICS_EVENTS } from '~/common/enums'
import styles from '~/common/styles/utils/content.article.css'
import { analytics, captureClicks, initAudioPlayers } from '~/common/utils'

import { ContentArticle } from './__generated__/ContentArticle'
import { ReadArticle } from './__generated__/ReadArticle'

const READ_ARTICLE = gql`
  mutation ReadArticle($id: ID!) {
    readArticle(input: { id: $id }) {
      id
    }
  }
`

const fragments = {
  article: gql`
    fragment ContentArticle on Article {
      id
      content
    }
  `,
}

const Content = ({ article }: { article: ContentArticle }) => {
  const [read] = useMutation<ReadArticle>(READ_ARTICLE)

  const [trackedFinish, setTrackedFinish] = useState(false)
  const contentContainer = useRef(null)

  // idle timer
  const [lastScroll, setScrollTime] = useState(0)

  const { id } = article

  // called only once
  useEffect(() => {
    initAudioPlayers()

    const handleScroll = throttle(() => setScrollTime(Date.now() / 1000), 3000)
    window.addEventListener('scroll', handleScroll)
    // enter and leave article for analytics
    analytics.trackEvent(ANALYTICS_EVENTS.ENTER_ARTICLE, {
      entrance: id,
    })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      analytics.trackEvent(ANALYTICS_EVENTS.LEAVE_ARTICLE, { entrance: id })
    }
  }, [])

  // register read
  useEffect(() => {
    const timerId = setInterval(
      (function heartbeat() {
        const isReading = () => {
          // tab hidden
          if (document.hidden) {
            return false
          }

          // idle for more than 5 minutes
          if (Date.now() / 1000 - lastScroll > 60 * 5) {
            return false
          }

          if (!contentContainer || !contentContainer.current) {
            return false
          }

          // TODO: if modal shown

          // if bottom is above center
          const {
            bottom,
          } = ((contentContainer.current as unknown) as Element).getBoundingClientRect()

          const isBottomAboveCenter = bottom <= window.innerHeight / 2

          return !isBottomAboveCenter
        }

        if (isReading()) {
          read({ variables: { id } })
        }

        return heartbeat
      })(),
      5000
    )

    // clean timer
    return () => {
      clearInterval(timerId)
    }
  }, [lastScroll])

  return (
    <>
      <div
        className="u-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
        onClick={captureClicks}
        ref={contentContainer}
      />

      <Waypoint
        onEnter={() => {
          if (!trackedFinish) {
            analytics.trackEvent(ANALYTICS_EVENTS.FINISH_ARTICLE, {
              entrance: id,
            })
            setTrackedFinish(true)
          }
        }}
        onPositionChange={({ currentPosition: to, previousPosition: from }) => {
          analytics.trackEvent(ANALYTICS_EVENTS.ARTICLE_BOTTOM_CROSS, {
            from,
            to,
          })
        }}
      />

      <style jsx>{styles}</style>
    </>
  )
}

Content.fragments = fragments

export default Content
