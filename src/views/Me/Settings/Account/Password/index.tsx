import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { SetPasswordDialog, TableView, ViewerContext } from '~/components'

import { SettingsButton } from '../../Button'

const Password = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const isEmailVerified = !!viewer.info.emailVerified
  const hasPassword = !!viewer.status?.hasEmailLoginPassword

  return (
    <SetPasswordDialog>
      {({ openDialog }) => {
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
                !isEmailVerified ? (
                  <FormattedMessage
                    defaultMessage="Please verify email first"
                    description="src/views/Me/Settings/Settings/Password/index.tsx"
                  />
                ) : hasPassword ? (
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
            onClick={
              hasEmail && isEmailVerified && !hasPassword
                ? openDialog
                : undefined
            }
            right={
              hasEmail && isEmailVerified && !hasPassword ? (
                <SettingsButton onClick={openDialog}>
                  <FormattedMessage defaultMessage="Set" />
                </SettingsButton>
              ) : undefined
            }
          />
        )
      }}
    </SetPasswordDialog>
  )
}

export default Password
