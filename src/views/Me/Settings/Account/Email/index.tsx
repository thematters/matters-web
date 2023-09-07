import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TableView, ViewerContext } from '~/components'

import { SettingsButton } from '../../Button'

const Email = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  return (
    <TableView.Cell
      title={
        <FormattedMessage
          defaultMessage="Email"
          description="src/views/Me/Settings/Settings/Email/index.tsx"
        />
      }
      rightText={hasEmail ? viewer.info.email : undefined}
      onClick={hasEmail ? () => {} : undefined} // TODO
      right={
        hasEmail ? undefined : (
          <SettingsButton
            onClick={() => {}} // TODO
          >
            <FormattedMessage defaultMessage="Connect" />
          </SettingsButton>
        )
      }
    />
  )
}

export default Email
