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
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

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

        <Dialog.Footer>
          <CopyToClipboard text={ensName || address}>
            <Dialog.Footer.Button
              bgColor="white"
              borderColor="green"
              borderWidth="md"
              textColor="green"
            >
              <Translate
                en="Copy address"
                zh_hans="复制地址"
                zh_hant="複製地址"
              />
            </Dialog.Footer.Button>
          </CopyToClipboard>

          {ensName && hasLinkedIPNS && (
            <Dialog.Footer.Button
              bgColor="white"
              borderColor="green"
              borderWidth="md"
              textColor="green"
              htmlHref={`https://${ensName}.limo`}
              htmlTarget="_blank"
            >
              <Translate
                en="Open IPNS page"
                zh_hans="打开 IPNS 页面"
                zh_hant="打開 IPNS 頁面"
              />
            </Dialog.Footer.Button>
          )}

          {hasLinkEnsButton && (
            <ENSDialog user={user}>
              {({ openDialog }) => (
                <Dialog.Footer.Button
                  bgColor="white"
                  borderColor="green"
                  borderWidth="md"
                  textColor="green"
                  onClick={() => {
                    openDialog()
                    analytics.trackEvent('click_button', {
                      type: 'bind_ens',
                      pageType: 'user_profile',
                    })
                  }}
                  aria-haspopup="dialog"
                >
                  <Translate id="bindIPNStoENS" />
                </Dialog.Footer.Button>
              )}
            </ENSDialog>
          )}

          <Dialog.Footer.Button
            bgColor="white"
            borderColor="greyDarker"
            textColor="greyDarker"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default WalletLabel
