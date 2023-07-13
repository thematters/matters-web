import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { arrayMove, List as DnDList } from 'react-movable'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  IconAdd20,
  IconHandle24,
  List,
  TextIcon,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import DropdownActions from '~/components/CollectionDigest/DropdownActions'
import updateUserCollectionDetail from '~/components/GQL/updates/userCollectionDetail'
import {
  CollectionDetailFragment,
  ReorderCollectionArticlesMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

const REORDER_COLLECTION_ARTICLES = gql`
  mutation ReorderCollectionArticles(
    $collectionId: ID!
    $articleId: ID!
    $newPosition: Int!
  ) {
    reorderCollectionArticles(
      input: {
        collection: $collectionId
        moves: { item: $articleId, newPosition: $newPosition }
      }
    ) {
      id
      articles(input: { first: 100 }) {
        edges {
          cursor
          node {
            id
            title
          }
        }
      }
    }
  }
`

interface CollectionArticlesProps {
  collection: CollectionDetailFragment
}

type Type = 'setTop' | 'setBottom' | 'reorder'

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const [update] = useMutation<ReorderCollectionArticlesMutation>(
    REORDER_COLLECTION_ARTICLES
  )

  const [type, setType] = useState<Type>('reorder')

  const { id, articles, updatedAt } = collection
  const articleEdges = articles.edges
  const [items, setItems] = useState(articleEdges)

  useEffect(() => {
    if (type !== 'reorder') {
      setItems(articleEdges)
    }
    console.log('articleEdges change')
  }, [articleEdges])
  console.log({ items, articleEdges })

  if (isViewer) {
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
          {items && (
            <DnDList
              values={items}
              lockVertically
              onChange={async ({ oldIndex, newIndex }) => {
                console.log('onChange')
                const collectionId = collection.id
                const articleId = items[oldIndex].node.id
                setType('reorder')
                // console.log({ items })
                setItems(arrayMove(items, oldIndex, newIndex))
                await update({
                  variables: {
                    collectionId,
                    articleId,
                    newPosition: newIndex,
                  },
                  update(cache) {
                    updateUserCollectionDetail({
                      cache,
                      collectionId,
                      articleId,
                      oldPosition: oldIndex,
                      newPosition: newIndex,
                      type: 'reorder',
                    })
                  },
                })
              }}
              renderList={({ children, props }) => (
                // <List responsiveWrapper {...props}>
                //   {children}
                // </List>
                <section {...props}>{children}</section>
              )}
              renderItem={({
                value: { node, cursor },
                index,
                props,
                // isDragged,
              }) => (
                <section className={styles.sortable} {...props} key={cursor}>
                  <button data-movable-handle className={styles.handle}>
                    <IconHandle24 />
                  </button>
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
                    onSetTopCollection={async () => {
                      setType('setTop')
                    }}
                    onSetBottomCollection={async () => {
                      setType('setBottom')
                    }}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'collection_article',
                        contentType: 'article',
                        location: index as number,
                        id: node.id,
                      })
                    }
                  />
                </section>
              )}
            ></DnDList>
          )}
        </section>
      </>
    )
  }

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
