import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  IconAdd20,
  IconHandle24,
  List,
  TextIcon,
  useRoute,
  ViewerContext,
} from '~/components'
import DropdownActions from '~/components/CollectionDigest/DropdownActions'
import { CollectionDetailFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface CollectionArticlesProps {
  collection: CollectionDetailFragment
}

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const { id, articles, updatedAt } = collection
  const articleEdges = articles.edges

  return (
    <>
      <section className={styles.midMenu}>
        <section className={styles.updatedDate}>
          <FormattedMessage
            defaultMessage="Updated {date}"
            description="src/views/User/CollectionDetail/Content.tsx"
            values={{
              date: <DateTime date={updatedAt} color="grey" size="sm" />,
            }}
          />
        </section>

        <section>
          {isViewer && <DropdownActions collection={collection} />}
        </section>
      </section>
      {isViewer && (
        <section className={styles.addArticles}>
          <TextIcon icon={<IconAdd20 size="mdS" />}>
            <FormattedMessage defaultMessage="Add Articles" />
          </TextIcon>
        </section>
      )}
      <section className={styles.feed}>
        <List responsiveWrapper>
          {articleEdges &&
            articleEdges.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
                {isViewer && (
                  <section className={styles.sortable}>
                    <div>
                      <IconHandle24 />
                    </div>
                    <ArticleDigestFeed
                      article={node}
                      hasHeader={false}
                      hasEdit={true}
                      hasCircle={false}
                      hasRemoveCollection={true}
                      hasSetTopCollection={true}
                      hasSetBottomCollection={true}
                      collectionId={id}
                      collectionArticleCount={articles.totalCount}
                      onClick={() =>
                        analytics.trackEvent('click_feed', {
                          type: 'collection_article',
                          contentType: 'article',
                          location: i,
                          id: node.id,
                        })
                      }
                    />
                  </section>
                )}
                {!isViewer && (
                  <ArticleDigestFeed
                    article={node}
                    hasHeader={false}
                    hasEdit={true}
                    hasCircle={false}
                    hasSetTopCollection={true}
                    hasSetBottomCollection={true}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'collection_article',
                        contentType: 'article',
                        location: i,
                        id: node.id,
                      })
                    }
                  />
                )}
              </List.Item>
            ))}
        </List>
      </section>
    </>
  )
}

export default CollectionArticles
