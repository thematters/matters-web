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
  useEditSupportSetting,
} from '../hooks'
import ConfirmPublishDialogContent from './ConfirmPublishDialogContent'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { DraftDetailQuery_viewer } from '~/views/Me/DraftDetail/__generated__/DraftDetailQuery'
import { EditMetaDraft } from '../__generated__/EditMetaDraft'

interface SettingsButtonProps {
  draft: EditMetaDraft
  ownCircles?: DigestRichCirclePublic[]
  publishable?: boolean
  viewer: DraftDetailQuery_viewer | null | undefined
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
  viewer,
}: SettingsButtonProps) => {
  const viewerContext = useContext(ViewerContext)

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

  const { edit: editSupport, saving: supportSaving } =
    useEditSupportSetting(draft)

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
    draft,
    editSupportSetting: editSupport,
    supportSettingSaving: supportSaving,
    onOpenSupportSetting: () => {
      console.log('')
    },
    viewer,
    iscnPublish: draft.iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,
  }

  if (!viewerContext.shouldSetupLikerID) {
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
