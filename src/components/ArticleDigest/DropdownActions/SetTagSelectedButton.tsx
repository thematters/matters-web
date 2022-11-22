import gql from 'graphql-tag'

import { IconAdd24, Menu, TextIcon, Translate, useMutation } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { SetTagSelected } from './__generated__/SetTagSelected'
import { SetTagSelectedButtonArticle } from './__generated__/SetTagSelectedButtonArticle'

const SET_TAG_SELECTED = gql`
  mutation SetTagSelected($id: ID!, $articles: [ID!]) {
    updateArticlesTags(
      input: { id: $id, articles: $articles, isSelected: true }
    ) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const fragments = {
  article: gql`
    fragment SetTagSelectedButtonArticle on Article {
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

const SetTagSelectedButton = ({
  article,
  tagId,
}: {
  article: SetTagSelectedButtonArticle
  tagId: string
}) => {
  const [update] = useMutation<SetTagSelected>(SET_TAG_SELECTED, {
    variables: { id: tagId, articles: [article.id] },
  })

  return (
    <Menu.Item
      onClick={async () => {
        await update()

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant="作品已添加至精選"
                  zh_hans="作品已添加至精选"
                />
              ),
              duration: 2000,
            },
          })
        )
      }}
    >
      <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
        <Translate zh_hant="添加到精選" zh_hans="添加到精选" />
      </TextIcon>
    </Menu.Item>
  )
}

SetTagSelectedButton.fragments = fragments

export default SetTagSelectedButton
