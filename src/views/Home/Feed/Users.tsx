import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import { List, Spinner, UserDigest, useResponsive } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

import { UserFeed } from './__generated__/UserFeed'

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

const Users = ({ first = 5 }: { first?: number }) => {
  const isMediumUp = useResponsive('md-up')
  const feedClass = classNames({
    'horizontal-feed': !isMediumUp,
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

  return (
    <section className={feedClass}>
      <FeedHeader type="users" />

      {loading && <Spinner />}

      {!loading &&
        (isMediumUp ? (
          <List>
            {edges.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
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
              </List.Item>
            ))}
          </List>
        ) : (
          <ul>
            {(() => {
              const block = []

              // columns of 3
              for (let i = 0; i < edges.length; i += 3) {
                block.push(edges.slice(i, i + 3))
              }

              return block.map((list, k) => (
                <li key={k}>
                  {list.map(({ node, cursor }, i) => (
                    <div key={cursor} style={{ width: '85vw' }}>
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
              ))
            })()}
          </ul>
        ))}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Users
