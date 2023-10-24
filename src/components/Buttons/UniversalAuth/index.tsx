import React from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, TextIcon, Translate } from '~/components'

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

  const ButtonText = () => (
    <TextIcon color="white" weight="md">
      <Translate id="authEntries" />
    </TextIcon>
  )

  return (
    <>
      <Button bgColor="green" spacing={['tight', 'base']} {...props}>
        <ButtonText />
      </Button>
    </>
  )
}
