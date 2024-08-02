import gql from 'graphql-tag'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { UPDATE_NEWEST_MOMENT_COMMENT } from '~/common/enums'
import {
  EmptyComment,
  InfiniteScroll,
  List,
  Media,
  useEventListener,
  useJumpToComment,
} from '~/components'
import { CommentFeed } from '~/components/Comment/Feed'
import { MomentDigestDetailCommentsMomentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  moment: gql`
    fragment MomentDigestDetailCommentsMoment on Moment {
      id
      comments(input: { sort: oldest, first: null }) {
        edges {
          cursor
          node {
            ...CommentFeedCommentPublic
            ...CommentFeedCommentPrivate
          }
        }
      }
    }
    ${CommentFeed.fragments.comment.public}
    ${CommentFeed.fragments.comment.private}
  `,
}

interface CommentsProps {
  moment: MomentDigestDetailCommentsMomentFragment
}

const Comments = ({ moment }: CommentsProps) => {
  const intl = useIntl()
  const { comments } = moment
  const [newestCommentIds, setNewestCommentIds] = useState<string[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const { ref, setReadyJump } = useJumpToComment({
    fullSpacing: true,
  })

  useEffect(() => {
    setReadyJump(true)
  }, [])

  useEventListener(
    UPDATE_NEWEST_MOMENT_COMMENT,
    (payload: { [key: string]: any }) => {
      const comment = payload?.comment
      setNewestCommentIds([comment.id, ...newestCommentIds])
    }
  )

  useEffect(() => {
    if (newestCommentIds.length > 0 && titleRef.current) {
      const commentTitle = titleRef.current

      commentTitle?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [newestCommentIds.length])

  const activeCommentsEdges =
    comments.edges?.filter(({ node }) => node.state === 'active') || []
  const newestComments = activeCommentsEdges
    .filter(({ node }) => newestCommentIds.indexOf(node.id) > -1)
    .reverse()

  const CommentsList = () => {
    return (
      <>
        {newestComments &&
          newestComments.map(({ node }) => (
            <List.Item key={node.id}>
              <CommentFeed comment={node} hasReply />
            </List.Item>
          ))}
        {activeCommentsEdges.map(
          ({ node }) =>
            newestCommentIds.findIndex((id) => id === node.id) === -1 &&
            node.state !== 'archived' && (
              <List.Item key={node.id}>
                <CommentFeed comment={node} hasReply />
              </List.Item>
            )
        )}
      </>
    )
  }

  return (
    <section className={styles.comments} ref={ref}>
      {activeCommentsEdges.length === 0 && (
        <EmptyComment
          description={intl.formatMessage({
            defaultMessage: 'No comments',
            description: 'src/components/Forms/MomentCommentForm/index.tsx',
            id: '80bF0W',
          })}
        />
      )}
      {activeCommentsEdges.length > 0 && (
        <>
          <section className={styles.title} ref={titleRef}>
            <span>
              <FormattedMessage defaultMessage="Comment" id="LgbKvU" />
            </span>
            <span className={styles.count}>
              &nbsp;{activeCommentsEdges.length}
            </span>
          </section>
          <InfiniteScroll
            hasNextPage={false}
            loadMore={async () => {}}
            loader={<></>}
            eof={
              <FormattedMessage
                defaultMessage="No more comments"
                description="src/views/ArticleDetail/Comments/LatestComments/index.tsx"
                id="9SXN7s"
              />
            }
            eofSpacingTop="base"
          >
            <Media at="sm">
              <List spacing={['base', 0]} hasBorder={false}>
                <CommentsList />
              </List>
            </Media>
            <Media greaterThan="sm">
              <List spacing={['loose', 0]} hasBorder={false}>
                <CommentsList />
              </List>
            </Media>
          </InfiniteScroll>
        </>
      )}
    </section>
  )
}

Comments.fragments = fragments

export default Comments
