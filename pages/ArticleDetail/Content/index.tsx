import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { Mutation } from '~/components/GQL'

import { ANALYTICS_EVENTS } from '~/common/enums'
import styles from '~/common/styles/utils/content.article.css'
import { analytics } from '~/common/utils'

import { ContentArticle } from './__generated__/ContentArticle'

const fragments = {
  article: gql`
    fragment ContentArticle on Article {
      id
      content
    }
  `
}

const Content = ({ article }: { article: ContentArticle }) => {
  const { id } = article

  useEffect(() => {
    // enter and leave article for analytics
    analytics.trackEvent(ANALYTICS_EVENTS.ENTER_ARTICLE, {
      entrance: id
    })

    // send referrer to likebutton
    const likeButtonIframe = document.getElementsByClassName(
      'likebutton'
    )[0] as HTMLFrameElement
    if (likeButtonIframe) {
      likeButtonIframe.addEventListener('load', () => {
        if (likeButtonIframe.contentWindow) {
          likeButtonIframe.contentWindow.postMessage(
            {
              action: 'SET_REFERRER',
              content: { referrer: window.location.href }
            },
            'https://button.like.co'
          )
        }
      })
    }

    return () =>
      analytics.trackEvent(ANALYTICS_EVENTS.LEAVE_ARTICLE, {
        entrance: id
      })
  }, [])

  const [trackedFinish, setTrackedFinish] = useState(false)
  const [trackedRead, setTrackedRead] = useState(false)

  const FireOnMount = ({ fn }: { fn: () => void }) => {
    useEffect(() => {
      fn()
    }, [])
    return null
  }

  return (
    <Mutation
      mutation={gql`
        mutation ReadArticle($id: ID!) {
          readArticle(input: { id: $id }) {
            id
          }
        }
      `}
    >
      {read => (
        <>
          <FireOnMount
            fn={() => {
              if (!trackedRead) {
                read({ variables: { id } })
                setTrackedRead(true)
              }
            }}
          />
          <div
            className="u-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Waypoint
            onEnter={() => {
              if (!trackedFinish) {
                analytics.trackEvent(ANALYTICS_EVENTS.FINISH_ARTICLE, {
                  entrance: id
                })
                setTrackedFinish(true)
              }
            }}
          />
          <style jsx>{styles}</style>
        </>
      )}
    </Mutation>
  )
}

Content.fragments = fragments

export default Content
