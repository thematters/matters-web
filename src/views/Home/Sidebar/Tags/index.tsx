import { analytics } from '~/common/utils'
import { ArticleTag, List, QueryError } from '~/components'

import { useTagsRecommendation } from '../../common'
import SectionHeader from '../../SectionHeader'
import { TagsPlaceholder } from './Placeholders'
import styles from './styles.module.css'

const Tags = () => {
  const { loading, error, edges } = useTagsRecommendation({
    cacheField: 'sidebarTags',
    publicQuery: false,
  })

  if (error) {
    return <QueryError error={error} />
  }

  if (!loading && (!edges || edges.length <= 0)) {
    return null
  }

  return (
    <section className={styles.container}>
      <SectionHeader type="tags" viewAll={true} />

      {loading && <TagsPlaceholder />}

      {!loading && (
        <List hasBorder={false} className={styles.list}>
          {edges &&
            edges.map(({ node }, i) => (
              <List.Item key={node.id}>
                <ArticleTag
                  tag={node}
                  canClamp
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'tags',
                      contentType: 'tag',
                      location: i,
                      id: node.id,
                    })
                  }
                />
              </List.Item>
            ))}
        </List>
      )}
    </section>
  )
}

export default Tags
