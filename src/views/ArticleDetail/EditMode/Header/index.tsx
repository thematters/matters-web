import gql from 'graphql-tag'

import { Button, IconSpinner, Tag, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { EditArticle } from './__generated__/EditArticle'

interface EditModeHeaderProps {
  article: ArticleDetailPublic_article
  cover?: Asset
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]
  onSaved: () => any
  disabled?: boolean
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
    $cover: ID
    $tags: [String!]
    $collection: [ID!]
    $after: String
    $first: Int = null
  ) {
    editArticle(
      input: { id: $id, cover: $cover, tags: $tags, collection: $collection }
    ) {
      id
      cover
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
      ...ArticleCollection
    }
  }
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
`

const EditModeHeader = ({
  article,
  cover,
  tags,
  collection,

  onSaved,

  disabled,
}: EditModeHeaderProps) => {
  const [editArticle, { loading }] = useMutation<EditArticle>(EDIT_ARTICLE)

  const onSave = async () => {
    try {
      await editArticle({
        variables: {
          id: article.id,
          mediaHash: article.mediaHash,
          cover: cover ? cover.id : null,
          tags: tags.map(({ content }) => content),
          collection: collection.map(({ id: articleId }) => articleId),
          first: null,
        },
      })
      onSaved()
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate zh_hant="保存失敗" zh_hans="保存失敗" />,
          },
        })
      )
    }
  }

  return (
    <>
      <p>
        <Translate
          zh_hant="作品已發布到 IPFS，無法被修改，但你可以修訂關聯作品和標籤。"
          zh_hans="作品已发布到 IPFS，无法被修改，但你可以修订关联作品和标签。"
        />
      </p>

      <Button
        size={['4rem', '2rem']}
        bgColor="green"
        onClick={onSave}
        aria-haspopup="true"
        disabled={disabled}
      >
        <TextIcon
          color="white"
          size="md"
          weight="md"
          icon={loading && <IconSpinner size="sm" />}
        >
          {loading ? null : <Translate id="save" />}
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </>
  )
}

export default EditModeHeader
