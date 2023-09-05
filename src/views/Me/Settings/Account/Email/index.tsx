import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, TableView, ViewerContext } from '~/components'

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
          <Button
            size={[null, '1.5rem']}
            spacing={[0, 'tight']}
            textColor="green"
            borderColor="green"
            onClick={() => {}} // TODO
          >
            <FormattedMessage defaultMessage="Connect" />
          </Button>
        )
      }
    />
  )
}

export default Email
