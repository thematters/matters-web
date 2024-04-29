import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { truncate } from '~/common/utils'
import {
  AddWalletLoginDialog,
  Icon,
  RemoveWalletLoginDialog,
  TableView,
  ViewerContext,
} from '~/components'
import { SocialAccountType } from '~/gql/graphql'

import { SettingsButton } from '../../Button'

const Wallet = () => {
  const viewer = useContext(ViewerContext)
  const ethAddress = viewer.info.ethAddress
  const hasETHAddress = !!ethAddress

  // FIXME: For canary release purpose,
  // we don't allow user to remove facebook login
  // unless the user has least two login methods
  const canEmailLogin = !!viewer.info.email
  const canWalletLogin = !!viewer.info.ethAddress
  const nonFacebookSocials = viewer.info.socialAccounts.filter(
    (s) => s.type !== SocialAccountType.Facebook
  )
  const canRemoveNonFacebookLogins =
    +canEmailLogin + +canWalletLogin + nonFacebookSocials.length > 1

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
                    hasETHAddress && canRemoveNonFacebookLogins ? (
                      <Icon icon={IconTimes} size="mdS" color="greyDarker" />
                    ) : undefined
                  }
                  onClick={
                    hasETHAddress && canRemoveNonFacebookLogins
                      ? openRemoveWalletLoginDialog
                      : undefined
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
