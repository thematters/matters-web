import contentHash from '@ensdomains/content-hash'
import { FormattedMessage } from 'react-intl'
import { namehash } from 'viem/ens'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import { ReactComponent as IconWallet } from '@/public/static/icons/24px/wallet.svg'
import {
  analytics,
  featureSupportedChains,
  PublicResolverABI,
  truncate,
} from '~/common/utils'
import {
  CopyToClipboard,
  Dialog,
  ENSDialog,
  Icon,
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
      <Icon icon={IconWallet} size="mdS" />
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
              {ensName && hasLinkedIPNS && (
                <Dialog.RoundedButton
                  color="green"
                  text={
                    <FormattedMessage
                      defaultMessage="Open IPNS page"
                      id="jkrM1r"
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
                      text={
                        <FormattedMessage
                          defaultMessage="Link ENS"
                          id="3w3CC8"
                        />
                      }
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
              {ensName && hasLinkedIPNS && (
                <Dialog.TextButton
                  color="green"
                  text={
                    <FormattedMessage
                      defaultMessage="Open IPNS page"
                      id="jkrM1r"
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
                      text={
                        <FormattedMessage
                          defaultMessage="Link ENS"
                          id="3w3CC8"
                        />
                      }
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
