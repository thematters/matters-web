import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { IconPin20, IconUnPin20, Menu, toast, useMutation } from '~/components'
import { updateUserArticles } from '~/components/GQL'
import { PinButtonArticleFragment, TogglePinMutation } from '~/gql/graphql'

type PinButtonProps = { article: PinButtonArticleFragment }

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

const PinButton = ({ article }: PinButtonProps) => {
  const [togglePin] = useMutation<TogglePinMutation>(
    TOGGLE_PIN,
    {
      variables: { id: article.id, pinned: !article.pinned },
      // optimisticResponse: {
      //   editArticle: {
      //     id: article.id,
      //     pinned: !article.pinned,
      //     __typename: 'Article',
      //   },
      // },
      update: (cache) => {
        updateUserArticles({
          cache,
          targetId: article.id,
          userName: article.author.userName!,
          type: article.pinned ? 'unpin' : 'pin',
        })
      },
      onCompleted: () => {
        toast.success({
          message: article.pinned ? (
            <FormattedMessage defaultMessage="Unpinned from profile" />
          ) : (
            <FormattedMessage defaultMessage="Pinned to profile" />
          ),
        })
      },
    },
    {
      toastType: 'success',
      customErrors: {
        [ERROR_CODES.ACTION_LIMIT_EXCEEDED]: (
          <FormattedMessage defaultMessage="Up to 3 articles/collections can be pinned" />
        ),
      },
    }
  )

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
