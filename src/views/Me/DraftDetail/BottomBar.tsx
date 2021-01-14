import { toDigestTag } from '~/components'
import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftCircle,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftTags,
} from './hooks'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { EditMetaDraft } from './__generated__/EditMetaDraft'

interface BottomBarProps {
  draft: EditMetaDraft
  ownCircles?: DigestRichCirclePublic[]
}

const EditDraftBottomBar = ({ draft, ownCircles }: BottomBarProps) => {
  const {
    edit: editCollection,
    saving: collectionSaving,
  } = useEditDraftCollection(draft)
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover(
    draft
  )
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags(draft)
  const { toggle: onToggleCircle, saving: circleSaving } = useEditDraftCircle(
    draft
  )
  const tags = (draft.tags || []).map(toDigestTag)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  return (
    <BottomBar
      cover={draft.cover}
      assets={draft.assets}
      tags={tags}
      collection={draft?.collection?.edges?.map(({ node }) => node) || []}
      circle={draft?.circle}
      onEditCover={editCover}
      onEditCollection={editCollection}
      onEditTags={editTags}
      onToggleCircle={
        ownCircles ? () => onToggleCircle(ownCircles[0]) : undefined
      }
      canToggleCircle
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      refetchAssets={refetch}
      saving={collectionSaving || coverSaving || tagsSaving || circleSaving}
      disabled={isPending || isPublished}
    />
  )
}

export default EditDraftBottomBar
