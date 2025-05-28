import _chunk from 'lodash/chunk'
import { useContext } from 'react'

import { analytics } from '~/common/utils'
import { QueryError, TagDigest, ViewerContext } from '~/components'

import { useTagsRecommendation } from '../../common/useTagsRecommendation'
import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)
  const perColumn = 2

  const { error, edges } = useTagsRecommendation({
    cacheField: 'feedTags',
    publicQuery: !viewer.isAuthed,
  })

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className={styles.tags}>
      <SectionHeader type="tags" viewAll={true} />
      {_chunk(edges, perColumn).map((chunks, edgeIndex) => (
        <section key={edgeIndex} className={styles.tagSection}>
          {chunks.map(({ node }, nodeIndex) => (
            <TagDigest.Concise
              key={node.id}
              tag={node}
              iconSize={20}
              textSize={16}
              textLineClamp={true}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tags',
                  contentType: 'tag',
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

export default TagsFeed
