import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import { Spinner, UserDigest, useResponsive } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

import {
  UserFeed,
  UserFeed_viewer_recommendation_authors_edges
} from './__generated__/UserFeed'

const USER_QUERY = gql`
  query UserFeed($first: Int) {
    viewer {
      id
      recommendation {
        authors(
          input: { first: $first, filter: { random: true, followed: false } }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

interface UsersProps {
  users: UserFeed_viewer_recommendation_authors_edges[]
}
// horizontal style in blocks
const HorizontalUsers = ({ users }: UsersProps) => {
  const block = []

  // columns of 3
  for (let i = 0; i < users.length; i += 3) {
    block.push(users.slice(i, i + 3))
  }

  return (
    <ul>
      {block.map((list, k) => (
        <li key={k}>
          {list.map(({ node, cursor }, i) => (
            <div key={cursor} className="user-row">
              <UserDigest.Rich
                user={node}
                hasFollow
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: FEED_TYPE.AUTHORS,
                    location: k * 3 + i
                  })
                }
              />
            </div>
          ))}
        </li>
      ))}
    </ul>
  )
}

// veritical style in list
const VeriticalUsers = ({ users }: UsersProps) => (
  <ul>
    {users.map(({ node, cursor }, i) => (
      <li key={cursor}>
        <UserDigest.Rich
          user={node}
          hasFollow
          onClick={() =>
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
              type: FEED_TYPE.AUTHORS,
              location: i
            })
          }
        />
      </li>
    ))}
  </ul>
)

const Users = ({ first = 5 }: { first?: number }) => {
  const isLargeUp = useResponsive('lg-up')
  const feedClass = classNames({
    'horizontal-feed': !isLargeUp,
    'user-feed': true
  })
  const { data, loading, error } = useQuery<UserFeed>(USER_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      first
    }
  })
  const edges = data?.viewer?.recommendation.authors.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const UsersBlock = isLargeUp ? VeriticalUsers : HorizontalUsers

  return (
    <section className={feedClass}>
      <FeedHeader type="users" />

      {loading && <Spinner />}

      {!loading && <UsersBlock users={edges} />}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Users
