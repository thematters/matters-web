import classNames from 'classnames'
import gql from 'graphql-tag'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  COMMENT_FEED_ID_PREFIX,
  UPDATE_NEWEST_MOMENT_COMMENT,
} from '~/common/enums'
import { highlightComment } from '~/common/utils/comment'
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
  editing: boolean
}

const Comments = ({ moment, editing }: CommentsProps) => {
  const intl = useIntl()
  const { comments } = moment
  const [newestCommentId, setNewestCommentId] = useState<string | undefined>(
    undefined
  )
  const titleRef = useRef<HTMLDivElement>(null)
  const { ref, setReadyJump } = useJumpToComment({
    fullSpacing: true,
  })

  useEffect(() => {
    setReadyJump(true)
  }, [])

  useEffect(() => {
    if (!newestCommentId) {
      return
    }

    if (!ref.current) {
      return
    }

    const selector = `#${COMMENT_FEED_ID_PREFIX}${newestCommentId}`
    const targetElement = ref.current.querySelector(selector)
    if (!targetElement) {
      return
    }

    setTimeout(
      () => highlightComment(targetElement as HTMLElement, 12, true, true),
      100
    )
  }, [newestCommentId])

  useEventListener(
    UPDATE_NEWEST_MOMENT_COMMENT,
    (payload: { [key: string]: any }) => {
      const comment = payload?.comment
      setNewestCommentId(comment.id)
    }
  )

  const activeCommentsEdges =
    comments.edges?.filter(({ node }) => node.state === 'active') || []

  const CommentsList = (
    <>
      {activeCommentsEdges.map(
        ({ node }) =>
          node.state !== 'archived' && (
            <List.Item key={node.id}>
              <CommentFeed comment={node} hasReply spacingLeft />
            </List.Item>
          )
      )}
    </>
  )

  const eofClasses = classNames({
    [styles.eof]: !editing,
    [styles.eofEditing]: editing,
  })

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
              <FormattedMessage
                defaultMessage="Comment"
                description="src/components/Dialogs/MomentDetailDialog/Comments.tsx"
                id="3raREe"
              />
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
              <section className={eofClasses}>
                <FormattedMessage
                  defaultMessage="No more comments"
                  description="src/views/ArticleDetail/Comments/LatestComments/index.tsx"
                  id="9SXN7s"
                />
              </section>
            }
            eofSpacingTop="base"
          >
            <Media lessThan="md">
              <List spacing={[0, 0]} hasBorder={false}>
                {CommentsList}
              </List>
            </Media>
            <Media greaterThanOrEqual="md">
              <List spacing={[0, 0]} hasBorder={false}>
                {CommentsList}
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
