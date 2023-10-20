import { FormattedMessage, useIntl } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconNavCreate32,
  toast,
  Tooltip,
  useRoute,
} from '~/components'

interface Props {
  allowed: boolean
  authed?: boolean
  forbidden?: boolean
}

const BaseWriteButton = (props: ButtonProps) => {
  const intl = useIntl()

  return (
    <Tooltip
      content={intl.formatMessage({
        defaultMessage: 'Create',
        description: 'src/components/Buttons/Write/index.tsx',
        id: 'Bb2R0G',
      })}
      placement="left"
      delay={[1000, null]}
    >
      <Button
        bgActiveColor="greyLighter"
        size={['2rem', '2rem']}
        aria-label={intl.formatMessage({
          defaultMessage: 'Create',
          description: 'src/components/Buttons/Write/index.tsx',
          id: 'Bb2R0G',
        })}
        {...props}
      >
        <IconNavCreate32 size="lg" color="black" />
      </Button>
    </Tooltip>
  )
}

export const WriteButton = ({ allowed, authed, forbidden }: Props) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  if (!allowed) {
    return (
      <BaseWriteButton
        onClick={() => {
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }}
      />
    )
  }

  return (
    <BaseWriteButton
      href={
        authed && !forbidden && !isInDraftDetail
          ? PATHS.ME_DRAFT_NEW
          : undefined
      }
      htmlHref={
        authed && !forbidden && isInDraftDetail ? PATHS.ME_DRAFT_NEW : undefined
      }
      onClick={async () => {
        if (!authed) {
          window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
          return
        }

        if (forbidden) {
          toast.error({
            message: (
              <FormattedMessage
                {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
              />
            ),
          })

          return
        }

        analytics.trackEvent('click_button', { type: 'write' })
      }}
    />
  )
}
