import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  DateTime,
  IconArrowDown20,
  IconArrowUp20,
  List,
  Spinner,
  TextIcon,
  useRoute,
  ViewerContext,
} from '~/components'
import EndOfResults from '~/components/Interaction/InfiniteScroll/EndOfResults'
import { CollectionDetailFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const DynamicViewerArticles = dynamic(() => import('./ViewerArticles'), {
  loading: Spinner,
})

interface CollectionArticlesProps {
  collection: CollectionDetailFragment
}

type DirectionType = 'up' | 'down'

const CollectionArticles = ({ collection }: CollectionArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const [direction, setDirection] = useState<DirectionType>('down')
  const isDirectionDown = direction === 'down'
  const isDirectionUp = direction === 'up'

  const { articles, updatedAt } = collection
  let articleEdges = articles.edges

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
