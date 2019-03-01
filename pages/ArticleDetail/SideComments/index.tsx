import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'
import { Waypoint } from 'react-waypoint'

import { Error, Icon, Spinner, Translate } from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import { Drawer, DrawerConsumer } from '~/components/Drawer'
import EmptyComment from '~/components/Empty/EmptyComment'
import { Form } from '~/components/Form'
import { ArticleComments as ArticleCommentsType } from '~/components/GQL/__generated__/ArticleComments'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'

import { getQuery, mergeConnections } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

const CloseButton = () => (
  <DrawerConsumer>
    {({ close }) => (
      <button type="button" onClick={() => close()}>
        <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} size="large" />
      </button>
    )}
  </DrawerConsumer>
)

const SideComments: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })

  if (!mediaHash && !uuid) {
    return <span>Empty</span> // TODO
  }

  return (
    <Drawer>
      <header>
        <h2>
          <Translate zh_hant="評論" zh_hans="评论" />
        </h2>
        <CloseButton />
      </header>

      <Query query={ARTICLE_COMMENTS} variables={{ mediaHash, uuid }}>
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: ArticleCommentsType }) => {
          if (loading) {
            return <Spinner />
          }

          if (error) {
            return <Error error={error} />
          }

          const pinnedComments = _get(data, 'article.pinnedComments')
          const connectionPath = 'article.comments'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadMore = () =>
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor
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
              <section>
                <Form.CommentForm
                  articleId={data.article.id}
                  articleMediaHash={data.article.mediaHash}
                />
              </section>

              {pinnedComments && pinnedComments.length > 0 && (
                <section className="pinned-comments">
                  <h3>
                    <Translate zh_hant="置頂評論" zh_hans="置顶评论" />
                  </h3>
                  <ul>
                    {pinnedComments.map((comment: any) => (
                      <li key={comment.id}>
                        <CommentDigest.Feed comment={comment} hasComment />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="all-comments">
                <h3>
                  <Translate zh_hant="全部評論" zh_hans="全部评论" />
                </h3>

                {!edges || (edges.length <= 0 && <EmptyComment />)}

                {/* <InfiniteScroll
                  hasNextPage={pageInfo.hasNextPage}
                  loadMore={loadMore}
                  loading={loading}
                  loader={<Spinner />}
                > */}
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <CommentDigest.Feed comment={node} hasComment />
                    </li>
                  ))}
                </ul>
                {pageInfo.hasNextPage && <Waypoint onEnter={loadMore} />}
              </section>
            </>
          )
        }}
      </Query>

      <style jsx>{styles}</style>
    </Drawer>
  )
}

export default withRouter(SideComments)
