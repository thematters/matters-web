import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { IconPin20, IconUnPin20, Menu, useMutation } from '~/components'
import { PinButtonArticleFragment, TogglePinMutation } from '~/gql/graphql'

const TOGGLE_PIN = gql`
  mutation TogglePin($id: ID!, $pinned: Boolean!) {
    editArticle(input: { id: $id, pinned: $pinned }) {
      id
      pinned
    }
  }
`

const fragments = {
  article: gql`
    fragment PinButtonArticle on Article {
      id
      pinned
      author {
        id
        userName
      }
    }
  `,
}

const PinButton = ({ article }: { article: PinButtonArticleFragment }) => {
  const [togglePin] = useMutation<TogglePinMutation>(TOGGLE_PIN, {
    variables: { id: article.id, pinned: !article.pinned },
    optimisticResponse: {
      editArticle: {
        id: article.id,
        pinned: !article.pinned,
        __typename: 'Article',
      },
    },
  })

  return (
    <Menu.Item
      text={
        article.pinned ? (
          <FormattedMessage
            defaultMessage="Unpin from profile"
            description="src/components/ArticleDigest/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin to profile"
            description="src/components/ArticleDigest/DropdownActions/PinButton.tsx"
          />
        )
      }
      icon={
        article.pinned ? <IconUnPin20 size="mdS" /> : <IconPin20 size="mdS" />
      }
      onClick={togglePin}
    />
  )
}

PinButton.fragments = fragments

export default PinButton
