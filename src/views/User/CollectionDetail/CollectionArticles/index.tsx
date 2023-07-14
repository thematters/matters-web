import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { arrayMove, List as DnDList } from 'react-movable'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  IconAdd20,
  IconArrowDown20,
  IconArrowUp20,
  IconHandle24,
  List,
  TextIcon,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import DropdownActions from '~/components/CollectionDigest/DropdownActions'
import updateUserCollectionDetail from '~/components/GQL/updates/userCollectionDetail'
import EndOfResults from '~/components/Interaction/InfiniteScroll/EndOfResults'
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

type DirectionType = 'up' | 'down'

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const [update] = useMutation<ReorderCollectionArticlesMutation>(
    REORDER_COLLECTION_ARTICLES
  )

  const [type, setType] = useState<Type>('reorder')
  const [direction, setDirection] = useState<DirectionType>('down')
  const isDirectionDown = direction === 'down'
  const isDirectionUp = direction === 'up'

  const { id, articles, updatedAt } = collection
  let articleEdges = articles.edges
  const [items, setItems] = useState(articleEdges)

  useEffect(() => {
    if (type !== 'reorder') {
      setItems(articleEdges)
    }
  }, [articleEdges])

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
            <DropdownActions collection={collection} />
          </section>
        </section>
        <section className={styles.addArticles}>
          <TextIcon icon={<IconAdd20 size="mdS" />}>
            <FormattedMessage defaultMessage="Add Articles" />
          </TextIcon>
        </section>
        <section className={styles.feed}>
          {items && (
            <DnDList
              values={items}
              lockVertically
              onChange={async ({ oldIndex, newIndex }) => {
                const collectionId = collection.id
                const articleId = items[oldIndex].node.id
                setType('reorder')
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
                <section {...props}>{children}</section>
              )}
              renderItem={({ value: { node, cursor }, index, props }) => (
                <section {...props} key={cursor} style={{ ...props.style }}>
                  <section
                    // The style module doesn't work when dragging.
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <button data-movable-handle className={styles.handle}>
                      <IconHandle24 size="md" />
                    </button>
                    <section
                      style={{
                        flexGrow: 1,
                        borderBottom: '1px dashed var(--color-line-grey-light)',
                      }}
                    >
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
                  </section>
                </section>
              )}
            ></DnDList>
          )}
          <EndOfResults message={true} />
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

        <button
          onClick={() => {
            if (isDirectionDown) {
              setDirection('up')
            } else if (isDirectionUp) {
              setDirection('down')
            }
            articleEdges = articleEdges?.reverse()
          }}
          className={styles.sortButton}
        >
          {isDirectionDown && (
            <TextIcon icon={<IconArrowDown20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" />
            </TextIcon>
          )}
          {isDirectionUp && (
            <TextIcon icon={<IconArrowUp20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" />
            </TextIcon>
          )}
        </button>
      </section>
      <section>
        <List responsiveWrapper>
          {articleEdges &&
            articleEdges.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
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
              </List.Item>
            ))}
          <EndOfResults message={true} />
        </List>
      </section>
    </>
  )
}

export default CollectionArticles
