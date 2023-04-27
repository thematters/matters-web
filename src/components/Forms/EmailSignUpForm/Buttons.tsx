import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

export const EmailLoginButton = ({
  gotoEmailLogin,
  isInPage,
}: {
  gotoEmailLogin: () => void
  isInPage: boolean
}) => (
  <Form.List spacingY={0} spacingX={isInPage ? 0 : 'base'}>
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
