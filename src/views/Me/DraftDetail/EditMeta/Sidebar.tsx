import gql from 'graphql-tag'

import { toDigestTag } from '~/components'
import Sidebar from '~/components/Editor/Sidebar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  fragments,
  useEditCollection,
  useEditCover,
  useEditTags,
} from './hooks'

import { SidebarDraft } from './__generated__/SidebarDraft'

interface BaseSidebarProps {
  draft: SidebarDraft
}

type SidebarProps = BaseSidebarProps & { disabled: boolean }

const EditCollection = ({ draft, disabled }: SidebarProps) => {
  const { onEdit, saving } = useEditCollection(draft)

  return (
    <Sidebar.Collection
      articles={draft?.collection?.edges?.map(({ node }) => node) || []}
      onEdit={onEdit}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditCover = ({ draft, disabled }: SidebarProps) => {
  const { onEdit, refetch, saving } = useEditCover(draft)

  return (
    <Sidebar.Cover
      cover={draft.cover}
      assets={draft.assets}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      onEdit={onEdit}
      refetchAssets={refetch}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditTags = ({ draft, disabled }: SidebarProps) => {
  const { onEdit, saving } = useEditTags(draft)
  const tags = (draft.tags || []).map(toDigestTag)

  return (
    <Sidebar.Tags
      tags={tags}
      onEdit={onEdit}
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
      <EditCover {...props} disabled={disabled} />
      <EditTags {...props} disabled={disabled} />
      <EditCollection {...props} disabled={disabled} />
    </>
  )
}

EditDraftSidebar.fragments = {
  draft: gql`
    fragment SidebarDraft on Draft {
      id
      ...EditMetaDraft
    }
    ${fragments.draft}
  `,
}

export default EditDraftSidebar
