import { Button, Icon, IconSize } from '~/components'
import { useMutation } from '~/components/GQL'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

import { ToggleSubscribeArticle } from '~/components/GQL/mutations/__generated__/ToggleSubscribeArticle'

interface UnsubscribeProps {
  articleId: string
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
  const [unsubscribe] = useMutation<ToggleSubscribeArticle>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId },
      optimisticResponse: {
        toggleSubscribeArticle: {
          id: articleId,
          subscribed: false,
          __typename: 'Article',
        },
      },
    }
  )

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label="取消收藏"
      onClick={unsubscribe}
      disabled={disabled}
    >
      <Icon.BookmarkActive color="black" size={size} />
    </Button>
  )
}

export default Unsubscribe
