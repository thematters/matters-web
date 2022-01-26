import { Form, Translate } from '~/components'

export const EmailLoginButton = ({
  gotoEmailLogin,
}: {
  gotoEmailLogin: () => void
}) => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={
        <Translate
          zh_hant="已有帳戶？"
          zh_hans="已有帐户？"
          en="Already have an account?"
        />
      }
      rightText={
        <Translate
          zh_hant="以郵箱登入"
          zh_hans="以邮箱登入"
          en="Login with Email"
        />
      }
      rightTextColor="green"
      onClick={gotoEmailLogin}
    />
  </Form.List>
)
