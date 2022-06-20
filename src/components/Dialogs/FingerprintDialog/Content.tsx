import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  Card,
  CopyButton,
  IconExternalLink16,
  IconIPFSGreen24,
  IconISCN24,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'

import { iscnLinkUrl, translate } from '~/common/utils'

import ArticleSecret from './ArticleSecret'
import styles from './styles.css'

import { Gateways } from './__generated__/Gateways'
import { RetryEditArticle } from './__generated__/RetryEditArticle'

const EDIT_ARTICLE = gql`
  mutation RetryEditArticle($id: ID!, $iscnPublish: Boolean) {
    editArticle(input: { id: $id, iscnPublish: $iscnPublish }) {
      id
      cover
      access {
        type
      }
      license
      iscnId
      drafts {
        id
        mediaHash
        publishState
        iscnPublish
      }
    }
  }
`

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
      <style jsx>{`
        & .title {
          @mixin flex-center-space-between;

          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          line-height: 1;
        }
      `}</style>
    </header>
  )

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
        <small className="subtitle">{subTitle}</small>
      </section>

      {children}
      <style jsx>{`
        .subtitle {
          color: var(--color-grey);
        }
        .right {
          float: right;
        }
      `}</style>
    </Card>
  )
}

const FingerprintDialogContent = ({
  dataHash,
  showSecret,
  showRetry,
  iscnId,
  iscnPublish,
  articleId,
}: {
  dataHash: string
  showSecret: boolean
  showRetry: boolean
  iscnId: string
  iscnPublish?: boolean
  articleId?: string
}) => {
  const { lang } = useContext(LanguageContext)
  const { loading, data } = useQuery<Gateways>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  const [editArticle, { loading: retryPublishing }] =
    useMutation<RetryEditArticle>(EDIT_ARTICLE)

  return (
    <section className="container">
      <SectionCard
        title={
          <TextIcon icon={<IconIPFSGreen24 />} size="lg">
            IPFS
          </TextIcon>
        }
        subTitle={
          <Translate
            zh_hant="去中心化內容存儲網絡"
            zh_hans="去中心化內容存儲網絡"
            en="Decentralized Content Storage Network"
          />
        }
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
                    {hostname}
                    <IconExternalLink16 />
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
          <div className="subtitle">
            <Translate
              zh_hant="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              zh_hans="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
              en="The Fingerprint from IPFS, you can read it via a gateway"
            />
          </div>

          <section className="copy">
            <input
              type="text"
              value={dataHash}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
            <CopyButton text={dataHash} />
          </section>
        </section>
      </SectionCard>

      <Spacer size="base" />

      {/* iscnId */}
      {iscnPublish && (
        <SectionCard
          title={
            <TextIcon icon={<IconISCN24 />} size="lg">
              ISCN
            </TextIcon>
          }
          subTitle={
            iscnId ? (
              <Translate
                zh_hant="已在 LikeCoin 鏈上註冊的元數據"
                zh_hans="已在 LikeCoin 鏈上註冊的元數據"
                en="the metadata registered on LikeCoin chain"
              />
            ) : (
              <Translate
                zh_hant="ISCN 寫入未成功"
                zh_hans="ISCN 寫入未成功"
                en="ISCN 寫入未成功"
              />
            )
          }
          right={
            iscnId ? (
              <a href={iscnLinkUrl(iscnId)} target="_blank">
                <IconExternalLink16 />
              </a>
            ) : showRetry ? (
              <Button
                spacing={['xtight', 'xtight']}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                aria-label={translate({ id: 'retry', lang })}
                disabled={retryPublishing}
                onClick={() => {
                  editArticle({
                    variables: {
                      id: articleId,
                      iscnPublish: true,
                    },
                  })
                }}
              >
                {retryPublishing ? (
                  <Translate id="retrying" />
                ) : (
                  <Translate id="retry" />
                )}
              </Button>
            ) : (
              <></>
            )
          }
        />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default FingerprintDialogContent
