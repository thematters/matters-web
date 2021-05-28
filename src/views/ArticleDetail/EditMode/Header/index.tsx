import { useState } from 'react'

import { Button, TextIcon, Translate, useMutation } from '~/components'
import {
  ConfirmStepContentProps,
  EditorSettingsDialog,
} from '~/components/Editor/SettingsDialog'
import { useImperativeQuery } from '~/components/GQL'

import {
  ADD_TOAST,
  ENTITY_TYPE,
  MAX_ARTICLE_REVISION_DIFF,
} from '~/common/enums'
import { measureDiffs } from '~/common/utils'

import ConfirmRevisedPublishDialogContent from './ConfirmRevisedPublishDialogContent'
import { EDIT_ARTICLE, EDIT_MODE_ARTICLE_ASSETS } from './gql'
import styles from './styles.css'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { EditModeArticle_article } from '../__generated__/EditModeArticle'
import { EditArticle } from './__generated__/EditArticle'
import { EditModeArticleAssets } from './__generated__/EditModeArticleAssets'

type EditModeHeaderProps = {
  article: EditModeArticle_article
  editData: Record<string, any>

  revisionCountLeft: number
  isOverRevisionLimit: boolean
  isSameHash: boolean
  isEditDisabled: boolean
  isReviseDisabled: boolean

  onSaved: () => any
}

const EditModeHeader = ({
  article,
  editData,

  revisionCountLeft,
  isOverRevisionLimit,
  isSameHash,
  isEditDisabled,
  isReviseDisabled,

  onSaved,
}: EditModeHeaderProps) => {
  // cover
  const assets = article?.assets || []
  const currCover = assets.find((asset) => asset.path === article?.cover)
  const [cover, editCover] = useState<Asset | undefined>(currCover)
  const refetchAssets = useImperativeQuery<EditModeArticleAssets>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // tags
  const [tags, editTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, editCollection] = useState<ArticleDigestDropdownArticle[]>(
    article.collection.edges?.map(({ node }) => node) || []
  )

  // access
  const [circle, editCircle] = useState<DigestRichCirclePublic | null>(
    article.access.circle
  )
  const [accessType, editAccessType] = useState<ArticleAccessType>(
    article.access.type
  )
  const [license, editLicense] = useState<ArticleLicenseType>(article.license)
  const ownCircles = article?.author.ownCircles
  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const editAccess = (
    addToCircle: boolean,
    paywalled: boolean,
    newLicense: ArticleLicenseType
  ) => {
    if (!ownCircles) {
      return
    }

    editCircle(addToCircle ? ownCircles[0] : null)
    editAccessType(
      paywalled ? ArticleAccessType.paywall : ArticleAccessType.public
    )
    editLicense(newLicense)
  }

  // UI
  const { content, currText, initText } = editData
  const diff = measureDiffs(initText || '', currText || '') || 0
  const diffCount = `${diff}`.padStart(2, '0')
  const isOverDiffLimit = diff > MAX_ARTICLE_REVISION_DIFF
  const isRevised = diff > 0

  // save or republish
  const [editArticle, { loading }] = useMutation<EditArticle>(EDIT_ARTICLE)
  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          mediaHash: article.mediaHash,
          cover: cover ? cover.id : null,
          tags: tags.map((tag) => tag.content),
          collection: collection.map(({ id: articleId }) => articleId),
          circle: circle ? circle.id : null,
          accessType,
          ...(isRevised ? { content } : {}),
          first: null,
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
        en="content and article management has "
      />
      {revisionCountLeft}
      <Translate zh_hant=" 版修訂" zh_hans=" 次修订" en=" republish left" />
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
                en="You have reached the limit of republish"
              />
            )}
          </>
        )}
      </p>

      <EditorSettingsDialog
        saving={loading}
        disabled={loading}
        confirmButtonText={
          isRevised ? (
            <Translate zh_hant="立即發布" zh_hans="立即发布" en="Publish" />
          ) : (
            <Translate
              zh_hant="保存修訂"
              zh_hans="保存修订"
              en="Save Revision"
            />
          )
        }
        cancelButtonText={<Translate id="cancel" />}
        onConfirm={isRevised ? undefined : onSave}
        ConfirmStepContent={ConfirmStepContent}
        // cover
        cover={cover?.path}
        assets={assets}
        coverSaving={false}
        editCover={async (...props) => editCover(...props)}
        refetchAssets={refetchAssets}
        entityId={article.id}
        entityType={ENTITY_TYPE.article}
        // tags
        tags={tags}
        tagsSaving={false}
        editTags={async (...props) => editTags(...props)}
        // collection
        collection={collection}
        collectionSaving={false}
        editCollection={async (...props) => editCollection(...props)}
        // circle
        circle={circle}
        accessType={accessType}
        license={license}
        accessSaving={false}
        editAccess={async (...props) => editAccess(...props)}
        canToggleCircle={!!hasOwnCircle && !isReviseDisabled}
      >
        {({ open: openEditorSettingsDialog }) => (
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
