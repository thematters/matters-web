import _isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { MAX_ARTICLE_CONTENT_LENGTH } from '~/common/enums'
import { containsFigureTag, stripHtml, toPath } from '~/common/utils'
import { Button, Icon, Media, TextIcon, toast, useMutation } from '~/components'
// import { EditorPreviewDialog } from '~/components/Editor/PreviewDialog'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  DigestRichCirclePublicFragment,
  EditArticleMutation,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import { Article } from '..'
import { EDIT_ARTICLE } from '../Header/gql'

type SettingsButtonProps = {
  article: Article
  content: string
  circle: DigestRichCirclePublicFragment | null
  accessType: ArticleAccessType
  ownCircles?: DigestRichCirclePublicFragment[]
  campaigns?: EditorSelectCampaignFragment[]
  selectedCampaign?: EditorSelectCampaignFragment
  selectedStage?: string
  iscnPublish: boolean
  onPublish: () => void
  isOverRevisionLimit: boolean
  publishable?: boolean
  connections: ArticleDigestDropdownArticleFragment[]
  saving?: boolean
} & Pick<
  Article,
  | 'title'
  | 'summary'
  | 'cover'
  | 'tags'
  | 'license'
  | 'canComment'
  | 'sensitiveByAuthor'
  | 'requestForDonation'
  | 'replyToDonator'
  | 'indentFirstLine'
>

const ConfirmButton = ({
  openDialog,
  disabled,
}: {
  openDialog: () => void
  disabled?: boolean
}) => (
  <>
    <Media lessThan="md">
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
    <Media greaterThanOrEqual="md">
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
  article,
  // ownCircles,
  // campaigns,
  // publishable,
  // saving,
  title,
  summary,
  content,
  cover,
  tags,
  connections,
  circle,
  accessType,
  license,
  canComment,
  requestForDonation,
  replyToDonator,
  indentFirstLine,
  sensitiveByAuthor,
  selectedCampaign,
  selectedStage,
  iscnPublish,
  onPublish,
  isOverRevisionLimit,
}: SettingsButtonProps) => {
  // const isPending = draft.publishState === 'pending'
  // const isPublished = draft.publishState === 'published'
  // const disabled = !publishable || isPending || isPublished

  // const { selectedCampaign } = getSelectCampaigns({
  //   applied: campaigns,
  //   attached: draft.campaigns,
  //   createdAt: draft.createdAt,
  // })

  // return (
  //   <EditorPreviewDialog
  //     draft={draft}
  //     saving={saving || false}
  //     disabled={
  //       // connectionsSaving ||
  //       // coverSaving ||
  //       // tagsSaving ||
  //       // accessSaving ||
  //       // canCommentSaving
  //       saving || false
  //     }
  //     confirmButtonText={
  //       <FormattedMessage defaultMessage="Publish" id="syEQFE" />
  //     }
  //     cancelButtonText={
  //       <FormattedMessage defaultMessage="Back to Edit" id="tGHG7q" />
  //     }
  //   >
  //     {({ openDialog: openEditorSettingsDialog }) => (
  //       <ConfirmButton
  //         openDialog={() => {
  //           const hasCampaign = !!selectedCampaign
  //           const hasCircle = !!draft.access.circle

  //           if (hasCampaign && hasCircle) {
  //             toast.error({
  //               message: (
  //                 <FormattedMessage
  //                   defaultMessage="Article cannot be added to event or circle at the same time"
  //                   id="cPXsvZ"
  //                 />
  //               ),
  //             })
  //             return
  //           }

  //           openEditorSettingsDialog()
  //         }}
  //         disabled={disabled}
  //       />
  //     )}
  //   </EditorPreviewDialog>
  // )

  const router = useRouter()
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

  const hasTitle = title && title.trim().length > 0
  const hasContent =
    content &&
    (stripHtml(content).trim().length > 0 || containsFigureTag(content))

  const isTitleRevised = title !== article.title
  const isSummaryRevised = summary !== article.summary
  const isContentRevised = content !== article.contents.html
  const isTagRevised = !_isEqual(
    tags?.map((tag) => tag.id).sort(),
    article.tags?.map((tag) => tag.id).sort()
  )
  const isConnectionRevised = !_isEqual(
    connections.map(({ id }) => id).sort(),
    article.collection.edges?.map(({ node }) => node.id).sort()
  )

  const isCoverRevised = article.cover ? cover !== article.cover : !!cover
  const isRequestForDonationRevised =
    requestForDonation !== article.requestForDonation
  const isReplyToDonatorRevised = replyToDonator !== article.replyToDonator
  const isCircleRevised = circle?.id !== article.access.circle?.id
  const isAccessRevised = accessType !== article.access.type
  const isLicenseRevised = license !== article.license
  const isCanCommentRevised = canComment !== article.canComment
  const isIndentFirstLineRevised = indentFirstLine !== article.indentFirstLine
  const isSensitiveByAuthorRevised =
    sensitiveByAuthor !== article.sensitiveByAuthor
  const isCampaignRevised =
    selectedCampaign?.id !== article.campaigns[0]?.campaign.id ||
    selectedStage !== article.campaigns[0]?.stage?.id
  const isResetCampaign = isCampaignRevised && !selectedCampaign?.id

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
    isIndentFirstLineRevised ||
    isSensitiveByAuthorRevised ||
    isCampaignRevised ||
    iscnPublish

  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          ...(isTitleRevised ? { title: title } : {}),
          ...(isSummaryRevised ? { summary: summary || null } : {}),
          ...(isContentRevised ? { content: content } : {}),
          ...(isTagRevised ? { tags: tags } : {}),
          ...(isConnectionRevised ? { collection: connections } : {}),
          ...(isCoverRevised ? { cover: cover || null } : {}),
          ...(isRequestForDonationRevised
            ? { requestForDonation: requestForDonation }
            : {}),
          ...(isReplyToDonatorRevised
            ? { replyToDonator: replyToDonator }
            : {}),
          ...(isCircleRevised ? { circle: circle?.id || null } : {}),
          ...(isAccessRevised ? { access: accessType } : {}),
          ...(isLicenseRevised ? { license } : {}),
          ...(isCanCommentRevised ? { canComment: canComment } : {}),
          ...(isIndentFirstLineRevised ? { indented: indentFirstLine } : {}),
          ...(isSensitiveByAuthorRevised
            ? { contentSensitive: sensitiveByAuthor }
            : {}),
          ...(isCampaignRevised
            ? {
                campaigns: isResetCampaign
                  ? []
                  : [
                      {
                        campaign: selectedCampaign.id,
                        stage: selectedStage,
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

  const contentLength = stripHtml(content || '').length
  const isOverLength = contentLength > MAX_ARTICLE_CONTENT_LENGTH

  const disabled =
    !isRevised ||
    loading ||
    isOverRevisionLimit ||
    !hasTitle ||
    !hasContent ||
    isOverLength

  return (
    <ConfirmButton
      openDialog={() => {
        console.log('openDialog')
        onSave()
      }}
      disabled={disabled}
    />
  )
}

export default SettingsButton
