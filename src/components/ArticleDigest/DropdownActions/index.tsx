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
  IconMore16,
  IconSize,
  Menu,
  RemoveArticleCollectionDialog,
  RemoveArticleCollectionDialogProps,
  ShareDialog,
  ShareDialogProps,
  Spinner,
  SubmitReport,
  SupportersDialog,
  SupportersDialogProps,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { SubmitReportDialogProps } from '~/components/Dialogs/SubmitReportDialog/Dialog'
import { DropdownActionsArticleFragment } from '~/gql/graphql'
import { ArchiveUserDialogProps } from '~/views/User/UserProfile/DropdownActions/ArchiveUser/Dialog'
import {
  OpenToggleRestrictUserDialogWithProps,
  ToggleRestrictUserDialogProps,
} from '~/views/User/UserProfile/DropdownActions/ToggleRestrictUser/Dialog'

import AddCollectionButton from './AddCollectionButton'
import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import { ArchiveArticleDialogProps } from './ArchiveArticle/Dialog'
import DonatorsButton from './DonatorsButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import { fragments } from './gql'
import IPFSButton from './IPFSButton'
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
const DynamicToggleRestrictUserButton = dynamic(
  () =>
    import(
      '~/views/User/UserProfile/DropdownActions/ToggleRestrictUser/Button'
    ),
  { loading: () => <Spinner /> }
)
const DynamicToggleRestrictUserDialog = dynamic(
  () =>
    import(
      '~/views/User/UserProfile/DropdownActions/ToggleRestrictUser/Dialog'
    ),
  { loading: () => <Spinner /> }
)
const DynamicArchiveUserButton = dynamic(
  () => import('~/views/User/UserProfile/DropdownActions/ArchiveUser/Button'),
  {
    loading: () => <Spinner />,
  }
)
const DynamicArchiveUserDialog = dynamic(
  () => import('~/views/User/UserProfile/DropdownActions/ArchiveUser/Dialog'),
  {
    loading: () => <Spinner />,
  }
)

export interface DropdownActionsControls {
  icon?: React.ReactNode
  size?: IconSize
  sharePath?: string
  disabled?: boolean

  /**
   * options to control visibility
   */
  // force to hide
  hasShare?: boolean
  hasIPFS?: boolean
  hasExtend?: boolean
  hasReport?: boolean

  // based on type
  inCard?: boolean
  inFixedToolbar?: boolean
  inUserArticles?: boolean

  // tag
  tagDetailId?: string
  hasSetTagSelected?: boolean
  hasSetTagUnselected?: boolean
  hasRemoveTag?: boolean

  hasArchive?: boolean
  hasEdit?: boolean
  hasBookmark?: boolean
  hasAppreciators?: boolean
  hasDonators?: boolean

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
  hasIPFS: boolean
  hasDonators: boolean
  hasExtend: boolean
  hasReport: boolean
  hasSticky: boolean
  hasSetTagSelected: boolean
  hasSetTagUnselected: boolean
  hasRemoveTag: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openSubmitReportDialog: () => void
  openAppreciatorsDialog: () => void
  openSupportersDialog: () => void
  openArchiveDialog: () => void
  openAddCollectionsArticleDialog: () => void
  openRemoveArticleCollectionDialog: () => void
}

interface AdminProps {
  openToggleRecommendArticleDialog: (
    props: OpenToggleRecommendArticleDialogWithProps
  ) => void
  openToggleRestrictUserDialog: (
    props: OpenToggleRestrictUserDialogWithProps
  ) => void
  openArchiveUserDialog: () => void
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
  inFixedToolbar,
  disabled,

  hasShare,
  hasAppreciators,
  hasIPFS,
  hasDonators,
  hasExtend,
  hasReport,
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
  openSubmitReportDialog,
  openAppreciatorsDialog,
  openSupportersDialog,
  openArchiveDialog,
  openAddCollectionsArticleDialog,
  openRemoveArticleCollectionDialog,
  onSetBottomCollection,
  onSetTopCollection,
  onRemoveCollection,

  // admin
  openToggleRecommendArticleDialog,
  openToggleRestrictUserDialog,
  openArchiveUserDialog,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const hasPublic =
    hasShare ||
    hasAppreciators ||
    hasDonators ||
    hasIPFS ||
    hasExtend ||
    hasReport
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
      {hasIPFS && <IPFSButton article={article} />}
      {hasExtend && <ExtendButton article={article} />}
      {hasReport && <SubmitReport.Button openDialog={openSubmitReportDialog} />}

      {/* private */}
      {hasPublic && hasPrivate && <Menu.Divider />}
      {hasEdit && <EditButton article={article} />}
      {hasAddCollection && (
        <AddCollectionButton openDialog={openAddCollectionsArticleDialog} />
      )}

      {hasSticky && <PinButton article={article} />}

      {hasBookmark && (
        <BookmarkButton article={article} inCard={inCard} iconSize="mdS" />
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
            openDialog={openToggleRecommendArticleDialog}
          />
          <DynamicToggleRecommendArticleButton
            id={article.id}
            type="hottestAndNewest"
            openDialog={openToggleRecommendArticleDialog}
          />
          <DynamicToggleRestrictUserButton
            id={article.author.id}
            openDialog={openToggleRestrictUserDialog}
          />
          <DynamicArchiveUserButton openDialog={openArchiveUserDialog} />
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
            spacing={
              inFixedToolbar ? ['baseTight', 'baseTight'] : ['xtight', 'xtight']
            }
            borderRadius={inFixedToolbar ? 0 : '5rem'}
            bgActiveColor={inFixedToolbar ? undefined : 'greyLighter'}
            aria-label={moreActionText}
            ref={ref}
            disabled={disabled}
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
    hasExtend = true,
    hasReport,

    inCard,
    inUserArticles,

    hasSetTagSelected,
    hasSetTagUnselected,
    hasRemoveTag,

    hasEdit,
    hasArchive,
    hasDonators,
    hasAppreciators,
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
    hasAppreciators:
      hasAppreciators && article.likesReceived.totalCount > 0 && !inCard,
    hasDonators:
      hasDonators && article.donationsDialog.totalCount > 0 && !inCard,
    hasExtend: hasExtend && !!isActive && !inCard,
    hasReport: !!hasReport && !isArticleAuthor,

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
  const WithReport = withDialog<Omit<SubmitReportDialogProps, 'children'>>(
    WithShareDialog,
    SubmitReport.Dialog,
    { id: article.id },
    ({ openDialog }) => ({ openSubmitReportDialog: openDialog })
  )
  const WithAppreciators = withDialog<
    Omit<AppreciatorsDialogProps, 'children'>
  >(WithReport, AppreciatorsDialog, { article }, ({ openDialog }) => ({
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
  const WithToggleRecommendArticle = withDialog<
    Omit<ToggleRecommendArticleDialogProps, 'children'>
  >(
    WithRemoveArticleCollection,
    DynamicToggleRecommendArticleDialog,
    { article },
    ({ openDialog }) => ({
      openToggleRecommendArticleDialog: openDialog,
    })
  )
  const WithToggleRetrictUser = withDialog<
    Omit<ToggleRestrictUserDialogProps, 'children'>
  >(
    WithToggleRecommendArticle,
    DynamicToggleRestrictUserDialog,
    { id: article.author.id, userName: article.author.userName! },
    ({ openDialog }) => ({
      openToggleRestrictUserDialog: openDialog,
    })
  )
  const WithArchiveUser = withDialog<Omit<ArchiveUserDialogProps, 'children'>>(
    WithToggleRetrictUser,
    DynamicArchiveUserDialog,
    { id: article.author.id, userName: article.author.userName! },
    ({ openDialog }) => ({ openArchiveUserDialog: openDialog })
  )

  return <WithArchiveUser />
}

DropdownActions.fragments = fragments

export default DropdownActions
