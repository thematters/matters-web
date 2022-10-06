import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  Button,
  Card,
  CopyToClipboard,
  IconCopy16,
  IconInfo24,
  IconRssDialog24,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

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
  articlesCount,
}: {
  ipnsKey: string
  articlesCount: number
  refetch: () => any
}) => {
  const { loading, data } = useQuery<RssGateways>(RSS_GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className="container">
      <SectionCard
        title={
          <TextIcon icon={<IconRssDialog24 />} size="lg">
            <Translate
              zh_hant="內容訂閱服務"
              zh_hans="内容订阅服务"
              en="Content Feed"
            />
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

        {articlesCount !== 0 && ipnsKey === '' && (
          <section className="warning-gold">
            <TextIcon icon={<IconInfo24 size="md" />} color="gold" size="md-s">
              <span>
                <Translate
                  zh_hans="尝试将内容写入 IPFS 网络中，需要一段时间请耐心等候"
                  zh_hant="嘗試將內容寫入 IPFS 網絡中，需要一段時間請耐心等候"
                  en="Adding contents into IPFS network. It takes some time, please wait."
                />
              </span>
            </TextIcon>
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
          )}
          {articlesCount !== 0 && ipnsKey === '' && (
            <section className="warning-green">
              <TextIcon
                icon={<IconInfo24 size="md" />}
                color="green"
                size="md-s"
              >
                <Translate
                  zh_hans="等待写入完成..."
                  zh_hant="等候寫入完成..."
                  en="Waiting ..."
                />
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
                  .replace(':hash', ipnsKey)
                  .replace('/ipfs/', '/ipns/')
                const hostname = url.replace(
                  /(https:\/\/|\/ipfs\/|:hash.?)/g,
                  ''
                )
                return (
                  <li key={url}>
                    <a className="gateway-url">
                      {hostname}
                      <CopyToClipboard text={gatewayUrl}>
                        <Button>
                          <IconCopy16 />
                        </Button>
                      </CopyToClipboard>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>

          <hr style={{ margin: '1rem 0' }} />
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
