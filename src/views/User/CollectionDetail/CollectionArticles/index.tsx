import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { URL_COLLECTION_DETAIL } from '~/common/enums'
import { analytics, parseSorter, stringifySorter } from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  IconArrowDown20,
  IconArrowUp20,
  Layout,
  List,
  Spinner,
  TextIcon,
  useRoute,
  ViewerContext,
} from '~/components'
import EndOfResults from '~/components/Interaction/InfiniteScroll/EndOfResults'
import {
  ArticleState,
  CollectionArticlesCollectionFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

const DynamicViewerArticles = dynamic(() => import('./ViewerArticles'), {
  loading: Spinner,
})

interface CollectionArticlesProps {
  collection: CollectionArticlesCollectionFragment
}

type SorterSequenceType = 'asc' | 'dsc'

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

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
  const isSequenceNormal =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.DSC
  const isSequenceReverse =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.ASC

  const updateSorter = (key: string, value: string) => {
    sorter[key] = value
    // Using setQuery will encode the URL, it was ugly.
    // eg: /@Matty/Collection --> /%40Matty/Collection
    // setQuery(URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key, newSequence)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.set(URL_COLLECTION_DETAIL.SORTER_KEY, stringifySorter(sorter))
    router.push(
      `${window.location.pathname}?${decodeURIComponent(urlParams.toString())}`
    )
  }

  const changeSequence = (newSequence: SorterSequenceType) => {
    updateSorter(URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key, newSequence)
    setSequence(newSequence)
  }

  const { articleList: articles, updatedAt } = collection

  // filter out inactive articles for local updating
  // at ArchiveArticle/Dialog.tsx
  let articleEdges = articles.edges?.filter(
    ({ node }) => node.articleState === ArticleState.Active
  )

  if (isSequenceReverse) {
    articleEdges = articleEdges?.reverse()
  }

  if (isViewer) {
    return <DynamicViewerArticles collection={collection} />
  }

  return (
    <>
      <section className={styles.midMenu}>
        <section className={styles.updatedDate}>
          <FormattedMessage
            defaultMessage="Updated {date}"
            id="h+punE"
            description="src/views/User/CollectionDetail/Content.tsx"
            values={{
              date: <DateTime date={updatedAt} color="grey" size="sm" />,
            }}
          />
        </section>

        <button
          onClick={() => {
            if (isSequenceNormal) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .ASC as SorterSequenceType
              )
            } else if (isSequenceReverse) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .DSC as SorterSequenceType
              )
            }
          }}
          className={styles.sortButton}
        >
          {isSequenceNormal && (
            <TextIcon icon={<IconArrowDown20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" id="25oM9Q" />
            </TextIcon>
          )}
          {isSequenceReverse && (
            <TextIcon icon={<IconArrowUp20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" id="25oM9Q" />
            </TextIcon>
          )}
        </button>
      </section>

      <Layout.Main.Spacing hasVertical={false}>
        <List>
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
      </Layout.Main.Spacing>
    </>
  )
}

CollectionArticles.fragments = fragments

export default CollectionArticles
