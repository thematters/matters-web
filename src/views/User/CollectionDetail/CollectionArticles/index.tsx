import { useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { ReactComponent as IconUp } from '@/public/static/icons/24px/up.svg'
import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'
import {
  MAX_COLLECTION_ARTICLES_COUNT,
  URL_COLLECTION_DETAIL,
} from '~/common/enums'
import {
  analytics,
  mergeConnections,
  parseSorter,
  stringifySorter,
} from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  Icon,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  SpinnerBlock,
  TextIcon,
  Throw404,
  useRoute,
  ViewerContext,
} from '~/components'
import { ArticleState, CollectionArticlesQuery } from '~/gql/graphql'

import { COLLECTION_ARTICLES } from './gql'
import CollectionArticlesPlaceholder from './Placeholder'
import styles from './styles.module.css'

const DynamicViewerArticles = dynamic(() => import('./ViewerArticles'), {
  loading: () => <SpinnerBlock />,
})

type SorterSequenceType = 'asc' | 'dsc'

const CollectionArticles = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const userName = getQuery('name')
  const collectionId = getQuery('collectionId')
  const isViewer = viewer.userName === userName

  // Sorting
  let sorter = parseSorter(getQuery(URL_COLLECTION_DETAIL.SORTER_KEY))
  let sorterSequence = sorter[
    URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key
  ] as SorterSequenceType
  if (
    sorterSequence !== URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.DSC &&
    sorterSequence !== URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.ASC
  ) {
    sorterSequence = URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
      .DSC as SorterSequenceType
  }

  const [sequence, setSequence] = useState<SorterSequenceType>(sorterSequence)

  const isSequenceDsc =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.DSC
  const isSequenceAsc =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.ASC

  const updateSorter = (key: string, value: string) => {
    sorter[key] = value
    // Using setQuery will encode the URL, it was ugly.
    // eg: /@Matty/Collection --> /%40Matty/Collection
    // setQuery(URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key, newSequence)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.set(URL_COLLECTION_DETAIL.SORTER_KEY, stringifySorter(sorter))
    router.replace(
      `${window.location.pathname}?${decodeURIComponent(urlParams.toString())}`
    )
  }

  const changeSequence = (newSequence: SorterSequenceType) => {
    updateSorter(URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key, newSequence)
    setSequence(newSequence)
  }

  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore } = useQuery<CollectionArticlesQuery>(
    COLLECTION_ARTICLES,
    {
      variables: {
        id: collectionId,
        first: isViewer ? MAX_COLLECTION_ARTICLES_COUNT : 20,
        reversed: isSequenceDsc,
      },
    }
  )
  const collection = data?.node as CollectionArticlesQuery['node'] & {
    __typename: 'Collection'
  }
  const pageInfo =
    collection && 'articleList' in collection
      ? collection.articleList.pageInfo
      : null
  const connectionPath = 'node.articleList'

  /**
   * Render
   */
  if (loading) {
    return <CollectionArticlesPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!collection || collection.__typename !== 'Collection') {
    return <Throw404 />
  }

  const { articleList: articles, updatedAt } = collection

  // filter out inactive articles for local updating
  // at ArchiveArticle/Dialog.tsx
  let articleEdges = articles.edges?.filter(
    ({ node }) => node.articleState === ArticleState.Active
  )

  // load next page
  const loadMore = async () => {
    if (loading) {
      return
    }

    analytics.trackEvent('load_more', {
      type: isSequenceAsc ? 'collection_detail_asc' : 'collection_detail_dsc',
      location: articleEdges?.length || 0,
    })

    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })
  }

  if (isViewer) {
    return <DynamicViewerArticles collection={collection} />
  }

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

        <button
          onClick={() => {
            if (isSequenceDsc) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .ASC as SorterSequenceType
              )
            } else if (isSequenceAsc) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .DSC as SorterSequenceType
              )
            }
          }}
          className={styles.sortButton}
        >
          {isSequenceDsc && (
            <TextIcon icon={<Icon icon={IconDown} size={20} />}>
              <FormattedMessage defaultMessage="Sort" id="25oM9Q" />
            </TextIcon>
          )}
          {isSequenceAsc && (
            <TextIcon icon={<Icon icon={IconUp} size={20} />}>
              <FormattedMessage defaultMessage="Sort" id="25oM9Q" />
            </TextIcon>
          )}
        </button>
      </section>

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo?.hasNextPage || false}
          loadMore={loadMore}
          eof
        >
          <List>
            {articleEdges &&
              articleEdges.map(({ node }, i) => (
                <List.Item key={node.id}>
                  <ArticleDigestFeed
                    article={node}
                    collectionId={collection.id}
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
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

export default CollectionArticles
