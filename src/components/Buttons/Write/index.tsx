import { FormattedMessage, useIntl } from 'react-intl'

import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import {
  BREAKPOINTS,
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Button,
  ButtonProps,
  Icon,
  toast,
  Tooltip,
  useMediaQuery,
  useRoute,
} from '~/components'

interface Props {
  authed?: boolean
  forbidden?: boolean
}

const BaseWriteButton = (props: ButtonProps) => {
  const intl = useIntl()
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

  return (
    <Tooltip
      content={intl.formatMessage({
        defaultMessage: 'Create',
        description: 'src/components/Buttons/Write/index.tsx',
        id: 'Bb2R0G',
      })}
      placement="left"
      delay={[1000, null]}
      disabled={!isMdUp}
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
        <Icon icon={IconNavCreate} size={32} color="black" />
      </Button>
    </Tooltip>
  )
}

export const WriteButton = ({ authed, forbidden }: Props) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

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
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { trigger: UNIVERSAL_AUTH_TRIGGER.createDraft },
            })
          )
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
