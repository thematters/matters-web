import _random from 'lodash/random'

import { analytics } from '~/common/utils'
import {
  List,
  QueryError,
  ShuffleButton,
  SpinnerBlock,
  usePublicQuery,
  UserDigest,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { LastFetchRandomQuery, SidebarAuthorsPublicQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import { SIDEBAR_AUTHORS_PUBLIC } from './gql'
import styles from './styles.module.css'

const Authors = () => {
  const { data: lastFetchRandom, client } =
    usePublicQuery<LastFetchRandomQuery>(FETCH_RECORD, {
      variables: { id: 'local' },
    })
  const lastRandom = lastFetchRandom?.lastFetchRandom.sidebarAuthors

  /**
   * Data Fetching
   */
  const perPage = 6
  const randomMaxSize = 50
  const { data, loading, error } = usePublicQuery<SidebarAuthorsPublicQuery>(
    SIDEBAR_AUTHORS_PUBLIC,
    {
      variables: { random: lastRandom || 0, first: perPage },
    }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    const size = Math.round(
      (data?.viewer?.recommendation.authors.totalCount || randomMaxSize) /
        perPage
    )
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50

    lastFetchRandom &&
      client.cache.modify({
        id: client.cache.identify(lastFetchRandom.lastFetchRandom),
        fields: { sidebarAuthors: () => random },
      })
  }

  /**
   * Render
   */
  if (error) {
    return <QueryError error={error} />
  }

  // hide the author list if we don't get a result from the response
  if (!loading && (!edges || edges.length === 0)) {
    return null
  }

  return (
    <section className={styles.container}>
      <SectionHeader
        type="authors"
        rightButton={<ShuffleButton onClick={shuffle} />}
        viewAll={false}
      />

      {loading ? (
        <SpinnerBlock />
      ) : (
        <List hasBorder={false}>
          {edges &&
            edges.map(({ node, cursor }, i) => (
              <List.Item key={node.id}>
                <UserDigest.Rich
                  user={node}
                  is="link"
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
