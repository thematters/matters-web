import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconSave2 from '@/public/static/icons/24px/save2.svg'
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
import { ToggleBookmarkArticleMutation } from '~/gql/graphql'

import TOGGLE_BOOKMARK_ARTICLE from '../../GQL/mutations/toggleBookmarkArticle'

export type UnbookmarkProps = {
  articleId: string
  iconSize?: Extract<IconSize, 20 | 24>
  disabled?: boolean
  inCard?: boolean
} & ButtonProps

const Unbookmark = ({
  articleId,
  iconSize,
  disabled,
  inCard,
  ...buttonProps
}: UnbookmarkProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [unbookmark] = useMutation<ToggleBookmarkArticleMutation>(
    TOGGLE_BOOKMARK_ARTICLE,
    {
      variables: { id: articleId, enabled: false },
      optimisticResponse: {
        toggleBookmarkArticle: {
          id: articleId,
          bookmarked: false,
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

    await unbookmark()

    toast.success({
      message: (
        <FormattedMessage defaultMessage="Bookmark removed" id="8ZyDQJ" />
      ),
    })
  }

  if (inCard) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Remove bookmark"
            id="cK3TLr"
            description="src/components/Buttons/Bookmark/Unbookmark.tsx"
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
      spacing={[8, 8]}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      aria-label={intl.formatMessage({
        defaultMessage: 'Remove bookmark',
        id: 'cK3TLr',
        description: 'src/components/Buttons/Bookmark/Unbookmark.tsx',
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

export default Unbookmark
