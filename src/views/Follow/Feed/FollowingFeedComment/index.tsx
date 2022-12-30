import React from 'react'

import { Comment, DateTime, Expandable } from '~/components'
import {
  FollowingFeedCommentPrivateFragment,
  FollowingFeedCommentPublicFragment,
} from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { fragments } from './gql'
import styles from './styles.css'

type FollowingFeedCommentProps = {
  comment: FollowingFeedCommentPublicFragment &
    Partial<FollowingFeedCommentPrivateFragment>
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
        <Expandable content={comment.content} limit={3} size="md-s">
          <Comment.Content
            comment={comment}
            type="circleBroadcast"
            size="md-s"
          />
        </Expandable>
      </section>

      <footer>
        <section className="left">
          <DateTime date={date} />
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
