import { useQuery } from '@apollo/react-hooks'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  List,
  QueryError,
  ShuffleButton,
  Spinner,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { LastFetchRandomQuery, SidebarAuthorsQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import { SIDEBAR_AUTHORS } from './gql'
import styles from './styles.css'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.sidebarAuthors

  /**
   * Data Fetching
   */
  const { data, loading, error, refetch } = usePublicQuery<SidebarAuthorsQuery>(
    SIDEBAR_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0 },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    const random = _random(0, 49)
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { sidebarAuthors: random },
    })
  }

  useEffect(() => {
    if (viewer.isAuthed && lastRandom === null) {
      shuffle()
    }
  }, [viewer.isAuthed])

  /**
   * Render
   */
  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className="container">
      <SectionHeader
        type="authors"
        rightButton={<ShuffleButton onClick={shuffle} />}
      />

      {loading && <Spinner />}

      {!loading && (
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                spacing={['xtight', 'xtight']}
                bgColor="none"
                bgActiveColor="grey-lighter"
                borderRadius="xtight"
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'authors',
                    contentType: 'user',
                    location: i,
                    id: node.id,
                  })
                }
                hasFollow={false}
                hasState={false}
              />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Authors
