import { ApolloError } from 'apollo-client'

import {
  ArticleDigestSidebar,
  List,
  Spinner,
  useResponsive,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import { CollectionList as CollectionListTypes } from './__generated__/CollectionList'

interface CollectionListProps {
  data?: CollectionListTypes
  loading: boolean
  error?: ApolloError | null
}

const CollectionList: React.FC<CollectionListProps> = ({
  data,
  loading,
  error,
}) => {
  const isMediumUp = useResponsive('md-up')
  const { edges, pageInfo } = data?.article?.collection || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || !pageInfo) {
    return null
  }

  return (
    <List spacing={['base', 0]} hasBorder={false}>
      {edges.map(({ node, cursor }, i) => (
        <List.Item key={cursor}>
          <ArticleDigestSidebar
            article={node}
            hasCover={isMediumUp}
            hasBackground
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.COLLECTION,
                location: i,
              })
            }
          />
        </List.Item>
      ))}
    </List>
  )
}

export default CollectionList
