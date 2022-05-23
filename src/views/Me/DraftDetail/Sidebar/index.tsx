import { toDigestTagPlaceholder } from '~/components'
import Sidebar from '~/components/Editor/Sidebar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftAccess,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftTags,
} from '../hooks'
import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { EditMetaDraft } from '../__generated__/EditMetaDraft'

interface BaseSidebarProps {
  draft: EditMetaDraft
  ownCircles?: DigestRichCirclePublic[]
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

const EditDraftCircle = ({ draft, ownCircles }: SidebarProps) => {
  const { edit, saving } = useEditDraftAccess(
    draft,
    ownCircles && ownCircles[0]
  )
  const hasOwnCircle = ownCircles && ownCircles.length >= 1

  return (
    <Sidebar.Management
      circle={draft?.access.circle}
      accessType={draft.access.type}
      license={draft.license}
      editAccess={edit}
      accessSaving={saving}
      canToggleCircle={!!hasOwnCircle}
    />
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
