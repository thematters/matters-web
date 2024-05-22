import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount, useEnsName } from 'wagmi'

import { featureSupportedChains } from '~/common/utils'
import { Dialog, ViewerContext } from '~/components'

import ENSDescription from './ENSDescription'
import LinkENSIntro from './LinkENSIntro'
import styles from './styles.module.css'

interface ConnectWalletProps {
  switchToWalletSelect: () => void
  switchToLinkENS: () => void
  closeDialog: () => void
}

const ConnectWallet = ({
  switchToWalletSelect,
  switchToLinkENS,
  closeDialog,
}: ConnectWalletProps) => {
  const viewer = useContext(ViewerContext)

  const { address: connectedAddress } = useAccount()
  const address = viewer.info.ethAddress
  const targetNetwork = featureSupportedChains.ens[0]

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: targetNetwork.id,
  })

  useEffect(() => {
    if (!connectedAddress) {
      return
    }

    switchToLinkENS()
  }, [connectedAddress])

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
      />

      <Dialog.Content>
        <section className={styles.content}>
          <LinkENSIntro ensName={ensName} />
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <FormattedMessage defaultMessage="Connect Wallet" id="cg1VJ2" />
            }
            onClick={switchToWalletSelect}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <FormattedMessage defaultMessage="Connect Wallet" id="cg1VJ2" />
            }
            onClick={switchToWalletSelect}
          />
        }
      />

      <ENSDescription />
    </>
  )
}

export default ConnectWallet
