import { FormattedMessage } from 'react-intl'

import { ENTITY_TYPE } from '~/common/enums'
import { Button, TextIcon, toast, toDigestTagPlaceholder } from '~/components'
import {
  MoreSettingsProps,
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
} from '~/components/Editor'
import {
  getSelectCampaigns,
  SelectCampaignProps,
} from '~/components/Editor/SelectCampaign'
import { EditorSettingsDialog } from '~/components/Editor/SettingsDialog'
import {
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import {
  useEditDraftAccess,
  useEditDraftCampaign,
  useEditDraftCanComment,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftPublishISCN,
  useEditDraftSensitiveByAuthor,
  useEditDraftTags,
  useEditSupportSetting,
} from '../hooks'
import ConfirmPublishDialogContent from './ConfirmPublishDialogContent'

interface SettingsButtonProps {
  draft: EditMetaDraftFragment
  ownCircles?: DigestRichCirclePublicFragment[]
  campaigns?: EditorSelectCampaignFragment[]
  publishable?: boolean
}

const ConfirmButton = ({
  openDialog,
  disabled,
}: {
  openDialog: () => void
  disabled?: boolean
}) => (
  <Button
    size={[null, '2rem']}
    spacing={[0, 16]}
    bgColor="green"
    onClick={openDialog}
    disabled={disabled}
    aria-haspopup="dialog"
  >
    <TextIcon color="white" size={16} weight="medium">
      <FormattedMessage defaultMessage="Publish" id="syEQFE" />
    </TextIcon>
  </Button>
)

const SettingsButton = ({
  draft,
  ownCircles,
  campaigns,
  publishable,
}: SettingsButtonProps) => {
  const { edit: editCollection, saving: collectionSaving } =
    useEditDraftCollection()
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover()
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags()
  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor()
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN()
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )
  const { edit: editCampaign } = useEditDraftCampaign()

  const { edit: editSupport, saving: supportSaving } = useEditSupportSetting()

  const { edit: toggleComment, saving: canCommentSaving } =
    useEditDraftCanComment()
  const canComment = draft.canComment

  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  const coverProps: SetCoverProps = {
    cover: draft.cover,
    assets: draft.assets,
    editCover,
    refetchAssets: refetch,
    entityId: draft.id,
    entityType: ENTITY_TYPE.draft,
    coverSaving,
  }
  const tagsProps: SetTagsProps = {
    tags,
    editTags,
    tagsSaving,
  }
  const collectionProps: SetCollectionProps = {
    collection: draft?.collection?.edges?.map(({ node }) => node) || [],
    editCollection,
    collectionSaving,
  }
  const accessProps: MoreSettingsProps = {
    circle: draft?.access.circle,
    accessType: draft.access.type,
    license: draft.license,
    editAccess,
    accessSaving,
    canToggleCircle: !!hasOwnCircle,
    draft,
    editSupportSetting: editSupport,
    supportSettingSaving: supportSaving,
    onOpenSupportSetting: () => undefined,
    contentSensitive: draft.sensitiveByAuthor,
    toggleContentSensitive,
    contentSensitiveSaving,
    iscnPublish: draft.iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,
  }

  const {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
  } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  const campaignProps: Partial<SelectCampaignProps> = {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
    editCampaign,
  }

  const responseProps: SetResponseProps = {
    canComment,
    toggleComment,
  }

  return (
    <EditorSettingsDialog
      saving={false}
      disabled={
        collectionSaving ||
        coverSaving ||
        tagsSaving ||
        accessSaving ||
        canCommentSaving
      }
      confirmButtonText={
        <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
      }
      cancelButtonText={
        <FormattedMessage defaultMessage="Save as Draft" id="E048/V" />
      }
      ConfirmStepContent={ConfirmPublishDialogContent}
      {...coverProps}
      {...tagsProps}
      {...collectionProps}
      {...accessProps}
      {...responseProps}
      {...campaignProps}
    >
      {({ openDialog: openEditorSettingsDialog }) => (
        <ConfirmButton
          openDialog={() => {
            const hasCampaign = !!selectedCampaign
            const hasCircle = !!draft.access.circle

            if (hasCampaign && hasCircle) {
              toast.error({
                message: (
                  <FormattedMessage
                    defaultMessage="Article cannot be added to event or circle at the same time"
                    id="cPXsvZ"
                  />
                ),
              })
              return
            }

            openEditorSettingsDialog()
          }}
          disabled={disabled}
        />
      )}
    </EditorSettingsDialog>
  )
}

export default SettingsButton
