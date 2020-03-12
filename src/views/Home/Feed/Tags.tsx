import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestTitle,
  Card,
  Spinner,
  Tag,
  useResponsive
} from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

import {
  TagFeed,
  TagFeed_viewer_recommendation_tags_edges_node
} from './__generated__/TagFeed'

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
              selectArticles: articles(input: { first: 5 }) {
                edges {
                  cursor
                  node {
                    id
                    title
                    ...ArticleDigestTitleArticle
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
  ${ArticleDigestTitle.fragments.article}
`

interface TagDigestProp {
  tag: TagFeed_viewer_recommendation_tags_edges_node
}

const VerticalTagDigest = ({ tag }: TagDigestProp) => (
  <Tag
    tag={tag}
    size="sm"
    type="count-fixed"
    style={{ paddingBottom: '1rem', marginBottom: '1rem' }}
  />
)

const HorizontalTagDigest = ({ tag }: TagDigestProp) => {
  const path = toPath({
    page: 'tagDetail',
    id: tag.id
  })
  return (
    <Card
      {...path}
      spacing={[0, 0]}
      bgColor="white"
      borderColor={'grey-lighter'}
      borderRadius="xtight"
    >
      <Tag
        spacing="xxxtight"
        tag={tag}
        size="lg"
        type="count-fixed"
        count={false}
        style={{
          paddingBottom: 0,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 0,
          height: 56,
          display: 'flex'
        }}
      />
      {(tag?.selectArticles?.edges || []).map(
        ({ node: article, cursor: key }, k) => (
          <div
            style={{
              marginTop: 8,
              marginBottom: 8,
              marginLeft: 15,
              marginRight: 15
            }}
            key={key}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.TAG_DETAIL,
                location: k
              })
            }
          >
            <ArticleDigestTitle
              article={article}
              textSize="sm"
              is="h4"
              textWeight="normal"
            />
          </div>
        )
      )}
    </Card>
  )
}

const Tags = ({ first = 5 }: { first?: number }) => {
  const isLargeUp = useResponsive('lg-up')

  const feedClass = classNames({
    'horizontal-feed': !isLargeUp,
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

  const TagDigest = isLargeUp ? VerticalTagDigest : HorizontalTagDigest

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
            <TagDigest tag={node} />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
