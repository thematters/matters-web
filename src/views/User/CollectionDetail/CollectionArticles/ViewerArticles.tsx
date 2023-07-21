import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { arrayMove, List as DnDList } from 'react-movable'

import { analytics } from '~/common/utils'
import {
  AddArticlesCollectionDialog,
  ArticleDigestFeed,
  DateTime,
  IconAdd20,
  IconHandle24,
  TextIcon,
  Tooltip,
  useMutation,
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

interface ViewerArticlesProps {
  collection: CollectionDetailFragment
}

const ViewerArticles = ({ collection }: ViewerArticlesProps) => {
  const [update] = useMutation<ReorderCollectionArticlesMutation>(
    REORDER_COLLECTION_ARTICLES
  )

  const [hasReset, setHasReset] = useState(false)

  const { id, articles, updatedAt } = collection
  let articleEdges = articles.edges
  const [items, setItems] = useState(articleEdges)

  useEffect(() => {
    if (hasReset) {
      setItems(articleEdges)
    }
  }, [articleEdges])

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
      {collection.articles.totalCount >= 100 && (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Collections allow up to 100 articles currently"
              description="src/views/User/CollectionDetail/CollectionArticles/ViewerArticles.tsx"
            />
          }
          placement="top"
        >
          <section className={styles.disableAddArticles}>
            <TextIcon icon={<IconAdd20 size="mdS" />}>
              <FormattedMessage defaultMessage="Add Articles" />
            </TextIcon>
          </section>
        </Tooltip>
      )}
      {collection.articles.totalCount < 100 && (
        <AddArticlesCollectionDialog
          collection={collection}
          onUpdate={() => setHasReset(true)}
        >
          {({ openDialog: openAddArticlesCollection }) => (
            <section
              className={styles.addArticles}
              onClick={openAddArticlesCollection}
            >
              <TextIcon icon={<IconAdd20 size="mdS" />}>
                <FormattedMessage defaultMessage="Add Articles" />
              </TextIcon>
            </section>
          )}
        </AddArticlesCollectionDialog>
      )}
      <section className={styles.feed}>
        {items && items.length === 1 && (
          <section className={styles.digestFeed}>
            <ArticleDigestFeed
              article={items[0].node}
              hasHeader={false}
              hasEdit={true}
              hasCircle={false}
              hasRemoveCollection={true}
              collectionId={id}
              collectionArticleCount={articles.totalCount}
              onRemoveCollection={() => setHasReset(true)}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'collection_article',
                  contentType: 'article',
                  location: 0,
                  id: items[0].node.id,
                })
              }
            />
          </section>
        )}
        {items && items.length > 1 && (
          <DnDList
            values={items}
            lockVertically
            onChange={async ({ oldIndex, newIndex }) => {
              const collectionId = collection.id
              const articleId = items[oldIndex].node.id
              setHasReset(false)
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
              <section
                {...props}
                key={cursor + node.id}
                style={{ ...props.style }}
              >
                <section className={styles.dragContainer}>
                  <button data-movable-handle className={styles.handle}>
                    <IconHandle24 size="md" color="greyDark" />
                  </button>
                  <section className={styles.digestFeed}>
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
                      onSetTopCollection={() => setHasReset(true)}
                      onSetBottomCollection={() => setHasReset(true)}
                      onRemoveCollection={() => setHasReset(true)}
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

export default ViewerArticles
