import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { truncate } from '~/common/utils'
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
                      id="Gt7K6r"
                      description="src/views/Me/Settings/Settings/Wallet/index.tsx"
                    />
                  }
                  rightText={
                    hasETHAddress ? truncate(ethAddress, 6) : undefined
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
                        <FormattedMessage
                          defaultMessage="Connect"
                          id="+vVZ/G"
                        />
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
