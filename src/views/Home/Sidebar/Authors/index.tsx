import { useQuery } from '@apollo/react-hooks'
import _random from 'lodash/random'
import { useContext } from 'react'

import { analytics } from '~/common/utils'
import {
  List,
  QueryError,
  ShuffleButton,
  SpinnerBlock,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { LastFetchRandomQuery, SidebarAuthorsQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import { SIDEBAR_AUTHORS } from './gql'
import styles from './styles.module.css'

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
  const perPage = 5
  const randomMaxSize = 50
  const { data, loading, error, refetch } = usePublicQuery<SidebarAuthorsQuery>(
    SIDEBAR_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0, first: perPage },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    const size = Math.round(
      (data?.viewer?.recommendation.authors.totalCount || randomMaxSize) /
        perPage
    )
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { sidebarAuthors: random },
    })
  }

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
    <section className={styles.container}>
      <SectionHeader
        type="authors"
        rightButton={<ShuffleButton onClick={shuffle} />}
      />

      {loading && <SpinnerBlock />}

      {!loading && (
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={node.id}>
              <UserDigest.Rich
                user={node}
                spacing={[8, 8]}
                bgColor="none"
                bgActiveColor="greyLighter"
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
    </section>
  )
}

export default Authors
