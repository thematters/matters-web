import { FormattedMessage } from 'react-intl'
import { useEnsName } from 'wagmi'

import IconWallet from '@/public/static/icons/24px/wallet.svg'
import { featureSupportedChains, truncate } from '~/common/utils'
import {
  CopyToClipboard,
  Dialog,
  Icon,
  Tooltip,
  useDialogSwitch,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type WalletLabelProps = {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  hasTooltip?: boolean
}

const WalletLabel: React.FC<WalletLabelProps> = ({ user, hasTooltip }) => {
  const address = user?.info.ethAddress
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: featureSupportedChains.ens[0].id,
  })

  if (!address) {
    return null
  }

  const Content = (
    <span className={styles.wallet} onClick={openDialog}>
      <Icon icon={IconWallet} size={20} />
    </span>
  )

  return (
    <>
      {hasTooltip && (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Wallet linked"
              id="AVpR3Q"
              description="src/components/UserProfile/WalletLabel/index.tsx"
            />
          }
          placement="top"
        >
          {Content}
        </Tooltip>
      )}

      {!hasTooltip && Content}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Wallet address"
              id="9mfw9c"
              description="src/components/UserProfile/WalletLabel/WalletDialog/index.tsx"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message smUpAlign="left">
            <section className={styles.dialogContent}>
              {ensName && (
                <section className={styles.ensName}>{ensName}</section>
              )}
              {!ensName && (
                <section className={styles.address}>
                  {truncate(address)}
                </section>
              )}
            </section>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <>
              <CopyToClipboard
                text={ensName || address}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Address copied"
                    id="+aMAeT"
                  />
                }
              >
                {({ copyToClipboard }) => (
                  <Dialog.RoundedButton
                    text={
                      <FormattedMessage
                        defaultMessage="Copy Address"
                        id="me1nR+"
                      />
                    }
                    color="green"
                    onClick={copyToClipboard}
                  />
                )}
              </CopyToClipboard>

              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              <CopyToClipboard
                text={ensName || address}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Address copied"
                    id="+aMAeT"
                  />
                }
              >
                {({ copyToClipboard }) => (
                  <Dialog.TextButton
                    color="green"
                    text={
                      <FormattedMessage
                        defaultMessage="Copy Address"
                        id="me1nR+"
                      />
                    }
                    onClick={copyToClipboard}
                  />
                )}
              </CopyToClipboard>
            </>
          }
        />
      </Dialog>
    </>
  )
}

export default WalletLabel
