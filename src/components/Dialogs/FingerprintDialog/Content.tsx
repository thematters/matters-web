import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Card,
  // Divider,
  IconExternalLink16,
  IconIPFS24,
  IconISCN24,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import { iscnLinkUrl } from '~/common/utils'

import ArticleSecret from './ArticleSecret'
// import ArticleSecretDesc from './ArticleSecretDesc'
// import CopyButton from './CopyButton'
// import ListItem from './ListItem'
import styles from './styles.css'

import { Gateways } from './__generated__/Gateways'

const GATEWAYS = gql`
  query Gateways {
    official {
      gatewayUrls @client
    }
  }
`

const SectionCard: React.FC<{
  title: string | React.ReactNode
  subTitle?: string | React.ReactNode
  right?: string | React.ReactNode
  href?: string
}> = ({ title, subTitle, right, href, children }) => {
  const Header = () => (
    <header>
      <h3 className="title">
        {title}
        {right || <section className="right">{right}</section>}
      </h3>
    </header>
  )

  return (
    <Card bgColor="white" spacing={['base', 'base']}>
      <section className="item">
        {href ? (
          <a href={href} target="_blank">
            <Header />
          </a>
        ) : (
          <Header />
        )}
        <h4 className="subtitle">{subTitle}</h4>
      </section>

      {children}
      <style jsx>{`
        .item {
          & .title {
            @mixin flex-center-space-between;

            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-semibold);
            line-height: 1;
          }
        }
      `}</style>
    </Card>
  )
}

const FingerprintDialogContent = ({
  dataHash,
  showSecret,
  iscnId,
}: {
  dataHash: string
  showSecret: boolean
  iscnId: string
}) => {
  const { loading, data } = useQuery<Gateways>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className="container">
      <SectionCard
        title={
          <TextIcon icon={<IconIPFS24 />} size="lg">
            IPFS
          </TextIcon>
        }
        subTitle={'去中心化內容存儲網絡'}
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
              zh_hans="內容分佈節點，可以複製以下地址對作品進行傳播"
              zh_hant="內容分佈節點，可以複製以下地址對作品進行傳播"
              en="you may access via a decentralized gateway"
            />
          </span>

          <ul>
            {(!data || loading) && <Spinner />}

            {gateways.map((url) => {
              const gatewayUrl = url.replace(':hash', dataHash)
              const hostname = url.replace(/(https:\/\/|\/ipfs\/|:hash.?)/g, '')

              return (
                <li key={url}>
                  <a href={gatewayUrl} target="_blank" className="gateway-url">
                    {/* hostname */}
                    <TextIcon
                      icon={<IconExternalLink16 />}
                      textPlacement="left"
                    >
                      {hostname}
                    </TextIcon>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        {/* secret */}
        {showSecret && <ArticleSecret />}

        <hr style={{ margin: '1rem 0' }} />

        {/* hash */}
        <section className="hash">
          <header>
            <h4 className="title">
              <Translate id="articleFingerprint" />
            </h4>
          </header>
          <span className="subtitle">
            <Translate
              zh_hant="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              zh_hans="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              en="The Fingerprint from IPFS, you can read it via a gateway"
            />
          </span>

          <section>
            {/* <CopyButton text={dataHash} /> */}
            <input
              type="text"
              value={dataHash}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
          </section>
        </section>
      </SectionCard>

      {/* iscnId */}
      {iscnId && (
        <SectionCard
          title={
            <TextIcon icon={<IconISCN24 />} size="lg">
              ISCN
            </TextIcon>
          }
          subTitle={'已在 LikeCoin 鏈上註冊的元數據'}
          right={
            <a href={iscnLinkUrl(iscnId)} target="_blank">
              <IconExternalLink16 />
            </a>
          }
          // href={iscnLinkUrl(iscnId)}
        >
          {/* <pre>{iscnId}</pre> */}
        </SectionCard>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default FingerprintDialogContent
