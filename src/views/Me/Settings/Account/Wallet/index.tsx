import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { maskAddress } from '~/common/utils'
import {
  AddWalletLoginDialog,
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
    <AddWalletLoginDialog>
      {({ openDialog: openAddWalletLoginDialog }) => {
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
                  rightText={
                    hasETHAddress ? maskAddress(ethAddress, 6) : undefined
                  }
                  rightIcon={
                    hasETHAddress ? (
                      <IconClose20 size="mdS" color="greyDarker" />
                    ) : undefined
                  }
                  onClick={
                    hasETHAddress ? openRemoveWalletLoginDialog : undefined
                  }
                  right={
                    ethAddress ? undefined : (
                      <SettingsButton onClick={openAddWalletLoginDialog}>
                        <FormattedMessage defaultMessage="Connect" />
                      </SettingsButton>
                    )
                  }
                />
              )
            }}
          </RemoveWalletLoginDialog>
        )
      }}
    </AddWalletLoginDialog>
  )
}

export default Wallet
