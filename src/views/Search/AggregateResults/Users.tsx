import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'

import { Card, List, Spinner, UserDigest } from '~/components'

import { analytics, getQuery, toPath } from '~/common/utils'

import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SeachAggregateUsers } from './__generated__/SeachAggregateUsers'

const SEARCH_AGGREGATE_USERS = gql`
  query SeachAggregateUsers($key: String!) {
    search(input: { key: $key, type: User, first: 3 }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestMiniUser
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
`

const AggregateUserResults = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading } = useQuery<SeachAggregateUsers>(
    SEARCH_AGGREGATE_USERS,
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
            node.__typename === 'User' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['xtight', 'base']}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search',
                      contentType: 'user',
                      styleType: 'card',
                      location: i,
                    })
                  }
                >
                  <UserDigest.Mini
                    user={node}
                    hasAvatar
                    hasUserName
                    hasDisplayName
                  />
                </Card>
              </List.Item>
            )
        )}
      </List>

      <ViewMoreButton q={q} type="user" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default AggregateUserResults
