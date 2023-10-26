import { ENTITY_TYPE } from '~/common/enums'
import {
  Button,
  TextIcon,
  toDigestTagPlaceholder,
  Translate,
} from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import { EditorSettingsDialog } from '~/components/Editor/SettingsDialog'
import {
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
} from '~/gql/graphql'

import {
  useEditDraftAccess,
  useEditDraftCanComment,
  useEditDraftCollection,
  useEditDraftCover,
  useEditDraftPublishISCN,
  useEditDraftSensitiveByAuthor,
  useEditDraftTags,
  useEditSupportSetting,
} from '../hooks'
import ConfirmPublishDialogContent from './ConfirmPublishDialogContent'

interface SettingsButtonProps {
  draft: EditMetaDraftFragment
  ownCircles?: DigestRichCirclePublicFragment[]
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
    aria-haspopup="dialog"
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
  const { edit: editCollection, saving: collectionSaving } =
    useEditDraftCollection(draft)
  const {
    edit: editCover,
    saving: coverSaving,
    refetch,
  } = useEditDraftCover(draft)
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags(draft)
  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor(draft)
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN(draft)
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    draft,
    ownCircles && ownCircles[0]
  )

  const { edit: editSupport, saving: supportSaving } =
    useEditSupportSetting(draft)

  const { edit: toggleComment, saving: canCommentSaving } =
    useEditDraftCanComment(draft)
  const canComment = draft.canComment

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
    onOpenSupportSetting: () => undefined,
    contentSensitive: draft.sensitiveByAuthor,
    toggleContentSensitive,
    contentSensitiveSaving,
    iscnPublish: draft.iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,
  }

  const responseProps: SetResponseProps = {
    canComment,
    toggleComment,
  }

  return (
    <EditorSettingsDialog
      saving={false}
      disabled={
        collectionSaving ||
        coverSaving ||
        tagsSaving ||
        accessSaving ||
        canCommentSaving
      }
      confirmButtonText={<Translate id="publishNow" />}
      cancelButtonText={<Translate id="publishAbort" />}
      ConfirmStepContent={ConfirmPublishDialogContent}
      {...coverProps}
      {...tagsProps}
      {...collectionProps}
      {...accessProps}
      {...responseProps}
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

export default SettingsButton
