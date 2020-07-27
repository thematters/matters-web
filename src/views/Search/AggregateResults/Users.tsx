import { useRouter } from 'next/router'

import {
  Card,
  List,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
  UserDigest,
} from '~/components'

import { analytics, getQuery, toPath } from '~/common/utils'

import { SEARCH_AGGREGATE_USERS_PUBLIC } from './gql'
import styles from './styles.css'
import ViewMoreButton from './ViewMoreButton'

import { SeachAggregateUsersPublic } from './__generated__/SeachAggregateUsersPublic'

const AggregateUserResults = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, refetch } = usePublicQuery<SeachAggregateUsersPublic>(
    SEARCH_AGGREGATE_USERS_PUBLIC,
    { variables: { key: q } }
  )

  const { edges, pageInfo } = data?.search || {}

  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

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
