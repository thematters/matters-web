import gql from 'graphql-tag'

import {
  Button,
  IconSpinner16,
  RevisedArticlePublishDialog,
  Tag,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'
import { measureDiffs } from '~/common/utils'

import styles from './styles.css'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { EditArticle } from './__generated__/EditArticle'

interface EditModeHeaderProps {
  article: ArticleDetailPublic_article
  cover?: Asset
  editData: Record<string, any>
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]
  circle?: DigestRichCirclePublic | null
  accessType?: ArticleAccessType

  count?: number

  isPending?: boolean
  isSameHash?: boolean

  onSaved: () => any
}

/**
 * Note:
 *
 * The response of this mutation is aligned with `COLLECTION_LIST` in `CollectionList.tsx`,
 * so that it will auto update the local cache and prevent refetch logics
 */
const EDIT_ARTICLE = gql`
  mutation EditArticle(
    $id: ID!
    $mediaHash: String!
    $content: String
    $cover: ID
    $tags: [String!]
    $collection: [ID!]
    $circle: ID
    $accessType: ArticleAccessType
    $after: String
    $first: Int = null
  ) {
    editArticle(
      input: {
        id: $id
        content: $content
        cover: $cover
        tags: $tags
        collection: $collection
        circle: $circle
        accessType: $accessType
      }
    ) {
      id
      cover
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
      access {
        type
      }
      drafts {
        id
        mediaHash
        publishState
        ...EditorDraft
      }
      ...ArticleCollection
    }
  }
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
  ${EditorFragments.draft}
`

const EditModeHeader = ({
  article,
  cover,
  editData,
  tags,
  collection,
  circle,
  accessType,

  count = 3,

  isPending,
  isSameHash,

  onSaved,
}: EditModeHeaderProps) => {
  const [editArticle, { loading }] = useMutation<EditArticle>(EDIT_ARTICLE)

  const { content, currText, initText } = editData
  const diff = measureDiffs(initText || '', currText || '') || 0
  const diffCount = `${diff}`.padStart(2, '0')

  const isReachDiffLimit = diff > 50
  const isRevised = diff > 0
  const isUnderLimit = count > 0 && count <= 3
  const isOverLimit = count <= 0

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

  const diffCountClasses = isReachDiffLimit ? 'red' : 'green'
  const saveButtonText = isRevised ? (
    <Translate id="publish" />
  ) : (
    <Translate id="save" />
  )

  return (
    <>
      <p>
        {isSameHash && (
          <>
            {isUnderLimit && (
              <>
                <Translate
                  zh_hant="正文剩餘"
                  zh_hans="正文剩余"
                  en="content has"
                />{' '}
                {count}{' '}
                <Translate
                  zh_hant="版修訂"
                  zh_hans="版修订"
                  en="republish left"
                />
                <span className={diffCountClasses}>
                  &nbsp;{diffCount}/50&nbsp;&nbsp;&nbsp;
                </span>
              </>
            )}
            {isOverLimit && (
              <Translate
                zh_hant="正文修訂次數已達上限"
                zh_hans="正文修订次数已达上限"
                en="You have reached the limit of republish"
              />
            )}
            {isUnderLimit && (
              <span className="notice">
                <Translate
                  zh_hant="離開本頁將丟失全部編輯"
                  zh_hans="离开本页将丢失全部编辑"
                  en="you will lost your changes if you leave this page"
                />
              </span>
            )}
          </>
        )}
      </p>

      <RevisedArticlePublishDialog onSave={onSave}>
        {({ open }) => (
          <Button
            size={['4rem', '2rem']}
            bgColor="green"
            onClick={isRevised ? open : onSave}
            aria-haspopup="true"
            disabled={isPending || !isSameHash || isReachDiffLimit}
          >
            <TextIcon
              color="white"
              size="md"
              weight="md"
              icon={loading && <IconSpinner16 size="sm" />}
            >
              {loading ? null : saveButtonText}
            </TextIcon>
          </Button>
        )}
      </RevisedArticlePublishDialog>

      <style jsx>{styles}</style>
    </>
  )
}

export default EditModeHeader
