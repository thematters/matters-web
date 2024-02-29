import contentHash from '@ensdomains/content-hash'
import { Fragment, useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
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
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
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
  closeDialog: () => void
}

const LinkENS = ({
  user,
  switchToWalletSelect,
  switchToComplete,
  closeDialog,
}: LinkENSProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

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

  const CancelButton = () => (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
      color="greyDarker"
      onClick={closeDialog}
    />
  )

  /**
   * Switch Network
   */
  if (isUnsupportedNetwork || isSwitchingNetwork) {
    return (
      <Fragment key="network">
        <Dialog.Header
          closeDialog={closeDialog}
          title={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
        />

        <Dialog.Content>
          <section className={styles.content}>
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

        <ENSDescription />

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                <>
                  <Translate
                    zh_hant="切換到 "
                    zh_hans="切换到 "
                    en="Switch to "
                  />
                  {targetNetwork.name}
                </>
              }
              onClick={switchToTargetNetwork}
            />
          }
          smUpBtns={
            <>
              <CancelButton />
              <Dialog.TextButton
                text={
                  <>
                    <Translate
                      zh_hant="切換到 "
                      zh_hans="切换到 "
                      en="Switch to "
                    />
                    {targetNetwork.name}
                  </>
                }
                loading={isSwitchingNetwork}
              />
            </>
          }
        />
      </Fragment>
    )
  }

  /**
   * Reconnect Wallet
   */
  if (!isConnectedAddress) {
    return (
      <Fragment key="reconnect">
        <Dialog.Header
          closeDialog={closeDialog}
          title={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
        />

        <Dialog.Content>
          <section className={styles.content}>
            <LinkENSIntro ensName={ensName} />

            <p className={styles.error}>
              <Translate id="reconnectHint" />
              <CopyToClipboard
                text={viewer.info.ethAddress || ''}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Address copied"
                    id="+aMAeT"
                  />
                }
              >
                {({ copyToClipboard }) => (
                  <Button
                    spacing={['xtight', 'xtight']}
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Copy',
                      id: '4l6vz1',
                    })}
                    onClick={copyToClipboard}
                  >
                    <TextIcon
                      icon={<IconCopy16 color="black" size="xs" />}
                      color="grey"
                      textPlacement="left"
                    >
                      {maskAddress(viewer.info.ethAddress || '')}
                    </TextIcon>
                  </Button>
                )}
              </CopyToClipboard>
            </p>
          </section>
        </Dialog.Content>

        <ENSDescription />

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                <Translate
                  zh_hant="重新連接錢包"
                  zh_hans="重新连接钱包"
                  en="Reconnect Wallet"
                />
              }
              onClick={() => disconnect()}
            />
          }
          smUpBtns={
            <>
              <CancelButton />

              <Dialog.TextButton
                text={
                  <Translate
                    zh_hant="重新連接錢包"
                    zh_hans="重新连接钱包"
                    en="Reconnect Wallet"
                  />
                }
                onClick={() => disconnect()}
              />
            </>
          }
        />
      </Fragment>
    )
  }

  /**
   * Link ENS
   */
  return (
    <Fragment key="link">
      <Dialog.Header
        closeDialog={closeDialog}
        title={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
      />

      <Dialog.Content>
        <section className={styles.content}>
          <LinkENSIntro ensName={ensName} />

          {(isError || error) && (
            <p className={styles.error}>
              <Translate
                zh_hans="未知错误，请确认你的钱包并重新尝试"
                zh_hant="未知錯誤，請確認你的錢包並重新嘗試"
                en="Unknown error. Please check wallet and retry."
              />
            </p>
          )}
        </section>
      </Dialog.Content>

      <ENSDescription />

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
            onClick={linkIPNStoENS}
          />
        }
        smUpBtns={
          <>
            <CancelButton />

            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Link ENS" id="3w3CC8" />}
              loading={isLoading || txConfirming}
            />
          </>
        }
      />
    </Fragment>
  )
}

export default LinkENS
