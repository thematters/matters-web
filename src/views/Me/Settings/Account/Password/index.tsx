import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, Form, ViewerContext } from '~/components'

const Password = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const hasPassword = !!viewer.status?.hasEmailLoginPassword

  const buttonProps: ButtonProps = {
    size: [null, '1.5rem'],
    spacing: [0, 'tight'],
    textColor: 'green',
    borderColor: 'green',
    textActiveColor: 'greenDark',
    borderActiveColor: 'greenDark',
  }

  return (
    <Form.List.Item
      title={
        <FormattedMessage
          defaultMessage="Password"
          description="src/views/Me/Settings/Settings/Password/index.tsx"
        />
      }
      rightText={
        hasEmail ? (
          hasPassword ? (
            <FormattedMessage defaultMessage="Change" />
          ) : undefined
        ) : (
          <FormattedMessage
            defaultMessage="Please add email first"
            description="src/views/Me/Settings/Settings/Password/index.tsx"
          />
        )
      }
      rightTextColor={!hasEmail ? 'grey' : undefined}
      onClick={hasEmail && hasPassword ? () => {} : undefined} // TODO
      right={
        hasEmail && !hasPassword ? (
          <Button
            {...buttonProps}
            onClick={() => {}} // TODO
          >
            <FormattedMessage defaultMessage="Connect" />
          </Button>
        ) : undefined
      }
    />
  )
}

export default Password
