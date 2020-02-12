import { Button, LoginDialog, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const LoginButton = () => (
  <LoginDialog>
    {({ open }) => (
      <Button
        size={[null, '2.25rem']}
        spacing={[0, 'loose']}
        bgHoverColor="green-lighter"
        onClick={open}
      >
        <TextIcon color="green" weight="md">
          <Translate
            zh_hant={TEXT.zh_hant.login}
            zh_hans={TEXT.zh_hans.login}
          />
        </TextIcon>
      </Button>
    )}
  </LoginDialog>
)

export default LoginButton
