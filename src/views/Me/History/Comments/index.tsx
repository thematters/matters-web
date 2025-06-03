import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import {
  analytics,
  filterComments,
  mergeConnections,
  stripHtml,
  toPath,
} from '~/common/utils'
import { Head, Layout, LinkWrapper, UserDigest } from '~/components'
import {
  ArticleDigestTitle,
  EmptyComment,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  ViewerContext,
} from '~/components'
import { MeCommentsQuery } from '~/gql/graphql'

import HistoryTabs from '../HistoryTabs'
import { ME_COMMENTS } from './gql'
import styles from './styles.module.css'

type CommentedArticleComment = NonNullable<
  NonNullable<
    NonNullable<
      MeCommentsQuery['node'] & { __typename: 'User' }
    >['commentedArticles']['edges']
  >[0]['node']['comments']['edges']
>[0]['node']

type CommentArticle = NonNullable<
  NonNullable<
    NonNullable<
      MeCommentsQuery['node'] & { __typename: 'User' }
    >['commentedArticles']['edges']
  >[0]['node']['comments']['edges']
>[0]['node'] & { __typename: 'Article' }

const Comments = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore } = useQuery<MeCommentsQuery>(
    ME_COMMENTS,
    { variables: { id: viewer?.id } }
  )

  // pagination
  const connectionPath = 'node.commentedArticles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'User' &&
      data.node.commentedArticles &&
      data.node.commentedArticles) ||
    {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_comment',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyComment />
  }

  const articleEdges = edges
    .map((edge) => {
      const commentEdges = edge.node.comments.edges || []
      const comments = filterComments<CommentedArticleComment>(
        commentEdges.map(({ node }) => node)
      )
      return { ...edge, comments }
    })
    .filter(({ comments }) => comments.length > 0)

  return (
    <Layout.Main.Spacing hasVertical={false}>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        eof
      >
        <List>
          {articleEdges.map(({ node, comments }) => (
            <List.Item key={node.id}>
              <section className={styles.item}>
                <section className={styles.user}>
                  <UserDigest.Mini
                    user={node.author}
                    avatarSize={20}
                    textSize={12}
                    hasAvatar
                    hasDisplayName
                  />
                </section>

                <section className={styles.title}>
                  <LinkWrapper
                    {...toPath({
                      page: 'articleDetail',
                      article: node,
                    })}
                  >
                    <ArticleDigestTitle
                      article={node}
                      is="h2"
                      textSize={16}
                      lineClamp={1}
                    />
                  </LinkWrapper>
                </section>

                <List hasBorder={false}>
                  {comments.map((comment) => (
                    <List.Item key={comment.id}>
                      <section className={styles.comment}>
                        <LinkWrapper
                          {...toPath({
                            page: 'commentDetail',
                            comment,
                            article: node as CommentArticle,
                          })}
                        >
                          <section
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                              __html: stripHtml(comment.content || ''),
                            }}
                          />
                        </LinkWrapper>
                      </section>
                    </List.Item>
                  ))}
                </List>
              </section>
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Layout.Main.Spacing>
  )
}

const HistoryComments = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'History',
    id: 'djJp6c',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />

      <Head title={title} />

      <HistoryTabs />

      <Comments />
    </Layout.Main>
  )
}

export default HistoryComments
