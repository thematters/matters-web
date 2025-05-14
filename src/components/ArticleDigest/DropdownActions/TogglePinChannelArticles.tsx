import gql from 'graphql-tag'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { ReactComponent as IconUnpin } from '@/public/static/icons/24px/unpin.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import { TogglePinChannelArticlesMutation } from '~/gql/graphql'

const TOGGLE_PIN_CHANNEL_ARTICLES = gql`
  mutation togglePinChannelArticles(
    $channels: [ID!]!
    $articles: [ID!]!
    $pinned: Boolean!
  ) {
    togglePinChannelArticles(
      input: { channels: $channels, articles: $articles, pinned: $pinned }
    ) {
      id
      shortHash
    }
  }
`

const TogglePinChannelArticles = ({
  articleId,
  channelId,
  pinned,
}: {
  articleId: string
  channelId: string
  pinned: boolean
}) => {
  const [update] = useMutation<TogglePinChannelArticlesMutation>(
    TOGGLE_PIN_CHANNEL_ARTICLES,
    {
      variables: {
        channels: [channelId],
        articles: [articleId],
        pinned: !pinned,
      },
    }
  )

  return (
    <Menu.Item
      text={pinned ? '取消置頂' : '精選置頂'}
      icon={<Icon icon={pinned ? IconUnpin : IconPin} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: pinned ? '已取消置頂' : '已置頂',
        })
      }}
    />
  )
}

export default TogglePinChannelArticles
