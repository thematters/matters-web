import gql from 'graphql-tag'
import _isArray from 'lodash/isArray'
import { useRouter } from 'next/router'

import { IconRemoveMedium, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { getQuery } from '~/common/utils'

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

const RemoveTagButton = ({ article }: { article: RemoveTagButtonArticle }) => {
  const router = useRouter()
  const id = getQuery({ router, key: 'tagId' })

  const [deleteArticlesTags] = useMutation<DeleteArticlesTags>(
    DELETE_ARTICLES_TAGS,
    {
      variables: { id, articles: [article.id] },
      update: (cache) => {
        updateTagArticlesCount({ cache, type: 'decrement', id })
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
      <TextIcon icon={<IconRemoveMedium size="md" />} size="md" spacing="base">
        <Translate zh_hant="移除作品" zh_hans="移除作品" />
      </TextIcon>
    </Menu.Item>
  )
}

RemoveTagButton.fragments = fragments

export default RemoveTagButton
