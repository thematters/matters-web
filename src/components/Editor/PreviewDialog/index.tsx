import gql from 'graphql-tag'
import { useContext } from 'react'
import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import PUBLISH_ARTICLE from '~/components/GQL/mutations/publishArticle'
import {
  EditorPreviewDialogDraftFragment,
  PublishArticleMutation,
} from '~/gql/graphql'

import { Campaign } from './Campaign'
import { Collection } from './Collection'
import { Connections } from './Connections'
import { FeedDigest } from './FeedDigest'
import { License } from './License'
import { Misc } from './Misc'
import styles from './styles.module.css'
import { Tags } from './Tags'
import { VersionDescription } from './VersionDescription'

const fragment = gql`
  fragment EditorPreviewDialogDraft on Draft {
    ...EditorPreviewDialogCampaignDraft
    ...FeedDigestDraft
    ...EditorPreviewDialogTagsDraft
    ...EditorPreviewDialogConnectionsDraft
    ...EditorPreviewDialogCollectionDraft
    ...EditorPreviewDialogLicenseDraft
    ...EditorPreviewDialogMiscDraft
  }
  ${Campaign.fragment}
  ${FeedDigest.fragment}
  ${Tags.fragment}
  ${Connections.fragment}
  ${Collection.fragment}
  ${License.fragment}
  ${Misc.fragment}
`

export type PreviewDialogButtons = {
  confirmButtonText?: string | React.ReactNode
  cancelButtonText?: string | React.ReactNode
  onConfirm?: () => void
}

export type EditorPreviewDialogProps = {
  draft: EditorPreviewDialogDraftFragment
  saving: boolean
  disabled: boolean
  publishAt?: Date

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  versionDescription?: string
  editVersionDescription?: (description: string) => void
} & PreviewDialogButtons

const BaseEditorPreviewDialog = ({
  draft,
  saving,
  disabled,
  confirmButtonText,
  cancelButtonText,
  onConfirm: onConfirmProp,
  versionDescription,
  editVersionDescription,
  children,
  publishAt,
}: EditorPreviewDialogProps) => {
  const { router } = useRoute()
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleEdit = isInPath('ARTICLE_DETAIL_EDIT')
  const viewer = useContext(ViewerContext)
  const [publish, { loading: publishLoading }] =
    useMutation<PublishArticleMutation>(PUBLISH_ARTICLE, {
      update(cache) {
        cache.evict({ id: cache.identify(viewer), fieldName: 'articles' })
        cache.evict({ id: cache.identify(viewer), fieldName: 'writings' })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    })

  const openDialog = () => {
    baseOpenDialog()
  }

  const onConfirm = async () => {
    baseToast.dismiss()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Publishing, please wait..."
          id="V1Lts1"
          description="src/components/Editor/PreviewDialog/index.tsx"
        />
      ),
    })
    if (isInDraftDetail) {
      await publish({ variables: { id: draft.id, publishAt } })
      if (publishAt) {
        router.push(PATHS.ME_DRAFTS)
      }
    }
    onConfirmProp?.()
  }

  const { campaign } = draft.campaigns?.[0] ?? { campaign: null }
  const hasCampaign = campaign !== null
  const hasTags = !!draft.tags && draft.tags.length > 0
  const hasConnections =
    !!draft.connections && (draft.connections.edges?.length ?? 0) > 0
  const hasCollections =
    !!draft.collections && (draft.collections.edges?.length ?? 0) > 0

  const showHr = hasCampaign || hasTags || hasConnections || hasCollections

  return (
    <>
      {children({ openDialog })}

      <Dialog
        fixedWidth={false}
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Preview"
              id="b0JEjP"
              description="src/components/Editor/PreviewDialog/index.tsx"
            />
          }
          closeDialog={cancelButtonText ? closeDialog : undefined}
          closeText={cancelButtonText || undefined}
          rightBtn={
            <Dialog.TextButton
              text={confirmButtonText}
              onClick={onConfirm}
              loading={saving || publishLoading}
              disabled={disabled || publishLoading}
            />
          }
        />
        <Dialog.Content>
          <section className={styles.container}>
            <section className={styles.feedDigest}>
              <FeedDigest draft={draft} publishAt={publishAt} />
            </section>
            <section className={styles.settings}>
              {isInArticleEdit && editVersionDescription && (
                <>
                  <VersionDescription
                    versionDescription={versionDescription || ''}
                    editVersionDescription={editVersionDescription}
                    closeDialog={closeDialog}
                  />
                  <hr />
                </>
              )}
              {hasCampaign && (
                <Campaign draft={draft} closeDialog={closeDialog} />
              )}
              {hasTags && <Tags draft={draft} closeDialog={closeDialog} />}
              {hasConnections && (
                <Connections draft={draft} closeDialog={closeDialog} />
              )}
              {hasCollections && (
                <Collection draft={draft} closeDialog={closeDialog} />
              )}

              {showHr && <hr />}
              <License draft={draft} closeDialog={closeDialog} />
              <Misc draft={draft} closeDialog={closeDialog} />
            </section>
          </section>
        </Dialog.Content>

        {(confirmButtonText || cancelButtonText) && (
          <Dialog.Footer
            smUpBtns={
              <>
                <Dialog.TextButton
                  text={cancelButtonText}
                  color="greyDarker"
                  onClick={closeDialog}
                  disabled={saving || publishLoading}
                />
                <Dialog.TextButton
                  text={confirmButtonText}
                  onClick={onConfirm}
                  loading={saving || publishLoading}
                  disabled={disabled || publishLoading}
                />
              </>
            }
          />
        )}
      </Dialog>
    </>
  )
}

export const EditorPreviewDialog = (props: EditorPreviewDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditorPreviewDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

EditorPreviewDialog.fragment = fragment
