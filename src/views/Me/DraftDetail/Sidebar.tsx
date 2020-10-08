import { toDigestTag } from '~/components'
import Sidebar from '~/components/Editor/Sidebar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftTags,
} from './hooks'

import { EditMetaDraft } from './__generated__/EditMetaDraft'

interface BaseSidebarProps {
  draft: EditMetaDraft
}

type SidebarProps = BaseSidebarProps & { disabled: boolean }

const EditDraftCollection = ({ draft, disabled }: SidebarProps) => {
  const { edit, saving } = useEditDraftCollection(draft)

  return (
    <Sidebar.Collection
      articles={draft?.collection?.edges?.map(({ node }) => node) || []}
      onEdit={edit}
      saving={saving}
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
      onEdit={edit}
      refetchAssets={refetch}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftTags = ({ draft, disabled }: SidebarProps) => {
  const { edit, saving } = useEditDraftTags(draft)
  const tags = (draft.tags || []).map(toDigestTag)

  return (
    <Sidebar.Tags
      tags={tags}
      onEdit={edit}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftSidebar = (props: BaseSidebarProps) => {
  const isPending = props.draft.publishState === 'pending'
  const isPublished = props.draft.publishState === 'published'
  const disabled = isPending || isPublished

  return (
    <>
      <EditDraftCover {...props} disabled={disabled} />
      <EditDraftTags {...props} disabled={disabled} />
      <EditDraftCollection {...props} disabled={disabled} />
    </>
  )
}

export default EditDraftSidebar
