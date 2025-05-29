import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconMore from '@/public/static/icons/24px/more.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  CommentThreadCommentType,
  Dropdown,
  Icon,
  Menu,
  SubmitReport,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import { SubmitReportDialogProps } from '~/components/Dialogs/SubmitReportDialog/Dialog'
import {
  CommentDropdownActionsCommentPrivateFragment,
  CommentDropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

import CopyCommentButton from './CopyCommentButton'
import DeleteComment from './DeleteComment'
import type { DeleteCommentDialogProps } from './DeleteComment/Dialog'
import PinButton from './PinButton'

export type DropdownActionsControls = {
  /**
   * options to control visibility
   */
  // force to hide
  hasPin?: boolean

  // based on type
  inCard?: boolean
}

type DropdownActionsProps = {
  comment: CommentDropdownActionsCommentPublicFragment &
    Partial<CommentDropdownActionsCommentPrivateFragment>
  pinnedComment?: CommentThreadCommentType
} & DropdownActionsControls

interface Controls {
  hasCopy: boolean
  hasPin: boolean
  hasDelete: boolean
  hasReport: boolean
}

interface DialogProps {
  openDeleteCommentDialog: () => void
  openSubmitReportDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  comment: {
    public: gql`
      fragment CommentDropdownActionsCommentPublic on Comment {
        id
        state
        content
        author {
          id
          ...BlockUserPublic
        }
        parentComment {
          id
        }
        node {
          ... on Article {
            id
            shortHash
            author {
              id
              userName
            }
            commentCount
          }

          ... on Moment {
            id
            shortHash
            author {
              id
              userName
            }
            commentCount
          }
        }
        ...CommentPinButtonComment
      }
      ${PinButton.fragments.comment}
      ${BlockUser.fragments.user.public}
    `,
    private: gql`
      fragment CommentDropdownActionsCommentPrivate on Comment {
        id
        author {
          id
          ...BlockUserPrivate
        }
        node {
          ... on Article {
            id
            author {
              id
              userName
              isBlocking
            }
          }

          ... on Moment {
            id
            shortHash
            author {
              id
              userName
              isBlocking
            }
          }
        }
      }
      ${BlockUser.fragments.user.private}
    `,
  },
}

const BaseDropdownActions = ({
  comment,
  pinnedComment,

  hasPin,
  hasDelete,
  hasReport,

  openDeleteCommentDialog,
  openSubmitReportDialog,
}: BaseDropdownActionsProps) => {
  const _hasPin =
    hasPin &&
    comment.node.__typename === 'Article' &&
    comment.author.id === comment.node.author.id
  const isMoment = comment.node.__typename === 'Moment'

  const Content = () => (
    <Menu>
      <CopyCommentButton
        content={comment.content || ''}
        text={
          isMoment ? (
            <FormattedMessage
              defaultMessage="Copy comment"
              id="CTJk3m"
              description="src/components/Comment/DropdownActions/index.tsx"
            />
          ) : null
        }
      />
      {_hasPin && <PinButton comment={comment} pinnedComment={pinnedComment} />}
      {hasReport && <SubmitReport.Button openDialog={openSubmitReportDialog} />}
      {(_hasPin || hasReport) && hasDelete && <Menu.Divider />}
      {hasDelete && (
        <DeleteComment.Button openDialog={openDeleteCommentDialog} />
      )}
    </Menu>
  )

  const intl = useIntl()
  const moreActionText = intl.formatMessage({
    defaultMessage: 'More Actions',
    id: 'A7ugfn',
  })

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          spacing={[8, 8]}
          textColor="black"
          textActiveColor="greyDarker"
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <Icon icon={IconMore} size={18} />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment, hasPin = true } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isFrozen } = viewer

  const node =
    comment.node.__typename === 'Article' ||
    comment.node.__typename === 'Moment'
      ? comment.node
      : undefined

  const isMoment = comment.node.__typename === 'Moment'
  const targetAuthor = node?.author

  const isTargetAuthor = viewer.id === targetAuthor?.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPin: hasPin && !!(isTargetAuthor && isActive && !isDescendantComment),
    hasDelete: (isCommentAuthor || (isTargetAuthor && isMoment)) && isActive,
    hasReport: !isCommentAuthor && !(isTargetAuthor && isMoment),
  }

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  if (_isEmpty(_pickBy(controls)) || isArchived) {
    return null
  }

  const WithReport = withDialog<Omit<SubmitReportDialogProps, 'children'>>(
    BaseDropdownActions as React.ComponentType<object>,
    SubmitReport.Dialog,
    { id: comment.id },
    ({ openDialog }) => ({ openSubmitReportDialog: openDialog })
  )

  const WithDeleteComment = withDialog<
    Omit<DeleteCommentDialogProps, 'children'>
  >(WithReport, DeleteComment.Dialog, { comment }, ({ openDialog }) => {
    return {
      ...props,
      ...controls,
      openDeleteCommentDialog: isFrozen ? forbid : openDialog,
    }
  })

  return <WithDeleteComment />
}

DropdownActions.fragments = fragments

export default DropdownActions
