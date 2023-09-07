import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { SetEmailDialog, TableView, ViewerContext } from '~/components'

import { SettingsButton } from '../../Button'

const Email = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  return (
    <SetEmailDialog>
      {({ openDialog }) => {
        return (
          <TableView.Cell
            title={
              <FormattedMessage
                defaultMessage="Email"
                description="src/views/Me/Settings/Settings/Email/index.tsx"
              />
            }
            rightText={hasEmail ? viewer.info.email : undefined}
            onClick={hasEmail ? openDialog : undefined}
            right={
              hasEmail ? undefined : (
                <SettingsButton onClick={openDialog}>
                  <FormattedMessage defaultMessage="Connect" />
                </SettingsButton>
              )
            }
          />
        )
      }}
    </SetEmailDialog>
  )
}

export default Email
