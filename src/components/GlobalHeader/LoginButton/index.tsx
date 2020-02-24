import { Button, TextIcon, Translate, useResponsive } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'

const LoginButton = () => {
  const isSmallUp = useResponsive({ type: 'sm-up' })()

  const clickProps = isSmallUp
    ? {
        onClick: () => {
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
        }
      }
    : {
        ...appendTarget(PATHS.AUTH_LOGIN)
      }

  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      bgHoverColor="green-lighter"
      {...clickProps}
    >
      <TextIcon color="green" weight="md">
        <Translate id="login" />
      </TextIcon>
    </Button>
  )
}

export default LoginButton
