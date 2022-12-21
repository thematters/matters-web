// @ts-ignore
import contentHash from '@ensdomains/content-hash'
import { namehash } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import {
  chain,
  etherscanBlockExplorers,
  useAccount,
  useContractWrite,
  useDisconnect,
  useEnsName,
  useEnsResolver,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'

import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
  LanguageContext,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import {
  maskAddress,
  PublicResolverABI,
  toPath,
  translate,
} from '~/common/utils'

import styles from './styles.css'

import { UserProfileUserPublic_user } from '~/components/UserProfile/__generated__/UserProfileUserPublic'

interface LinkENSContentProps {
  user: UserProfileUserPublic_user
  switchToWalletSelect: () => void
  closeDialog: () => void
}
const LinkENSContent = ({
  user,
  closeDialog,
  switchToWalletSelect,
}: LinkENSContentProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const router = useRouter()

  const [txConfirming, setTxConfirming] = useState<boolean>(false)
  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  const { address } = useAccount()
  const { chain: currentChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()
  const isUnsupportedNetwork =
    currentChain?.id !== (isProd ? chain.mainnet.id : chain.goerli.id)
  const targetChainName = isProd ? chain.mainnet.name : chain.goerli.name
  const targetChainId = isProd ? chain.mainnet.id : chain.goerli.id
  const switchToTargetNetwork = async () => {
    if (!switchNetwork) return

    switchNetwork(targetChainId)
  }

  const { data: ensName } = useEnsName({
    address: viewer.info.ethAddress as `0x${string}`,
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })
  const { data: resolverData } = useEnsResolver({
    name: ensName as string,
  })
  const { disconnect } = useDisconnect()

  const ipnsHash = user?.info.ipnsKey
  const {
    data: blockchainTx,
    isError,
    isLoading,
    isSuccess,
    write: setContenthash,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: resolverData?.address,
    abi: PublicResolverABI,
    functionName: 'setContenthash',
    args: [
      namehash(ensName || ('' as string)),
      !!ipnsHash && '0x' + contentHash.encode('ipns-ns', ipnsHash),
    ],
  })

  const linkIPNStoENS = async () => {
    if (!ensName) return

    if (setContenthash) {
      setContenthash()

      setTxConfirming(true)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (blockchainTx) {
        setTxConfirming(true)
        await blockchainTx?.wait()
        setTxConfirming(false)
      }
    })()
  }, [blockchainTx])

  const scanUrl = isProd
    ? etherscanBlockExplorers.mainnet.url
    : etherscanBlockExplorers.goerli.url

  return (
    <>
      <Dialog.Content>
        <section className="link-ens-container">
          <span className="info">
            {(!isSuccess || txConfirming) && (
              <>
                <Translate zh_hans={`关联`} zh_hant={`關聯`} en={`Link`} />
                <span className="ens">&nbsp;{ensName}&nbsp;</span>
                <Translate id="toYourIPNSPage" />
              </>
            )}
            {isSuccess && !txConfirming && (
              <>
                <Translate
                  zh_hans="已成功关联，稍后完成同步在&nbsp;"
                  zh_hant="已成功關聯，稍後完成同步在&nbsp;"
                  en="Successfully linked. It would take couple hours to resolve. View transation on&nbsp;"
                />
                <a href={`${scanUrl}/tx/${blockchainTx?.hash}`} target="_blank">
                  Etherscan
                </a>
                <Translate
                  zh_hans="&nbsp;查看记录"
                  zh_hant="&nbsp;查看紀錄"
                  en="."
                />
              </>
            )}
          </span>
          {isError && (
            <p className="error">
              <Translate
                zh_hans="未知错误，请确认你的钱包并重新尝试"
                zh_hant="未知錯誤，請確認你的錢包並重新嘗試"
                en="Unknown error. Please check wallet and retry."
              />
            </p>
          )}
          {!isConnectedAddress && (
            <>
              <p className="reconnect-hint">
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
            </>
          )}
          <section className="btn">
            {!isConnectedAddress && (
              <Dialog.Footer.Button
                bgColor="green"
                textColor="white"
                onClick={() => {
                  disconnect()
                  switchToWalletSelect()
                }}
              >
                <Translate
                  zh_hant="重新連接錢包"
                  zh_hans="重新连接钱包"
                  en="Reconnect Wallet"
                />
              </Dialog.Footer.Button>
            )}
            {isConnectedAddress && !isLoading && isUnsupportedNetwork && (
              <Dialog.Footer.Button onClick={switchToTargetNetwork}>
                <Translate
                  zh_hant="切換到 "
                  zh_hans="切换到 "
                  en="Switch to "
                />
                {targetChainName}
              </Dialog.Footer.Button>
            )}
            {isConnectedAddress &&
              !isUnsupportedNetwork &&
              !isLoading &&
              !isSuccess && (
                <Dialog.Footer.Button
                  onClick={() => {
                    linkIPNStoENS()
                  }}
                >
                  <Translate id="bindIPNStoENS" />
                </Dialog.Footer.Button>
              )}

            {(isLoading || txConfirming) && !isError && (
              <Dialog.Footer.Button loading={isLoading || txConfirming} />
            )}
            {!txConfirming && isSuccess && (
              <Dialog.Footer.Button
                bgColor="grey-lighter"
                onClick={() => {
                  const path = toPath({
                    page: 'userProfile',
                    userName: viewer?.userName || '',
                  })
                  const protocal =
                    process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
                      ? 'http'
                      : 'https'
                  router.push(
                    `${protocal}://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${path.href}`
                  )
                  closeDialog()
                }}
              >
                <TextIcon size="md" weight="semibold" color="black">
                  <Translate
                    zh_hans="回到个人页"
                    zh_hant="回到個人頁"
                    en="Back to Profile"
                  />
                </TextIcon>
              </Dialog.Footer.Button>
            )}
          </section>
        </section>
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default LinkENSContent
