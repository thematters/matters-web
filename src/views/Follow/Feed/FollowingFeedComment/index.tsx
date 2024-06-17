import React from 'react'

import { CommentBeta, DateTime } from '~/components'
import {
  FollowingFeedCommentPrivateFragment,
  FollowingFeedCommentPublicFragment,
} from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { fragments } from './gql'
import styles from './styles.module.css'

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
    <section className={styles.container}>
      {header}

      <section className={styles.content}>
        <CommentBeta.Content
          comment={comment}
          type="circleBroadcast"
          size={15}
        />
      </section>

      <footer className={styles.footer}>
        <section className={styles.left}>
          <DateTime date={date} />
        </section>

        <section className={styles.right}>
          <DropdownActions actions={actions} />
        </section>
      </footer>
    </section>
  )
}

FollowingFeedComment.fragments = fragments

export default FollowingFeedComment
