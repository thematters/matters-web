import gql from 'graphql-tag'

import { DateTime, Icon } from '~/components'

import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsComment } from './__generated__/DigestActionsComment'
import DownvoteButton from './DownvoteButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

export interface CommentActionsControls {
  hasComment?: boolean
}
type ActionsProps = {
  comment: DigestActionsComment
} & CommentActionsControls

const fragments = {
  comment: gql`
    fragment DigestActionsComment on Comment {
      id
      createdAt
      ...UpvoteComment
      ...DownvoteComment
    }
    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
  `
}

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const Actions = ({ comment, hasComment }: ActionsProps) => {
  return (
    <footer className="actions">
      <div className="left">
        <UpvoteButton comment={comment} />

        <IconDotDivider />
        <DownvoteButton comment={comment} />

        {hasComment && (
          <>
            <IconDotDivider />
            <span>Comment Icon</span>
          </>
        )}
      </div>

      <DateTime date={comment.createdAt} />

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
