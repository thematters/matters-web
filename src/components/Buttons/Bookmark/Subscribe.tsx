import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconSave } from '@/public/static/icons/24px/save.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
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

export type SubscribeProps = {
  articleId?: string
  iconSize?: Extract<IconSize, 20 | 24>
  disabled?: boolean
  inCard?: boolean
} & ButtonProps

const Subscribe = ({
  articleId,
  iconSize,
  disabled,
  inCard,
  ...buttonProps
}: SubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [subscribe] = useMutation<ToggleBookmarkArticleMutation>(
    TOGGLE_BOOKMARK_ARTICLE,
    {
      variables: { id: articleId, enabled: true },
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

    await subscribe()

    toast.success({
      message: <FormattedMessage defaultMessage="Bookmarked" id="k0fraU" />,
    })
  }

  if (inCard) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Bookmark"
            id="kLEWkV"
            description="src/components/Buttons/Bookmark/Subscribe.tsx"
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
        id: 'kLEWkV',
        description: 'src/components/Buttons/Bookmark/Subscribe.tsx',
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

export default Subscribe
