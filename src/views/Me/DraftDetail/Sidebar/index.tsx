import { toDigestTagPlaceholder } from '~/components'
import Sidebar from '~/components/Editor/Sidebar'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftAccess,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftPublishISCN,
  useEditDraftTags,
  useEditSupportSetting,
} from '../hooks'
import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { DraftDetailQuery_viewer } from '~/views/Me/DraftDetail/__generated__/DraftDetailQuery'
import { EditMetaDraft } from '../__generated__/EditMetaDraft'

interface BaseSidebarProps {
  draft: EditMetaDraft
  ownCircles?: DigestRichCirclePublic[]
  viewer: DraftDetailQuery_viewer | null | undefined
}

type SidebarProps = BaseSidebarProps & { disabled: boolean }

const EditDraftCollection = ({ draft, disabled }: SidebarProps) => {
  const { edit, saving } = useEditDraftCollection(draft)
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
  const { edit, refetch, saving } = useEditDraftCover(draft)

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
  const { edit, saving } = useEditDraftTags(draft)
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

const EditDraftCircle = ({ draft, ownCircles, viewer }: SidebarProps) => {
  const { edit, saving } = useEditDraftAccess(
    draft,
    ownCircles && ownCircles[0]
  )

  const { edit: editSupport, saving: supportSaving } =
    useEditSupportSetting(draft)

  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN(draft)
  const hasOwnCircle = ownCircles && ownCircles.length >= 1

  return (
    <SupportSettingDialog
      draft={draft}
      editSupportSetting={editSupport}
      supportSettingSaving={supportSaving}
      viewer={viewer}
    >
      {({ openDialog }) => (
        <Sidebar.Management
          circle={draft?.access.circle}
          accessType={draft.access.type}
          license={draft.license}
          editAccess={edit}
          accessSaving={saving}
          canToggleCircle={!!hasOwnCircle}
          iscnPublish={draft?.iscnPublish}
          togglePublishISCN={togglePublishISCN}
          iscnPublishSaving={iscnPublishSaving}
          draft={draft}
          editSupportSetting={editSupport}
          supportSettingSaving={supportSaving}
          onOpenSupportSetting={openDialog}
          viewer={viewer}
        />
      )}
    </SupportSettingDialog>
  )
}

const EditDraftSidebar = (props: BaseSidebarProps) => {
  const isPending = props.draft.publishState === 'pending'
  const isPublished = props.draft.publishState === 'published'
  const disabled = isPending || isPublished

  return (
    <section className="sidebar">
      <EditDraftTags {...props} disabled={disabled} />
      <EditDraftCover {...props} disabled={disabled} />
      <EditDraftCollection {...props} disabled={disabled} />
      <EditDraftCircle {...props} disabled={disabled} />

      <style jsx>{styles}</style>
    </section>
  )
}

export default EditDraftSidebar
