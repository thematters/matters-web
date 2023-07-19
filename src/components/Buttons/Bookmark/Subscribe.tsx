import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconBookmark16,
  IconBookmark20,
  IconSize,
  LanguageContext,
  Menu,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

interface SubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'mdS' | 'md'>
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
      toast.error({
        message: <Translate id="FORBIDDEN_BY_STATE" />,
      })
      return
    }

    await subscribe()

    toast.success({
      message: (
        <Translate en="Bookmarked" zh_hans="收藏成功" zh_hant="收藏成功" />
      ),
    })
  }

  if (inCard) {
    return (
      <Menu.Item
        text={<Translate id="bookmark" />}
        icon={<IconBookmark20 size="mdS" />}
        onClick={onClick}
        testId={TEST_ID.ARTICLE_BOOKMARK}
      />
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={'greyLighter'}
      aria-label={translate({
        zh_hant: '收藏',
        zh_hans: '收藏',
        en: 'Bookmark',
        lang,
      })}
      onClick={onClick}
      disabled={disabled}
      data-test-id={TEST_ID.ARTICLE_BOOKMARK}
    >
      <IconBookmark16 size={size} />
    </Button>
  )
}

export default Subscribe
