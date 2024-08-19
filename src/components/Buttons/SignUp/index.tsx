import { FormattedMessage } from 'react-intl'

import { CLOSE_ACTIVE_DIALOG, OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, ButtonProps, TextIcon } from '~/components'

type SignUpButtonProps = {
  isPlain?: boolean
} & Pick<ButtonProps, 'size'>

export const SignUpButton: React.FC<
  React.PropsWithChildren<SignUpButtonProps>
> = ({ children, isPlain, size }) => {
  const props = {
    onClick: () => {
      analytics.trackEvent('click_button', {
        type: 'signup',
      })
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
    },
  }

  if (isPlain) {
    return (
      <Button aria-haspopup="dialog" {...props}>
        {children}
      </Button>
    )
  }

  const buttonProps: ButtonProps = {
    bgColor: 'green',
    size: size || [null, '2.25rem'],
    spacing: [0, 24],
  }

  return (
    <Button aria-haspopup="dialog" {...buttonProps} {...props}>
      <TextIcon color="white" weight="medium">
        <FormattedMessage defaultMessage="Register" id="deEeEI" />
      </TextIcon>
    </Button>
  )
}
