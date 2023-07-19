import contentHash from '@ensdomains/content-hash'
import { FormattedMessage } from 'react-intl'
import { namehash } from 'viem/ens'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import {
  analytics,
  featureSupportedChains,
  PublicResolverABI,
} from '~/common/utils'
import {
  CopyToClipboard,
  Dialog,
  ENSDialog,
  IconWallet20,
  Tooltip,
  Translate,
  useDialogSwitch,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type WalletLabelProps = {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  isMe: boolean
  hasTooltip?: boolean
}

const WalletLabel: React.FC<WalletLabelProps> = ({
  user,
  isMe,
  hasTooltip,
}) => {
  const address = user?.info.ethAddress
  const ipnsHash = user?.info.ipnsKey
  const targetNetork = featureSupportedChains.ens[0]
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: targetNetork.id,
  })
  const { data: resolverAddress } = useEnsResolver({
    name: ensName as string,
    chainId: targetNetork.id,
  })
  const { data: contenthashData, isSuccess } = useContractRead({
    address: resolverAddress,
    abi: PublicResolverABI,
    functionName: 'contenthash',
    args: ensName ? [namehash(ensName) as `0x${string}`] : undefined,
    chainId: targetNetork.id,
  })
  const hasLinkedIPNS =
    !!ipnsHash &&
    '0x' + contentHash.encode('ipns-ns', ipnsHash) === contenthashData
  const hasLinkEnsButton =
    ensName && ipnsHash && isMe && !hasLinkedIPNS && isSuccess

  if (!address) {
    return null
  }

  const Content = (
    <span className={styles.wallet} onClick={openDialog}>
      <IconWallet20 size="mdS" />
    </span>
  )

  return (
    <>
      {hasTooltip && (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Wallet linked"
              description="src/components/UserProfile/WalletLabel/index.tsx"
            />
          }
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
              description="src/components/UserProfile/WalletLabel/WalletDialog/index.tsx"
            />
          }
        />

        <Dialog.Message>
          <section className={styles.dialogContent}>
            {ensName && <section className={styles.ensName}>{ensName}</section>}
            {!ensName && (
              <section className={styles.address}>{address}</section>
            )}
            {hasLinkedIPNS && !isMe && (
              <section className={styles.linkedIPNS}>
                <Translate
                  zh_hans={`${user.displayName} 已将他的 ENS 指向到个人 IPNS 页面`}
                  zh_hant={`${user.displayName} 已將他的 ENS 指向到個人 IPNS 頁面`}
                  en={`${user.displayName} has linked primary ENS name to his IPNS page.`}
                />
              </section>
            )}
          </section>
        </Dialog.Message>

        <Dialog.Footer
          btns={
            <>
              <CopyToClipboard
                text={ensName || address}
                successMessage={
                  <FormattedMessage defaultMessage="Address copied" />
                }
              >
                <Dialog.RoundedButton
                  text={<FormattedMessage defaultMessage="Copy Address" />}
                  color="green"
                />
              </CopyToClipboard>
              {ensName && hasLinkedIPNS && (
                <Dialog.RoundedButton
                  color="green"
                  text={
                    <FormattedMessage
                      defaultMessage="Open IPNS page"
                      description="src/components/UserProfile/WalletLabel/index.tsx"
                    />
                  }
                  htmlHref={`https://${ensName}.limo`}
                  htmlTarget="_blank"
                />
              )}
              {hasLinkEnsButton && (
                <ENSDialog user={user}>
                  {({ openDialog }) => (
                    <Dialog.RoundedButton
                      text={<Translate id="bindIPNStoENS" />}
                      color="green"
                      onClick={() => {
                        openDialog()
                        analytics.trackEvent('click_button', {
                          type: 'bind_ens',
                          pageType: 'user_profile',
                        })
                      }}
                      aria-haspopup="dialog"
                    />
                  )}
                </ENSDialog>
              )}

              <Dialog.RoundedButton
                text="close"
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              <Dialog.TextButton
                text="close"
                color="greyDarker"
                onClick={closeDialog}
              />
              <CopyToClipboard
                text={ensName || address}
                successMessage={
                  <FormattedMessage defaultMessage="Address copied" />
                }
              >
                <Dialog.TextButton
                  color="green"
                  text={<FormattedMessage defaultMessage="Copy Address" />}
                />
              </CopyToClipboard>
              {ensName && hasLinkedIPNS && (
                <Dialog.TextButton
                  color="green"
                  text={
                    <FormattedMessage
                      defaultMessage="Open IPNS page"
                      description="src/components/UserProfile/WalletLabel/index.tsx"
                    />
                  }
                  htmlHref={`https://${ensName}.limo`}
                  htmlTarget="_blank"
                />
              )}

              {hasLinkEnsButton && (
                <ENSDialog user={user}>
                  {({ openDialog }) => (
                    <Dialog.TextButton
                      text={<Translate id="bindIPNStoENS" />}
                      color="green"
                      onClick={() => {
                        openDialog()
                        analytics.trackEvent('click_button', {
                          type: 'bind_ens',
                          pageType: 'user_profile',
                        })
                      }}
                      aria-haspopup="dialog"
                    />
                  )}
                </ENSDialog>
              )}
            </>
          }
        />
      </Dialog>
    </>
  )
}

export default WalletLabel
