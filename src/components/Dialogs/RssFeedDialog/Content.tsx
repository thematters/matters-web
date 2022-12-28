import { useQuery } from '@apollo/react-hooks'
import contentHash from '@ensdomains/content-hash'
import classNames from 'classnames'
import { namehash } from 'ethers/lib/utils'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import {
  Button,
  Card,
  CopyToClipboard,
  IconCopy16,
  IconInfo24,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'
import {
  featureSupportedChains,
  PublicResolverABI,
  translate,
} from '~/common/utils'

import styles from './styles.css'

import { AuthorRssFeed } from './__generated__/AuthorRssFeed'
import { RssGateways } from './__generated__/RssGateways'

const RSS_GATEWAYS = gql`
  query RssGateways {
    official {
      gatewayUrls @client
    }
  }
`

const SectionCard: React.FC<
  React.PropsWithChildren<{
    title?: string | React.ReactNode
    subTitle?: string | React.ReactNode
    right?: string | React.ReactNode
    href?: string
    warning?: boolean
  }>
> = ({ title, subTitle, right, href, children, warning }) => {
  const Header = () => (
    <header>
      <div className="title">
        <h3>{title}</h3>
        {right || <section className="right">{right}</section>}
      </div>
      <style jsx>{`
        & .title {
          @mixin flex-center-space-between;
        }
      `}</style>
    </header>
  )

  const subtitleClasses = classNames({
    subtitle: true,
    error: warning,
  })

  return (
    <Card bgColor="white" borderRadius="xtight" spacing={['base', 'base']}>
      <section className="item">
        {href ? (
          <a href={href} target="_blank">
            <Header />
          </a>
        ) : (
          <Header />
        )}
        <small className={subtitleClasses}>{subTitle}</small>
      </section>

      {children}
      <style jsx>{`
        .subtitle {
          color: var(--color-grey);
        }
        .error {
          color: var(--color-red);
        }
      `}</style>
    </Card>
  )
}

const RssFeedDialogContent = ({
  user,
  articlesCount,
}: {
  user: AuthorRssFeed
  articlesCount: number
  refetch: () => any
}) => {
  const { lang } = useContext(LanguageContext)
  const { loading, data } = useQuery<RssGateways>(RSS_GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  const ipnsKey = user.info.ipnsKey
  const notPushlishedLately = articlesCount !== 0 && ipnsKey === ''

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
    address: resolverData?.address,
    abi: PublicResolverABI,
    functionName: 'contenthash',
    args: ensName ? [namehash(ensName) as `0x${string}`] : undefined,
    chainId: targetNetork.id,
  })
  const hasLinkedIPNS =
    !!ipnsKey && '0x' + contentHash.encode('ipns-ns', ipnsKey) === readData
  const displayIPNS = hasLinkedIPNS ? ensName : user.info.ipnsKey

  return (
    <section className="container">
      <SectionCard>
        {notPushlishedLately && (
          <section className="warning-gold">
            <TextIcon
              icon={<IconInfo24 size="md" />}
              color="gold"
              size="md-s"
            />
            <span>
              <Translate
                zh_hans="尝试将内容写入 IPFS 网络中，需要一段时间，请耐心等候。若等候时间过久，可通过发布文章来加速。"
                zh_hant="嘗試將內容寫入 IPFS 網絡中，需要一段時間，請耐心等候。若等候時間過久，可透過發佈文章來加速。"
                en="Adding contents into IPFS network, and it usually takes some times, please wait. You can accelerate the process by publishing new article."
              />
            </span>
          </section>
        )}

        {/* hash */}
        <section className="hash">
          <header>
            <h4 className="title">
              <Translate
                zh_hans="IPNS 订阅"
                zh_hant="IPNS 訂閱"
                en="IPNS Subscription"
              />
            </h4>
          </header>
          <span className="subtitle">
            <Translate
              zh_hant="添加 IPFS 生成的 IPNS 指紋到閱讀器，如："
              zh_hans="添加 IPFS 生成的 IPNS 指纹到阅读器，如："
              en="Add hash from IPFS into compatible reader such as "
            />
            <a
              className="u-link-green"
              href={EXTERNAL_LINKS.PLANET}
              target="_blank"
            >
              Planet
            </a>
          </span>
          {ipnsKey !== '' && (
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
          )}
          {notPushlishedLately && (
            <section className="warning-green">
              <TextIcon
                icon={<IconInfo24 size="md" />}
                color="green"
                size="md-s"
              >
                <Translate id="waitingForHash" />
              </TextIcon>
            </section>
          )}

          <hr style={{ margin: '1rem 0' }} />

          {/* gateways */}
          <section className="gateways">
            <header>
              <h4 className="title">
                <Translate
                  zh_hans="RSS 订阅"
                  zh_hant="RSS 訂閱"
                  en="RSS Subscription"
                />
              </h4>
            </header>
            <span className="subtitle">
              <Translate
                zh_hans="添加以下任一网址到 RSS 阅读器"
                zh_hant="添加以下任一網址到 RSS 閱讀器"
                en="Add any URL in the following list into RSS reader"
              />
            </span>

            <ul>
              {(!data || loading) && <Spinner />}

              {gateways.map((url) => {
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
                    <a
                      className={
                        notPushlishedLately
                          ? 'gateway-url-disabled'
                          : 'gateway-url'
                      }
                    >
                      {hostname}
                      <CopyToClipboard text={gatewayUrl}>
                        <Button
                          disabled={notPushlishedLately}
                          aria-label={translate({ id: 'copy', lang })}
                        >
                          <IconCopy16 />
                        </Button>
                      </CopyToClipboard>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        </section>
      </SectionCard>
      <Spacer size="base" />
      <style jsx>{styles}</style>
    </section>
  )
}

export default RssFeedDialogContent
