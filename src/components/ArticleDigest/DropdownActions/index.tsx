import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  AddCollectionsArticleDialog,
  AddCollectionsArticleDialogProps,
  AppreciatorsDialog,
  AppreciatorsDialogProps,
  BookmarkButton,
  Button,
  Dropdown,
  Icon,
  IconSize,
  Menu,
  RemoveArticleCollectionDialog,
  RemoveArticleCollectionDialogProps,
  ShareDialog,
  ShareDialogProps,
  SpinnerBlock,
  SubmitReport,
  SupportersDialog,
  SupportersDialogProps,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { SubmitReportDialogProps } from '~/components/Dialogs/SubmitReportDialog/Dialog'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

import AddCollectionButton from './AddCollectionButton'
import ArchiveArticle from './ArchiveArticle'
import { ArchiveArticleDialogProps } from './ArchiveArticle/Dialog'
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
  { loading: () => <SpinnerBlock /> }
)

const DynamicToggleRecommendArticleDialog = dynamic(
  () => import('./ToggleRecommendArticle/Dialog'),
  { loading: () => <SpinnerBlock /> }
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
  hasIPFS: boolean
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
  inFixedToolbar,
  disabled,

  hasShare,
  hasIPFS,
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
  openToggleRecommendDialog,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const hasPublic = hasShare || hasIPFS || hasExtend || hasReport
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
            {icon ? icon : <Icon icon={IconMore} size={size} />}
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
            {icon ? icon : <Icon icon={IconMore} size={size} />}
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
