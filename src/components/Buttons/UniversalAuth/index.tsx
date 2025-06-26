import React from 'react'
import { useIntl } from 'react-intl'

import {
  BREAKPOINTS,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, TextIcon, useMediaQuery } from '~/components'

type UniversalAuthButtonProps = { resideIn?: 'nav' | 'sideNav' }

export const UniversalAuthButton: React.FC<UniversalAuthButtonProps> = ({
  resideIn,
}) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const intl = useIntl()
  const enterText = intl.formatMessage({
    defaultMessage: 'Enter',
    id: 'qVhxp5',
    description: 'src/components/Buttons/UniversalAuth/index.tsx',
  })

  const handleClick = () => {
    analytics.trackEvent('click_button', {
      type: 'login/signup',
    })

    // deprecated
    // window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
    window.dispatchEvent(
      new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
        ...(resideIn
          ? { detail: { trigger: UNIVERSAL_AUTH_TRIGGER[resideIn] } }
          : {}),
      })
    )
  }

  return (
    <Button
      bgColor="black"
      size={isSmUp ? undefined : [null, '1.625rem']}
      spacing={isSmUp ? [8, 20] : [0, 12]}
      onClick={handleClick}
    >
      <TextIcon color="white" weight="medium" size={isSmUp ? 14 : 12}>
        {enterText}
      </TextIcon>
    </Button>
  )
}
