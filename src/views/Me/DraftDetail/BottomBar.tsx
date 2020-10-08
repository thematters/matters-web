import { toDigestTag } from '~/components'
import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftTags,
} from './hooks'

import { EditMetaDraft } from './__generated__/EditMetaDraft'

interface BottomBarProps {
  draft: EditMetaDraft
}

const EditDraftBottomBar = ({ draft }: BottomBarProps) => {
  const {
    edit: editCollection,
    saving: collectionSaving,
  } = useEditDraftCollection(draft)
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover(
    draft
  )
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags(draft)
  const tags = (draft.tags || []).map(toDigestTag)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  return (
    <BottomBar
      cover={draft.cover}
      assets={draft.assets}
      tags={tags}
      collection={draft?.collection?.edges?.map(({ node }) => node) || []}
      onEditCover={editCover}
      onEditCollection={editCollection}
      onEditTags={editTags}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      refetchAssets={refetch}
      saving={collectionSaving || coverSaving || tagsSaving}
      disabled={isPending || isPublished}
    />
  )
}

export default EditDraftBottomBar
