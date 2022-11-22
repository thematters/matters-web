import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  AppreciatorsDialog,
  Button,
  DonatorsDialog,
  DropdownDialog,
  FingerprintDialog,
  IconMore16,
  IconSize,
  LanguageContext,
  Menu,
  ShareDialog,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { translate } from '~/common/utils'

import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import DonatorsButton from './DonatorsButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import ShareButton from './ShareButton'
import StickyButton from './StickyButton'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  icon?: React.ReactNode
  size?: IconSize
  sharePath?: string

  /**
   * options to control visibility
   */
  // force to hide
  hasShare?: boolean
  hasFingerprint?: boolean
  hasExtend?: boolean

  // based on type
  inCard?: boolean
  inUserArticles?: boolean

  // tag
  tagDetailId?: string
  hasSetTagSelected?: boolean
  hasSetTagUnselected?: boolean
  hasRemoveTag?: boolean

  morePublicActions?: React.ReactNode
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface Controls {
  hasShare: boolean
  hasAppreciators: boolean
  hasDonators: boolean
  hasFingerprint: boolean
  hasExtend: boolean
  hasSticky: boolean
  hasArchive: boolean
  hasSetTagSelected: boolean
  hasSetTagUnselected: boolean
  hasRemoveTag: boolean
  hasEdit: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openFingerprintDialog: () => void
  openAppreciatorsDialog: () => void
  openDonatorsDialog: () => void
  openArchiveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const BaseDropdownActions = ({
  article,
  tagDetailId,

  icon,
  size,
  inCard,

  morePublicActions,

  hasShare,
  hasAppreciators,
  hasDonators,
  hasFingerprint,
  hasExtend,
  hasSticky,
  hasArchive,
  hasSetTagSelected,
  hasSetTagUnselected,
  hasRemoveTag,
  hasEdit,

  openShareDialog,
  openFingerprintDialog,
  openAppreciatorsDialog,
  openDonatorsDialog,
  openArchiveDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const hasPublic =
    hasShare ||
    hasAppreciators ||
    hasDonators ||
    hasFingerprint ||
    hasExtend ||
    morePublicActions
  const hasPrivate =
    hasSticky ||
    hasArchive ||
    hasSetTagSelected ||
    hasSetTagUnselected ||
    hasRemoveTag

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasShare && <ShareButton openDialog={openShareDialog} />}
      {hasAppreciators && (
        <AppreciatorsButton openDialog={openAppreciatorsDialog} />
      )}
      {hasDonators && <DonatorsButton openDialog={openDonatorsDialog} />}
      {hasFingerprint && (
        <FingerprintButton openDialog={openFingerprintDialog} />
      )}
      {hasExtend && <ExtendButton article={article} />}
      {morePublicActions}

      {/* private */}
      {hasPublic && hasPrivate && <Menu.Divider spacing="xtight" />}
      {hasSticky && <StickyButton article={article} />}

      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}
      {hasSetTagSelected && tagDetailId && (
        <SetTagSelectedButton article={article} tagId={tagDetailId} />
      )}
      {hasSetTagUnselected && tagDetailId && (
        <SetTagUnselectedButton article={article} tagId={tagDetailId} />
      )}
      {hasRemoveTag && tagDetailId && (
        <RemoveTagButton article={article} tagId={tagDetailId} />
      )}
      {hasEdit && <EditButton article={article} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ openDialog, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="true"
          onClick={openDialog}
          ref={ref}
        >
          {icon ? icon : <IconMore16 size={size} />}
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const {
    article,
    morePublicActions,

    hasShare,
    hasFingerprint = true,
    hasExtend = true,

    inCard,
    inUserArticles,

    hasSetTagSelected,
    hasSetTagUnselected,
    hasRemoveTag,
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.articleState === 'active'

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  const controls = {
    // public
    hasShare: !!hasShare,
    hasAppreciators: article.appreciationsReceived.totalCount > 0 && !inCard,
    hasDonators: article.donationsDialog.totalCount > 0 && !inCard,
    hasFingerprint: hasFingerprint && (isActive || isArticleAuthor) && !inCard,
    hasExtend: hasExtend && !!isActive && !inCard,
    morePublicActions,

    // privates
    hasSticky: !!(
      inUserArticles &&
      isArticleAuthor &&
      isActive &&
      !viewer.isInactive
    ),
    hasArchive: isArticleAuthor && isActive && !viewer.isArchived,
    hasSetTagSelected: !!hasSetTagSelected,
    hasSetTagUnselected: !!hasSetTagUnselected,
    hasRemoveTag: !!hasRemoveTag,
    hasEdit: isActive && isArticleAuthor,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <ShareDialog path={props.sharePath}>
      {({ openDialog: openShareDialog }) => (
        <FingerprintDialog article={article}>
          {({ openDialog: openFingerprintDialog }) => (
            <AppreciatorsDialog article={article}>
              {({ openDialog: openAppreciatorsDialog }) => (
                <DonatorsDialog article={article}>
                  {({ openDialog: openDonatorsDialog }) => (
                    <ArchiveArticle.Dialog article={article}>
                      {({ openDialog: openArchiveDialog }) => (
                        <BaseDropdownActions
                          {...props}
                          {...controls}
                          openShareDialog={openShareDialog}
                          openFingerprintDialog={openFingerprintDialog}
                          openAppreciatorsDialog={openAppreciatorsDialog}
                          openDonatorsDialog={openDonatorsDialog}
                          openArchiveDialog={
                            viewer.isFrozen ? forbid : openArchiveDialog
                          }
                        />
                      )}
                    </ArchiveArticle.Dialog>
                  )}
                </DonatorsDialog>
              )}
            </AppreciatorsDialog>
          )}
        </FingerprintDialog>
      )}
    </ShareDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
