import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  AddCollectionsArticleDialog,
  AddCollectionsArticleDialogProps,
  AppreciatorsDialog,
  AppreciatorsDialogProps,
  BookmarkButton,
  Button,
  Dropdown,
  FingerprintDialog,
  FingerprintDialogProps,
  IconMore16,
  IconSize,
  Menu,
  RemoveArticleCollectionDialog,
  RemoveArticleCollectionDialogProps,
  ShareDialog,
  ShareDialogProps,
  Spinner,
  SupportersDialog,
  SupportersDialogProps,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

import AddCollectionButton from './AddCollectionButton'
import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import { ArchiveArticleDialogProps } from './ArchiveArticle/Dialog'
import DonatorsButton from './DonatorsButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import PinButton from './PinButton'
import RemoveArticleCollectionButton from './RemoveArticleCollectionButton'
import RemoveTagButton from './RemoveTagButton'
import SetBottomCollectionButton from './SetBottomCollectionButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import SetTopCollectionButton from './SetTopCollectionButton'
import ShareButton from './ShareButton'
import styles from './styles.module.css'
import type {
  OpenToggleRecommendArticleDialogWithProps,
  ToggleRecommendArticleDialogProps,
} from './ToggleRecommendArticle/Dialog'

const isAdminView = process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

const DynamicToggleRecommendArticleButton = dynamic(
  () => import('./ToggleRecommendArticle/Button'),
  { loading: () => <Spinner /> }
)

const DynamicToggleRecommendArticleDialog = dynamic(
  () => import('./ToggleRecommendArticle/Dialog'),
  { loading: () => <Spinner /> }
)

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

  hasArchive?: boolean
  hasEdit?: boolean
  hasBookmark?: boolean

  collectionId?: string
  collectionArticleCount?: number
  hasAddCollection?: boolean
  hasRemoveCollection?: boolean
  hasSetTopCollection?: boolean
  hasSetBottomCollection?: boolean
  onSetTopCollection?: () => void
  onSetBottomCollection?: () => void
  onRemoveCollection?: () => void

  morePublicActions?: React.ReactNode
}

type DropdownActionsProps = {
  article: DropdownActionsArticleFragment
} & DropdownActionsControls

interface Controls {
  hasShare: boolean
  hasAppreciators: boolean
  hasDonators: boolean
  hasFingerprint: boolean
  hasExtend: boolean
  hasSticky: boolean
  hasSetTagSelected: boolean
  hasSetTagUnselected: boolean
  hasRemoveTag: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openFingerprintDialog: () => void
  openAppreciatorsDialog: () => void
  openSupportersDialog: () => void
  openArchiveDialog: () => void
  openAddCollectionsArticleDialog: () => void
  openRemoveArticleCollectionDialog: () => void
}

interface AdminProps {
  openToggleRecommendDialog: (
    props: OpenToggleRecommendArticleDialogWithProps
  ) => void
}

type BaseDropdownActionsProps = DropdownActionsProps &
  Controls &
  DialogProps &
  AdminProps

const BaseDropdownActions = ({
  article,

  tagDetailId,
  collectionId,
  collectionArticleCount,

  icon,
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
  hasSetTagUnselected,
  hasRemoveTag,
  hasEdit,
  hasBookmark,
  hasAddCollection,
  hasRemoveCollection,
  hasSetTopCollection,
  hasSetBottomCollection,

  openShareDialog,
  openFingerprintDialog,
  openAppreciatorsDialog,
  openSupportersDialog,
  openArchiveDialog,
  openAddCollectionsArticleDialog,
  openRemoveArticleCollectionDialog,
  onSetBottomCollection,
  onSetTopCollection,
  onRemoveCollection,

  // admin
  openToggleRecommendDialog,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const hasPublic =
    hasShare || hasAppreciators || hasDonators || hasFingerprint || hasExtend
  const hasPrivate =
    hasSticky ||
    hasArchive ||
    hasSetTagSelected ||
    hasSetTagUnselected ||
    hasRemoveTag

  const Content = () => (
    <Menu>
      {/* public */}
      {hasShare && <ShareButton openDialog={openShareDialog} />}
      {hasAppreciators && (
        <AppreciatorsButton openDialog={openAppreciatorsDialog} />
      )}
      {hasDonators && <DonatorsButton openDialog={openSupportersDialog} />}
      {hasFingerprint && (
        <FingerprintButton openDialog={openFingerprintDialog} />
      )}
      {hasExtend && <ExtendButton article={article} />}

      {/* private */}
      {hasPublic && hasPrivate && <Menu.Divider />}
      {hasEdit && <EditButton article={article} />}
      {hasAddCollection && (
        <AddCollectionButton openDialog={openAddCollectionsArticleDialog} />
      )}

      {hasSticky && <PinButton article={article} />}

      {hasBookmark && (
        <BookmarkButton article={article} inCard={inCard} size="mdS" />
      )}

      {hasSetTagSelected && tagDetailId && (
        <SetTagSelectedButton article={article} tagId={tagDetailId} />
      )}
      {hasSetTagUnselected && tagDetailId && (
        <SetTagUnselectedButton article={article} tagId={tagDetailId} />
      )}
      {hasRemoveTag && tagDetailId && (
        <RemoveTagButton article={article} tagId={tagDetailId} />
      )}

      {hasArchive && <Menu.Divider />}
      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}

      {(hasSetTopCollection || hasSetBottomCollection) &&
        collectionId &&
        collectionArticleCount && (
          <>
            <Menu.Divider />
            {hasSetTopCollection && onSetTopCollection && (
              <SetTopCollectionButton
                articleId={article.id}
                collectionId={collectionId}
                onClick={onSetTopCollection}
              />
            )}
            {hasSetBottomCollection && onSetBottomCollection && (
              <SetBottomCollectionButton
                articleId={article.id}
                collectionId={collectionId}
                collectionArticleCount={collectionArticleCount}
                onClick={onSetBottomCollection}
              />
            )}
          </>
        )}

      {hasRemoveCollection && onRemoveCollection && (
        <>
          <Menu.Divider />
          <RemoveArticleCollectionButton
            onClick={onRemoveCollection}
            openDialog={openRemoveArticleCollectionDialog}
          />
        </>
      )}

      {/* admin */}
      {isAdminView && viewer.isAdmin && (
        <>
          <Menu.Divider />
          <DynamicToggleRecommendArticleButton
            id={article.id}
            type="icymi"
            openDialog={openToggleRecommendDialog}
          />
          <DynamicToggleRecommendArticleButton
            id={article.id}
            type="hottestAndNewest"
            openDialog={openToggleRecommendDialog}
          />
        </>
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
      {({ openDropdown, ref }) =>
        inCard ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              openDropdown()
            }}
            aria-label={moreActionText}
            aria-haspopup="listbox"
            ref={ref}
            className={styles.moreButton}
          >
            {icon ? icon : <IconMore16 size={size} />}
          </button>
        ) : (
          <Button
            onClick={openDropdown}
            spacing={['xtight', 'xtight']}
            bgActiveColor="greyLighter"
            aria-label={moreActionText}
            ref={ref}
          >
            {icon ? icon : <IconMore16 size={size} />}
          </Button>
        )
      }
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const {
    article,
    collectionId,

    hasShare,
    hasFingerprint = true,
    hasExtend = true,

    inCard,
    inUserArticles,

    hasSetTagSelected,
    hasSetTagUnselected,
    hasRemoveTag,

    hasEdit,
    hasArchive,
    hasBookmark = true,
    hasAddCollection,
    hasRemoveCollection,
    hasSetTopCollection,
    hasSetBottomCollection,
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.articleState === 'active'

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  const controls = {
    // public
    hasShare: !!hasShare,
    hasAppreciators: article.likesReceived.totalCount > 0 && !inCard,
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
    hasArchive:
      !!hasArchive && isArticleAuthor && isActive && !viewer.isArchived,
    hasSetTagSelected: !!hasSetTagSelected,
    hasSetTagUnselected: !!hasSetTagUnselected,
    hasRemoveTag: !!hasRemoveTag,
    hasEdit: !!hasEdit && isActive && isArticleAuthor,
    hasBookmark: !!hasBookmark,
    hasAddCollection: hasAddCollection && isActive && isArticleAuthor,
    hasRemoveCollection: hasRemoveCollection && isActive && isArticleAuthor,
    hasSetTopCollection: hasSetTopCollection && isActive && isArticleAuthor,
    hasSetBottomCollection:
      hasSetBottomCollection && isActive && isArticleAuthor,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  const WithShareDialog = withDialog<Omit<ShareDialogProps, 'children'>>(
    BaseDropdownActions,
    ShareDialog,
    { path: props.sharePath },
    ({ openDialog }) => ({ ...props, ...controls, openShareDialog: openDialog })
  )
  const WithFingerprint = withDialog<Omit<FingerprintDialogProps, 'children'>>(
    WithShareDialog,
    FingerprintDialog,
    { article },
    ({ openDialog }) => ({ openFingerprintDialog: openDialog })
  )
  const WithAppreciators = withDialog<
    Omit<AppreciatorsDialogProps, 'children'>
  >(WithFingerprint, AppreciatorsDialog, { article }, ({ openDialog }) => ({
    openAppreciatorsDialog: openDialog,
  }))
  const WithSupporters = withDialog<Omit<SupportersDialogProps, 'children'>>(
    WithAppreciators,
    SupportersDialog,
    { article },
    ({ openDialog }) => ({ openSupportersDialog: openDialog })
  )
  const WithArchiveArticle = withDialog<
    Omit<ArchiveArticleDialogProps, 'children'>
  >(WithSupporters, ArchiveArticle.Dialog, { article }, ({ openDialog }) => ({
    openArchiveDialog: viewer.isFrozen ? forbid : openDialog,
  }))
  const WithAddCollectionsArticle = withDialog<
    Omit<AddCollectionsArticleDialogProps, 'children'>
  >(
    WithArchiveArticle,
    AddCollectionsArticleDialog,
    { articleId: article.id },
    ({ openDialog }) => ({ openAddCollectionsArticleDialog: openDialog })
  )
  const WithRemoveArticleCollection = withDialog<
    Omit<RemoveArticleCollectionDialogProps, 'children'>
  >(
    WithAddCollectionsArticle,
    RemoveArticleCollectionDialog,
    {
      articleId: article.id,
      articleTitle: article.title,
      collectionId: collectionId || '',
    },
    ({ openDialog }) => ({ openRemoveArticleCollectionDialog: openDialog })
  )

  // exclude admin code on build
  if (!isAdminView || !viewer.isAdmin) {
    return <WithRemoveArticleCollection />
  }

  /**
   * ADMIN ONLY
   */
  const WithToggleRecommend = withDialog<
    Omit<ToggleRecommendArticleDialogProps, 'children'>
  >(
    WithRemoveArticleCollection,
    DynamicToggleRecommendArticleDialog,
    { article },
    ({ openDialog }) => ({
      openToggleRecommendDialog: openDialog,
    })
  )

  return <WithToggleRecommend />
}

DropdownActions.fragments = fragments

export default DropdownActions
