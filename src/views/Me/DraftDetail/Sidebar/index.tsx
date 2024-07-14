import { ENTITY_TYPE } from '~/common/enums'
import { toDigestTagPlaceholder } from '~/components'
import Sidebar from '~/components/Editor/Sidebar'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'
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
import styles from './styles.module.css'

interface BaseSidebarProps {
  draft: EditMetaDraftFragment
  campaigns?: EditorSelectCampaignFragment[]
  ownCircles?: DigestRichCirclePublicFragment[]
}

type SidebarProps = BaseSidebarProps & { disabled: boolean }

const EditDraftCollection = ({ draft, disabled }: SidebarProps) => {
  const { edit, saving } = useEditDraftCollection()
  const articles = draft?.collection?.edges?.map(({ node }) => node) || []

  return (
    <Sidebar.Collection
      collection={articles}
      editCollection={edit}
      collectionSaving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftCover = ({ draft, disabled }: SidebarProps) => {
  const { edit, refetch, saving } = useEditDraftCover()

  return (
    <Sidebar.Cover
      cover={draft.cover}
      assets={draft.assets}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      editCover={edit}
      refetchAssets={refetch}
      coverSaving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftTags = ({ draft, disabled }: SidebarProps) => {
  const { edit, saving } = useEditDraftTags()
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)

  return (
    <Sidebar.Tags
      tags={tags}
      editTags={edit}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftCircle = ({ draft, ownCircles }: SidebarProps) => {
  const { edit, saving } = useEditDraftAccess(ownCircles && ownCircles[0])

  const { edit: editSupport, saving: supportSaving } = useEditSupportSetting()

  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN()

  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor()

  const hasOwnCircle = ownCircles && ownCircles.length >= 1

  return (
    <SupportSettingDialog
      draft={draft}
      editSupportSetting={editSupport}
      supportSettingSaving={supportSaving}
    >
      {({ openDialog }) => (
        <Sidebar.Management
          circle={draft?.access.circle}
          accessType={draft.access.type}
          license={draft.license}
          editAccess={edit}
          accessSaving={saving}
          canToggleCircle={!!hasOwnCircle}
          contentSensitive={draft?.sensitiveByAuthor}
          toggleContentSensitive={toggleContentSensitive}
          contentSensitiveSaving={contentSensitiveSaving}
          iscnPublish={draft?.iscnPublish}
          togglePublishISCN={togglePublishISCN}
          iscnPublishSaving={iscnPublishSaving}
          draft={draft}
          editSupportSetting={editSupport}
          supportSettingSaving={supportSaving}
          onOpenSupportSetting={openDialog}
        />
      )}
    </SupportSettingDialog>
  )
}

const EditDraftResponse = ({ draft }: SidebarProps) => {
  const { edit: toggleComment } = useEditDraftCanComment()
  const canComment = draft.canComment

  return (
    <Sidebar.Response canComment={canComment} toggleComment={toggleComment} />
  )
}

const EditDraftCampaign = ({ draft, campaigns }: SidebarProps) => {
  const { edit } = useEditDraftCampaign()

  const appliedCampaign = campaigns && campaigns[0]
  const selectedCampaign = draft.campaigns.filter(
    (c) => c.campaign.id === appliedCampaign?.id
  )[0]
  const selectedStage = selectedCampaign?.stage?.id

  return (
    <Sidebar.Campaign
      selectedCampaign={appliedCampaign}
      selectedStage={selectedStage}
      editCampaign={edit}
    />
  )
}

const EditDraftSidebar = (props: BaseSidebarProps) => {
  const isPending = props.draft.publishState === 'pending'
  const isPublished = props.draft.publishState === 'published'
  const disabled = isPending || isPublished

  return (
    <section className={styles.sidebar}>
      <EditDraftCampaign {...props} disabled={disabled} />
      <EditDraftTags {...props} disabled={disabled} />
      <EditDraftCover {...props} disabled={disabled} />
      <EditDraftCollection {...props} disabled={disabled} />
      <EditDraftResponse {...props} disabled={disabled} />
      <EditDraftCircle {...props} disabled={disabled} />
    </section>
  )
}

export default EditDraftSidebar
