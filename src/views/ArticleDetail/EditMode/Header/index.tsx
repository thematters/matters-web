import gql from 'graphql-tag'

import {
  Button,
  IconSpinner,
  RevisedArticlePublishDialog,
  Tag,
  TextIcon,
  Translate,
} from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'
import { measureDiffs, stripHtml } from '~/common/utils'

import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { EditArticle } from './__generated__/EditArticle'

interface EditModeHeaderProps {
  article: ArticleDetailPublic_article
  content: string | null
  cover?: Asset
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]
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
      }
    ) {
      id
      cover
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
      drafts {
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
  content,
  cover,
  tags,
  collection,
  count = 3,

  isPending,
  isSameHash,

  onSaved,
}: EditModeHeaderProps) => {
  const [editArticle, { loading }] = useMutation<EditArticle>(EDIT_ARTICLE)

  const origin = stripHtml(article.content || '', '')
  const diff = content ? measureDiffs(origin, stripHtml(content, '')) : 0
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
              <Translate zh_hant="發布失敗" zh_hans="發布失敗" />
            ) : (
              <Translate zh_hant="保存失敗" zh_hans="保存失敗" />
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
                <Translate zh_hant="正文剩餘" zh_hans="正文剩余" /> {count}{' '}
                <Translate zh_hant="版修訂" zh_hans="版修订" />
                <span className={diffCountClasses}> {diffCount}/50 </span>
              </>
            )}
            {isOverLimit && (
              <Translate
                zh_hant="正文修訂次數已達上限"
                zh_hans="正文修订次数已达上限"
              />
            )}
            {isUnderLimit && (
              <span className="notice">
                <Translate
                  zh_hant="離開本頁將丟失全部編輯"
                  zh_hans="离开本页将丢失全部编辑"
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
              icon={loading && <IconSpinner size="sm" />}
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
