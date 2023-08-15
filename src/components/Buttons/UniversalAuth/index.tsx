import React from 'react'

import { CLOSE_ACTIVE_DIALOG, OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, Media, TextIcon, Translate } from '~/components'

export const UniversalAuthButton: React.FC = () => {
  const props = {
    onClick: () => {
      analytics.trackEvent('click_button', {
        type: 'login/signup',
      })
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
    },
  }

  const ButtonText = () => (
    <TextIcon color="white" weight="md">
      <Translate id="authEntries" />
    </TextIcon>
  )

  return (
    <>
      <Media lessThan="lg">
        <Button bgColor="green" spacing={['tight', 'base']} {...props}>
          <ButtonText />
        </Button>
      </Media>

      <Media greaterThanOrEqual="lg">
        <Button bgColor="green" spacing={['tight', 'base']} {...props}>
          <ButtonText />
        </Button>
      </Media>
    </>
  )
}
