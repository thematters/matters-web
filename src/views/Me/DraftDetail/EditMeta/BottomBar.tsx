import gql from 'graphql-tag'

import { toDigestTag } from '~/components'
import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  fragments,
  useEditCollection,
  useEditCover,
  useEditTags,
} from './hooks'

import { BottomBarDraft } from './__generated__/BottomBarDraft'

interface SidebarProps {
  draft: BottomBarDraft
}

const EditDraftSidebar = ({ draft }: SidebarProps) => {
  const {
    onEdit: onEditCollection,
    saving: collectionSaving,
  } = useEditCollection(draft)
  const { onEdit: onEditCover, saving: coverSaving, refetch } = useEditCover(
    draft
  )
  const { onEdit: onEditTags, saving: tagsSaving } = useEditTags(draft)
  const tags = (draft.tags || []).map(toDigestTag)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  return (
    <BottomBar
      cover={draft.cover}
      assets={draft.assets}
      tags={tags}
      collection={draft?.collection?.edges?.map(({ node }) => node) || []}
      onEditCover={onEditCover}
      onEditCollection={onEditCollection}
      onEditTags={onEditTags}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      refetchAssets={refetch}
      saving={collectionSaving || coverSaving || tagsSaving}
      disabled={isPending || isPublished}
    />
  )
}

EditDraftSidebar.fragments = {
  draft: gql`
    fragment BottomBarDraft on Draft {
      id
      ...EditMetaDraft
    }
    ${fragments.draft}
  `,
}

export default EditDraftSidebar
