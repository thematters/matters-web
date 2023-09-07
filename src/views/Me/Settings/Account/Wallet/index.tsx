import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { maskAddress } from '~/common/utils'
import {
  IconClose20,
  RemoveWalletLoginDialog,
  TableView,
  ViewerContext,
} from '~/components'

import { SettingsButton } from '../../Button'

const Wallet = () => {
  const viewer = useContext(ViewerContext)
  const ethAddress = viewer.info.ethAddress
  const hasETHAddress = !!ethAddress

  return (
    <RemoveWalletLoginDialog>
      {({ openDialog: openRemoveWalletLoginDialog }) => {
        return (
          <TableView.Cell
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
            onClick={hasETHAddress ? openRemoveWalletLoginDialog : undefined}
            right={
              ethAddress ? undefined : (
                <SettingsButton
                  onClick={() => {}} // TODO
                >
                  <FormattedMessage defaultMessage="Connect" />
                </SettingsButton>
              )
            }
          />
        )
      }}
    </RemoveWalletLoginDialog>
  )
}

export default Wallet
