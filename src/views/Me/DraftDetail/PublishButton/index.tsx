import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { BREAKPOINTS, ENTITY_TYPE, PATHS } from '~/common/enums'
import {
  Button,
  Icon,
  TextIcon,
  toast,
  toDigestTagPlaceholder,
  useMediaQuery,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  MoreSettingsProps,
  SetConnectionsProps,
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
  PublishArticleMutation,
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
import { MoreButton } from './MoreButton'
import styles from './styles.module.css'

interface PublishButtonProps {
  draft: EditMetaDraftFragment
  ownCircles?: DigestRichCirclePublicFragment[]
  campaigns?: EditorSelectCampaignFragment[]
  publishable?: boolean
}

const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($id: ID!, $publishAt: DateTime) {
    publishArticle(input: { id: $id, publishAt: $publishAt }) {
      id
      publishState
      publishAt
      updatedAt
    }
  }
`

const Buttons = ({
  disabled,
  openSettingsDialog,
  setPublishAt,
}: {
  disabled?: boolean
  openSettingsDialog: () => void
  setPublishAt: (date: Date) => void
}) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const onConfirmSchedulePublish = (date: Date) => {
    setPublishAt(date)
    openSettingsDialog()
  }

  return (
    <section className={styles.buttons}>
      <Button
        size={[null, isSmUp ? '2.375rem' : '2.125rem']}
        spacing={[0, 14]}
        borderRadius={'0.75rem'}
        bgColor="black"
        onClick={openSettingsDialog}
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

      <span className={styles.divider} />

      <MoreButton
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

  const { edit: editConnections, saving: connectionsSaving } =
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

  const [publishAt, setPublishAt] = useState<Date>()

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
  const connectionProps: SetConnectionsProps = {
    connections: draft?.connections?.edges?.map(({ node }) => node) || [],
    editConnections,
    connectionsSaving,
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

  const schedulePublishProps = {
    publishAt,
  }

  const viewer = useContext(ViewerContext)
  const [publish] = useMutation<PublishArticleMutation>(PUBLISH_ARTICLE, {
    update(cache) {
      cache.evict({ id: cache.identify(viewer), fieldName: 'articles' })
      cache.evict({ id: cache.identify(viewer), fieldName: 'writings' })
      cache.gc()
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch()
    },
  })

  const onPublish = async ({ closeDialog }: { closeDialog: () => void }) => {
    await publish({ variables: { id: draft.id, publishAt } })

    closeDialog()

    if (publishAt) {
      router.push(PATHS.ME_DRAFTS)
    }
  }

  return (
    <EditorSettingsDialog
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
        <FormattedMessage defaultMessage="Save as Draft" id="E048/V" />
      }
      onConfirm={onPublish}
      {...coverProps}
      {...tagsProps}
      {...connectionProps}
      {...accessProps}
      {...responseProps}
      {...campaignProps}
      {...schedulePublishProps}
    >
      {({ openDialog: openEditorSettingsDialog }) => (
        <Buttons
          disabled={disabled}
          setPublishAt={setPublishAt}
          openSettingsDialog={() => {
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
        />
      )}
    </EditorSettingsDialog>
  )
}

export default PublishButton
