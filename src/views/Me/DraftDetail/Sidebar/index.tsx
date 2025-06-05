import { ENTITY_TYPE } from '~/common/enums'
import { toDigestTagPlaceholder } from '~/components'
import SupportSettingDialog from '~/components/Editor/MoreSettings/SupportSettingDialog'
import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import Sidebar from '~/components/Editor/Sidebar'
import {
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import {
  useEditDraftAccess,
  useEditDraftCampaign,
  useEditDraftCanComment,
  useEditDraftConnections,
  useEditDraftCover,
  useEditDraftPublishISCN,
  useEditDraftSensitiveByAuthor,
  useEditDraftTags,
  useEditIndent,
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
  const { edit, saving } = useEditDraftConnections()
  const articles = draft?.collection?.edges?.map(({ node }) => node) || []

  return (
    <Sidebar.Connection
      connection={articles}
      editConnection={edit}
      connectionSaving={saving}
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

const EditDraftIndent = ({ draft }: SidebarProps) => {
  const { edit: toggleIndent, saving: indentSaving } = useEditIndent()
  const indented = draft.indentFirstLine

  return (
    <Sidebar.Indent
      indented={indented}
      toggleIndent={toggleIndent}
      indentSaving={indentSaving}
    />
  )
}

const EditDraftCampaign = ({ draft, campaigns }: SidebarProps) => {
  const { edit } = useEditDraftCampaign()

  const {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
  } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  return (
    <Sidebar.Campaign
      campaigns={selectableCampaigns}
      selectedCampaign={selectedCampaign}
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
      <EditDraftCover {...props} disabled={disabled} />
      <EditDraftIndent {...props} disabled={disabled} />
      <EditDraftTags {...props} disabled={disabled} />
      <EditDraftCollection {...props} disabled={disabled} />
      <EditDraftResponse {...props} disabled={disabled} />
      <EditDraftCircle {...props} disabled={disabled} />
    </section>
  )
}

export default EditDraftSidebar
