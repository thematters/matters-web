import { normalizeArticleHTML } from '@matters/matters-editor'
import { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_REVISION_DIFF } from '~/common/enums'
import { measureDiffs, stripHtml } from '~/common/utils'
import { Button, TextIcon, toast, Translate, useMutation } from '~/components'
import {
  ConfirmStepContentProps,
  EditorSettingsDialog,
  EditorSettingsDialogProps,
} from '~/components/Editor/SettingsDialog'
import {
  ArticleDetailPublicQuery,
  EditArticleMutation,
  EditorDraftFragment,
} from '~/gql/graphql'

import ConfirmRevisedPublishDialogContent from './ConfirmRevisedPublishDialogContent'
import { EDIT_ARTICLE } from './gql'
import styles from './styles.module.css'

type EditModeHeaderProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  draft?: EditorDraftFragment
  editContent?: string
  coverId?: string

  revisionCountLeft: number
  isOverRevisionLimit: boolean
  isSameHash: boolean
  isEditDisabled: boolean

  onSaved: () => any
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
  draft,
  editContent,
  coverId,

  revisionCountLeft,
  isOverRevisionLimit,
  isSameHash,
  isEditDisabled,

  onSaved,
  onPublish,

  ...restProps
}: EditModeHeaderProps) => {
  const initContent = useRef<string>()
  useEffect(() => {
    initContent.current = draft?.content || ''
  }, [])

  const currContent = editContent || ''
  const diff =
    measureDiffs(
      stripHtml(normalizeArticleHTML(initContent.current || '')),
      stripHtml(normalizeArticleHTML(currContent || ''))
    ) || 0
  const diffCount = `${diff}`.padStart(2, '0')
  const isOverDiffLimit = diff > MAX_ARTICLE_REVISION_DIFF
  const isContentRevised = diff > 0

  // save or republish
  const { tags, collection, circle, accessType, license } = restProps
  const [editArticle, { loading }] =
    useMutation<EditArticleMutation>(EDIT_ARTICLE)
  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          cover: coverId || null,
          tags: tags.map((tag) => tag.content),
          collection: collection.map(({ id: articleId }) => articleId),
          circle: circle ? circle.id : null,
          accessType,
          license,
          ...(isContentRevised ? { content: editContent } : {}),
          first: null,
          iscnPublish: restProps.iscnPublish,
          canComment: restProps.canComment,
          sensitive: restProps.contentSensitive,
        },
      })
      if (isContentRevised) {
        onPublish()
      }

      if (!isContentRevised) {
        onSaved()
      }
    } catch (e) {
      toast.error({
        message: isContentRevised ? (
          <Translate
            zh_hant="發布失敗"
            zh_hans="發布失敗"
            en="failed to republish"
          />
        ) : (
          <Translate
            zh_hant="保存失敗"
            zh_hans="保存失敗"
            en="failed to save"
          />
        ),
      })
    }
  }

  const ConfirmStepContent = (props: ConfirmStepContentProps) => (
    <ConfirmRevisedPublishDialogContent onSave={onSave} {...props} />
  )

  const UnderLimitText = () => (
    <>
      <Translate
        zh_hant="正文及作品管理剩 "
        zh_hans="正文及作品管理剩 "
        en=""
      />
      {revisionCountLeft}
      <Translate
        zh_hant=" 版修訂"
        zh_hans=" 次修订"
        en=" revisions remaining"
      />
      <span className={isOverDiffLimit ? styles.red : styles.green}>
        &nbsp;{diffCount}/50&nbsp;&nbsp;&nbsp;
      </span>
    </>
  )

  return (
    <>
      <p className={styles.hint}>
        {isSameHash && (
          <>
            {!isOverRevisionLimit ? (
              <UnderLimitText />
            ) : (
              <Translate
                zh_hant="正文及作品管理修訂次數已達上限"
                zh_hans="正文及作品管理修订次数已达上限"
                en="You have reached the limit of republished articles"
              />
            )}
          </>
        )}
      </p>

      <EditorSettingsDialog
        {...restProps}
        article={article}
        saving={loading}
        disabled={loading}
        confirmButtonText={
          isContentRevised ? (
            <Translate zh_hant="立即發布" zh_hans="立即发布" en="Publish" />
          ) : (
            <Translate
              zh_hant="保存修訂"
              zh_hans="保存修订"
              en="Save Revisions"
            />
          )
        }
        cancelButtonText={<Translate id="cancel" />}
        onConfirm={isContentRevised ? undefined : onSave}
        ConfirmStepContent={ConfirmStepContent}
      >
        {({ openDialog: openEditorSettingsDialog }) => (
          <Button
            size={[null, '2rem']}
            spacing={[0, 'base']}
            bgColor="green"
            onClick={openEditorSettingsDialog}
            aria-haspopup="dialog"
            disabled={isEditDisabled || isOverDiffLimit}
          >
            <TextIcon color="white" size="md" weight="md">
              <FormattedMessage defaultMessage="Next Step" />
            </TextIcon>
          </Button>
        )}
      </EditorSettingsDialog>
    </>
  )
}

export default EditModeHeader
