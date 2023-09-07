import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TableView, ViewerContext } from '~/components'

import { SettingsButton } from '../../Button'

const Password = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const hasPassword = !!viewer.status?.hasEmailLoginPassword

  return (
    <TableView.Cell
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
          <SettingsButton
            onClick={() => {}} // TODO
          >
            <FormattedMessage defaultMessage="Connect" />
          </SettingsButton>
        ) : undefined
      }
    />
  )
}

export default Password
