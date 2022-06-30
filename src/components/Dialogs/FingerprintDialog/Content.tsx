import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'

import {
  Button,
  Card,
  // CopyButton,
  CopyToClipboard,
  // Divider,
  IconCopy16,
  IconExternalLink16,
  // IconIPFS24,
  IconIPFSGreen24,
  IconISCN24,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
  // translate,
  useMutation,
} from '~/components'

import { iscnLinkUrl, translate } from '~/common/utils'

import ArticleSecret from './ArticleSecret'
// import ArticleSecretDesc from './ArticleSecretDesc'
// import CopyButton from './CopyButton'
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
  warning?: boolean
}> = ({ title, subTitle, right, href, children, warning }) => {
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

const FingerprintDialogContent = ({
  dataHash,
  showSecret,
  isAuthor,
  iscnId,
  iscnPublish,
  articleId,
  articleLastModified, // articleCreatedAt,
  pending,
  refetch,
}: {
  dataHash: string
  showSecret: boolean
  isAuthor: boolean
  iscnId: string
  iscnPublish?: boolean
  articleId?: string
  articleLastModified: string
  pending: boolean
  refetch: () => any
}) => {
  const { lang } = useContext(LanguageContext)
  const { loading, data } = useQuery<Gateways>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  const [editArticle, { loading: retryPublishing }] =
    useMutation<RetryEditArticle>(EDIT_ARTICLE)

  const [timeCooling, setTimeCooling] = useState(false)
  const POOLING_PERIOD = 30e3
  let timer: any = null
  const pooling = (startedAt: number) => {
    if (!startedAt) return
    // const coolingBegins = Date.parse(articleLastModified)
    if (Date.now() - startedAt < POOLING_PERIOD) {
      setTimeCooling(true)
      timer = setTimeout(function loop() {
        if (iscnId || Date.now() - startedAt >= POOLING_PERIOD) {
          setTimeCooling(false)
          timer = null
        } else {
          refetch()
          timer = setTimeout(loop, 5e3)
        }
      }, 5e3)
    }
  }
  useEffect(() => {
    if (iscnId || !articleLastModified) return
    pooling(Date.parse(articleLastModified))

    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  })

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
              value={dataHash}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
            <CopyToClipboard text={dataHash}>
              <Button>
                <IconCopy16 />
              </Button>
            </CopyToClipboard>
          </section>
        </section>
      </SectionCard>

      <Spacer size="base" />

      {/* iscnId */}
      {iscnPublish && (isAuthor || iscnId) && !timeCooling && (
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
          warning={!iscnId}
          right={
            iscnId ? (
              <a href={iscnLinkUrl(iscnId)} target="_blank">
                <IconExternalLink16 />
              </a>
            ) : isAuthor ? (
              <button
                aria-label={translate({ id: 'retry', lang })}
                disabled={!pending && (timeCooling || retryPublishing)}
                onClick={() => {
                  editArticle({
                    variables: {
                      id: articleId,
                      iscnPublish: true,
                    },
                  })
                  setTimeCooling(true)
                  pooling(Date.now())
                }}
              >
                {timeCooling ? (
                  <Translate id="publishing2" />
                ) : retryPublishing ? (
                  <Translate id="retrying" />
                ) : (
                  <Translate id="retry" />
                )}
              </button>
            ) : (
              <></>
            )
          }
          // href={iscnLinkUrl(iscnId)}
        >
          {/* <pre>{iscnId}</pre> */}
        </SectionCard>
      )}
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

export default FingerprintDialogContent
