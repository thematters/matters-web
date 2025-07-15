import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { Button, Icon, Media, TextIcon, toast } from '~/components'
import { EditorPreviewDialog } from '~/components/Editor/PreviewDialog'
import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import {
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import {
  useEditDraftAccess,
  useEditDraftCanComment,
  useEditDraftConnections,
  useEditDraftCover,
  useEditDraftTags,
} from '../hooks'

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
          <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
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
          <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
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
  const { saving: connectionsSaving } = useEditDraftConnections()
  const { saving: coverSaving } = useEditDraftCover()
  const { saving: tagsSaving } = useEditDraftTags()
  const { saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )

  const { saving: canCommentSaving } = useEditDraftCanComment()
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  const { selectedCampaign } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  return (
    <EditorPreviewDialog
      draft={draft}
      saving={false}
      disabled={
        connectionsSaving ||
        coverSaving ||
        tagsSaving ||
        accessSaving ||
        canCommentSaving
      }
      confirmButtonText={
        <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
      }
      cancelButtonText={
        <FormattedMessage defaultMessage="Back to Edit" id="tGHG7q" />
      }
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
    </EditorPreviewDialog>
  )
}

export default SettingsButton
