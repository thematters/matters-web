import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST, TEST_ID } from '~/common/enums'
import {
  Button,
  IconBookmarked16,
  IconBookmarked20,
  IconSize,
  Menu,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

interface UnsubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'mdS' | 'md'>
  disabled?: boolean
  inCard?: boolean
}

const Unsubscribe = ({
  articleId,
  size,
  disabled,
  inCard,
}: UnsubscribeProps) => {
  const viewer = useContext(ViewerContext)

  const [unsubscribe] = useMutation<ToggleSubscribeArticleMutation>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId, enabled: false },
      optimisticResponse: articleId
        ? {
            toggleSubscribeArticle: {
              id: articleId,
              subscribed: false,
              __typename: 'Article',
            },
          }
        : undefined,
    }
  )

  const onClick = async () => {
    if (viewer.isFrozen) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="FORBIDDEN_BY_STATE" />,
          },
        })
      )
      return
    }

    await unsubscribe()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              en="Bookmark removed"
              zh_hans="收藏已取消"
              zh_hant="收藏已取消"
            />
          ),
        },
      })
    )
  }

  if (inCard) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Undo bookmark"
            description="src/components/Buttons/Bookmark/Unsubscribe.tsx"
          />
        }
        icon={<IconBookmarked20 size={size} />}
        onClick={onClick}
        testId={TEST_ID.ARTICLE_BOOKMARK}
      />
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      aria-label={
        <FormattedMessage
          defaultMessage="Undo bookmark"
          description="src/components/Buttons/Bookmark/Unsubscribe.tsx"
        />
      }
      onClick={onClick}
      disabled={disabled}
      data-test-id={TEST_ID.ARTICLE_BOOKMARK}
    >
      <IconBookmarked16 color="black" size={size} />
    </Button>
  )
}

export default Unsubscribe
