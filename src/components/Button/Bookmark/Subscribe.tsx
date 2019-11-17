import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { useMutation } from '~/components/GQL'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { subscribePush } from '~/common/utils'
import ICON_BOOKMARK_REGULAR_INACTIVE from '~/static/icons/bookmark-regular-inactive.svg?sprite'
import ICON_BOOKMARK_SM_INACTIVE from '~/static/icons/bookmark-small-inactive.svg?sprite'

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
  size: 'xsmall' | 'small' | 'default'
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

    if (!push || !push.supported || push.enabled) {
      return
    }

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
    <button
      type="button"
      aria-label="收藏"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        size={size}
        id={
          size === 'default'
            ? ICON_BOOKMARK_REGULAR_INACTIVE.id
            : ICON_BOOKMARK_SM_INACTIVE.id
        }
        viewBox={
          size === 'default'
            ? ICON_BOOKMARK_REGULAR_INACTIVE.viewBox
            : ICON_BOOKMARK_SM_INACTIVE.viewBox
        }
      />
    </button>
  )
}

export default Subscribe
