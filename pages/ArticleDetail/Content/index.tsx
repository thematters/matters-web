import gql from 'graphql-tag'
import { useEffect } from 'react'
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
  // enter and leave article for analytics
  useEffect(() => {
    analytics.trackEvent(ANALYTICS_EVENTS.ENTER_ARTICLE, {
      entrance: article.id
    })

    return () =>
      analytics.trackEvent(ANALYTICS_EVENTS.LEAVE_ARTICLE, {
        entrance: article.id
      })
  }, [])

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
          <FireOnMount fn={() => read({ variables: { id: article.id } })} />
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Waypoint
            onEnter={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.FINISH_ARTICLE, {
                entrance: article.id
              })
            }
          />
          <style jsx>{styles}</style>
        </>
      )}
    </Mutation>
  )
}

Content.fragments = fragments

export default Content
