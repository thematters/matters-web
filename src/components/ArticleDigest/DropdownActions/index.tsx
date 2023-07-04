import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  AppreciatorsDialog,
  BookmarkButton,
  Button,
  CollectionSelectDialog,
  Dropdown,
  FingerprintDialog,
  IconMore16,
  IconSize,
  LanguageContext,
  Menu,
  ShareDialog,
  SupportersDialog,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

import AddCollectionButton from './AddCollectionButton'
import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import DonatorsButton from './DonatorsButton'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import PinButton from './PinButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import ShareButton from './ShareButton'
import styles from './styles.module.css'

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
  hasAddCollection?: boolean

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
  openCollectionSelectDialog: () => void
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
  hasBookmark,
  hasAddCollection,

  openShareDialog,
  openFingerprintDialog,
  openAppreciatorsDialog,
  openSupportersDialog,
  openArchiveDialog,
  openCollectionSelectDialog,
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
      {morePublicActions}

      {/* private */}
      {hasPublic && hasPrivate && <Menu.Divider />}
      {hasEdit && <EditButton article={article} />}
      {hasAddCollection && (
        <AddCollectionButton openDialog={openCollectionSelectDialog} />
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
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) =>
        inCard ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              openDropdown()
            }}
            aria-label={translate({ id: 'moreActions', lang })}
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
            aria-label={translate({ id: 'moreActions', lang })}
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
    morePublicActions,

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
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.articleState === 'active'

  const forbid = () => {
    toast.error({
      message: <Translate id="FORBIDDEN_BY_STATE" />,
    })
  }

  const controls = {
    // public
    hasShare: !!hasShare,
    hasAppreciators: article.likesReceived.totalCount > 0 && !inCard,
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
    hasArchive:
      !!hasArchive && isArticleAuthor && isActive && !viewer.isArchived,
    hasSetTagSelected: !!hasSetTagSelected,
    hasSetTagUnselected: !!hasSetTagUnselected,
    hasRemoveTag: !!hasRemoveTag,
    hasEdit: !!hasEdit && isActive && isArticleAuthor,
    hasBookmark: !!hasBookmark,
    hasAddCollection: hasAddCollection && isActive && isArticleAuthor,
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
                <SupportersDialog article={article}>
                  {({ openDialog: openSupportersDialog }) => (
                    <ArchiveArticle.Dialog article={article}>
                      {({ openDialog: openArchiveDialog }) => (
                        <CollectionSelectDialog articleId={article.id}>
                          {({ openDialog: openCollectionSelectDialog }) => (
                            <BaseDropdownActions
                              {...props}
                              {...controls}
                              openShareDialog={openShareDialog}
                              openFingerprintDialog={openFingerprintDialog}
                              openAppreciatorsDialog={openAppreciatorsDialog}
                              openSupportersDialog={openSupportersDialog}
                              openArchiveDialog={
                                viewer.isFrozen ? forbid : openArchiveDialog
                              }
                              openCollectionSelectDialog={
                                openCollectionSelectDialog
                              }
                            />
                          )}
                        </CollectionSelectDialog>
                      )}
                    </ArchiveArticle.Dialog>
                  )}
                </SupportersDialog>
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
