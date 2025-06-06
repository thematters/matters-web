import _isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_CONTENT_LENGTH } from '~/common/enums'
import { containsFigureTag, stripHtml, toPath } from '~/common/utils'
import { Button, TextIcon, toast, useMutation } from '~/components'
import {
  ConfirmStepContentProps,
  EditorSettingsDialog,
  EditorSettingsDialogProps,
} from '~/components/Editor/SettingsDialog'
import { SidebarIndentProps } from '~/components/Editor/Sidebar/Indent'
import {
  AssetFragment,
  EditArticleMutation,
  QueryEditArticleQuery,
} from '~/gql/graphql'

import ConfirmRevisedPublishDialogContent from './ConfirmRevisedPublishDialogContent'
import { EDIT_ARTICLE } from './gql'
import styles from './styles.module.css'

type EditModeHeaderProps = {
  article: NonNullable<
    QueryEditArticleQuery['article'] & {
      __typename: 'Article'
    }
  >

  revision: {
    versionDescription?: string
    title?: string
    summary?: string
    content?: string
    cover?: AssetFragment
    requestForDonation?: string | null
    replyToDonator?: string | null
  }

  isOverRevisionLimit: boolean

  onPublish: () => void
} & Omit<
  EditorSettingsDialogProps,
  | 'saving'
  | 'disabled'
  | 'confirmButtonText'
  | 'cancelButtonText'
  | 'onConfirm'
  | 'ConfirmStepContent'
  | 'children'
> &
  SidebarIndentProps // no need to show indent setting on EditorSettingsDialog

const EditModeHeader = ({
  article,
  revision,
  isOverRevisionLimit,

  onPublish,

  ...restProps
}: EditModeHeaderProps) => {
  const router = useRouter()
  const { tags, connections, circle, accessType, license } = restProps
  const [editArticle, { loading }] = useMutation<EditArticleMutation>(
    EDIT_ARTICLE,
    {
      update: (cache, { data }) => {
        // evict campaign if it exists
        if (
          data?.editArticle?.campaigns[0] &&
          data.editArticle.campaigns[0].campaign
        ) {
          cache.evict({
            id: cache.identify(data.editArticle.campaigns[0].campaign),
          })
        }

        // evict circle if it exists
        if (data?.editArticle?.access.circle) {
          cache.evict({
            id: cache.identify(data.editArticle.access.circle),
          })
        }
      },
    }
  )

  const hasTitle = revision.title && revision.title.trim().length > 0
  const hasContent =
    revision.content &&
    (stripHtml(revision.content).trim().length > 0 ||
      containsFigureTag(revision.content))

  const isTitleRevised = revision.title !== article.title
  const isSummaryRevised = revision.summary !== article.summary
  const isContentRevised = revision.content !== article.contents.html
  const isTagRevised = !_isEqual(
    tags.map((tag) => tag.id).sort(),
    article.tags?.map((tag) => tag.id).sort()
  )
  const isConnectionRevised = !_isEqual(
    connections.map((connection) => connection.id).sort(),
    article.collection.edges?.map(({ node }) => node.id).sort()
  )
  const isCoverRevised = article.cover
    ? revision.cover?.path !== article.cover
    : !!revision.cover?.path
  const isRequestForDonationRevised =
    revision.requestForDonation !== article.requestForDonation
  const isReplyToDonatorRevised =
    revision.replyToDonator !== article.replyToDonator
  const isCircleRevised = circle?.id !== article.access.circle?.id
  const isAccessRevised = accessType !== article.access.type
  const isLicenseRevised = license !== article.license
  const isCanCommentRevised = restProps.canComment !== article.canComment
  const isIndentRevised = restProps.indented !== article.indentFirstLine
  const isSensitiveRevised =
    restProps.contentSensitive !== article.sensitiveByAuthor
  const isCampaignRevised =
    restProps.selectedCampaign?.id !== article.campaigns[0]?.campaign.id ||
    restProps.selectedStage !== article.campaigns[0]?.stage?.id
  const isResetCampaign = isCampaignRevised && !restProps.selectedCampaign?.id

  const needRepublish =
    isTitleRevised ||
    isSummaryRevised ||
    isContentRevised ||
    isTagRevised ||
    isConnectionRevised ||
    isCoverRevised

  const isRevised =
    needRepublish ||
    isRequestForDonationRevised ||
    isReplyToDonatorRevised ||
    isCircleRevised ||
    isAccessRevised ||
    isLicenseRevised ||
    isCanCommentRevised ||
    isIndentRevised ||
    isSensitiveRevised ||
    isCampaignRevised ||
    restProps.iscnPublish

  const contentLength = stripHtml(revision.content || '').length
  const isOverLength = contentLength > MAX_ARTICLE_CONTENT_LENGTH

  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          ...(revision.versionDescription
            ? { description: revision.versionDescription }
            : {}),
          ...(isTitleRevised ? { title: revision.title } : {}),
          ...(isSummaryRevised ? { summary: revision.summary || null } : {}),
          ...(isContentRevised ? { content: revision.content } : {}),
          ...(isTagRevised ? { tags: tags.map((tag) => tag.content) } : {}),
          ...(isConnectionRevised
            ? { connections: connections.map(({ id }) => id) }
            : {}),
          ...(isCoverRevised ? { cover: revision.cover?.id || null } : {}),
          ...(isRequestForDonationRevised
            ? { requestForDonation: revision.requestForDonation }
            : {}),
          ...(isReplyToDonatorRevised
            ? { replyToDonator: revision.replyToDonator }
            : {}),
          ...(isCircleRevised
            ? { circle: circle?.id || null, accessType: accessType }
            : {}),
          ...(!isCircleRevised && isAccessRevised ? { accessType } : {}),
          ...(isLicenseRevised ? { license } : {}),
          ...(restProps.iscnPublish
            ? { iscnPublish: restProps.iscnPublish }
            : {}),
          ...(isCanCommentRevised ? { canComment: restProps.canComment } : {}),
          ...(isIndentRevised ? { indented: restProps.indented } : {}),
          ...(isSensitiveRevised
            ? { sensitive: restProps.contentSensitive }
            : {}),
          ...(isCampaignRevised
            ? {
                campaigns: isResetCampaign
                  ? []
                  : [
                      {
                        campaign: restProps.selectedCampaign?.id,
                        stage: restProps.selectedStage,
                      },
                    ],
              }
            : {}),
          isResetCampaign,
        },
      })

      if (needRepublish) {
        onPublish()
      } else {
        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Saved"
              id="PkUihI"
              description="src/views/ArticleDetail/Edit/Header/index.tsx"
            />
          ),
        })
        const path = toPath({ page: 'articleDetail', article })
        router.push(path.href)
      }
    } catch {
      toast.error({
        message: needRepublish ? (
          <FormattedMessage defaultMessage="Failed to republish" id="/wKyxw" />
        ) : (
          <FormattedMessage defaultMessage="Failed to save" id="+OtV6h" />
        ),
      })
    }
  }

  const ConfirmStepContent = (props: ConfirmStepContentProps) => (
    <ConfirmRevisedPublishDialogContent onSave={onSave} {...props} />
  )

  const disabled =
    !isRevised ||
    loading ||
    isOverRevisionLimit ||
    !hasTitle ||
    !hasContent ||
    isOverLength

  const validateArticleSettings = () => {
    const hasCampaign = !!restProps.selectedCampaign
    const hasCircle = !!restProps.circle

    if (hasCampaign && hasCircle) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Article cannot be added to event or circle at the same time"
            id="cPXsvZ"
          />
        ),
      })
      return false
    }
    return true
  }

  return (
    <section className={styles.header}>
      <span />

      <section>
        {isOverLength && (
          <span className={styles.count}>
            {contentLength} / {MAX_ARTICLE_CONTENT_LENGTH}
          </span>
        )}

        <EditorSettingsDialog
          {...restProps}
          versionDescription={revision.versionDescription}
          article={{
            ...article,
            replyToDonator: revision.replyToDonator,
            requestForDonation: revision.requestForDonation,
          }}
          saving={loading}
          disabled={disabled}
          confirmButtonText={
            needRepublish ? (
              <FormattedMessage defaultMessage="Publish" id="syEQFE" />
            ) : (
              <FormattedMessage defaultMessage="Save revisions" id="KWDSxB" />
            )
          }
          cancelButtonText={
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          }
          onConfirm={
            needRepublish
              ? undefined
              : () => {
                  if (validateArticleSettings()) {
                    onSave()
                  }
                }
          }
          ConfirmStepContent={ConfirmStepContent}
        >
          {({ openDialog: openEditorSettingsDialog }) => (
            <Button
              size={[null, '2rem']}
              spacing={[0, 16]}
              bgColor="green"
              onClick={() => {
                if (validateArticleSettings()) {
                  openEditorSettingsDialog()
                }
              }}
              aria-haspopup="dialog"
              disabled={disabled}
            >
              <TextIcon color="white" size={16} weight="medium">
                <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
              </TextIcon>
            </Button>
          )}
        </EditorSettingsDialog>
      </section>
    </section>
  )
}

export default EditModeHeader
