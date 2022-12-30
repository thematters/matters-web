import gql from 'graphql-tag'
import _isArray from 'lodash/isArray'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import {
  IconRemove24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'

import { DeleteArticlesTags } from './__generated__/DeleteArticlesTags'
import { RemoveTagButtonArticle } from './__generated__/RemoveTagButtonArticle'

const DELETE_ARTICLES_TAGS = gql`
  mutation DeleteArticlesTags($id: ID!, $articles: [ID!]) {
    deleteArticlesTags(input: { id: $id, articles: $articles }) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const fragments = {
  article: gql`
    fragment RemoveTagButtonArticle on Article {
      id
      tags {
        id
        creator {
          id
        }
        editors {
          id
        }
      }
    }
  `,
}

const RemoveTagButton = ({
  article,
  tagId,
}: {
  article: RemoveTagButtonArticle
  tagId: string
}) => {
  const [deleteArticlesTags] = useMutation<DeleteArticlesTags>(
    DELETE_ARTICLES_TAGS,
    {
      variables: { id: tagId, articles: [article.id] },
      update: (cache) => {
        updateTagArticlesCount({ cache, type: 'decrement', id: tagId })
      },
    }
  )

  return (
    <Menu.Item
      onClick={async () => {
        await deleteArticlesTags()

        window.dispatchEvent(
          new CustomEvent(REFETCH_TAG_DETAIL_ARTICLES, {
            detail: {
              event: 'delete',
            },
          })
        )
      }}
    >
      <TextIcon icon={<IconRemove24 size="md" />} size="md" spacing="base">
        <Translate zh_hant="移除作品" zh_hans="移除作品" />
      </TextIcon>
    </Menu.Item>
  )
}

RemoveTagButton.fragments = fragments

export default RemoveTagButton
