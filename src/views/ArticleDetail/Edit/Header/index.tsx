import _isEqual from 'lodash/isEqual'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_CONTENT_LENGTH } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, TextIcon, toast, useMutation } from '~/components'
import {
  ConfirmStepContentProps,
  EditorSettingsDialog,
  EditorSettingsDialogProps,
} from '~/components/Editor/SettingsDialog'
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

  revisionCountLeft: number
  isOverRevisionLimit: boolean
  isEditDisabled: boolean

  onPublish: () => any
} & Omit<
  EditorSettingsDialogProps,
  | 'saving'
  | 'disabled'
  | 'confirmButtonText'
  | 'cancelButtonText'
  | 'onConfirm'
  | 'ConfirmStepContent'
  | 'children'
>

const EditModeHeader = ({
  article,
  revision,
  revisionCountLeft,
  isOverRevisionLimit,
  isEditDisabled,

  onPublish,

  ...restProps
}: EditModeHeaderProps) => {
  const { tags, collection, circle, accessType, license } = restProps
  const [editArticle, { loading }] =
    useMutation<EditArticleMutation>(EDIT_ARTICLE)

  const isTitleRevised = revision.title !== article.title
  const isSummaryRevised = revision.summary !== article.summary
  const isContentRevised = revision.content !== article.contents.html
  const isTagRevised = !_isEqual(
    tags.map((tag) => tag.id).sort(),
    article.tags?.map((tag) => tag.id).sort()
  )
  const isCollectionRevised = !_isEqual(
    collection.map((collection) => collection.id).sort(),
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
  const isSensitiveRevised =
    restProps.contentSensitive !== article.sensitiveByAuthor

  const needRepublish =
    isTitleRevised ||
    isSummaryRevised ||
    isContentRevised ||
    isTagRevised ||
    isCollectionRevised ||
    isCoverRevised

  const isRevised =
    needRepublish ||
    isRequestForDonationRevised ||
    isReplyToDonatorRevised ||
    isCircleRevised ||
    isAccessRevised ||
    isLicenseRevised ||
    isCanCommentRevised ||
    isSensitiveRevised ||
    restProps.iscnPublish

  const onSave = async () => {
    // check content length
    const contentCount = revision.content?.length || 0

    if (needRepublish && contentCount > MAX_ARTICLE_CONTENT_LENGTH) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage={`Content length exceeds limit ({length}/{limit})`}
            id="VefaFQ"
            values={{ length: contentCount, limit: MAX_ARTICLE_CONTENT_LENGTH }}
          />
        ),
      })
      return
    }

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
          ...(isCollectionRevised
            ? { collection: collection.map(({ id }) => id) }
            : {}),
          ...(isCoverRevised ? { cover: revision.cover?.id || null } : {}),
          ...(isRequestForDonationRevised
            ? { requestForDonation: revision.requestForDonation }
            : {}),
          ...(isReplyToDonatorRevised
            ? { replyToDonator: revision.replyToDonator }
            : {}),
          ...(isCircleRevised ? { circle: circle?.id || null } : {}),
          ...(isAccessRevised ? { accessType } : {}),
          ...(isLicenseRevised ? { license } : {}),
          ...(restProps.iscnPublish
            ? { iscnPublish: restProps.iscnPublish }
            : {}),
          ...(isCanCommentRevised ? { canComment: restProps.canComment } : {}),
          ...(isSensitiveRevised
            ? { sensitive: restProps.contentSensitive }
            : {}),
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
        window.location.href = path.href
      }
    } catch (e) {
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

  return (
    <>
      <p className={styles.hint}>
        <>
          {!isOverRevisionLimit ? (
            <FormattedMessage
              defaultMessage="{revisionCountLeft} revisions remaining"
              id="Wjmng6"
              values={{
                revisionCountLeft,
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="You have reached the limit of republished articles"
              id="lsccVJ"
            />
          )}
        </>
      </p>

      <EditorSettingsDialog
        {...restProps}
        versionDescription={revision.versionDescription}
        article={{
          ...article,
          replyToDonator: revision.replyToDonator,
          requestForDonation: revision.requestForDonation,
        }}
        saving={loading}
        disabled={!isRevised || loading}
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
        onConfirm={needRepublish ? undefined : onSave}
        ConfirmStepContent={ConfirmStepContent}
      >
        {({ openDialog: openEditorSettingsDialog }) => (
          <Button
            size={[null, '2rem']}
            spacing={[0, 16]}
            bgColor="green"
            onClick={openEditorSettingsDialog}
            aria-haspopup="dialog"
            disabled={!isRevised || isEditDisabled}
          >
            <TextIcon color="white" size={16} weight="medium">
              <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
            </TextIcon>
          </Button>
        )}
      </EditorSettingsDialog>
    </>
  )
}

export default EditModeHeader
