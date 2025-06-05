import { analytics } from '~/common/utils'
import { List, QueryError, ShuffleButton, UserDigest } from '~/components'

import { useAuthorsRecommendation } from '../../common'
import SectionHeader from '../../SectionHeader'
import { AuthorsPlaceholder } from './placeholder'
import styles from './styles.module.css'

const Authors = () => {
  const { loading, error, edges, shuffle } = useAuthorsRecommendation({
    cacheField: 'sidebarAuthors',
    publicQuery: false,
  })

  if (error) {
    return <QueryError error={error} />
  }

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
        <AuthorsPlaceholder />
      ) : (
        <List hasBorder={false}>
          {edges &&
            edges.map(({ node }, i) => (
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
