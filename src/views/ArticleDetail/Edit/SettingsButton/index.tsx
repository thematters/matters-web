import _isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import IconPublishFill from '@/public/static/icons/24px/publish-fill.svg'
import { MAX_ARTICLE_CONTENT_LENGTH } from '~/common/enums'
import { containsFigureTag, stripHtml, toPath } from '~/common/utils'
import { Button, Icon, Media, TextIcon, toast, useMutation } from '~/components'
import { EditorPreviewDialog } from '~/components/Editor/PreviewDialog'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  AssetFragment,
  CollectionDigestCollectionPublicFragment,
  DigestRichCirclePublicFragment,
  EditArticleMutation,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import { Article } from '..'
import { EDIT_ARTICLE } from '../Header/gql'

type SettingsButtonProps = {
  article: Article
  content: string
  cover: AssetFragment | null
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
  collections: CollectionDigestCollectionPublicFragment[]
  saving?: boolean
  versionDescription: string
  editVersionDescription: (description: string) => void
} & Pick<
  Article,
  | 'title'
  | 'summary'
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
  collections,
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
  versionDescription,
  editVersionDescription,
  onPublish,
  isOverRevisionLimit,
}: SettingsButtonProps) => {
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
    article.connections.edges?.map(({ node }) => node.id).sort()
  )
  const isCollectionRevised = !_isEqual(
    collections?.map(({ id }) => id).sort(),
    article.collections.edges?.map(({ node }) => node.id).sort()
  )

  const isCoverRevised = article.cover
    ? cover?.path !== article.cover
    : !!cover?.path
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
    isCollectionRevised ||
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
          ...(isCoverRevised ? { cover: cover?.id || null } : {}),
          ...(isConnectionRevised
            ? { connections: connections.map(({ id }) => id) }
            : {}),
          ...(isCollectionRevised
            ? { collections: collections.map(({ id }) => id) }
            : {}),
          ...(isRequestForDonationRevised
            ? { requestForDonation: requestForDonation }
            : {}),
          ...(isReplyToDonatorRevised
            ? { replyToDonator: replyToDonator }
            : {}),
          ...(isCircleRevised ? { circle: circle?.id || null } : {}),
          ...(isAccessRevised ? { accessType: accessType } : {}),
          ...(isLicenseRevised ? { license } : {}),
          ...(isCanCommentRevised ? { canComment: canComment } : {}),
          ...(isIndentFirstLineRevised
            ? { indentFirstLine: indentFirstLine }
            : {}),
          ...(isSensitiveByAuthorRevised
            ? { sensitive: sensitiveByAuthor }
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
          versionDescription,
        },
      })

      if (needRepublish) {
        onPublish()
      } else {
        baseToast.dismiss()
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
    <EditorPreviewDialog
      draft={{
        __typename: 'Draft',
        id: article.id,
        title,
        summary,
        content,
        cover: cover?.path || null,
        tags: tags?.map((tag) => tag.content),
        license,
        canComment,
        sensitiveByAuthor,
        campaigns: selectedCampaign
          ? [
              {
                __typename: 'ArticleCampaign',
                campaign: {
                  __typename: 'WritingChallenge',
                  id: selectedCampaign?.id || '',
                  name: selectedCampaign?.name || '',
                },
              },
            ]
          : [],
        collections: {
          __typename: 'CollectionConnection',
          edges: collections.map(({ id, title }) => ({
            __typename: 'CollectionEdge',
            node: { __typename: 'Collection', id, title },
          })),
        },
        access: {
          __typename: 'DraftAccess',
          circle,
        },
        connections: {
          __typename: 'ArticleConnection',
          edges: connections.map((node) => ({
            __typename: 'ArticleEdge',
            node: {
              __typename: 'Article',
              id: node.id,
              title: node.title,
            },
          })),
        },
      }}
      saving={loading}
      disabled={disabled}
      confirmButtonText={
        <FormattedMessage defaultMessage="Publish Now" id="nWhqw9" />
      }
      cancelButtonText={
        <FormattedMessage defaultMessage="Back to Edit" id="tGHG7q" />
      }
      onConfirm={() => {
        onSave()
      }}
      versionDescription={versionDescription}
      editVersionDescription={editVersionDescription}
    >
      {({ openDialog: openEditorSettingsDialog }) => (
        <ConfirmButton
          openDialog={() => {
            const hasCampaign = !!selectedCampaign
            const hasCircle = !!circle

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
