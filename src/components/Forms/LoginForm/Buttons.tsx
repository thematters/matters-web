import { Button, Form, TextIcon, Translate } from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_RESET_PASSWORD_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS,
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

export const PasswordResetDialogButton = () => (
  <Button
    spacing={['xtight', 0]}
    aria-haspopup="true"
    onClick={() => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_RESET_PASSWORD_DIALOG))
    }}
  >
    <TextIcon color="green" weight="md">
      <Translate id="forgetPassword" />？
    </TextIcon>
  </Button>
)

export const PasswordResetRedirectButton = () => (
  <Button spacing={['xtight', 0]} {...appendTarget(PATHS.FORGET)}>
    <TextIcon color="green" weight="md">
      <Translate id="forgetPassword" />？
    </TextIcon>
  </Button>
)

export const SignUpDialogButton = () => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={<Translate zh_hant="沒有帳戶？" zh_hans="沒有帐户？" />}
      rightText={<Translate id="register" />}
      rightTextColor="green"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
      }}
    />
  </Form.List>
)

export const SignUpRedirectionButton = () => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={<Translate zh_hant="沒有帳戶？" zh_hans="沒有帐户？" />}
      rightText={<Translate id="register" />}
      rightTextColor="green"
      {...appendTarget(PATHS.SIGNUP)}
    />
  </Form.List>
)
