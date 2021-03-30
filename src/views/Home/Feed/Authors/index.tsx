import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  QueryError,
  ShuffleButton,
  Slides,
  Spinner,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/fetchRecord'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import { FEED_AUTHORS } from './gql'

import { FetchRecord } from '~/components/GQL/queries/__generated__/FetchRecord'
import { FeedAuthors } from './__generated__/FeedAuthors'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  const { data: fetchRecord, client } = useQuery<FetchRecord>(FETCH_RECORD, {
    variables: { id: 'local' },
  })

  /**
   * Data Fetching
   */
  const { data, loading, error, refetch } = usePublicQuery<FeedAuthors>(
    FEED_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: 0 },
    },
    {
      publicQuery: !viewer.isAuthed,
    }
  )

  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    refetch({ random: _random(0, 50) })
  }

  useEffect(() => {
    const fetched = fetchRecord?.fetchRecord.feedAuthors

    if (viewer.isAuthed && !fetched) {
      shuffle()

      client.writeData({
        id: 'FetchRecord:local',
        data: { feedAuthors: true },
      })
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
    <SectionHeader
      type="authors"
      rightButton={<ShuffleButton onClick={shuffle} />}
    />
  )

  return (
    <Slides bgColor="yellow-lighter" header={SlidesHeader}>
      {loading && (
        <Slides.Item size="md">
          <Spinner />
        </Slides.Item>
      )}

      {!loading &&
        _chunk(edges, 3).map((chunks, edgeIndex) => (
          <Slides.Item size="md" key={edgeIndex}>
            <section>
              {chunks.map(({ node, cursor }, nodeIndex) => (
                <UserDigest.Rich
                  key={cursor}
                  user={node}
                  spacing={['tight', 0]}
                  bgColor="none"
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'authors',
                      contentType: 'user',
                      styleType: 'card',
                      location: (edgeIndex + 1) * (nodeIndex + 1) - 1,
                    })
                  }
                />
              ))}
            </section>
          </Slides.Item>
        ))}
    </Slides>
  )
}

export default Authors
