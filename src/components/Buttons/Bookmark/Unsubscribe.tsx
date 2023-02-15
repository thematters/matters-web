import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import {
  Button,
  IconBookmarked16,
  IconSize,
  LanguageContext,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleSubscribeArticleMutation } from '~/gql/graphql'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

interface UnsubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
  inCard?: boolean
}

const Unsubscribe = ({
  articleId,
  size,
  disabled,
  inCard,
}: UnsubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const intl = useIntl()

  const [unsubscribe] = useMutation<ToggleSubscribeArticleMutation>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId, enabled: false },
      optimisticResponse: articleId
        ? {
          toggleSubscribeArticle: {
            id: articleId,
            subscribed: false,
            __typename: 'Article',
          },
        }
        : undefined,
    }
  )

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label={
        intl.formatMessage({
          defaultMessage: 'Undo bookmark',
          description: 'src/components/Buttons/Bookmark/Unsubscribe.tsx'
        })}
      onClick={async () => {
        if (viewer.isFrozen) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content:
                  <FormattedMessage defaultMessage="You do not have permission to perform this operation" description="FORBIDDEN_BY_STATE" />,
              },
            })
          )
          return
        }

        await unsubscribe()
      }}
      disabled={disabled}
    >
      <IconBookmarked16 color="black" size={size} />
    </Button>
  )
}

export default Unsubscribe
