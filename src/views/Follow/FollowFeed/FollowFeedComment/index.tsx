import React from 'react'

import { Comment, DateTime, Expandable } from '~/components'

import { fragments } from './gql'
import styles from './styles.css'

import { FollowFeedCommentPrivate } from './__generated__/FollowFeedCommentPrivate'
import { FollowFeedCommentPublic } from './__generated__/FollowFeedCommentPublic'

interface FollowFeedCommentProps {
  comment: FollowFeedCommentPublic & Partial<FollowFeedCommentPrivate>
  header?: React.ReactNode
  date: Date | string | number
}

const FollowFeedComment: React.FC<FollowFeedCommentProps> & {
  fragments: typeof fragments
} = ({ comment, header, date }) => {
  return (
    <section className="container">
      {header}

      <section className="content">
        <Expandable limit={3}>
          <Comment.Content
            comment={comment}
            type="circleBroadcast"
            size="md-s"
          />
        </Expandable>
      </section>

      <footer>
        <DateTime date={date || comment.createdAt} />
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

FollowFeedComment.fragments = fragments

export default FollowFeedComment
