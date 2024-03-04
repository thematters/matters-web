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

  revisedTitle?: string
  revisedSummary?: string
  revisedContent?: string
  revisedCover?: AssetFragment

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

  revisedTitle,
  revisedSummary,
  revisedContent,
  revisedCover,

  revisionCountLeft,
  isOverRevisionLimit,
  isEditDisabled,

  onPublish,

  ...restProps
}: EditModeHeaderProps) => {
  const { tags, collection, circle, accessType, license } = restProps
  const [editArticle, { loading }] =
    useMutation<EditArticleMutation>(EDIT_ARTICLE)

  const isTitleRevised = revisedTitle !== article.title
  const isSummaryRevised = revisedSummary !== article.summary
  const isContentRevised = revisedContent !== article.contents.html
  const isTagRevised = !_isEqual(
    tags.map((tag) => tag.id).sort(),
    article.tags?.map((tag) => tag.id).sort()
  )
  const isCollectionRevised = !_isEqual(
    collection.map((collection) => collection.id).sort(),
    article.collection.edges?.map(({ node }) => node.id).sort()
  )
  const isCoverRevised = article.cover
    ? revisedCover?.path !== article.cover
    : !!revisedCover?.path
  const needRepublish =
    isTitleRevised ||
    isSummaryRevised ||
    isContentRevised ||
    isTagRevised ||
    isCollectionRevised ||
    isCoverRevised

  const onSave = async () => {
    // check content length
    const contentCount = revisedContent?.length || 0

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
          ...(isTitleRevised ? { title: revisedTitle } : {}),
          ...(isSummaryRevised ? { summary: revisedSummary || null } : {}),
          ...(isContentRevised ? { content: revisedContent } : {}),
          ...(isTagRevised ? { tags: tags.map((tag) => tag.content) } : {}),
          ...(isCollectionRevised
            ? { collection: collection.map(({ id }) => id) }
            : {}),
          ...(isCoverRevised ? { cover: revisedCover?.id || null } : {}),
          circle: circle ? circle.id : null,
          accessType,
          license,
          iscnPublish: restProps.iscnPublish,
          canComment: restProps.canComment,
          sensitive: restProps.contentSensitive,
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
        article={article}
        saving={loading}
        disabled={loading}
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
            spacing={[0, 'base']}
            bgColor="green"
            onClick={openEditorSettingsDialog}
            aria-haspopup="dialog"
            disabled={isEditDisabled}
          >
            <TextIcon color="white" size="md" weight="md">
              <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
            </TextIcon>
          </Button>
        )}
      </EditorSettingsDialog>
    </>
  )
}

export default EditModeHeader
