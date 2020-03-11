import { Button, TextIcon, Translate, useResponsive } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'

interface LoginButtonProps {
  isPlain?: boolean
}

export const LoginButton: React.FC<LoginButtonProps> = ({ isPlain }) => {
  const isSmallUp = useResponsive('sm-up')
  const clickProps = isSmallUp
    ? {
        onClick: () => {
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
        }
      }
    : appendTarget({ ...PATHS.AUTH_LOGIN, fallbackCurrent: true })

  if (isPlain) {
    return (
      <Button aria-haspopup="true" {...clickProps}>
        <Translate id="login" />
      </Button>
    )
  }

  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      bgActiveColor="green-lighter"
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color="green" weight="md">
        <Translate id="login" />
      </TextIcon>
    </Button>
  )
}
