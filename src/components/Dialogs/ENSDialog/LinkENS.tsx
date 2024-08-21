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

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import {
  analytics,
  featureSupportedChains,
  PublicResolverABI,
  truncate,
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  Icon,
  TextIcon,
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
      !!ipnsHash && '0x' + contentHash.encode('ipns', ipnsHash),
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
                <FormattedMessage
                  defaultMessage="Switching the network…"
                  id="Bkx6Gk"
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
                <FormattedMessage
                  defaultMessage="Switch to {networkName}"
                  id="u1cbFV"
                  values={{ networkName: targetNetwork.name }}
                />
              }
              onClick={switchToTargetNetwork}
            />
          }
          smUpBtns={
            <>
              <CancelButton />
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Switch to {networkName}"
                    id="u1cbFV"
                    values={{ networkName: targetNetwork.name }}
                  />
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
              <FormattedMessage
                defaultMessage="The wallet address is not the one you bound to account. Please switch it in the wallet or reconnect as: "
                id="pKkpI9"
              />
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
                    spacing={[8, 8]}
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Copy',
                      id: '4l6vz1',
                    })}
                    onClick={copyToClipboard}
                  >
                    <TextIcon
                      icon={<Icon icon={IconCopy} color="black" size={12} />}
                      color="grey"
                      placement="left"
                    >
                      {truncate(viewer.info.ethAddress || '')}
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
                <FormattedMessage
                  defaultMessage="Reconnect Wallet"
                  id="6ErzDk"
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
                  <FormattedMessage
                    defaultMessage="Reconnect Wallet"
                    id="6ErzDk"
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
              <FormattedMessage
                defaultMessage="Unknown error. Please check wallet and retry."
                id="JFv0yt"
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
