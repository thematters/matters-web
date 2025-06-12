import { useQuery } from '@apollo/client'
import _chunk from 'lodash/chunk'
import { useContext, useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  Media,
  QueryError,
  ShuffleButton,
  Slides,
  SpinnerBlock,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { FeedAuthorsPublicQuery, LastFetchRandomQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import { FEED_AUTHORS_PUBLIC } from './gql'
import styles from './styles.module.css'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.feedAuthors

  /**
   * Data Fetching
   */
  const perPage = 6
  const perColumn = 3
  const randomMaxSize = 50
  const { data, loading, error } = usePublicQuery<FeedAuthorsPublicQuery>(
    FEED_AUTHORS_PUBLIC,
    {
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

    if (lastFetchRandom) {
      client.cache.modify({
        id: client.cache.identify(lastFetchRandom.lastFetchRandom),
        fields: { feedAuthors: () => random },
      })
    }
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

  const SlidesHeader = (
    <>
      <Media lessThan="md">
        <SectionHeader
          type="authors"
          rightButton={<ShuffleButton onClick={shuffle} />}
          viewAll={false}
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <SectionHeader
          type="authors"
          rightButton={<ShuffleButton onClick={shuffle} />}
          viewAll={true}
        />
      </Media>
    </>
  )

  return (
    <section className={styles.authors}>
      <Slides header={SlidesHeader}>
        {loading && (
          <Slides.Item size="md">
            <SpinnerBlock />
          </Slides.Item>
        )}

        {!loading &&
          _chunk(edges, perColumn).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node }, nodeIndex) => (
                  <UserDigest.Rich
                    is="link"
                    key={node.id}
                    user={node}
                    spacing={[16, 0]}
                    bgColor="none"
                    hasFollow={false}
                    hasState={false}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'authors',
                        contentType: 'user',
                        location: (edgeIndex + 1) * (nodeIndex + 1) - 1,
                        id: node.id,
                      })
                    }
                  />
                ))}
              </section>
            </Slides.Item>
          ))}
      </Slides>
    </section>
  )
}

export default Authors
