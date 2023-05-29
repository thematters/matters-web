import contentHash from '@ensdomains/content-hash'
import { namehash } from '@ethersproject/hash'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import {
  analytics,
  featureSupportedChains,
  PublicResolverABI,
} from '~/common/utils'
import {
  Button,
  ENSDialog,
  IconHelp16,
  TextIcon,
  Tooltip,
  Translate,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import styles from './styles.css'
import WalletAddress from './WalletAddress'

type WalletLabelProps = {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  isMe: boolean
}

const WalletLabel: React.FC<WalletLabelProps> = ({ user, isMe }) => {
  const address = user?.info.ethAddress
  const ipnsHash = user?.info.ipnsKey
  const targetNetork = featureSupportedChains.ens[0]

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

  return (
    <section className="wallet-label">
      <WalletAddress
        address={address}
        ensName={ensName}
        hasLinkedIPNS={hasLinkedIPNS}
      />

      {hasLinkEnsButton && (
        <ENSDialog user={user}>
          {({ openDialog }) => (
            <Button
              size={[null, '1.5rem']}
              spacing={[0, 'tight']}
              borderColor="green"
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
              <TextIcon weight="md" size="xs">
                <Translate id="bindIPNStoENS" />
              </TextIcon>
            </Button>
          )}
        </ENSDialog>
      )}

      {hasLinkedIPNS && !isMe && (
        <Tooltip
          content={
            <Translate
              zh_hans={`${user.displayName} 已将他的 ENS 指向到个人 IPNS 页面`}
              zh_hant={`${user.displayName} 已將他的 ENS 指向到個人 IPNS 頁面`}
              en={`${user.displayName} has linked primary ENS name to his IPNS page.`}
            />
          }
        >
          <span className="help-icon">
            <IconHelp16 color="grey" />
          </span>
        </Tooltip>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default WalletLabel
