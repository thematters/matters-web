import gql from 'graphql-tag'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import _some from 'lodash/some'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  AppreciatorsDialog,
  Button,
  DropdownDialog,
  FingerprintDialog,
  IconColor,
  IconMore,
  IconSize,
  Menu,
  ViewerContext,
} from '~/components'

import { TEXT } from '~/common/enums'
import { getQuery } from '~/common/utils'

import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import StickyButton from './StickyButton'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  color?: IconColor
  size?: IconSize
  inCard?: boolean
  inUserArticles?: boolean
  inTagDetailLatest?: boolean
  inTagDetailSelected?: boolean
  editArticle?: () => any
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface Controls {
  hasAppreciators: boolean
  hasFingerprint: boolean
  hasExtend: boolean
  hasSticky: boolean
  hasArchive: boolean
  hasSetTagSelected: boolean
  hasSetTagUnSelected: boolean
  hasRemoveTag: boolean
}

interface DialogProps {
  openFingerprintDialog: () => void
  openAppreciatorsDialog: () => void
  openArchiveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...AppreciatorsDialogArticle
      ...FingerprintArticle
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
      ...RemoveTagButtonArticle
      ...SetTagSelectedButtonArticle
      ...SetTagUnselectedButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${FingerprintDialog.fragments.article}
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${RemoveTagButton.fragments.article}
    ${SetTagSelectedButton.fragments.article}
    ${SetTagUnselectedButton.fragments.article}
  `,
}

const BaseDropdownActions = ({
  article,
  color = 'grey',
  size,
  inCard,
  editArticle,

  hasAppreciators,
  hasFingerprint,
  hasExtend,
  hasSticky,
  hasArchive,
  hasSetTagSelected,
  hasSetTagUnSelected,
  hasRemoveTag,

  openFingerprintDialog,
  openAppreciatorsDialog,
  openArchiveDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasAppreciators && (
        <AppreciatorsButton openDialog={openAppreciatorsDialog} />
      )}
      {hasFingerprint && (
        <FingerprintButton openDialog={openFingerprintDialog} />
      )}
      {hasExtend && <ExtendButton article={article} />}

      {/* private */}
      {(hasSticky ||
        hasArchive ||
        hasSetTagSelected ||
        hasSetTagUnSelected ||
        hasRemoveTag) && <Menu.Divider spacing="xtight" />}
      {hasSticky && <StickyButton article={article} />}
      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}
      {hasSetTagSelected && <SetTagSelectedButton article={article} />}
      {hasSetTagUnSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTag && <RemoveTagButton article={article} />}
      {editArticle && <EditButton editArticle={editArticle} />}
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
          <IconMore color={color} size={size} />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const {
    article,
    inUserArticles,
    inTagDetailLatest,
    inTagDetailSelected,
  } = props
  const router = useRouter()
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected

  // check permission if in tag detail
  let canEditTag = false
  if (isInTagDetail) {
    const tagId = getQuery({ router, key: 'tagId' })
    const tag = _find(article.tags || [], (item) => item.id === tagId)
    const isEditor = _some(
      tag?.editors || [],
      (editor) => editor.id === viewer.id
    )
    const isCreator = tag?.creator?.id === viewer.id
    canEditTag =
      isEditor || isCreator || viewer.info.email === 'hi@matters.news'
  }

  const controls = {
    hasAppreciators: article.appreciationsReceived.totalCount > 0,
    hasFingerprint: isActive || isArticleAuthor,
    hasExtend: !!isActive,
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
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <FingerprintDialog article={article}>
      {({ open: openFingerprintDialog }) => (
        <AppreciatorsDialog article={article}>
          {({ open: openAppreciatorsDialog }) => (
            <ArchiveArticle.Dialog article={article}>
              {({ open: openArchiveDialog }) => (
                <BaseDropdownActions
                  {...props}
                  {...controls}
                  openFingerprintDialog={openFingerprintDialog}
                  openAppreciatorsDialog={openAppreciatorsDialog}
                  openArchiveDialog={openArchiveDialog}
                />
              )}
            </ArchiveArticle.Dialog>
          )}
        </AppreciatorsDialog>
      )}
    </FingerprintDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
