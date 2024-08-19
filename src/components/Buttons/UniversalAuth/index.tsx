import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, TextIcon } from '~/components'

type UniversalAuthButtonProps = { resideIn?: 'nav' | 'sideNav' }

export const UniversalAuthButton: React.FC<UniversalAuthButtonProps> = ({
  resideIn,
}) => {
  const props = {
    onClick: () => {
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
    },
  }

  return (
    <>
      <Button bgColor="green" spacing={[12, 16]} {...props}>
        <TextIcon color="white" weight="medium">
          <FormattedMessage
            defaultMessage="Enter"
            description="src/components/Buttons/UniversalAuth/index.tsx"
            id="qVhxp5"
          />
        </TextIcon>
      </Button>
    </>
  )
}
