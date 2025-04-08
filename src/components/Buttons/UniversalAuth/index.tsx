import React from 'react'
import { useIntl } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Button,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  Media,
  TextIcon,
} from '~/components'

type UniversalAuthButtonProps = { resideIn?: 'nav' | 'sideNav' }

export const UniversalAuthButton: React.FC<UniversalAuthButtonProps> = ({
  resideIn,
}) => {
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

  const renderButton = (
    size: [ButtonWidth, ButtonHeight] | undefined,
    spacing: [ButtonSpacingY, ButtonSpacingX],
    textSize: 12 | 14
  ) => (
    <Button bgColor="black" size={size} spacing={spacing} onClick={handleClick}>
      <TextIcon color="white" weight="medium" size={textSize}>
        {enterText}
      </TextIcon>
    </Button>
  )

  return (
    <>
      <Media lessThan="md">
        {renderButton(
          [null, '1.625rem' as ButtonHeight],
          [0 as ButtonSpacingY, 12 as ButtonSpacingX],
          12
        )}
      </Media>
      <Media greaterThanOrEqual="md">
        {renderButton(
          undefined,
          [8 as ButtonSpacingY, 20 as ButtonSpacingX],
          14
        )}
      </Media>
    </>
  )
}
