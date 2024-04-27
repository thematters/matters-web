import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconSave2 } from '@/public/static/icons/24px/save2.svg'
import { ERROR_CODES, ERROR_MESSAGES, TEST_ID } from '~/common/enums'
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
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

export type UnsubscribeProps = {
  articleId?: string
  iconSize?: Extract<IconSize, 'mdS' | 'md'>
  disabled?: boolean
  inCard?: boolean
} & ButtonProps

const Unsubscribe = ({
  articleId,
  iconSize,
  disabled,
  inCard,
  ...buttonProps
}: UnsubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [unsubscribe] = useMutation<ToggleSubscribeArticleMutation>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId, enabled: false },
    }
  )

  const onClick = async () => {
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

    await unsubscribe()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Bookmark removed"
          id="kSt4il"
          description="src/components/Buttons/Bookmark/Unsubscribe.tsx"
        />
      ),
    })
  }

  if (inCard) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Remove bookmark"
            id="FEkOVJ"
            description="src/components/Buttons/Bookmark/Unsubscribe.tsx"
          />
        }
        icon={<Icon icon={IconSave2} size={iconSize} />}
        onClick={onClick}
        testId={TEST_ID.ARTICLE_BOOKMARK}
      />
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      aria-label={intl.formatMessage({
        defaultMessage: 'Remove bookmark',
        id: 'FEkOVJ',
        description: 'src/components/Buttons/Bookmark/Unsubscribe.tsx',
      })}
      onClick={onClick}
      disabled={disabled}
      data-test-id={TEST_ID.ARTICLE_BOOKMARK}
      {...buttonProps}
    >
      <Icon icon={IconSave2} size={iconSize} />
    </Button>
  )
}

export default Unsubscribe
