import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'
import { Button, ButtonProps, Media, TextIcon } from '~/components'

type UniversalAuthButtonProps = {
  isPlain?: boolean
} & Pick<ButtonProps, 'size'>

export const UniversalAuthButton: React.FC<
  React.PropsWithChildren<UniversalAuthButtonProps>
> = ({ children, isPlain, size }) => {
  const smUpProps = {
    onClick: () => {
      analytics.trackEvent('click_button', {
        type: 'login/signup',
      })
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
    },
  }
  const smProps = {
    ...appendTarget(PATHS.SIGNUP, true),
    onClick: () => {
      analytics.trackEvent('click_button', {
        type: 'login/signup',
      })
    },
  }

  if (isPlain) {
    return (
      <>
        <Media at="sm">
          <Button {...smProps}>{children}</Button>
        </Media>
        <Media greaterThan="sm">
          <Button aria-haspopup="dialog" {...smUpProps}>
            {children}
          </Button>
        </Media>
      </>
    )
  }

  const buttonProps: ButtonProps = {
    bgColor: 'green',
    size: size || [null, '2rem'],
    spacing: [0, 'loose'],
  }
  const ButtonText = () => (
    <TextIcon color="white" weight="md">
      <FormattedMessage defaultMessage="Enter" description="src/components/Buttons/UniversalAuth/index.tsx" />
    </TextIcon>
  )

  return (
    <>
      <Media at="sm">
        <Button {...buttonProps} {...smProps}>
          <ButtonText />
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button aria-haspopup="dialog" {...buttonProps} {...smUpProps}>
          <ButtonText />
        </Button>
      </Media>
    </>
  )
}
