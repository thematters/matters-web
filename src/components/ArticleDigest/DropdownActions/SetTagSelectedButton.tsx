import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
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
      articles: articlesExcludeSpam(input: { first: 0, selected: true }) {
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
          id="WSUAwk"
          description="src/components/ArticleDigest/DropdownActions/SetTagSelectedButton.tsx"
        />
      }
      icon={<Icon icon={IconCirclePlus} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="The article has been added to the Trending"
              id="7xnrxG"
              description="src/components/ArticleDigest/DropdownActions/SetTagSelectedButton.tsx"
            />
          ),
        })
      }}
    />
  )
}

SetTagSelectedButton.fragments = fragments

export default SetTagSelectedButton
