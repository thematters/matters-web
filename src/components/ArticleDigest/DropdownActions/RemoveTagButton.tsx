import gql from 'graphql-tag'
import _isArray from 'lodash/isArray'
import { useRouter } from 'next/router'

import { Icon, PopperInstance, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'

import { DeleteArticleTags } from './__generated__/DeleteArticleTags'
import { RemoveTagButtonArticle } from './__generated__/RemoveTagButtonArticle'
import styles from './styles.css'

const DELETE_ARTICLE_TAGS = gql`
  mutation DeleteArticleTags($id: ID!, $articles: [ID!]) {
    deleteArticleTags(input: { id: $id, articles: $articles }) {
      id
    }
  }
`

const fragments = {
  article: gql`
    fragment RemoveTagButtonArticle on Article {
      id
    }
  `
}

const TextIconRemoveTag = () => (
  <TextIcon icon={<Icon.Remove size="sm" />} spacing="tight">
    <Translate zh_hant="取消標籤" zh_hans="取消标签" />
  </TextIcon>
)

const RemoveTagButton = ({
  article,
  instance,
  hideDropdown
}: {
  article: RemoveTagButtonArticle
  instance?: PopperInstance | null
  hideDropdown: () => void
}) => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  const tagId = _isArray(id) ? id[0] : id

  const [deleteArticlesTags] = useMutation<DeleteArticleTags>(
    DELETE_ARTICLE_TAGS,
    { variables: { id: tagId, articles: [article.id] } }
  )

  const sync = () => {
    window.dispatchEvent(
      new CustomEvent(REFETCH_TAG_DETAIL_ARTICLES, {
        detail: {
          event: 'delete'
        }
      })
    )
  }

  return (
    <button
      type="button"
      onClick={async () => {
        await deleteArticlesTags()
        if (instance) {
          instance.props.onHidden = sync
        }
        hideDropdown()
      }}
    >
      <TextIconRemoveTag />
      <style jsx>{styles}</style>
    </button>
  )
}

RemoveTagButton.fragments = fragments

export default RemoveTagButton
