import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

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
  IconBookmark20,
  IconBookmark24,
  IconSize,
  Menu,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

export type SubscribeProps = {
  articleId?: string
  iconSize?: Extract<IconSize, 'mdS' | 'md'>
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

  const [subscribe] = useMutation<ToggleSubscribeArticleMutation>(
    TOGGLE_SUBSCRIBE_ARTICLE,
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
      message: (
        <FormattedMessage
          defaultMessage="Bookmarked"
          id="qE8ew4"
          description="src/components/Buttons/Bookmark/Subscribe.tsx"
        />
      ),
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
      <IconBookmark24 size={iconSize} />
    </Button>
  )
}

export default Subscribe
