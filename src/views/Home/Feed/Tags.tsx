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
        {edges.map(({ node, cursor }, i) => {
          const path = toPath({
            page: 'tagDetail',
            id: node.id
          })
          return (
            <li key={cursor}>
              <Card
                {...path}
                spacing={[0, 0]}
                bgColor="white"
                borderColor={'grey-lighter'}
                borderRadius="xtight"
                style={{ width: '20rem', height: ' 14.5rem' }}
              >
                <Tag
                  spacing="xxxtight"
                  tag={node}
                  size="lg"
                  type="count-fixed"
                  count={false}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.TAGS,
                      location: i
                    })
                  }
                  style={{
                    paddingBottom: 0,
                    paddingLeft: 15,
                    marginBottom: 0,
                    height: 56,
                    display: 'flex'
                  }}
                />
                {(node?.selectArticles?.edges || []).map(
                  ({ node: article, cursor: key }) => (
                    <div
                      style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 15,
                        marginRight: 15
                      }}
                      key={key}
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
            </li>
          )
        })}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
