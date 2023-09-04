import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { maskAddress } from '~/common/utils'
import { Button, Form, IconClose20, ViewerContext } from '~/components'

const Wallet = () => {
  const viewer = useContext(ViewerContext)
  const ethAddress = viewer.info.ethAddress
  const hasETHAddress = !!ethAddress

  return (
    <Form.List.Item
      title={
        <FormattedMessage
          defaultMessage="Wallet address"
          description="src/views/Me/Settings/Settings/Wallet/index.tsx"
        />
      }
      rightText={hasETHAddress ? maskAddress(ethAddress, 6) : undefined}
      rightIcon={
        hasETHAddress ? (
          <IconClose20 size="mdS" color="greyDarker" />
        ) : undefined
      }
      onClick={hasETHAddress ? () => {} : undefined} // TODO
      right={
        ethAddress ? undefined : (
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

export default Wallet
