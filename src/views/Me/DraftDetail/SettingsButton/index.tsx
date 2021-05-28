import { useContext } from 'react'

import {
  Button,
  TextIcon,
  toDigestTagPlaceholder,
  Translate,
  ViewerContext,
} from '~/components'
import { EditorSettingsDialog } from '~/components/Editor/SettingsDialog'

import { ENTITY_TYPE, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import {
  useEditDraftAccess,
  useEditDraftCollection,
  useEditDraftCover,
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

const NextStepButton = ({
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
      <Translate id="nextStep" />
    </TextIcon>
  </Button>
)

const SettingsButton = ({
  draft,
  ownCircles,
  publishable,
}: SettingsButtonProps) => {
  const viewer = useContext(ViewerContext)

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
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  if (!viewer.shouldSetupLikerID) {
    return (
      <EditorSettingsDialog
        saving={false}
        disabled={collectionSaving || coverSaving || tagsSaving || accessSaving}
        confirmButtonText={
          <Translate zh_hant="立即發布" zh_hans="立即发布" en="Publish" />
        }
        cancelButtonText={
          <Translate zh_hant="存至草稿" zh_hans="存至草稿" en="Save as Draft" />
        }
        ConfirmStepContent={ConfirmPublishDialogContent}
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
      >
        {({ openDialog: openEditorSettingsDialog }) => (
          <NextStepButton
            openDialog={openEditorSettingsDialog}
            disabled={disabled}
          />
        )}
      </EditorSettingsDialog>
    )
  }

  return (
    <NextStepButton
      openDialog={() =>
        window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
      }
      disabled={disabled}
    />
  )
}

export default SettingsButton
