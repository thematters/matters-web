import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetPublishISCNProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import TagCustomStagingArea from '../TagCustomStagingArea'
import SettingsList, { SettingsListDialogButtons } from './List'

import { SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

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
  SetPublishISCNProps &
  SettingsListDialogButtons

const DynamicSearchSelectForm = dynamic(
  () => import('~/components/Forms/SearchSelectForm'),
  { loading: Spinner }
)

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: Spinner,
})

const DynamicSetSupportFeedback = dynamic(
  () => import('~/components/Editor/ToggleAccess/SupportSettingDialog/Content'),
  { loading: Spinner }
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
  viewer,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

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
    iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,
    draft,
    article,
    editSupportSetting,
    supportSettingSaving,
    viewer,
    onOpenSupportSetting: () => {
      forward('support')
    },
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
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
          />
        )}

        {isCover && (
          <DynamicSetCover onBack={() => forward('list')} {...coverProps} />
        )}

        {isCollection && (
          <DynamicSearchSelectForm
            title="collectArticle"
            hint="hintEditCollection"
            headerLeftButton={
              <Dialog.Header.BackButton onClick={() => forward('list')} />
            }
            searchType="Article"
            searchExclude={SearchExclude.blocked}
            onSave={async (nodes: SearchSelectNode[]) => {
              await editCollection(nodes as ArticleDigestDropdownArticle[])
              forward('list')
            }}
            nodes={collection}
            saving={collectionSaving}
            closeDialog={closeDialog}
          />
        )}

        {isTag && (
          <DynamicSearchSelectForm
            title="addTag"
            hint="hintAddTag"
            headerLeftButton={
              <Dialog.Header.BackButton onClick={() => forward('list')} />
            }
            searchType="Tag"
            onSave={async (nodes: SearchSelectNode[]) => {
              await editTags(nodes as DigestTag[])
              forward('list')
            }}
            nodes={tags}
            saving={tagsSaving}
            createTag
            closeDialog={closeDialog}
            CustomStagingArea={TagCustomStagingArea}
          />
        )}

        {isSupportSetting && (
          <DynamicSetSupportFeedback
            onBack={() => forward('list')}
            article={article}
            draft={draft}
            viewer={viewer}
            editSupportSetting={editSupportSetting}
            supportSettingSaving={supportSettingSaving}
            closeDialog={closeDialog}
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
