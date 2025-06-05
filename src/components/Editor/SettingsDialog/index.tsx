import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, SpinnerBlock, useDialogSwitch, useStep } from '~/components'
import {
  MoreSettingsProps,
  SetConnectionProps,
  SetCoverProps,
  SetPublishISCNProps,
  SetTagsProps,
  SetVersionDescriptionProps,
  ToggleResponseProps,
} from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
  SearchExclude,
} from '~/gql/graphql'

import ArticleCustomStagingArea from '../ArticleCustomStagingArea'
import { SelectCampaignProps } from '../SelectCampaign'
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
  | 'versionDescription'

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
  SetConnectionProps &
  SetTagsProps &
  MoreSettingsProps &
  ToggleResponseProps &
  SetPublishISCNProps &
  SettingsListDialogButtons &
  Partial<SetVersionDescriptionProps> &
  Partial<SelectCampaignProps>

const DynamicEditorSearchSelectForm = dynamic(
  () => import('~/components/Forms/EditorSearchSelectForm'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: () => <SpinnerBlock />,
})

const DynamicSetSupportFeedback = dynamic(
  () => import('~/components/Editor/MoreSettings/SupportSettingDialog/Content'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicSetVersionDescription = dynamic(
  () => import('~/components/Editor/SetVersionDescription/Content'),
  { loading: () => <SpinnerBlock /> }
)

const BaseEditorSettingsDialog = ({
  cover,
  editCover,
  assets,
  refetchAssets,
  entityId,
  entityType,
  coverSaving,

  connection,
  editConnection,
  connectionSaving,

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

  versionDescription,
  editVersionDescription,

  contentSensitive,
  toggleContentSensitive,
  contentSensitiveSaving,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  campaigns,
  selectedCampaign,
  selectedStage,
  editCampaign,

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
  const isVersionDescription = currStep === 'versionDescription'
  const coverProps: SetCoverProps = {
    cover,
    editCover,
    assets,
    refetchAssets,
    entityId,
    entityType,
    coverSaving,
  }
  const accessProps: MoreSettingsProps = {
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

  const campaignProps: Partial<SelectCampaignProps> = {
    campaigns,
    selectedCampaign,
    selectedStage,
    editCampaign,
  }

  const responseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment: article?.canComment,
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
        {isList && (
          <SettingsList
            saving={saving}
            disabled={disabled}
            forward={forward}
            closeDialog={closeDialog}
            confirmButtonText={confirmButtonText}
            cancelButtonText={cancelButtonText}
            onConfirm={onConfirm}
            versionDescription={versionDescription}
            hasSetVersionDescription={!!editVersionDescription}
            cover={cover}
            connectionCount={connection.length}
            tagsCount={tags.length}
            {...accessProps}
            {...campaignProps}
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
              await editConnection(
                nodes as ArticleDigestDropdownArticleFragment[]
              )
            }}
            nodes={connection}
            saving={connectionSaving}
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

        {isVersionDescription && editVersionDescription && (
          <DynamicSetVersionDescription
            description={versionDescription!}
            editDescription={editVersionDescription}
            back={() => forward('list')}
            submitCallback={() => forward('list')}
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
