import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconPin from '@/public/static/icons/24px/pin.svg'
import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import { ERROR_CODES } from '~/common/enums'
import { Icon, Menu, toast, useMutation } from '~/components'
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
        cache.modify({
          id: cache.identify({ __typename: 'User', id: article.author.id }),
          fields: {
            pinnedWorks(existingPinnedWorks, { readField }) {
              if (article.pinned) {
                // Unpin: remove from pinnedWorks
                return existingPinnedWorks.filter(
                  (work: any) => readField('id', work) !== article.id
                )
              } else {
                // Pin: add to pinnedWorks
                const articleRef = cache.writeFragment({
                  data: article,
                  fragment: fragments.article,
                })
                return [...existingPinnedWorks, articleRef]
              }
            },
          },
        })
      },
      onCompleted: () => {
        toast.success({
          message: article.pinned ? (
            <FormattedMessage
              defaultMessage="Unpinned from profile"
              id="Ihwz5K"
            />
          ) : (
            <FormattedMessage defaultMessage="Pinned to profile" id="XuYhBC" />
          ),
        })
      },
    },
    {
      toastType: 'success',
      customErrors: {
        [ERROR_CODES.ACTION_LIMIT_EXCEEDED]: (
          <FormattedMessage
            defaultMessage="Up to 3 articles/collections can be pinned"
            id="2oxLHg"
          />
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
            id="S8PcQf"
            description="src/components/ArticleDigest/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin to profile"
            id="qgPR68"
            description="src/components/ArticleDigest/DropdownActions/PinButton.tsx"
          />
        )
      }
      icon={
        article.pinned ? (
          <Icon icon={IconUnpin} size={20} />
        ) : (
          <Icon icon={IconPin} size={20} />
        )
      }
      onClick={togglePin}
    />
  )
}

PinButton.fragments = fragments

export default PinButton
