import classNames from 'classnames'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { BREAKPOINTS, PATHS } from '~/common/enums'
import {
  Button,
  Icon,
  TextIcon,
  toast,
  useMediaQuery,
  useRoute,
} from '~/components'
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
import { MoreButton } from './MoreButton'
import styles from './styles.module.css'

interface PublishButtonProps {
  draft: EditMetaDraftFragment
  ownCircles?: DigestRichCirclePublicFragment[]
  campaigns?: EditorSelectCampaignFragment[]
  publishable?: boolean
}

const Buttons = ({
  draft,
  disabled,
  openEditorPreviewDialog,
  setPublishAt,
}: {
  draft: EditMetaDraftFragment
  disabled?: boolean
  openEditorPreviewDialog: () => void
  setPublishAt: (date: Date) => void
}) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const onConfirmSchedulePublish = (date: Date) => {
    setPublishAt(date)
    openEditorPreviewDialog()
  }

  const buttonsClasses = classNames(styles.buttons, {
    [styles.disabled]: disabled,
    [styles.hover]: !disabled,
  })

  const dividerClasses = classNames(styles.divider, {
    [styles.disabled]: disabled,
  })

  return (
    <section className={buttonsClasses}>
      <Button
        size={[null, isSmUp ? '2.375rem' : '2.125rem']}
        spacing={[0, 14]}
        borderRadius={0}
        bgColor={'black'}
        onClick={openEditorPreviewDialog}
        disabled={disabled}
        aria-haspopup="dialog"
      >
        <TextIcon
          color="white"
          size={14}
          weight="medium"
          icon={isSmUp ? <Icon icon={IconPublishFill} size={18} /> : undefined}
          spacing={8}
        >
          <FormattedMessage defaultMessage="Publish" id="syEQFE" />
        </TextIcon>
      </Button>

      <span className={dividerClasses} />

      <MoreButton
        draft={draft}
        disabled={disabled}
        onConfirmSchedulePublish={onConfirmSchedulePublish}
      />
    </section>
  )
}

const PublishButton = ({
  draft,
  ownCircles,
  campaigns,
  publishable,
}: PublishButtonProps) => {
  const { router } = useRoute()

  const { saving: connectionsSaving } = useEditDraftConnections()
  const { saving: coverSaving } = useEditDraftCover()
  const { saving: tagsSaving } = useEditDraftTags()
  const { saving: accessSaving } = useEditDraftAccess(
    ownCircles && ownCircles[0]
  )

  const { saving: canCommentSaving } = useEditDraftCanComment()

  const [publishAt, setPublishAt] = useState<Date>()
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  const { selectedCampaign, selectedStage } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  const schedulePublishProps = {
    publishAt,
  }

  const onPublish = async () => {
    if (publishAt) {
      router.push(PATHS.ME_DRAFTS)
    }
  }

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
        publishAt ? (
          <FormattedMessage defaultMessage="Schedule Publish" id="Km6eJ2" />
        ) : (
          <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
        )
      }
      cancelButtonText={
        <FormattedMessage defaultMessage="Back to Edit" id="tGHG7q" />
      }
      onConfirm={onPublish}
      {...schedulePublishProps}
    >
      {({ openDialog: openEditorPreviewDialog }) => (
        <Buttons
          draft={draft}
          disabled={disabled}
          setPublishAt={setPublishAt}
          openEditorPreviewDialog={() => {
            const hasCampaign = !!selectedCampaign
            const hasCircle = !!draft.access.circle

            if (
              hasCampaign &&
              selectedCampaign.stages.length > 0 &&
              !selectedStage
            ) {
              toast.error({
                message: (
                  <FormattedMessage
                    defaultMessage="Please select a date of activity "
                    id="P/7t1k"
                  />
                ),
              })
              return
            }

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

            openEditorPreviewDialog()
          }}
        />
      )}
    </EditorPreviewDialog>
  )
}

export default PublishButton
