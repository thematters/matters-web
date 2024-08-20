import { useEffect, useState } from 'react'

import { filterComments } from '~/common/utils'
import { ViewMoreCommentButton } from '~/components'
import {
  ArticleThreadCommentCommentPrivateFragment,
  ArticleThreadCommentCommentPublicFragment,
} from '~/gql/graphql'

import { ArticleCommentFeed } from '../Feed'
import { ArticleDescendantComments } from './DescendantComments'
import { fragments } from './gql'
import styles from './styles.module.css'

const COLLAPSE_COUNT = 3

interface ArticleThreadCommentControls {
  defaultExpand?: boolean
  hasPin?: boolean
  hasLink?: boolean
  hasUpvote?: boolean
  hasDownvote?: boolean
  replySubmitCallback?: () => void
  disabled?: boolean
  firstRenderCallback?: () => void
  isInCommentDetail?: boolean
}

export type ArticleThreadCommentType =
  ArticleThreadCommentCommentPublicFragment &
    Partial<ArticleThreadCommentCommentPrivateFragment>

type ThreadCommentProps = {
  comment: ArticleThreadCommentType
  pinnedComment?: ArticleThreadCommentType
} & ArticleThreadCommentControls

export const ArticleThreadComment = ({
  comment,
  pinnedComment,
  defaultExpand,
  firstRenderCallback,
  isInCommentDetail,
  ...props
}: ThreadCommentProps) => {
  const { pageInfo } = comment.comments
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as ArticleThreadCommentType[]
  const [showViewMore, setShowViewMore] = useState(true)

  useEffect(() => {
    if (firstRenderCallback) {
      firstRenderCallback()
    }
  }, [])

  if (!pageInfo.hasNextPage) {
    return (
      <section className={styles.container}>
        <ArticleCommentFeed
          comment={comment}
          isInCommentDetail={isInCommentDetail}
          pinnedComment={pinnedComment}
          hasReply
          hasUserName
          {...props}
        />

        {descendants.length > 0 && (
          <ul className={styles.descendants}>
            {descendants.map((descendantComment) => (
              <li key={descendantComment.id}>
                <ArticleCommentFeed
                  comment={descendantComment}
                  pinnedComment={pinnedComment}
                  avatarSize={24}
                  hasReply
                  hasUserName
                  isInCommentDetail={isInCommentDetail}
                  {...props}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }
  const subComments = descendants.slice(COLLAPSE_COUNT)

  return (
    <section className={styles.container}>
      <ArticleCommentFeed
        comment={comment}
        pinnedComment={pinnedComment}
        hasReply
        hasUserName
        {...props}
      />

      <ul className={styles.descendants}>
        {descendants.slice(0, COLLAPSE_COUNT).map((descendantComment) => (
          <li key={descendantComment.id}>
            <ArticleCommentFeed
              comment={descendantComment}
              pinnedComment={pinnedComment}
              avatarSize={24}
              hasReply
              hasUserName
              isInCommentDetail={isInCommentDetail}
              {...props}
            />
          </li>
        ))}
        {showViewMore && (
          <>
            {subComments.map((descendantComment) => (
              <li key={descendantComment.id}>
                <ArticleCommentFeed
                  comment={descendantComment}
                  pinnedComment={pinnedComment}
                  avatarSize={24}
                  hasReply
                  hasUserName
                  isInCommentDetail={isInCommentDetail}
                  {...props}
                />
              </li>
            ))}
            <ViewMoreCommentButton onClick={() => setShowViewMore(false)} />
          </>
        )}
        {!showViewMore && (
          <ArticleDescendantComments
            id={comment.id}
            endCurosr={pageInfo.endCursor || ''}
            comments={subComments}
            isInCommentDetail={isInCommentDetail}
            pinnedComment={pinnedComment}
            {...props}
          />
        )}
      </ul>
    </section>
  )
}

ArticleThreadComment.fragments = fragments
