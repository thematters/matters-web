import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

export const EmailLoginButton = ({
  gotoEmailLogin,
}: {
  gotoEmailLogin: () => void
}) => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={
        <FormattedMessage
          defaultMessage="Have an account?"
          description="src/components/Forms/EmailSignUpForm/Buttons.tsx"
        />
      }
      rightText={
        <FormattedMessage
          defaultMessage="Login with Email"
          description="src/components/Forms/EmailSignUpForm/Buttons.tsx"
        />
      }
      rightTextColor="green"
      onClick={gotoEmailLogin}
      role="button"
    />
  </Form.List>
)
