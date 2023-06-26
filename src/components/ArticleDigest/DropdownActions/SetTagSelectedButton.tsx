import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { IconCirclePlus20, Menu, useMutation } from '~/components'
import {
  SetTagSelectedButtonArticleFragment,
  SetTagSelectedMutation,
} from '~/gql/graphql'

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
  article: SetTagSelectedButtonArticleFragment
  tagId: string
}) => {
  const [update] = useMutation<SetTagSelectedMutation>(SET_TAG_SELECTED, {
    variables: { id: tagId, articles: [article.id] },
  })

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Add to Featured"
          description="src/components/ArticleDigest/DropdownActions/SetTagSelectedButton.tsx"
        />
      }
      icon={<IconCirclePlus20 size="mdS" />}
      onClick={async () => {
        await update()

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <FormattedMessage
                  defaultMessage="The article has been added to the Trending"
                  description="src/components/ArticleDigest/DropdownActions/SetTagSelectedButton.tsx"
                />
              ),
              duration: 2000,
            },
          })
        )
      }}
    />
  )
}

SetTagSelectedButton.fragments = fragments

export default SetTagSelectedButton
