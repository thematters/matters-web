import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import { Spinner, Tag, useResponsive } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

import { TagFeed } from './__generated__/TagFeed'

const TAG_QUERY = gql`
  query TagFeed($first: Int) {
    viewer {
      id
      recommendation {
        tags(input: { first: $first }) {
          edges {
            cursor
            node {
              id
              selectArticles: articles(input: { first: 5, selected: true }) {
                edges {
                  cursor
                  node {
                    id
                    title
                  }
                }
              }
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const Tags = ({ first = 5 }: { first: number }) => {
  const isMediumUp = useResponsive('md-up')

  const feedClass = classNames({
    'horizontal-feed': !isMediumUp,
    'tag-feed': true
  })

  const { data, loading, error } = useQuery<TagFeed>(TAG_QUERY, {
    variables: {
      first
    }
  })
  const edges = data?.viewer?.recommendation.tags.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className={feedClass}>
      <FeedHeader type="tags" />

      {loading && <Spinner />}

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li
            key={cursor}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.TAGS,
                location: i
              })
            }
          >
            <Tag tag={node} size="sm" type="count-fixed" />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
