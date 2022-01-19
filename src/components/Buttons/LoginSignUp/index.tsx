import {
  Button,
  ButtonProps,
  TextIcon,
  Translate,
  useResponsive,
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'

type LoginSignUpButtonProps = {
  isPlain?: boolean
} & Pick<ButtonProps, 'size'>

export const LoginSignUpButton: React.FC<LoginSignUpButtonProps> = ({
  children,
  isPlain,
  size,
}) => {
  const isSmallUp = useResponsive('sm-up')

  const clickProps = isSmallUp
    ? {
        onClick: () => {
          analytics.trackEvent('click_button', {
            type: 'login/signup',
          })
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
        },
      }
    : {
        ...appendTarget(PATHS.SIGNUP, true),
        onClick: () => {
          analytics.trackEvent('click_button', {
            type: 'login/signup',
          })
        },
      }

  if (isPlain) {
    return (
      <Button aria-haspopup="true" {...clickProps}>
        {children}
      </Button>
    )
  }

  return (
    <Button
      bgColor="green"
      size={size || [null, '2.25rem']}
      spacing={[0, 'loose']}
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color="white" weight="md">
        <Translate id="loginSignUp" />
      </TextIcon>
    </Button>
  )
}
