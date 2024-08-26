import { ENTITY_TYPE } from '~/common/enums'
import { toDigestTagPlaceholder } from '~/components'
import {
  MoreSettingsProps,
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
} from '~/components/Editor'
import BottomBar from '~/components/Editor/BottomBar'
import SupportSettingDialog from '~/components/Editor/MoreSettings/SupportSettingDialog'
import {
  getSelectCampaign,
  SelectCampaignProps,
} from '~/components/Editor/SelectCampaign'
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
} from './hooks'

interface BottomBarProps {
  draft: EditMetaDraftFragment
  ownCircles?: DigestRichCirclePublicFragment[]
  campaigns?: EditorSelectCampaignFragment[]
}

const EditDraftBottomBar = ({
  draft,
  ownCircles,
  campaigns,
}: BottomBarProps) => {
  const { edit: editCollection, saving: collectionSaving } =
    useEditDraftCollection()
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover()
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags()
  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor()
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN()

  const { edit: toggleComment, saving: toggleCommentSaving } =
    useEditDraftCanComment()
  const canComment = draft.canComment

  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )

  const { edit: editSupport, saving: supportSaving } = useEditSupportSetting()

  const { edit: editCampaign, saving: campaignSaving } = useEditDraftCampaign()

  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)

  const { appliedCampaign, selectedStage } = getSelectCampaign({
    applied: campaigns && campaigns[0],
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

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
  const accessProps: MoreSettingsProps &
    SetResponseProps &
    Partial<SelectCampaignProps> = {
    circle: draft?.access.circle,
    accessType: draft.access.type,
    license: draft.license,
    editAccess,
    accessSaving,
    canToggleCircle: !!hasOwnCircle,
    contentSensitive: draft.sensitiveByAuthor,
    toggleContentSensitive,
    contentSensitiveSaving,
    iscnPublish: draft.iscnPublish,
    draft,
    editSupportSetting: editSupport,
    supportSettingSaving: supportSaving,
    togglePublishISCN,
    iscnPublishSaving,
    onOpenSupportSetting: () => undefined,

    canComment,
    toggleComment,

    appliedCampaign,
    selectedStage,
    editCampaign,
  }

  return (
    <SupportSettingDialog
      draft={draft}
      editSupportSetting={editSupport}
      supportSettingSaving={supportSaving}
    >
      {({ openDialog }) => (
        <BottomBar
          saving={false}
          disabled={
            collectionSaving ||
            coverSaving ||
            tagsSaving ||
            accessSaving ||
            toggleCommentSaving ||
            campaignSaving
          }
          {...coverProps}
          {...tagsProps}
          {...collectionProps}
          {...accessProps}
          onOpenSupportSetting={openDialog}
        />
      )}
    </SupportSettingDialog>
  )
}

export default EditDraftBottomBar
