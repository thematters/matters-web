import classNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  MAX_META_SUMMARY_LENGTH,
} from '~/common/enums'
import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { capitalizeFirstLetter, makeSummary } from '~/common/utils'
import {
  AddCollectionsArticleDialog,
  AddCollectionsArticleDialogProps,
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
  Spinner,
  SpinnerBlock,
  SubmitReport,
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
import ArchiveArticle from './ArchiveArticle'
import { ArchiveArticleDialogProps } from './ArchiveArticle/Dialog'
import BanCampaignArticleButton from './BanCampaignArticleButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import { fragments } from './gql'
import IPFSButton from './IPFSButton'
import PinButton from './PinButton'
import RemoveArticleCollectionButton from './RemoveArticleCollectionButton'
import SetArticleChannels from './SetArticleChannels'
import { SetArticleChannelsDialogProps } from './SetArticleChannels/Dialog'
import SetBottomCollectionButton from './SetBottomCollectionButton'
import SetTopCollectionButton from './SetTopCollectionButton'
import ShareButton from './ShareButton'
import styles from './styles.module.css'
import ToggleCampaignFeaturedButton from './ToggleCampaignFeaturedButton'
import type {
  OpenToggleRecommendArticleDialogWithProps,
  ToggleRecommendArticleDialogProps,
} from './ToggleRecommendArticle/Dialog'

const isAdminView = process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

const DynamicSetArticleChannelsButton = dynamic(
  () => import('./SetArticleChannels/Button'),
  { loading: () => <SpinnerBlock /> }
)
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

const DynamicTogglePinChannelArticlesButton = dynamic(
  () => import('./TogglePinChannelArticles'),
  {
    loading: () => <Spinner />,
  }
)

export interface DropdownActionsControls {
  icon?: React.ReactNode
  size?: IconSize
  color?: 'greyDark' | 'black'
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
  inUserArticles?: boolean

  // tag
  tagDetailId?: string

  // campaign
  campaignId?: string
  campaignFeatured?: boolean
  hasToggleCampaignFeatured?: boolean
  hasBanCampaignArticle?: boolean

  // channel
  channelId?: string
  pinned?: boolean
  hasTogglePinChannelArticles?: boolean

  hasArchive?: boolean
  hasEdit?: boolean
  hasBookmark?: boolean

  collectionId?: string
  collectionArticleCount?: number
  hasAddCollection?: boolean
  hasRemoveCollection?: boolean
  hasSetTopCollection?: boolean
  hasSetBottomCollection?: boolean

  morePublicActions?: React.ReactNode
}

type DropdownActionsProps = {
  article: DropdownActionsArticleFragment
} & DropdownActionsControls &
  Omit<TrackEventProps, 'type'>

interface Controls {
  hasShare: boolean
  hasIPFS: boolean
  hasExtend: boolean
  hasReport: boolean
  hasSticky: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openSubmitReportDialog: () => void
  openArchiveDialog: () => void
  openAddCollectionsArticleDialog: () => void
  openRemoveArticleCollectionDialog: () => void
  openSetArticleChannelsDialog: () => void
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

  collectionId,
  collectionArticleCount,

  // channel
  channelId,
  pinned,
  hasTogglePinChannelArticles,

  campaignId,
  campaignFeatured,

  icon,
  size,
  color = 'greyDark',
  inCard,
  disabled,

  hasShare,
  hasIPFS,
  hasExtend,
  hasReport,
  hasSticky,
  hasArchive,
  hasToggleCampaignFeatured,
  hasBanCampaignArticle,
  hasEdit,
  hasBookmark,
  hasAddCollection,
  hasRemoveCollection,
  hasSetTopCollection,
  hasSetBottomCollection,

  openShareDialog,
  openSubmitReportDialog,
  openArchiveDialog,
  openAddCollectionsArticleDialog,
  openRemoveArticleCollectionDialog,

  // admin
  openToggleRecommendArticleDialog,
  openToggleRestrictUserDialog,
  openArchiveUserDialog,
  openSetArticleChannelsDialog,

  // tracker
  pageType,
  pageComponent,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)

  const isAuth = viewer.isAuthed
  const isAuthor = viewer.id === article.author.id

  const trackEventProps = { pageType, pageComponent }

  const Content = () => (
    <Menu>
      {/**********
       * Public
       ************/}

      {/* article detail */}
      {hasShare && (
        <ShareButton openDialog={openShareDialog} {...trackEventProps} />
      )}
      {hasExtend && <ExtendButton article={article} />}

      {/* user articles */}
      {hasSticky && <PinButton article={article} />}

      {/* all pages */}
      {hasBookmark && isAuth && (
        <BookmarkButton article={article} inCard={inCard} iconSize={20} />
      )}

      {/* user articles */}
      {hasIPFS && <IPFSButton article={article} {...trackEventProps} />}

      {/* article detail */}
      {hasReport && isAuth && !isAuthor && (
        <SubmitReport.Button
          openDialog={openSubmitReportDialog}
          {...{ type: 'report_article_open', ...trackEventProps }}
        />
      )}
      {hasEdit && <EditButton article={article} />}

      {/* user articles */}
      {hasAddCollection && (
        <AddCollectionButton openDialog={openAddCollectionsArticleDialog} />
      )}
      {hasArchive && (
        <>
          <Menu.Divider />
          <ArchiveArticle.Button openDialog={openArchiveDialog} />
        </>
      )}

      {/* collection detail */}
      {(hasSetTopCollection || hasSetBottomCollection) &&
        collectionId &&
        collectionArticleCount && (
          <>
            <Menu.Divider />
            {hasSetTopCollection && (
              <SetTopCollectionButton
                articleId={article.id}
                collectionId={collectionId}
              />
            )}
            {hasSetBottomCollection && (
              <SetBottomCollectionButton
                articleId={article.id}
                collectionId={collectionId}
                collectionArticleCount={collectionArticleCount}
              />
            )}
          </>
        )}
      {hasRemoveCollection && (
        <>
          <Menu.Divider />
          <RemoveArticleCollectionButton
            openDialog={openRemoveArticleCollectionDialog}
          />
        </>
      )}

      {/* campaign detail */}
      {hasToggleCampaignFeatured && campaignId && (
        <ToggleCampaignFeaturedButton
          articleId={article.id}
          campaignId={campaignId}
          campaignFeatured={!!campaignFeatured}
        />
      )}
      {hasBanCampaignArticle && campaignId && (
        <>
          <Menu.Divider />
          <BanCampaignArticleButton
            articleId={article.id}
            campaignId={campaignId}
          />
        </>
      )}

      {/**********
       * Admin
       ************/}
      {isAdminView && viewer.isAdmin && (
        <>
          <Menu.Divider />
          <DynamicSetArticleChannelsButton
            openDialog={openSetArticleChannelsDialog}
          />
          {hasTogglePinChannelArticles && channelId && (
            <DynamicTogglePinChannelArticlesButton
              articleId={article.id}
              channelId={channelId}
              pinned={!!pinned}
            />
          )}
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

  const moreButtonClasses = classNames({
    [styles.moreButton]: true,
    [styles[`text${capitalizeFirstLetter(color)}`]]: !!color,
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
            className={moreButtonClasses}
          >
            {icon ? icon : <Icon icon={IconMore} size={size} />}
          </button>
        ) : (
          <Button
            onClick={openDropdown}
            spacing={[8, 8]}
            borderRadius={'5rem'}
            bgActiveColor={'greyLighter'}
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
    hasEdit: !!hasEdit && isActive && isArticleAuthor,
    hasBookmark: !!hasBookmark,
    hasAddCollection: hasAddCollection && isActive && isArticleAuthor,
    hasRemoveCollection: hasRemoveCollection && isActive && isArticleAuthor,
    hasSetTopCollection: hasSetTopCollection && isActive && isArticleAuthor,
    hasSetBottomCollection:
      hasSetBottomCollection && isActive && isArticleAuthor,
  }

  if (_isEmpty(_pickBy(controls)) && !viewer.isAdmin) {
    return null
  }

  const WithShareDialog = withDialog<Omit<ShareDialogProps, 'children'>>(
    BaseDropdownActions,
    ShareDialog,
    {
      title: article.author.displayName
        ? `${makeSummary(article.title, MAX_META_SUMMARY_LENGTH)} - ${article.author.displayName} - Matters`
        : `${makeSummary(article.title, MAX_META_SUMMARY_LENGTH)} - Matters`,
      path: props.sharePath,
    },
    ({ openDialog }) => ({ ...props, ...controls, openShareDialog: openDialog })
  )
  const WithReport = withDialog<Omit<SubmitReportDialogProps, 'children'>>(
    WithShareDialog,
    SubmitReport.Dialog,
    { id: article.id },
    ({ openDialog }) => ({ openSubmitReportDialog: openDialog })
  )
  const WithArchiveArticle = withDialog<
    Omit<ArchiveArticleDialogProps, 'children'>
  >(WithReport, ArchiveArticle.Dialog, { article }, ({ openDialog }) => ({
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
  const WithSetArticleChannels = withDialog<
    Omit<SetArticleChannelsDialogProps, 'children'>
  >(
    WithRemoveArticleCollection,
    SetArticleChannels.Dialog,
    { article },
    ({ openDialog }) => ({
      openSetArticleChannelsDialog: openDialog,
    })
  )

  const WithToggleRecommendArticle = withDialog<
    Omit<ToggleRecommendArticleDialogProps, 'children'>
  >(
    WithSetArticleChannels,
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
