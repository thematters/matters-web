import { Button, TextIcon, Translate } from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, TEXT } from '~/common/enums'

const LoginButton = () => (
  <Button
    size={[null, '2.25rem']}
    spacing={[0, 'loose']}
    bgHoverColor="green-lighter"
    onClick={() => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
    }}
  >
    <TextIcon color="green" weight="md">
      <Translate zh_hant={TEXT.zh_hant.login} zh_hans={TEXT.zh_hans.login} />
    </TextIcon>
  </Button>
)

export default LoginButton
