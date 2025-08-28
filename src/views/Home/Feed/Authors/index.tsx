import _chunk from 'lodash/chunk'
import { useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  Media,
  QueryError,
  ShuffleButton,
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
      <Media lessThan="sm">
        <SectionHeader type="authors" rightButton={<></>} viewAll={false} />
      </Media>
      <Media between={['sm', 'md']}>
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
      {SlidesHeader}
      {loading && <SpinnerBlock />}

      {!loading &&
        _chunk(edges, perColumn).map((chunks, edgeIndex) => (
          <section key={edgeIndex}>
            {chunks.map(({ node }, nodeIndex) => (
              <UserDigest.Rich
                is="link"
                key={node.id}
                user={node}
                spacing={[12, 0]}
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
        ))}
    </section>
  )
}

export default Authors
