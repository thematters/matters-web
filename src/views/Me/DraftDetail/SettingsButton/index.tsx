import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { ENTITY_TYPE } from '~/common/enums'
import {
  Button,
  Icon,
  Media,
  TextIcon,
  toast,
  toDigestTagPlaceholder,
} from '~/components'
import {
  MoreSettingsProps,
  SetConnectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
} from '~/components/Editor'
import {
  getSelectCampaigns,
  SelectCampaignProps,
} from '~/components/Editor/SelectCampaign'
import { EditorSettingsDialog } from '~/components/Editor/SettingsDialog'
import {
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import {
  useEditDraftAccess,
  useEditDraftCampaign,
  useEditDraftCanComment,
  useEditDraftConnections,
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
  campaigns?: EditorSelectCampaignFragment[]
  publishable?: boolean
}

const ConfirmButton = ({
  openDialog,
  disabled,
}: {
  openDialog: () => void
  disabled?: boolean
}) => (
  <>
    <Media at="sm">
      <Button
        size={[null, '2.125rem']}
        spacing={[0, 14]}
        borderRadius={'0.75rem'}
        bgColor="black"
        onClick={openDialog}
        disabled={disabled}
        aria-haspopup="dialog"
      >
        <TextIcon color="white" size={14} weight="medium" spacing={8}>
          <FormattedMessage defaultMessage="Publish" id="syEQFE" />
        </TextIcon>
      </Button>
    </Media>
    <Media greaterThan="sm">
      <Button
        size={[null, '2.375rem']}
        spacing={[0, 14]}
        borderRadius={'0.75rem'}
        bgColor="black"
        onClick={openDialog}
        disabled={disabled}
        aria-haspopup="dialog"
      >
        <TextIcon
          color="white"
          size={14}
          weight="medium"
          icon={<Icon icon={IconPublishFill} size={18} />}
          spacing={8}
        >
          <FormattedMessage defaultMessage="Publish" id="syEQFE" />
        </TextIcon>
      </Button>
    </Media>
  </>
)

const SettingsButton = ({
  draft,
  ownCircles,
  campaigns,
  publishable,
}: SettingsButtonProps) => {
  const { edit: editConnection, saving: connectionSaving } =
    useEditDraftConnections()
  const { edit: editCover, saving: coverSaving, refetch } = useEditDraftCover()
  const { edit: editTags, saving: tagsSaving } = useEditDraftTags()
  const { edit: toggleContentSensitive, saving: contentSensitiveSaving } =
    useEditDraftSensitiveByAuthor()
  const { edit: togglePublishISCN, saving: iscnPublishSaving } =
    useEditDraftPublishISCN()
  const { edit: editAccess, saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )
  const { edit: editCampaign } = useEditDraftCampaign()

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
  const connectionProps: SetConnectionProps = {
    connection: draft?.collection?.edges?.map(({ node }) => node) || [],
    editConnection,
    connectionSaving,
  }
  const accessProps: MoreSettingsProps = {
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

  const {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
  } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  const campaignProps: Partial<SelectCampaignProps> = {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
    editCampaign,
  }

  const responseProps: SetResponseProps = {
    canComment,
    toggleComment,
  }

  return (
    <EditorSettingsDialog
      saving={false}
      disabled={
        connectionSaving ||
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
      {...connectionProps}
      {...accessProps}
      {...responseProps}
      {...campaignProps}
    >
      {({ openDialog: openEditorSettingsDialog }) => (
        <ConfirmButton
          openDialog={() => {
            const hasCampaign = !!selectedCampaign
            const hasCircle = !!draft.access.circle

            if (hasCampaign && hasCircle) {
              toast.error({
                message: (
                  <FormattedMessage
                    defaultMessage="Article cannot be added to event or circle at the same time"
                    id="cPXsvZ"
                  />
                ),
              })
              return
            }

            openEditorSettingsDialog()
          }}
          disabled={disabled}
        />
      )}
    </EditorSettingsDialog>
  )
}

export default SettingsButton
