import { useContext } from 'react'

import { analytics } from '~/common/utils'
import { ArticleTag, QueryError, ViewerContext } from '~/components'

import { useTagsRecommendation } from '../../common'
import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)

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
      <SectionHeader type="tags" viewAll={false} />
      <section className={styles.tagSection}>
        {edges.map(({ node }, nodeIndex) => (
          <ArticleTag
            key={node.id}
            tag={node}
            canClamp={true}
            onClick={() =>
              analytics.trackEvent('click_feed', {
                type: 'tags',
                contentType: 'tag',
                location: nodeIndex,
                id: node.id,
              })
            }
          />
        ))}
      </section>
    </section>
  )
}

export default TagsFeed
