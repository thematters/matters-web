import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetPublishISCNProps,
  SetTagsProps,
  ToggleAccessProps,
  ToggleResponseProps,
} from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
  SearchExclude,
} from '~/gql/graphql'

import ArticleCustomStagingArea from '../ArticleCustomStagingArea'
import TagCustomStagingArea from '../TagCustomStagingArea'
import SettingsList, { SettingsListDialogButtons } from './List'

export type Step =
  | 'list'
  | 'cover'
  | 'tag'
  | 'collection'
  | 'circle'
  | 'confirm'
  | 'support'

export type ConfirmStepContentProps = {
  onBack: () => void
  closeDialog: () => void
}

export type EditorSettingsDialogProps = {
  saving: boolean
  disabled: boolean
  ConfirmStepContent: React.FC<ConfirmStepContentProps>

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & SetCoverProps &
  SetCollectionProps &
  SetTagsProps &
  ToggleAccessProps &
  ToggleResponseProps &
  SetPublishISCNProps &
  SettingsListDialogButtons

const DynamicEditorSearchSelectForm = dynamic(
  () => import('~/components/Forms/EditorSearchSelectForm'),
  { loading: () => <Spinner /> }
)

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: () => <Spinner />,
})

const DynamicSetSupportFeedback = dynamic(
  () => import('~/components/Editor/ToggleAccess/SupportSettingDialog/Content'),
  { loading: () => <Spinner /> }
)

const BaseEditorSettingsDialog = ({
  cover,
  editCover,
  assets,
  refetchAssets,
  entityId,
  entityType,
  coverSaving,

  collection,
  editCollection,
  collectionSaving,

  tags,
  editTags,
  tagsSaving,

  circle,
  editAccess,
  accessSaving,
  accessType,
  license,
  canToggleCircle,

  draft,
  article,
  editSupportSetting,
  supportSettingSaving,

  contentSensitive,
  toggleContentSensitive,
  contentSensitiveSaving,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  canComment,
  toggleComment,

  saving,
  disabled,
  confirmButtonText,
  cancelButtonText,
  ConfirmStepContent,
  onConfirm,

  children,
}: EditorSettingsDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)

  const initialStep = 'list'
  const { currStep, forward } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

  const isList = currStep === 'list'
  const isCover = currStep === 'cover'
  const isTag = currStep === 'tag'
  const isCollection = currStep === 'collection'
  // const isCircle = currStep === 'circle'
  const isConfirm = currStep === 'confirm'
  const isSupportSetting = currStep === 'support'
  const coverProps: SetCoverProps = {
    cover,
    editCover,
    assets,
    refetchAssets,
    entityId,
    entityType,
    coverSaving,
  }
  const accessProps: ToggleAccessProps = {
    circle,
    editAccess,
    accessSaving,
    accessType,
    license,
    canToggleCircle,
    contentSensitive,
    toggleContentSensitive,
    contentSensitiveSaving,
    iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,
    draft,
    article,
    editSupportSetting,
    supportSettingSaving,
    onOpenSupportSetting: () => {
      forward('support')
    },
  }

  const responseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment: article?.canComment,
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} hidePaddingBottom>
        {isList && (
          <SettingsList
            saving={saving}
            disabled={disabled}
            forward={forward}
            closeDialog={closeDialog}
            confirmButtonText={confirmButtonText}
            cancelButtonText={cancelButtonText}
            onConfirm={onConfirm}
            cover={cover}
            collectionCount={collection.length}
            tagsCount={tags.length}
            {...accessProps}
            {...responseProps}
          />
        )}

        {isCover && (
          <DynamicSetCover
            {...coverProps}
            back={() => forward('list')}
            closeDialog={closeDialog}
            submitCallback={() => forward('list')}
          />
        )}

        {isCollection && (
          <DynamicEditorSearchSelectForm
            title={
              <FormattedMessage defaultMessage="Collect Article" id="vX2bDy" />
            }
            hint={
              <FormattedMessage
                defaultMessage="Adding articles to a collection helps readers find your articles."
                id="XTyKFR"
              />
            }
            searchType="Article"
            searchExclude={SearchExclude.Blocked}
            onSave={async (nodes: SearchSelectNode[]) => {
              await editCollection(
                nodes as ArticleDigestDropdownArticleFragment[]
              )
            }}
            nodes={collection}
            saving={collectionSaving}
            back={() => forward('list')}
            closeDialog={closeDialog}
            submitCallback={() => forward('list')}
            CustomStagingArea={ArticleCustomStagingArea}
          />
        )}

        {isTag && (
          <DynamicEditorSearchSelectForm
            title={<FormattedMessage defaultMessage="Add Tag" id="GUW//c" />}
            hint={
              <FormattedMessage
                defaultMessage="Adding tags helps readers find your articles. Add or create new tags."
                id="NmhF45"
              />
            }
            searchType="Tag"
            onSave={async (nodes: SearchSelectNode[]) => {
              await editTags(nodes as DigestTagFragment[])
              forward('list')
            }}
            nodes={tags}
            saving={tagsSaving}
            createTag
            back={() => forward('list')}
            closeDialog={closeDialog}
            submitCallback={() => forward('list')}
            CustomStagingArea={TagCustomStagingArea}
          />
        )}

        {isSupportSetting && (
          <DynamicSetSupportFeedback
            back={() => forward('list')}
            submitCallback={() => forward('list')}
            closeDialog={closeDialog}
            article={article}
            draft={draft}
            editSupportSetting={editSupportSetting}
            supportSettingSaving={supportSettingSaving}
          />
        )}

        {isConfirm && (
          <ConfirmStepContent
            onBack={() => forward('list')}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const EditorSettingsDialog = (props: EditorSettingsDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditorSettingsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
