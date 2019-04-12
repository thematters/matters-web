import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Icon,
  Label,
  LoadMore,
  Placeholder,
  TextIcon,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'
import ICON_COLLECTION_EDIT from '~/static/icons/collection-edit.svg?sprite'

import { SidebarCollection } from './__generated__/SidebarCollection'

const SIDEBAR_COLLECTION = gql`
  query SidebarCollection(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
    $first: Int
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = false
    $hasArticleDigestCover: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      collection(input: { after: $cursor, first: $first }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...SidebarDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.article}
`

const Collection: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })
  if (!mediaHash && !uuid) {
    return null
  }

  return (
    <>
      <header>
        <Label>
          <Translate zh_hant="關聯作品" zh_hans="关联作品" />
        </Label>
        <button type="button">
          <TextIcon
            icon={
              <Icon
                id={ICON_COLLECTION_EDIT.id}
                viewBox={ICON_COLLECTION_EDIT.viewBox}
                size="small"
              />
            }
            color="grey"
          >
            <Translate zh_hant="修訂" zh_hans="修订" />
          </TextIcon>
        </button>
      </header>
      <Query
        query={SIDEBAR_COLLECTION}
        variables={{ mediaHash, uuid, first: 5 }}
      >
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: SidebarCollection }) => {
          if (loading) {
            return <Placeholder.ArticleDigestList />
          }

          const connectionPath = 'article.collection'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadRest = () =>
            fetchMore({
              variables: {
                mediaHash,
                uuid,
                cursor: pageInfo.endCursor,
                first: null
              },
              updateQuery: (previousResult, { fetchMoreResult }) =>
                mergeConnections({
                  oldData: previousResult,
                  newData: fetchMoreResult,
                  path: connectionPath
                })
            })

          return (
            <>
              <ul>
                {edges.map(
                  ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                    <li
                      key={cursor}
                      onClick={() =>
                        analytics.trackEvent(
                          ANALYTICS_EVENTS.CLICK_COLLECTION,
                          {
                            type: FEED_TYPE.COLLECTION,
                            location: i
                          }
                        )
                      }
                    >
                      <ArticleDigest.Sidebar
                        article={node}
                        hasCover
                        hasAuthor
                      />
                    </li>
                  )
                )}
              </ul>
              {pageInfo.hasNextPage && (
                <LoadMore
                  onClick={loadRest}
                  text={
                    <Translate zh_hans="顯示全部篇數" zh_hant="显示全部篇数" />
                  }
                />
              )}
            </>
          )
        }}
      </Query>
    </>
  )
}

export default withRouter(Collection)
