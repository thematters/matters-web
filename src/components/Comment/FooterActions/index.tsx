import gql from 'graphql-tag'
import { useContext } from 'react'

import { LikeCoinDialog, ViewerContext } from '~/components'

import CreatedAt, { CreatedAtControls } from '../CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton, { ReplyButtonProps } from './ReplyButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

import { FooterActionsComment } from './__generated__/FooterActionsComment'

export type FooterActionsControls = {
  hasReply?: boolean
  hasCreatedAt?: boolean
  inCard?: boolean
} & CreatedAtControls &
  Pick<ReplyButtonProps, 'commentCallback'>

export type FooterActionsProps = {
  comment: FooterActionsComment
} & FooterActionsControls

const fragments = {
  comment: gql`
    fragment FooterActionsComment on Comment {
      id
      state
      ...ReplyComemnt
      ...UpvoteComment
      ...DownvoteComment
      ...CreatedAtComment
    }

    ${ReplyButton.fragments.comment}
    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
    ${CreatedAt.fragments.comment}
  `,
}

const FooterActions = ({
  comment,
  hasReply,
  hasLink,
  hasCreatedAt,
  inCard = false,

  ...replyButtonProps
}: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)

  const { state } = comment
  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled = !isActive && !isCollapsed

  return (
    <footer aira-label={`${comment.upvotes} 點讚、${comment.downvotes} 點踩`}>
      <LikeCoinDialog>
        {({ open: openLikeCoinDialog }) => (
          <section className="left">
            {hasReply && (
              <ReplyButton
                comment={comment}
                openLikeCoinDialog={openLikeCoinDialog}
                inCard={inCard}
                {...replyButtonProps}
              />
            )}

            <UpvoteButton
              comment={comment}
              onClick={
                viewer.shouldSetupLikerID ? openLikeCoinDialog : undefined
              }
              disabled={isDisabled}
              inCard={inCard}
            />

            <DownvoteButton
              comment={comment}
              onClick={
                viewer.shouldSetupLikerID ? openLikeCoinDialog : undefined
              }
              disabled={isDisabled}
              inCard={inCard}
            />
          </section>
        )}
      </LikeCoinDialog>

      {hasCreatedAt && <CreatedAt comment={comment} hasLink={hasLink} />}
      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
