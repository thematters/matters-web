import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useRouter } from 'next/router'

import { Card, List, Spinner, UserDigest } from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
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
      <List hasBorder>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <List.Item key={cursor}>
                <Card
                  bgColor="white"
                  bgActiveColor="green-lighter"
                  spacing={['xtight', 'base']}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || ''
                  })}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.SEARCH_USER,
                      location: i,
                      entrance: q
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
