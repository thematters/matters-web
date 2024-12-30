import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, Media, TextIcon } from '~/components'

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
      <Media at="sm">
        <Button
          bgColor="black"
          size={[null, '1.625rem']}
          spacing={[0, 12]}
          {...props}
        >
          <TextIcon color="white" weight="medium" size={12}>
            <FormattedMessage
              defaultMessage="Enter"
              description="src/components/Buttons/UniversalAuth/index.tsx"
              id="qVhxp5"
            />
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          bgColor="black"
          // size={[null, '1.625rem']}
          spacing={[8, 20]}
          {...props}
        >
          <TextIcon color="white" weight="medium" size={14}>
            <FormattedMessage
              defaultMessage="Enter"
              description="src/components/Buttons/UniversalAuth/index.tsx"
              id="qVhxp5"
            />
          </TextIcon>
        </Button>
      </Media>
    </>
  )
}
