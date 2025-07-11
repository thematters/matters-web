import _chunk from 'lodash/chunk'
import { useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  Media,
  QueryError,
  ShuffleButton,
  Slides,
  SpinnerBlock,
  UserDigest,
} from '~/components'

import { useAuthorsRecommendation } from '../../common'
import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const Authors = () => {
  const perColumn = 2
  const { loading, error, edges, shuffle, viewer, lastRandom } =
    useAuthorsRecommendation({
      cacheField: 'feedAuthors',
      publicQuery: true,
    })

  useEffect(() => {
    if (viewer.isAuthed && lastRandom === null) {
      shuffle()
    }
  }, [viewer.isAuthed])

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
