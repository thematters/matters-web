import gql from 'graphql-tag'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import _some from 'lodash/some'
import { useContext } from 'react'

import {
  AppreciatorsDialog,
  Button,
  DonatorsDialog,
  DropdownDialog,
  FingerprintDialog,
  IconColor,
  IconMore16,
  IconSize,
  Menu,
  ShareDialog,
  Translate,
  useRoute,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, TEXT } from '~/common/enums'

import AddCircleArticle from './AddCircleArticle'
import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import DonatorsButton from './DonatorsButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import ShareButton from './ShareButton'
import StickyButton from './StickyButton'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  color?: IconColor
  size?: IconSize

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
  inTagDetailLatest?: boolean
  inTagDetailSelected?: boolean
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
  hasSetTagUnSelected: boolean
  hasRemoveTag: boolean
  hasEdit: boolean
  hasAddToCircle: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openFingerprintDialog: () => void
  openAppreciatorsDialog: () => void
  openDonatorsDialog: () => void
  openArchiveDialog: () => void
  openAddCircleArticleDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...AppreciatorsDialogArticle
      ...DonatorDialogArticle
      ...FingerprintArticle
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
      ...RemoveTagButtonArticle
      ...EditArticleButtonArticle
      ...SetTagSelectedButtonArticle
      ...SetTagUnselectedButtonArticle
      ...AddCircleArticleButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${DonatorsDialog.fragments.article}
    ${FingerprintDialog.fragments.article}
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${RemoveTagButton.fragments.article}
    ${EditButton.fragments.article}
    ${SetTagSelectedButton.fragments.article}
    ${SetTagUnselectedButton.fragments.article}
    ${AddCircleArticle.fragments.article}
  `,
}

const BaseDropdownActions = ({
  article,
  color = 'grey',
  size,
  inCard,

  hasShare,
  hasAppreciators,
  hasDonators,
  hasFingerprint,
  hasExtend,
  hasSticky,
  hasArchive,
  hasSetTagSelected,
  hasSetTagUnSelected,
  hasRemoveTag,
  hasEdit,
  hasAddToCircle,

  openShareDialog,
  openFingerprintDialog,
  openAppreciatorsDialog,
  openDonatorsDialog,
  openArchiveDialog,
  openAddCircleArticleDialog,
}: BaseDropdownActionsProps) => {
  const hasPublic =
    hasShare || hasAppreciators || hasDonators || hasFingerprint || hasExtend
  const hasPrivate =
    hasSticky ||
    hasArchive ||
    hasSetTagSelected ||
    hasSetTagUnSelected ||
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

      {/* private */}
      {hasPublic && hasPrivate && <Menu.Divider spacing="xtight" />}
      {hasSticky && <StickyButton article={article} />}
      {hasAddToCircle && (
        <AddCircleArticle.Button openDialog={openAddCircleArticleDialog} />
      )}
      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}
      {hasSetTagSelected && <SetTagSelectedButton article={article} />}
      {hasSetTagUnSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTag && <RemoveTagButton article={article} />}
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
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMore16 color={color} size={size} />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const {
    article,

    hasShare,
    hasFingerprint = true,
    hasExtend = true,

    inCard,
    inUserArticles,
    inTagDetailLatest,
    inTagDetailSelected,
  } = props
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected

  // check permission if in tag detail
  let canEditTag = false
  if (isInTagDetail) {
    const tagId = getQuery('tagId')
    const tag = _find(article.tags || [], (item) => item.id === tagId)
    const isEditor = _some(
      tag?.editors || [],
      (editor) => editor.id === viewer.id
    )
    const isCreator = tag?.creator?.id === viewer.id
    canEditTag =
      isEditor || isCreator || viewer.info.email === 'hi@matters.news'
  }

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

  const hasCircles =
    article.author.ownCircles && article.author.ownCircles.length >= 1
  const isAttachedCircle = !!article.access.circle
  const controls = {
    // public
    hasShare: !!hasShare,
    hasAppreciators: article.appreciationsReceived.totalCount > 0 && !inCard,
    hasDonators: article.donationsDialog.totalCount > 0 && !inCard,
    hasFingerprint: hasFingerprint && (isActive || isArticleAuthor) && !inCard,
    hasExtend: hasExtend && !!isActive && !inCard,
    // privates
    hasSticky: !!(
      inUserArticles &&
      isArticleAuthor &&
      isActive &&
      !viewer.isInactive
    ),
    hasArchive: isArticleAuthor && isActive && !viewer.isArchived,
    hasSetTagSelected: !!(inTagDetailLatest && canEditTag),
    hasSetTagUnSelected: !!(inTagDetailSelected && canEditTag),
    hasRemoveTag: !!(isInTagDetail && canEditTag),
    hasEdit: isActive && isArticleAuthor,
    hasAddToCircle: !!(
      isActive &&
      isArticleAuthor &&
      hasCircles &&
      !isAttachedCircle
    ),
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <ShareDialog>
      {({ open: openShareDialog }) => (
        <FingerprintDialog article={article}>
          {({ open: openFingerprintDialog }) => (
            <AppreciatorsDialog article={article}>
              {({ open: openAppreciatorsDialog }) => (
                <DonatorsDialog article={article}>
                  {({ open: openDonatorsDialog }) => (
                    <ArchiveArticle.Dialog article={article}>
                      {({ open: openArchiveDialog }) => (
                        <AddCircleArticle.Dialog article={article}>
                          {({ open: openAddCircleArticleDialog }) => (
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
                              openAddCircleArticleDialog={
                                viewer.isFrozen
                                  ? forbid
                                  : openAddCircleArticleDialog
                              }
                            />
                          )}
                        </AddCircleArticle.Dialog>
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
