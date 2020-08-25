import _chunk from 'lodash/chunk'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  ShuffleButton,
  Slides,
  Spinner,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import { FEED_AUTHORS } from './gql'

import { FeedAuthors } from './__generated__/FeedAuthors'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  const { data, loading, error, refetch } = usePublicQuery<FeedAuthors>(
    FEED_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        random: 0,
      },
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
    if (viewer.isAuthed) {
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
