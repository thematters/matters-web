import { toDigestTagPlaceholder, useFeatures } from '~/components'
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
  const features = useFeatures()
  const {
    edit: editCollection,
    saving: collectionSaving,
  } = useEditDraftCollection(draft)
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover(
    draft
  )
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags(draft)
  const { toggle: toggleCircle, saving: circleSaving } = useEditDraftCircle(
    draft
  )
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  return (
    <BottomBar
      saving={collectionSaving || coverSaving || tagsSaving || circleSaving}
      disabled={isPending || isPublished}
      // cover
      cover={draft.cover}
      assets={draft.assets}
      editCover={editCover}
      refetchAssets={refetch}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      // tags
      tags={tags}
      editTags={editTags}
      // collection
      collection={draft?.collection?.edges?.map(({ node }) => node) || []}
      editCollection={editCollection}
      // circle
      circle={draft?.circle}
      toggleCircle={
        ownCircles && features.circle_management
          ? () => toggleCircle(ownCircles[0])
          : undefined
      }
      canToggleCircle
    />
  )
}

export default EditDraftBottomBar
