import { Button, Form, TextIcon, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'

export const PasswordResetDialogButton = ({
  gotoResetPassword,
}: {
  gotoResetPassword: () => void
}) => (
  <Button
    spacing={['xtight', 0]}
    aria-haspopup="true"
    onClick={gotoResetPassword}
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

export const EmailSignUpDialogButton = ({
  gotoEmailSignUp,
}: {
  gotoEmailSignUp: () => void
}) => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={
        <Translate
          zh_hant="沒有帳戶？"
          zh_hans="沒有帐户？"
          en="Not Registered?"
        />
      }
      rightText={<Translate id="register" />}
      rightTextColor="green"
      onClick={gotoEmailSignUp}
    />
  </Form.List>
)
