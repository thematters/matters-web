import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { URL_COLLECTION_DETAIL } from '~/common/enums'
import { analytics } from '~/common/utils'
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

type SorterSequenceType = 'normal' | 'reverse'

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery, setQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  let sorterSequence = getQuery(
    URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key
  ) as SorterSequenceType
  if (
    sorterSequence !== URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.normal &&
    sorterSequence !== URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.reverse
  ) {
    sorterSequence = URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
      .normal as SorterSequenceType
  }
  const [sequence, setSequence] = useState<SorterSequenceType>(sorterSequence)
  const isSequenceNormal =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.normal
  const isSequenceReverse =
    sequence === URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value.reverse

  const [, setFirstRender] = useState(true)

  const { articleList: articles, updatedAt } = collection

  const changeSequence = (newSequence: SorterSequenceType) => {
    setQuery(URL_COLLECTION_DETAIL.SORTER_SEQUENCE.key, newSequence)
    setSequence(newSequence)
    articles.edges = articles.edges?.reverse()
  }

  useEffect(() => {
    if (isSequenceReverse) {
      articles.edges = articles.edges?.reverse()
    }
    setFirstRender(false)
  }, [])

  // filter out inactive articles for local updating
  // at ArchiveArticle/Dialog.tsx
  let articleEdges = articles.edges?.filter(
    ({ node }) => node.articleState === ArticleState.Active
  )

  if (isViewer) {
    return <DynamicViewerArticles collection={collection} />
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
            if (isSequenceNormal) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .reverse as SorterSequenceType
              )
            } else if (isSequenceReverse) {
              changeSequence(
                URL_COLLECTION_DETAIL.SORTER_SEQUENCE.value
                  .normal as SorterSequenceType
              )
            }
          }}
          className={styles.sortButton}
        >
          {isSequenceNormal && (
            <TextIcon icon={<IconArrowDown20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" />
            </TextIcon>
          )}
          {isSequenceReverse && (
            <TextIcon icon={<IconArrowUp20 size="mdS" />}>
              <FormattedMessage defaultMessage="Sort" />
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
