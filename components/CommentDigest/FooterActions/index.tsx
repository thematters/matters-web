import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'

import { DateTime, Icon } from '~/components'
import { Form } from '~/components/Form'
import { ViewerContext } from '~/components/Viewer'

import ICON_COMMENT_SMALL from '~/static/icons/comment-small.svg?sprite'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsComment } from './__generated__/DigestActionsComment'
import DownvoteButton from './DownvoteButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

export interface FooterActionsControls {
  hasComment?: boolean
}
type FooterActionsProps = {
  comment: DigestActionsComment
} & FooterActionsControls

const fragments = {
  comment: gql`
    fragment DigestActionsComment on Comment {
      id
      createdAt
      state
      article {
        id
        mediaHash
      }
      parentComment {
        id
      }
      replyTo {
        id
      }
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

const FooterActions = ({ comment, hasComment }: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)
  const [showForm, setShowForm] = useState(false)
  const isActive = comment.state === 'active'

  return (
    <>
      <footer className="actions">
        <div className="left">
          <UpvoteButton
            comment={comment}
            disabled={!isActive || viewer.isInactive}
          />

          <IconDotDivider />
          <DownvoteButton
            comment={comment}
            disabled={!isActive || viewer.isInactive}
          />

          {hasComment && (
            <>
              <IconDotDivider />
              <button
                type="button"
                className={showForm ? 'active' : ''}
                onClick={() => {
                  setShowForm(!showForm)
                }}
                disabled={!isActive || viewer.isInactive}
              >
                <Icon
                  id={ICON_COMMENT_SMALL.id}
                  viewBox={ICON_COMMENT_SMALL.viewBox}
                  size="small"
                />
              </button>
            </>
          )}
        </div>

        <DateTime date={comment.createdAt} />
      </footer>

      {showForm && (
        <section className="comment-form">
          <Form.CommentForm
            articleId={comment.article.id}
            articleMediaHash={comment.article.mediaHash || ''}
            replyToId={comment.id}
            parentId={_get(comment, 'parentComment.id') || comment.id}
            submitCallback={() => setShowForm(false)}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

FooterActions.fragments = fragments

export default FooterActions
