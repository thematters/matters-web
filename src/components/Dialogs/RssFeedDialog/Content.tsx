import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  Button,
  Card,
  CopyToClipboard,
  IconCopy16,
  IconExternalLink16,
  IconRssDialog24,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import styles from './styles.css'

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
    title: string | React.ReactNode
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
  ipnsKey,
}: {
  ipnsKey: string
  refetch: () => any
}) => {
  const { loading, data } = useQuery<RssGateways>(RSS_GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className="container">
      <SectionCard
        title={
          <TextIcon icon={<IconRssDialog24 />} size="lg">
            RSS
          </TextIcon>
        }
        subTitle={
          <Translate
            zh_hant="透過 IPFS 網絡建立的去中心化內容訂閱服務"
            zh_hans="透过 IPFS 网络建立的去中心化内容订阅服务"
            en="Decentralized Content Feed Based On IPFS"
          />
        }
        warning={false}
      >
        <hr style={{ margin: '0.5rem 0 1rem' }} />

        {/* gateways */}
        <section className="gateways">
          <header>
            <h4 className="title">
              <Translate
                zh_hans="公共节点"
                zh_hant="公共節點"
                en="Public Gateways"
              />
            </h4>
          </header>
          <span className="subtitle">
            <Translate
              zh_hans="添加任一网址到你的订阅阅读器"
              zh_hant="添加任一網址到你的訂閱閱讀器"
              en="add any url to your RSS reader"
            />
          </span>

          <ul>
            {(!data || loading) && <Spinner />}

            {gateways.map((url) => {
              const gatewayUrl = url
                .replace(':hash', ipnsKey)
                .replace('/ipfs/', '/ipns/')
                .concat('/rss.xml')
              const hostname = url.replace(/(https:\/\/|\/ipfs\/|:hash.?)/g, '')
              console.log(gatewayUrl)
              return (
                <li key={url}>
                  <a href={gatewayUrl} target="_blank" className="gateway-url">
                    {hostname}
                    <IconExternalLink16 />
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <hr style={{ margin: '1rem 0' }} />

        {/* hash */}
        <section className="hash">
          <header>
            <h4 className="title">
              <Translate
                zh_hans="IPNS Hash"
                zh_hant="IPNS Hash"
                en="IPNS Hash"
              />
            </h4>
          </header>
          <span className="subtitle">
            <Translate
              zh_hant="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              zh_hans="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              en="The Fingerprint from IPFS, you can read it via a gateway"
            />
          </span>

          <section className="copy">
            <input
              type="text"
              value={ipnsKey}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
            <CopyToClipboard text={ipnsKey}>
              <Button>
                <IconCopy16 />
              </Button>
            </CopyToClipboard>
          </section>
        </section>
      </SectionCard>

      <Spacer size="base" />
      <style jsx>{`
        button {
          background-color: var(--color-matters-green);
          font-size: 13px;
          font-weight: 400;
          line-height: 1em;
          color: var(--color-white);
          padding: 6px 8px;
          border-radius: 12px;
        }
      `}</style>
      <style jsx>{styles}</style>
    </section>
  )
}

export default RssFeedDialogContent
