import contentHash from '@ensdomains/content-hash'
import { Fragment, useContext, useEffect, useState } from 'react'
import { namehash } from 'viem/ens'
import {
  useAccount,
  useContractWrite,
  useDisconnect,
  useEnsName,
  useEnsResolver,
  usePrepareContractWrite,
} from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import {
  analytics,
  featureSupportedChains,
  maskAddress,
  PublicResolverABI,
  translate,
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
  LanguageContext,
  TextIcon,
  Translate,
  useTargetNetwork,
  ViewerContext,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import ENSDescription from './ENSDescription'
import LinkENSIntro from './LinkENSIntro'
import styles from './styles.module.css'

interface LinkENSProps {
  user: UserProfileUserPublicQuery['user']
  switchToWalletSelect: () => void
  switchToComplete: (txHash: string) => void
}

const LinkENS = ({
  user,
  switchToWalletSelect,
  switchToComplete,
}: LinkENSProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const { address } = useAccount()
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()

  const targetNetwork = featureSupportedChains.ens[0]
  const { isSwitchingNetwork, isUnsupportedNetwork, switchToTargetNetwork } =
    useTargetNetwork(targetNetwork)
  const { disconnect } = useDisconnect()

  const { data: ensName } = useEnsName({
    address: viewer.info.ethAddress as `0x${string}`,
    chainId: targetNetwork.id,
  })
  const { data: resolverAddress } = useEnsResolver({
    name: ensName as string,
    chainId: targetNetwork.id,
  })

  const [txConfirming, setTxConfirming] = useState<boolean>(false)
  const ipnsHash = user?.info.ipnsKey
  const { config, error } = usePrepareContractWrite({
    account: resolverAddress,
    abi: PublicResolverABI,
    functionName: 'setContenthash',
    args: [
      namehash(ensName || ''),
      !!ipnsHash && '0x' + contentHash.encode('ipns-ns', ipnsHash),
    ] as [`0x${string}`, `0x${string}`],
  })
  const {
    isError,
    isLoading,
    writeAsync: setContenthash,
  } = useContractWrite(config)

  const linkIPNStoENS = async () => {
    if (setContenthash) {
      const tx = await setContenthash()
      setTxConfirming(true)
      await waitForTransaction({ hash: tx.hash })
      setTxConfirming(false)
      switchToComplete(tx.hash)
      analytics.trackEvent('click_button', {
        type: 'bind_ens_successfully',
        pageType: 'user_profile',
      })
    }
  }

  // go back to previous step if wallet is locked
  useEffect(() => {
    if (!address) {
      switchToWalletSelect()
    }
  }, [address])

  /**
   * Switch Network
   */
  if (isUnsupportedNetwork || isSwitchingNetwork) {
    return (
      <Fragment key="network">
        <Dialog.Content>
          <section className={styles['content']}>
            {isSwitchingNetwork ? (
              <p>
                <Translate
                  zh_hans="切换网络中…"
                  zh_hant="切換網絡中…"
                  en="Switching the network…"
                />
              </p>
            ) : (
              <LinkENSIntro ensName={ensName} />
            )}
          </section>
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            onClick={switchToTargetNetwork}
            loading={isSwitchingNetwork}
          >
            <Translate zh_hant="切換到 " zh_hans="切换到 " en="Switch to " />
            {targetNetwork.name}
          </Dialog.Footer.Button>
        </Dialog.Footer>

        <ENSDescription />
      </Fragment>
    )
  }

  /**
   * Reconnect Wallet
   */
  if (!isConnectedAddress) {
    return (
      <Fragment key="reconnect">
        <Dialog.Content>
          <section className={styles['content']}>
            <LinkENSIntro ensName={ensName} />

            <p className={styles['error']}>
              <Translate id="reconnectHint" />
              <CopyToClipboard text={viewer.info.ethAddress || ''}>
                <Button
                  spacing={['xtight', 'xtight']}
                  aria-label={translate({ id: 'copy', lang })}
                >
                  <TextIcon
                    icon={<IconCopy16 color="black" size="xs" />}
                    color="grey"
                    textPlacement="left"
                  >
                    {maskAddress(viewer.info.ethAddress || '')}
                  </TextIcon>
                </Button>
              </CopyToClipboard>
            </p>
          </section>
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="green"
            textColor="white"
            onClick={() => {
              disconnect()
            }}
          >
            <Translate
              zh_hant="重新連接錢包"
              zh_hans="重新连接钱包"
              en="Reconnect Wallet"
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>

        <ENSDescription />
      </Fragment>
    )
  }

  /**
   * Link ENS
   */
  return (
    <Fragment key="link">
      <Dialog.Content>
        <section className={styles['content']}>
          <LinkENSIntro ensName={ensName} />

          {(isError || error) && (
            <p className={styles['error']}>
              <Translate
                zh_hans="未知错误，请确认你的钱包并重新尝试"
                zh_hant="未知錯誤，請確認你的錢包並重新嘗試"
                en="Unknown error. Please check wallet and retry."
              />
            </p>
          )}
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={linkIPNStoENS}
          loading={isLoading || txConfirming}
        >
          <Translate id="bindIPNStoENS" />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <ENSDescription />
    </Fragment>
  )
}

export default LinkENS
