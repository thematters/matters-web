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
                id="PLBmDT"
                description="src/views/Me/Settings/Settings/Password/index.tsx"
              />
            }
            rightText={
              hasEmail ? (
                !isEmailVerified ? (
                  <FormattedMessage
                    defaultMessage="Please verify email first"
                    id="+51DoZ"
                    description="src/views/Me/Settings/Settings/Password/index.tsx"
                  />
                ) : hasPassword ? (
                  <FormattedMessage defaultMessage="Change" id="BY343C" />
                ) : undefined
              ) : (
                <FormattedMessage
                  defaultMessage="Please add email first"
                  id="O0MQs/"
                  description="src/views/Me/Settings/Settings/Password/index.tsx"
                />
              )
            }
            rightTextColor={
              !hasEmail || (hasEmail && !isEmailVerified) ? 'grey' : undefined
            }
            onClick={
              hasEmail && isEmailVerified && hasPassword
                ? openDialog
                : undefined
            }
            right={
              hasEmail && isEmailVerified && !hasPassword ? (
                <SettingsButton onClick={openDialog}>
                  <FormattedMessage defaultMessage="Set" id="HnxG15" />
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
