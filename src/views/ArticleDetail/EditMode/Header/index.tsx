import { Button, TextIcon, Translate, useMutation } from '~/components'
import {
  ConfirmStepContentProps,
  EditorSettingsDialog,
  EditorSettingsDialogProps,
} from '~/components/Editor/SettingsDialog'

import { ADD_TOAST, MAX_ARTICLE_REVISION_DIFF } from '~/common/enums'
import { measureDiffs } from '~/common/utils'

import ConfirmRevisedPublishDialogContent from './ConfirmRevisedPublishDialogContent'
import { EDIT_ARTICLE } from './gql'
import styles from './styles.css'

import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { EditArticle } from './__generated__/EditArticle'

type EditModeHeaderProps = {
  article: ArticleDetailPublic_article
  editData: Record<string, any>
  coverId?: string

  revisionCountLeft: number
  isOverRevisionLimit: boolean
  isSameHash: boolean
  isEditDisabled: boolean

  onSaved: () => any
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
  editData,
  coverId,

  revisionCountLeft,
  isOverRevisionLimit,
  isSameHash,
  isEditDisabled,

  onSaved,

  ...restProps
}: EditModeHeaderProps) => {
  const { content, currText, initText } = editData
  const diff = measureDiffs(initText || '', currText || '') || 0
  const diffCount = `${diff}`.padStart(2, '0')
  const isOverDiffLimit = diff > MAX_ARTICLE_REVISION_DIFF
  const isRevised = diff > 0

  // save or republish
  const { tags, collection, circle, accessType, license } = restProps
  const [editArticle, { loading }] = useMutation<EditArticle>(EDIT_ARTICLE)
  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          mediaHash: article.mediaHash,
          cover: coverId || null,
          tags: tags.map((tag) => tag.content),
          collection: collection.map(({ id: articleId }) => articleId),
          circle: circle ? circle.id : null,
          accessType,
          license,
          ...(isRevised ? { content } : {}),
          first: null,
          iscnPublish: restProps.iscnPublish,
        },
      })

      if (!isRevised) {
        onSaved()
      }
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: isRevised ? (
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
          },
        })
      )
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
        en=" "
      />
      {revisionCountLeft}
      <Translate
        zh_hant=" 版修訂"
        zh_hans=" 次修订"
        en=" revisions remaining"
      />
      <span className={isOverDiffLimit ? 'red' : 'green'}>
        &nbsp;{diffCount}/50&nbsp;&nbsp;&nbsp;
      </span>
    </>
  )

  return (
    <>
      <p>
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
        saving={loading}
        disabled={loading}
        confirmButtonText={
          isRevised ? (
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
        onConfirm={isRevised ? undefined : onSave}
        ConfirmStepContent={ConfirmStepContent}
      >
        {({ openDialog: openEditorSettingsDialog }) => (
          <Button
            size={[null, '2rem']}
            spacing={[0, 'base']}
            bgColor="green"
            onClick={openEditorSettingsDialog}
            aria-haspopup="true"
            disabled={isEditDisabled || isOverDiffLimit}
          >
            <TextIcon color="white" size="md" weight="md">
              <Translate id="nextStep" />
            </TextIcon>
          </Button>
        )}
      </EditorSettingsDialog>

      <style jsx>{styles}</style>
    </>
  )
}

export default EditModeHeader
