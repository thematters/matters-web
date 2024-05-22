import { FormattedMessage } from 'react-intl'

import { ENTITY_TYPE } from '~/common/enums'
import { Button, TextIcon, toDigestTagPlaceholder } from '~/components'
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
    spacing={[0, 16]}
    bgColor="green"
    onClick={openDialog}
    disabled={disabled}
    aria-haspopup="dialog"
  >
    <TextIcon color="white" size={16} weight="medium">
      <FormattedMessage defaultMessage="Publish" id="syEQFE" />
    </TextIcon>
  </Button>
)

const SettingsButton = ({
  draft,
  ownCircles,
  publishable,
}: SettingsButtonProps) => {
  const { edit: editCollection, saving: collectionSaving } =
    useEditDraftCollection()
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover()
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags()
  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor()
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN()
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )

  const { edit: editSupport, saving: supportSaving } = useEditSupportSetting()

  const { edit: toggleComment, saving: canCommentSaving } =
    useEditDraftCanComment()
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
      confirmButtonText={
        <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
      }
      cancelButtonText={
        <FormattedMessage defaultMessage="Save as Draft" id="E048/V" />
      }
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
