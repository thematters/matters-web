import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import { useQuery } from 'react-apollo'

import { ArticleDigest, Icon, Spinner, TextIcon, Translate } from '~/components'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import ICON_ADD from '~/static/icons/add.svg?sprite'
import ICON_MORE_CONTENT from '~/static/icons/more-content.svg?sprite'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { CollectionList as CollectionListTypes } from './__generated__/CollectionList'
import styles from './styles.css'

export const COLLECTION_LIST = gql`
  query CollectionList(
    $mediaHash: String
    $after: String
    $first: Int
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestCover: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    article(input: { mediaHash: $mediaHash }) {
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
  const { data, loading, error, fetchMore } = useQuery<CollectionListTypes>(
    COLLECTION_LIST,
    {
      variables: { mediaHash: article.mediaHash, first: 10 }
    }
  )

  const connectionPath = 'article.collection'
  const { edges, pageInfo, totalCount } =
    (data && data.article && data.article.collection) || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo || !totalCount) {
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

  if (totalCount <= 0 && canEdit) {
    return (
      <button type="button" onClick={() => setEditing(true)}>
        <TextIcon
          icon={
            <Icon id={ICON_ADD.id} viewBox={ICON_ADD.viewBox} size="xsmall" />
          }
          spacing="xtight"
          color="green"
          size="sm"
        >
          <Translate zh_hant="關聯一篇作品" zh_hans="关联一篇作品" />
        </TextIcon>
      </button>
    )
  }

  return (
    <>
      <ul className="collection-list">
        {edges.map(({ node, cursor }, i) => (
          <li
            key={cursor}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.COLLECTION,
                location: i
              })
            }
          >
            <ArticleDigest.Sidebar
              type="collection"
              article={node}
              hasArchivedTooltip
              hasCover
              hasAuthor
            />
          </li>
        ))}
      </ul>

      {pageInfo.hasNextPage && (
        <section className="load-more">
          <button type="button" onClick={loadRest}>
            <TextIcon
              icon={
                <Icon
                  id={ICON_MORE_CONTENT.id}
                  viewBox={ICON_MORE_CONTENT.viewBox}
                  size="small"
                />
              }
              color="green"
              size="sm"
              textPlacement="left"
              spacing="xxtight"
            >
              <Translate
                zh_hans={TEXT.zh_hant.viewAll}
                zh_hant={TEXT.zh_hans.viewAll}
              />
            </TextIcon>
          </button>
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default CollectionList
