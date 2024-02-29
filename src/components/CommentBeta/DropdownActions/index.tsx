import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  CommentFormType,
  Dropdown,
  IconMore16,
  Menu,
  SubmitReport,
  ThreadCommentType,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import { SubmitReportDialogProps } from '~/components/Dialogs/SubmitReportDialog/Dialog'
import {
  DropdownActionsCommentBetaPrivateFragment,
  DropdownActionsCommentBetaPublicFragment,
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
  comment: DropdownActionsCommentBetaPublicFragment &
    Partial<DropdownActionsCommentBetaPrivateFragment>
  pinnedComment?: ThreadCommentType
  type: CommentFormType
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
      fragment DropdownActionsCommentBetaPublic on Comment {
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
            mediaHash
            author {
              id
            }
          }
        }
        ...PinButtonComment
      }
      ${PinButton.fragments.comment}
      ${BlockUser.fragments.user.public}
    `,
    private: gql`
      fragment DropdownActionsCommentBetaPrivate on Comment {
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
  type,
  inCard,

  hasCopy,
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

  const Content = () => (
    <Menu>
      {hasCopy && <CopyCommentButton content={comment.content || ''} />}
      {_hasPin && (
        <PinButton
          comment={comment}
          pinnedComment={pinnedComment}
          type={type}
        />
      )}
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
          spacing={['xtight', 'xtight']}
          textColor="black"
          textActiveColor="greyDarker"
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <IconMore16 />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment, type, hasPin = true } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isFrozen } = viewer

  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const targetAuthor = article?.author

  const isTargetAuthor = viewer.id === targetAuthor?.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasCopy: isTargetAuthor,
    hasPin: hasPin && !!(isTargetAuthor && isActive && !isDescendantComment),
    hasDelete: !!(isCommentAuthor && isActive),
    hasReport: !isCommentAuthor,
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
    BaseDropdownActions,
    SubmitReport.Dialog,
    { id: comment.id },
    ({ openDialog }) => ({ openSubmitReportDialog: openDialog })
  )

  const WithDeleteComment = withDialog<
    Omit<DeleteCommentDialogProps, 'children'>
  >(
    WithReport,
    DeleteComment.Dialog,
    {
      comment,
      type,
    },
    ({ openDialog }) => {
      return {
        ...props,
        ...controls,
        openDeleteCommentDialog: isFrozen ? forbid : openDialog,
      }
    }
  )

  return <WithDeleteComment />
}

DropdownActions.fragments = fragments

export default DropdownActions
