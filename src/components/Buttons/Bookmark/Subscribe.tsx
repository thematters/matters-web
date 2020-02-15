import { useQuery } from '@apollo/react-hooks'

import { Button, Icon, IconSize, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { subscribePush } from '~/common/utils'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

import { ToggleSubscribeArticle } from '~/components/GQL/mutations/__generated__/ToggleSubscribeArticle'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

const Subscribe = ({
  articleId,
  size,
  disabled
}: {
  articleId: string
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
}) => {
  const [subscribe] = useMutation<ToggleSubscribeArticle>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId },
      optimisticResponse: {
        toggleSubscribeArticle: {
          id: articleId,
          subscribed: true,
          __typename: 'Article'
        }
      }
    }
  )
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
