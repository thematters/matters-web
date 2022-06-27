import { useContext } from 'react'

import {
  Button,
  TextIcon,
  toDigestTagPlaceholder,
  Translate,
  ViewerContext,
} from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  // SetPublishISCNProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import { EditorSettingsDialog } from '~/components/Editor/SettingsDialog'

import { ENTITY_TYPE, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import {
  useEditDraftAccess,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftPublishISCN,
  useEditDraftTags,
} from '../hooks'
import ConfirmPublishDialogContent from './ConfirmPublishDialogContent'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { EditMetaDraft } from '../__generated__/EditMetaDraft'

interface SettingsButtonProps {
  draft: EditMetaDraft
  ownCircles?: DigestRichCirclePublic[]
  publishable?: boolean
}

const ConfirmButton = ({
  openDialog,
  disabled,
}: {
  openDialog: () => void
  disabled?: boolean
}) => (
  <Button
    size={[null, '2rem']}
    spacing={[0, 'base']}
    bgColor="green"
    onClick={openDialog}
    disabled={disabled}
    aria-haspopup="true"
  >
    <TextIcon color="white" size="md" weight="md">
      <Translate id="publish" />
    </TextIcon>
  </Button>
)

const SettingsButton = ({
  draft,
  ownCircles,
  publishable,
}: SettingsButtonProps) => {
  const viewer = useContext(ViewerContext)

  const { edit: editCollection, saving: collectionSaving } =
    useEditDraftCollection(draft)
  const {
    edit: editCover,
    saving: coverSaving,
    refetch,
  } = useEditDraftCover(draft)
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags(draft)
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN(draft)
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    draft,
    ownCircles && ownCircles[0]
  )
  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

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
    iscnPublish: draft.iscnPublish, // : boolean
    togglePublishISCN, // : (iscnPublish: boolean) => Promise<any>
    iscnPublishSaving,
  }
  // const iscnPublishProps: SetPublishISCNProps = {
  //   iscnPublish: draft.iscnPublish, // : boolean
  //   togglePublishISCN, // : (iscnPublish: boolean) => Promise<any>
  //   iscnPublishSaving,
  // }

  if (!viewer.shouldSetupLikerID) {
    return (
      <EditorSettingsDialog
        saving={false}
        disabled={collectionSaving || coverSaving || tagsSaving || accessSaving}
        confirmButtonText={<Translate id="publishNow" />}
        cancelButtonText={<Translate id="publishAbort" />}
        ConfirmStepContent={ConfirmPublishDialogContent}
        {...coverProps}
        {...tagsProps}
        {...collectionProps}
        {...accessProps}
        // {...iscnPublishProps}
      >
        {({ openDialog: openEditorSettingsDialog }) => (
          <ConfirmButton
            openDialog={openEditorSettingsDialog}
            disabled={disabled}
          />
        )}
      </EditorSettingsDialog>
    )
  }

  return (
    <ConfirmButton
      openDialog={() =>
        window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
      }
      disabled={disabled}
    />
  )
}

export default SettingsButton
