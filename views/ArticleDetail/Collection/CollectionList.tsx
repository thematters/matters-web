import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import { QueryResult } from 'react-apollo'

import { ArticleDigest, Icon, Spinner, TextIcon, Translate } from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import ICON_ADD from '~/static/icons/add.svg?sprite'
import ICON_MORE_CONTENT from '~/static/icons/more-content.svg?sprite'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { SidebarCollection } from './__generated__/SidebarCollection'
import styles from './styles.css'

export const SIDEBAR_COLLECTION = gql`
  query SidebarCollection($mediaHash: String, $cursor: String, $first: Int) {
    article(input: { mediaHash: $mediaHash }) {
      id
      collection(input: { after: $cursor, first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...PlainDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Plain.fragments.article}
`

const CollectionList = ({
  article,
  setEditing,
  canEdit
}: {
  article: ArticleDetail_article
  setEditing: (editing: boolean) => void
  canEdit?: boolean
}) => (
  <Query
    query={SIDEBAR_COLLECTION}
    variables={{ mediaHash: article.mediaHash, first: 10 }}
  >
    {({
      data,
      loading,
      error,
      fetchMore
    }: QueryResult & { data: SidebarCollection }) => {
      if (loading) {
        return <Spinner />
      }

      const path = 'article.collection'
      const { edges, pageInfo, totalCount } = _get(data, path, {})
      const loadRest = () =>
        fetchMore({
          variables: {
            mediaHash: article.mediaHash,
            cursor: pageInfo.endCursor,
            first: null
          },
          updateQuery: (previousResult, { fetchMoreResult }) =>
            mergeConnections({
              oldData: previousResult,
              newData: fetchMoreResult,
              path
            })
        })

      if (totalCount <= 0 && canEdit) {
        return (
          <button type="button" onClick={() => setEditing(true)}>
            <TextIcon
              icon={
                <Icon
                  id={ICON_ADD.id}
                  viewBox={ICON_ADD.viewBox}
                  size="xsmall"
                />
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
          <ol>
            {edges.map(
              ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                <li
                  key={cursor}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_COLLECTION, {
                      type: FEED_TYPE.COLLECTION,
                      location: i
                    })
                  }
                >
                  <ArticleDigest.Plain article={node} hasArchivedTooltip />
                </li>
              )
            )}
          </ol>

          {pageInfo.hasNextPage && (
            <section className="load-more">
              <button type="button" onClick={loadRest}>
                <TextIcon
                  icon={
                    <Icon
                      id={ICON_MORE_CONTENT.id}
                      viewBox={ICON_MORE_CONTENT.viewBox}
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
    }}
  </Query>
)

export default CollectionList
