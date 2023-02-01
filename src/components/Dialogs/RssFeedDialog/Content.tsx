import { useQuery } from '@apollo/react-hooks'
import contentHash from '@ensdomains/content-hash'
import { namehash } from '@ethersproject/hash'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import { EXTERNAL_LINKS } from '~/common/enums'
import {
  featureSupportedChains,
  PublicResolverABI,
  translate,
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
  IconInfo24,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
  WagmiProvider,
} from '~/components'
import { AuthorRssFeedFragment, RssGatewaysQuery } from '~/gql/graphql'

import SectionCard from '../FingerprintDialog/SectionCard'
import styles from '../FingerprintDialog/styles.css'

type RssFeedDialogContentProps = {
  user: AuthorRssFeedFragment
  refetch: () => any
}

const RSS_GATEWAYS = gql`
  query RssGateways {
    official {
      gatewayUrls @client
    }
  }
`

const BaseRssFeedDialogContent: React.FC<RssFeedDialogContentProps> = ({
  user,
}) => {
  const { lang } = useContext(LanguageContext)
  const { loading, data } = useQuery<RssGatewaysQuery>(RSS_GATEWAYS)

  const gateways = data?.official.gatewayUrls || []
  const ipnsKey = user.info.ipnsKey

  const targetNetork = featureSupportedChains.ens[0]
  const address = user?.info.ethAddress
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: targetNetork.id,
  })
  const { data: resolverData } = useEnsResolver({
    name: ensName as string,
    chainId: targetNetork.id,
  })
  const { data: readData } = useContractRead({
    address: resolverData?.address as `0x${string}` | undefined,
    abi: PublicResolverABI,
    functionName: 'contenthash',
    args: ensName ? [namehash(ensName) as `0x${string}`] : undefined,
    chainId: targetNetork.id,
  })
  const hasLinkedIPNS =
    !!ipnsKey && '0x' + contentHash.encode('ipns-ns', ipnsKey) === readData
  const displayIPNS = hasLinkedIPNS ? ensName : user.info.ipnsKey

  return (
    <Dialog.Content hasGrow>
      <section className="container">
        <SectionCard>
          {!ipnsKey ? (
            <>
              <section className="warning-card">
                <IconInfo24 size="md" />

                <p>
                  <Translate
                    zh_hans="尝试将内容写入 IPFS 网络中，需要一段时间，请耐心等候。若等候时间过久，可通过发布文章来加速。"
                    zh_hant="嘗試將內容寫入 IPFS 網絡中，需要一段時間，請耐心等候。若等候時間過久，可透過發佈文章來加速。"
                    en="Adding contents into IPFS network, and it usually takes some times, please wait. You can accelerate the process by publishing new article."
                  />
                </p>
              </section>
              <Spacer size="loose" />
            </>
          ) : null}

          {/* hash */}
          <section className="hash">
            <h4 className="title">
              <Translate
                zh_hans="IPNS 订阅"
                zh_hant="IPNS 訂閱"
                en="IPNS Subscription"
              />
            </h4>
            <p className="description">
              <Translate
                zh_hant="添加 IPFS 生成的 IPNS 指紋到閱讀器，如："
                zh_hans="添加 IPFS 生成的 IPNS 指纹到阅读器，如："
                en="Add hash from IPFS into compatible reader such as "
              />
              <a
                className="u-link-green"
                href={EXTERNAL_LINKS.PLANET}
                target="_blank"
                rel="noreferrer"
              >
                Planet
              </a>
            </p>

            {ipnsKey ? (
              <section className="copy">
                <input
                  type="text"
                  value={displayIPNS!}
                  readOnly
                  onClick={(event) => event.currentTarget.select()}
                />
                <CopyToClipboard text={displayIPNS!}>
                  <Button aria-label={translate({ id: 'copy', lang })}>
                    <IconCopy16 />
                  </Button>
                </CopyToClipboard>
              </section>
            ) : (
              <>
                <Spacer size="base" />
                <section className="warning-input">
                  <TextIcon
                    icon={<IconInfo24 size="md" />}
                    color="green"
                    size="md-s"
                  >
                    <Translate id="waitingForHash" />
                  </TextIcon>
                </section>
              </>
            )}
          </section>

          <Spacer size="base" />
          <hr />
          <Spacer size="base" />

          {/* gateways */}
          <section className="gateways">
            <h4 className="title">
              <Translate
                zh_hans="RSS 订阅"
                zh_hant="RSS 訂閱"
                en="RSS Subscription"
              />
            </h4>
            <p className="description">
              <Translate
                zh_hans="添加以下任一网址到 RSS 阅读器"
                zh_hant="添加以下任一網址到 RSS 閱讀器"
                en="Add any URL in the following list into RSS reader"
              />
            </p>

            <ul>
              {(!data || loading) && <Spinner />}

              {/* FIXME: remove filebase.io and meson.network */}
              {gateways.slice(2, 6).map((url) => {
                const gatewayUrl = url
                  .replace(':hash', displayIPNS!)
                  .replace('/ipfs/', '/ipns/')
                  .concat('/rss.xml')
                const hostname = url.replace(
                  /(https:\/\/|\/ipfs\/|:hash.?)/g,
                  ''
                )

                return (
                  <li key={url}>
                    <span
                      className={classNames({
                        'gateway-url': true,
                        disabled: !ipnsKey,
                      })}
                    >
                      {hostname}

                      <CopyToClipboard text={gatewayUrl}>
                        <Button
                          disabled={!ipnsKey}
                          aria-label={translate({ id: 'copy', lang })}
                        >
                          <IconCopy16 />
                        </Button>
                      </CopyToClipboard>
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </SectionCard>

        <style jsx>{styles}</style>
      </section>
    </Dialog.Content>
  )
}

const RssFeedDialogContent: React.FC<RssFeedDialogContentProps> = (props) => (
  <WagmiProvider>
    <BaseRssFeedDialogContent {...props} />
  </WagmiProvider>
)

export default RssFeedDialogContent
