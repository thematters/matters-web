import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'

import {
  ArticleDigestSidebar,
  Button,
  Icon,
  List,
  LoadMore,
  Spinner,
  TextIcon,
  Translate,
  useResponsive
} from '~/components'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { CollectionList as CollectionListTypes } from './__generated__/CollectionList'

export const COLLECTION_LIST = gql`
  query CollectionList($mediaHash: String, $after: String, $first: Int) {
    article(input: { mediaHash: $mediaHash }) {
      id
      ...ArticleCollection
    }
  }
  ${articleFragments.articleCollection}
`

const CollectionList = ({
  article,
  setEditing,
  canEdit
}: {
  article: ArticleDetail_article
  setEditing: (editing: boolean) => void
  canEdit?: boolean
}) => {
  const isMediumUp = useResponsive('md-up')
  const { data, loading, error, fetchMore } = useQuery<CollectionListTypes>(
    COLLECTION_LIST,
    {
      variables: { mediaHash: article.mediaHash, first: 10 }
    }
  )

  const connectionPath = 'article.collection'
  const { edges, pageInfo, totalCount } = data?.article?.collection || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || !pageInfo) {
    return null
  }

  const loadRest = () =>
    fetchMore({
      variables: {
        mediaHash: article.mediaHash,
        after: pageInfo.endCursor,
        first: null
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })

  if ((totalCount || 0) <= 0 && canEdit) {
    return (
      <Button
        size={[null, '1.5rem']}
        spacing={[0, 'xtight']}
        bgHoverColor="green-lighter"
        onClick={() => setEditing(true)}
      >
        <TextIcon
          icon={<Icon.Add size="xs" />}
          size="sm"
          weight="md"
          color="green"
        >
          <Translate zh_hant="關聯一篇作品" zh_hans="关联一篇作品" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <>
      <List spacing={['base', 0]}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestSidebar
              article={node}
              hasCover={isMediumUp}
              hasBackground
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.COLLECTION,
                  location: i
                })
              }
            />
          </List.Item>
        ))}
      </List>

      {pageInfo.hasNextPage && <LoadMore onClick={loadRest} />}

      <style jsx>{styles}</style>
    </>
  )
}

export default CollectionList
