import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button, Icon, IconSize } from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { Translate } from '~/components/Language'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { subscribePush } from '~/common/utils'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { BookmarkArticle } from './__generated__/BookmarkArticle'
import { SubscribeArticle } from './__generated__/SubscribeArticle'

const SUBSCRIBE_ARTICLE = gql`
  mutation SubscribeArticle($id: ID!) {
    subscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`

const Subscribe = ({
  article,
  size,
  disabled
}: {
  article: BookmarkArticle
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
}) => {
  const [subscribe] = useMutation<SubscribeArticle>(SUBSCRIBE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      subscribeArticle: {
        id: article.id,
        subscribed: true,
        __typename: 'Article'
      }
    }
  })
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE
  )
  const push =
    clientPreferenceData && clientPreferenceData.clientPreference.push

  const onClick = async () => {
    await subscribe()

    // skip
    if (
      !push ||
      !push.supported ||
      push.enabled ||
      Notification.permission === 'granted'
    ) {
      return
    }

    // show toast to subscribe push
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          header: <Translate zh_hant="收藏成功" zh_hans="收藏成功" />,
          content: (
            <Translate
              zh_hant={TEXT.zh_hant.pushDescription}
              zh_hans={TEXT.zh_hans.pushDescription}
            />
          ),
          customButton: (
            <button type="button" onClick={() => subscribePush()}>
              <Translate
                zh_hant={TEXT.zh_hant.confirmPush}
                zh_hans={TEXT.zh_hans.confirmPush}
              />
            </button>
          )
        }
      })
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgHoverColor="grey-lighter"
      aria-label="收藏"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon.Bookmark size={size} />
    </Button>
  )
}

export default Subscribe
