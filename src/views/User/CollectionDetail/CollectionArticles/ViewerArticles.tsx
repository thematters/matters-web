import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { arrayMove, List as DnDList } from 'react-movable'

import { ReactComponent as IconDrag } from '@/public/static/icons/24px/drag.svg'
import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'
import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  AddArticlesCollectionDialog,
  ArticleDigestFeed,
  DateTime,
  Icon,
  TextIcon,
  Tooltip,
  useMutation,
} from '~/components'
import DropdownActions from '~/components/CollectionDigest/DropdownActions'
import EndOfResults from '~/components/Interaction/InfiniteScroll/EndOfResults'
import {
  ArticleState,
  CollectionArticlesCollectionFragment,
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
    }
  }
`

interface ViewerArticlesProps {
  collection: CollectionArticlesCollectionFragment
}

const ViewerArticles = ({ collection }: ViewerArticlesProps) => {
  const [reorder] = useMutation<ReorderCollectionArticlesMutation>(
    REORDER_COLLECTION_ARTICLES
  )

  const { id, articleList: articles, updatedAt } = collection

  // filter out inactive articles for local updating
  // at ArchiveArticle/Dialog.tsx
  let articleEdges = articles.edges?.filter(
    ({ node }) => node.articleState === ArticleState.Active
  )
  const [items, setItems] = useState(articleEdges)

  useEffect(() => {
    setItems(articleEdges)
  }, [articles.edges?.map(({ node }) => node.id).join(',')])

  return (
    <>
      <section className={styles.midMenu}>
        <div className={styles.updatedDate}>
          <section>
            <FormattedMessage
              defaultMessage="{articleCount} articles"
              id="RnKPVm"
              values={{
                articleCount: articles.totalCount,
              }}
            />
          </section>
          <TextIcon
            icon={<Icon icon={IconDot} color="grey" size={14} />}
            placement="right"
            spacing={4}
          >
            <section>
              <FormattedMessage
                defaultMessage="Updated {date}"
                id="h+punE"
                description="src/views/User/CollectionDetail/Content.tsx"
                values={{
                  date: <DateTime date={updatedAt} color="grey" size="sm" />,
                }}
              />
            </section>
          </TextIcon>
        </div>

        <section>
          <DropdownActions collection={collection} />
        </section>
      </section>

      {collection.articles.totalCount >= MAX_COLLECTION_ARTICLES_COUNT && (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Collections allow up to {count} articles currently"
              id="LETb4b"
              description="src/views/User/CollectionDetail/CollectionArticles/ViewerArticles.tsx"
              values={{
                count: MAX_COLLECTION_ARTICLES_COUNT,
              }}
            />
          }
          placement="top"
        >
          <section className={styles.disableAddArticles}>
            <TextIcon icon={<Icon icon={IconPlus} size={20} />}>
              <FormattedMessage defaultMessage="Add Articles" id="k97/u7" />
            </TextIcon>
          </section>
        </Tooltip>
      )}

      {collection.articles.totalCount < MAX_COLLECTION_ARTICLES_COUNT && (
        <AddArticlesCollectionDialog collection={collection}>
          {({ openDialog: openAddArticlesCollection }) => (
            <section
              className={styles.addArticles}
              onClick={openAddArticlesCollection}
            >
              <TextIcon icon={<Icon icon={IconPlus} size={20} />}>
                <FormattedMessage defaultMessage="Add Articles" id="k97/u7" />
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
              setItems(arrayMove(items, oldIndex, newIndex))
              await reorder({
                variables: {
                  collectionId,
                  articleId,
                  newPosition: newIndex,
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
                    <Icon icon={IconDrag} size={24} color="greyDark" />
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
          />
        )}

        {items && items.length > 0 && <EndOfResults message={true} />}
      </section>
    </>
  )
}

export default ViewerArticles
