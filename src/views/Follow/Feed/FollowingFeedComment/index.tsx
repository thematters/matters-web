import React from 'react'

import { Comment, DateTime, Expandable } from '~/components'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { fragments } from './gql'
import styles from './styles.css'

import { FollowingFeedCommentPrivate } from './__generated__/FollowingFeedCommentPrivate'
import { FollowingFeedCommentPublic } from './__generated__/FollowingFeedCommentPublic'

type FollowingFeedCommentProps = {
  comment: FollowingFeedCommentPublic & Partial<FollowingFeedCommentPrivate>
  header?: React.ReactNode
  date: Date | string | number
} & DropdownActionsControls

const FollowingFeedComment: React.FC<FollowingFeedCommentProps> & {
  fragments: typeof fragments
} = ({ comment, header, date, actions }) => {
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
        <section className="left">
          <DateTime date={date || comment.createdAt} />
        </section>

        <section className="right">
          <DropdownActions actions={actions} />
        </section>
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

FollowingFeedComment.fragments = fragments

export default FollowingFeedComment
