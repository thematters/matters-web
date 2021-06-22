import { toDigestTagPlaceholder } from '~/components'
import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import {
  useEditDraftAccess,
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
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    draft,
    ownCircles && ownCircles[0]
  )
  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)

  return (
    <BottomBar
      saving={false}
      disabled={collectionSaving || coverSaving || tagsSaving || accessSaving}
      // cover
      cover={draft.cover}
      assets={draft.assets}
      editCover={editCover}
      refetchAssets={refetch}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      coverSaving={coverSaving}
      // tags
      tags={tags}
      editTags={editTags}
      tagsSaving={tagsSaving}
      // collection
      collection={draft?.collection?.edges?.map(({ node }) => node) || []}
      editCollection={editCollection}
      collectionSaving={collectionSaving}
      // circle
      circle={draft?.access.circle}
      accessType={draft.access.type}
      license={draft.license}
      editAccess={editAccess}
      accessSaving={accessSaving}
      canToggleCircle={!!hasOwnCircle}
    />
  )
}

export default EditDraftBottomBar
