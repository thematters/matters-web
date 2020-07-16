import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { Card, List, Spinner, Tag } from '~/components'

import { analytics, getQuery, toPath } from '~/common/utils'

import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SeachAggregateTags } from './__generated__/SeachAggregateTags'

const SEARCH_AGGREGATE_TAGS = gql`
  query SeachAggregateTags($key: String!) {
    search(input: { key: $key, type: Tag, first: 3 }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const AggregateTagResults = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading } = useQuery<SeachAggregateTags>(
    SEARCH_AGGREGATE_TAGS,
    { variables: { key: q } }
  )

  if (loading) {
    return <Spinner />
  }

  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  return (
    <section className="aggregate-section">
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Tag' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'tag',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <Tag tag={node} type="list" />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="tag" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateTagResults
