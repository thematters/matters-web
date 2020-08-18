import { useContext } from 'react'

import {
  Button,
  IconBookmarkActive,
  IconSize,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

import { ToggleSubscribeArticle } from '~/components/GQL/mutations/__generated__/ToggleSubscribeArticle'

interface UnsubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
  inCard: boolean
}

const Unsubscribe = ({
  articleId,
  size,
  disabled,
  inCard,
}: UnsubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const [unsubscribe] = useMutation<ToggleSubscribeArticle>(
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

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label="取消收藏"
      onClick={async () => {
        if (viewer.isFrozen) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="FORBIDDEN" />,
              },
            })
          )
          return
        }

        await unsubscribe()
      }}
      disabled={disabled}
    >
      <IconBookmarkActive color="black" size={size} />
    </Button>
  )
}

export default Unsubscribe
