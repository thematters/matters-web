import { toDigestTagPlaceholder } from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
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

  const coverProps: SetCoverProps = {
    cover: draft.cover,
    assets: draft.assets,
    editCover,
    refetchAssets: refetch,
    entityId: draft.id,
    entityType: ENTITY_TYPE.draft,
    coverSaving,
  }
  const tagsProps: SetTagsProps = {
    tags,
    editTags,
    tagsSaving,
  }
  const collectionProps: SetCollectionProps = {
    collection: draft?.collection?.edges?.map(({ node }) => node) || [],
    editCollection,
    collectionSaving,
  }
  const accessProps: ToggleAccessProps = {
    circle: draft?.access.circle,
    accessType: draft.access.type,
    license: draft.license,
    editAccess,
    accessSaving,
    canToggleCircle: !!hasOwnCircle,
  }

  return (
    <BottomBar
      saving={false}
      disabled={collectionSaving || coverSaving || tagsSaving || accessSaving}
      {...coverProps}
      {...tagsProps}
      {...collectionProps}
      {...accessProps}
    />
  )
}

export default EditDraftBottomBar
