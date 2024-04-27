import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/donate.svg'
import { ReactComponent as IconExternal } from '@/public/static/icons/24px/donate.svg'
import { ReactComponent as IconIPFS } from '@/public/static/icons/24px/ipfs-2.svg'
import { ReactComponent as IconISCN } from '@/public/static/icons/24px/iscn.svg'
import { translate } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  Icon,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { GatewaysQuery, RetryEditArticleMutation } from '~/gql/graphql'

import ArticleSecret from './ArticleSecret'
import SectionCard from './SectionCard'
import styles from './styles.module.css'

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

// e.g. https://app.like.co/view/iscn:%2F%2Flikecoin-chain%2FbZs7dmhEk0voCV6vI_eWaHGD-cY32z6zt1scgzV9DVI%2F1
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const iscnLinkPrefix = isProd
  ? 'https://app.like.co/view'
  : 'https://app.rinkeby.like.co/view'

function iscnLinkUrl(iscnId: string) {
  return `${iscnLinkPrefix}/${encodeURIComponent(iscnId)}`
}

const FingerprintDialogContent = ({
  dataHash,
  showSecret,
  isAuthor,
  iscnId,
  iscnPublish,
  articleId,
  articleLastModified,
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
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)
  const { loading, data } = useQuery<GatewaysQuery>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  const [editArticle, { loading: retryPublishing }] =
    useMutation<RetryEditArticleMutation>(EDIT_ARTICLE)

  const [timeCooling, setTimeCooling] = useState(false)
  let timer: any = null
  const pooling = (startedAt: number) => {
    if (!startedAt) return
    const POOLING_PERIOD = 30e3
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
    <Dialog.Content>
      <section className={styles.container}>
        <SectionCard
          title={
            <TextIcon
              icon={<Icon icon={IconIPFS} size="mdXS" />}
              spacing="xtight"
              size="xm"
              weight="md"
            >
              IPFS
            </TextIcon>
          }
          description={
            <Translate
              zh_hant="去中心化內容存儲網絡"
              zh_hans="去中心化內容存儲網絡"
              en="Decentralized Content Storage Network"
            />
          }
        >
          <Spacer size="base" />
          <hr />
          <Spacer size="base" />

          {/* gateways */}
          <section className={styles.gateways}>
            <h4 className={styles.title}>
              <Translate
                zh_hans="公共节点"
                zh_hant="公共節點"
                en="Public Gateways"
              />
            </h4>

            <p className={styles.description}>
              <Translate
                zh_hans="內容分佈節點，可以複製以下地址對作品進行傳播"
                zh_hant="內容分佈節點，可以複製以下地址對作品進行傳播"
                en="you may access via a decentralized gateway"
              />
            </p>

            <ul className={styles.gatewayUrls}>
              {(!data || loading) && <Spinner />}

              {gateways.slice(0, 4).map((url) => {
                const gatewayUrl = url.replace(':hash', dataHash)
                const hostname = url.replace(
                  /(https:\/\/|\/ipfs\/|:hash.?)/g,
                  ''
                )

                return (
                  <li key={url}>
                    <a
                      href={gatewayUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.gatewayUrl}
                    >
                      {hostname}
                      <Icon icon={IconExternal} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* secret */}
          {showSecret && articleId && <ArticleSecret id={articleId} />}

          <Spacer size="base" />
          <hr />
          <Spacer size="base" />

          {/* hash */}
          <section className={styles.hash}>
            <h4 className={styles.title}>
              <Translate id="articleFingerprint" />
            </h4>

            <p className={styles.description}>
              <Translate
                zh_hant="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
                zh_hans="使用 IPFS 生成的作品指紋，通過它可在節點調取內容"
                en="The Fingerprint from IPFS, you can read it via a gateway"
              />
            </p>

            <section className={styles.copy}>
              <div className={styles.hash}>
                {dataHash || translate({ id: 'waitingForHash', lang })}
              </div>
              <CopyToClipboard text={dataHash}>
                {({ copyToClipboard }) => (
                  <Button
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Copy',
                      id: '4l6vz1',
                    })}
                    onClick={copyToClipboard}
                  >
                    <Icon icon={IconCopy} />
                  </Button>
                )}
              </CopyToClipboard>
            </section>
          </section>
        </SectionCard>

        {/* iscnId */}
        {iscnPublish && (isAuthor || iscnId) && !timeCooling && (
          <>
            <Spacer size="base" />
            <SectionCard
              title={
                <TextIcon
                  icon={<Icon icon={IconISCN} size="mdXS" />}
                  spacing="xtight"
                  size="xm"
                  weight="md"
                >
                  ISCN
                </TextIcon>
              }
              description={
                iscnId ? (
                  <Translate
                    zh_hant="已在 LikeCoin 鏈上註冊的元數據"
                    zh_hans="已在 LikeCoin 鏈上註冊的元數據"
                    en="The metadata registered on LikeCoin chain"
                  />
                ) : (
                  <Translate
                    zh_hant="ISCN 寫入未成功"
                    zh_hans="ISCN 写入未成功"
                    en="ISCN is failed to register on LikeCoin chain"
                  />
                )
              }
              warning={!iscnId}
              right={
                iscnId ? (
                  <a
                    href={iscnLinkUrl(iscnId)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon icon={IconExternal} color="greyDarker" />
                  </a>
                ) : isAuthor ? (
                  <Button
                    spacing={[0, 'xtight']}
                    size={[null, '1.5rem']}
                    bgColor="green"
                    textColor="white"
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
                    <TextIcon size="smS">
                      {timeCooling ? (
                        <Translate id="publishing2" />
                      ) : retryPublishing ? (
                        <Translate id="retrying" />
                      ) : (
                        <Translate id="retry" />
                      )}
                    </TextIcon>
                  </Button>
                ) : (
                  <></>
                )
              }
            />
          </>
        )}
      </section>
    </Dialog.Content>
  )
}

export default FingerprintDialogContent
