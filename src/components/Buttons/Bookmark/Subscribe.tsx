import { useContext } from 'react'

import {
  ADD_TOAST,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconBookmark16,
  IconSize,
  LanguageContext,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

interface SubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
  inCard?: boolean
}

const Subscribe = ({ articleId, size, disabled, inCard }: SubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [subscribe] = useMutation<ToggleSubscribeArticleMutation>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId, enabled: true },
      optimisticResponse: articleId
        ? {
            toggleSubscribeArticle: {
              id: articleId,
              subscribed: true,
              __typename: 'Article',
            },
          }
        : undefined,
    }
  )

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.bookmark },
        })
      )
      return
    }

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

    await subscribe()
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label={translate({
        zh_hant: '收藏',
        zh_hans: '收藏',
        en: 'Bookmark',
        lang,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <IconBookmark16 size={size} />
    </Button>
  )
}

export default Subscribe
