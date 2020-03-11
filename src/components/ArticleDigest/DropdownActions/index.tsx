import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  Icon,
  IconColor,
  IconSize,
  Menu,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

import Appreciators from './Appreciators'
import ArchiveArticle from './ArchiveArticle'
import ExtendButton from './ExtendButton'
import Fingerprint from './Fingerprint'
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
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface Controls {
  hasAppreciators: boolean
  hasFingerprint: boolean
  hasExtend: boolean
  hasRemoveTag: boolean
  hasSticky: boolean
  hasArchive: boolean
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
      ...AppreciatorsArticle
      ...FingerprintArticle
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
    }
    ${Appreciators.Dialog.fragments.article}
    ${Fingerprint.Dialog.fragments.article}
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
  `
}

const BaseDropdownActions = ({
  article,
  color = 'grey',
  size,

  hasAppreciators,
  hasFingerprint,
  hasExtend,
  hasSticky,
  hasArchive,
  hasRemoveTag,
  inCard,
  inTagDetailLatest,
  inTagDetailSelected,

  openFingerprintDialog,
  openAppreciatorsDialog,
  openArchiveDialog
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasAppreciators && (
        <Appreciators.Button openDialog={openAppreciatorsDialog} />
      )}
      {hasFingerprint && (
        <Fingerprint.Button openDialog={openFingerprintDialog} />
      )}
      {hasExtend && <ExtendButton article={article} />}

      {/* private */}
      {(hasSticky ||
        hasArchive ||
        inTagDetailLatest ||
        inTagDetailSelected ||
        hasRemoveTag) && <Menu.Divider spacing="xtight" />}
      {hasSticky && <StickyButton article={article} />}
      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}
      {inTagDetailLatest && <SetTagSelectedButton article={article} />}
      {inTagDetailSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTag && <RemoveTagButton article={article} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions'
      }}
    >
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'green-lighter'}
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Icon.More color={color} size={size} />
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
    inTagDetailSelected
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected

  const controls = {
    hasAppreciators: article.appreciationsReceived.totalCount > 0,
    hasFingerprint: isActive || isArticleAuthor,
    hasExtend: !!isActive,
    hasRemoveTag: !!(isInTagDetail && isMattyUser),
    hasSticky: !!(
      inUserArticles &&
      isArticleAuthor &&
      isActive &&
      !viewer.isInactive
    ),
    hasArchive:
      isArticleAuthor && !isInTagDetail && isActive && !viewer.isInactive
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <Fingerprint.Dialog article={article}>
      {({ open: openFingerprintDialog }) => (
        <Appreciators.Dialog article={article}>
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
        </Appreciators.Dialog>
      )}
    </Fingerprint.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
