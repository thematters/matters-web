import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconSave from '@/public/static/icons/24px/save.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Button,
  ButtonProps,
  Icon,
  IconSize,
  Menu,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleBookmarkArticleMutation } from '~/gql/graphql'

import TOGGLE_BOOKMARK_ARTICLE from '../../GQL/mutations/toggleBookmarkArticle'

export type BookmarkProps = {
  articleId: string
  iconSize?: Extract<IconSize, 20 | 24>
  disabled?: boolean
  inCard?: boolean
} & ButtonProps

const Bookmark = ({
  articleId,
  iconSize,
  disabled,
  inCard,
  ...buttonProps
}: BookmarkProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [bookmark] = useMutation<ToggleBookmarkArticleMutation>(
    TOGGLE_BOOKMARK_ARTICLE,
    {
      variables: { id: articleId, enabled: true },
      optimisticResponse: {
        toggleBookmarkArticle: {
          id: articleId,
          bookmarked: true,
        },
      },
      update: (cache) => {
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'bookmarkedArticles',
        })
        cache.gc()
      },
    }
  )

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.bookmark },
        })
      )
      return
    }

    if (viewer.isFrozen) {
      toast.error({
        message: (
          <FormattedMessage
            {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
          />
        ),
      })
      return
    }

    analytics.trackEvent('click_button', {
      type: 'article_bookmark',
    })

    await bookmark()

    toast.info({
      message: <FormattedMessage defaultMessage="Bookmarked" id="k0fraU" />,
    })
  }

  if (inCard) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Bookmark"
            id="BM0Xw3"
            description="src/components/Buttons/Bookmark/Bookmark.tsx"
          />
        }
        icon={<Icon icon={IconSave} size={20} />}
        onClick={onClick}
        testId={TEST_ID.ARTICLE_BOOKMARK}
      />
    )
  }

  return (
    <Button
      spacing={[8, 8]}
      bgActiveColor={'greyLighter'}
      aria-label={intl.formatMessage({
        defaultMessage: 'Bookmark',
        id: 'BM0Xw3',
        description: 'src/components/Buttons/Bookmark/Bookmark.tsx',
      })}
      onClick={onClick}
      disabled={disabled}
      data-test-id={TEST_ID.ARTICLE_BOOKMARK}
      {...buttonProps}
    >
      <Icon icon={IconSave} size={iconSize} />
    </Button>
  )
}

export default Bookmark
