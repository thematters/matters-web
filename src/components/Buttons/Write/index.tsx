import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics, translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconNavCreate32,
  LanguageContext,
  toast,
  Tooltip,
  Translate,
  useRoute,
} from '~/components'

interface Props {
  allowed: boolean
  authed?: boolean
  forbidden?: boolean
}

const BaseWriteButton = (props: ButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Tooltip
      content={translate({ id: 'write', lang })}
      placement="left"
      delay={[1000, null]}
    >
      <Button
        bgActiveColor="greyLighter"
        size={['2rem', '2rem']}
        aria-label={translate({ id: 'write', lang })}
        {...props}
      >
        <IconNavCreate32 size="lg" color="black" />
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
              detail: { source: UNIVERSAL_AUTH_SOURCE.create },
            })
          )
          return
        }

        if (forbidden) {
          toast.error({
            message: <Translate id="FORBIDDEN_BY_STATE" />,
          })

          return
        }

        analytics.trackEvent('click_button', { type: 'write' })
      }}
    />
  )
}
