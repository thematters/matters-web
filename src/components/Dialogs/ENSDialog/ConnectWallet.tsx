import { useContext, useEffect } from 'react'
import { useAccount, useEnsName } from 'wagmi'

import { featureSupportedChains } from '~/common/utils'
import { Dialog, Translate, ViewerContext } from '~/components'

import ENSDescription from './ENSDescription'
import LinkENSIntro from './LinkENSIntro'
import styles from './styles.css'

interface ConnectWalletProps {
  switchToWalletSelect: () => void
  switchToLinkENS: () => void
}

const ConnectWallet = ({
  switchToWalletSelect,
  switchToLinkENS,
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
      <Dialog.Content>
        <section className="content">
          <LinkENSIntro ensName={ensName} />
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => {
            switchToWalletSelect()
          }}
        >
          <Translate
            zh_hans="连接钱包"
            zh_hant="連接錢包"
            en="Connect Wallet"
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <ENSDescription />

      <style jsx>{styles}</style>
    </>
  )
}

export default ConnectWallet
