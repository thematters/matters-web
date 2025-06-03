import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { CID } from 'multiformats/cid'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCopy from '@/public/static/icons/24px/copy.svg'
import IconExternal from '@/public/static/icons/24px/external.svg'
import IconHelp from '@/public/static/icons/24px/help.svg'
import { truncate } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Icon,
  Media,
  TextIcon,
  toast,
  Tooltip,
  UserDigest,
} from '~/components'
import {
  GatewaysQuery,
  InfoHeaderArticleFragment,
  InfoHeaderArticleVersionFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

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

const IPFSTextIcon = () => (
  <TextIcon
    icon={<Icon icon={IconHelp} size={18} />}
    color="greyDark"
    placement="left"
    size={12}
    spacing={2}
  >
    <TextIcon color="black" size={12}>
      <FormattedMessage
        defaultMessage="IPFS"
        id="fJVe7H"
        description="src/views/ArticleDetail/History/InfoHeader/index.tsx"
      />
    </TextIcon>
    &nbsp;
    <FormattedMessage defaultMessage="What is this" id="v84cGN" />
  </TextIcon>
)

const InfoHeader = ({
  article,
  version,
}: {
  article: InfoHeaderArticleFragment
  version: InfoHeaderArticleVersionFragment
}) => {
  const intl = useIntl()
  const { data } = useQuery<GatewaysQuery>(GATEWAYS, {
    skip: typeof window === 'undefined',
  })

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className={styles.info}>
      <header className={styles.header}>
        <section className={styles.author}>
          <UserDigest.Mini
            user={article.author}
            hasDisplayName
            hasAvatar
            avatarSize={24}
            textSize={12}
            textWeight="medium"
            spacing={8}
          />

          <section className={styles.viewIpfs}>
            <Media at="sm">
              <button
                type="button"
                onClick={() =>
                  toast.success({
                    message: (
                      <FormattedMessage
                        defaultMessage="IPFS is a decentralized storage technology that has the advantages of being decentralized, easy to survive, and difficult to be censored. Every article published on Matters is uploaded to IPFS. IPFS will incur certain storage fees, which are currently borne by Matters. (Go to the IPFS official website ipfs.com to learn more)"
                        id="nhkx3t"
                      />
                    ),
                  })
                }
              >
                <IPFSTextIcon />
              </button>
            </Media>
            <Media greaterThan="sm">
              <Tooltip
                content={
                  <FormattedMessage
                    defaultMessage="IPFS is a decentralized storage technology that has the advantages of being decentralized, easy to survive, and difficult to be censored. Every article published on Matters is uploaded to IPFS. IPFS will incur certain storage fees, which are currently borne by Matters. (Go to the IPFS official website ipfs.com to learn more)"
                    id="nhkx3t"
                  />
                }
                placement="top"
              >
                <span>
                  <IPFSTextIcon />
                </span>
              </Tooltip>
            </Media>
          </section>
        </section>

        {version.description && (
          <p className={styles.description}>{version.description}</p>
        )}
      </header>
      <hr className={styles.divider} />
      <footer className={styles.footer}>
        {/* dataHash */}
        <section className={[styles.item, styles.dataHash].join(' ')}>
          <section className={styles.name}>
            <FormattedMessage defaultMessage="Content Hash" id="Xh/txo" />
          </section>
          {version.dataHash && (
            <CopyToClipboard text={version.dataHash}>
              {({ copyToClipboard }) => (
                <Button
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Copy',
                    id: '4l6vz1',
                  })}
                  onClick={copyToClipboard}
                >
                  <TextIcon
                    icon={<Icon icon={IconCopy} size={12} />}
                    color="greyDarker"
                    size={12}
                    spacing={4}
                    placement="left"
                  >
                    <Media at="sm">{truncate(version.dataHash!, 10, 14)}</Media>
                    <Media greaterThan="sm">{version.dataHash}</Media>
                  </TextIcon>
                </Button>
              )}
            </CopyToClipboard>
          )}
          {!version.dataHash && (
            <TextIcon color="greyDarker" size={12}>
              <FormattedMessage defaultMessage="Pending..." id="99OtWT" />
            </TextIcon>
          )}
        </section>

        {/* ISCN */}
        {article.iscnId && (
          <section className={[styles.item, styles.inline].join(' ')}>
            <section className={styles.name}>ISCN</section>

            <section className={styles.content}>
              <Button
                htmlHref={iscnLinkUrl(article.iscnId)}
                htmlTarget="_blank"
                rel="noreferrer"
                textColor="greyDarker"
                textActiveColor="black"
              >
                <TextIcon
                  icon={<Icon icon={IconExternal} size={12} />}
                  size={12}
                  spacing={4}
                  placement="left"
                >
                  {truncate(article.iscnId, 14, 4)}
                </TextIcon>
              </Button>
            </section>
          </section>
        )}

        {/* Secret */}
        {article.access.secret && (
          <section className={[styles.item, styles.inline].join(' ')}>
            <section className={styles.name}>
              <FormattedMessage defaultMessage="Key" id="EcglP9" />
            </section>

            <section className={styles.content}>
              <CopyToClipboard text={article.access.secret}>
                {({ copyToClipboard }) => (
                  <Button
                    aria-label={intl.formatMessage({
                      defaultMessage: 'Copy',
                      id: '4l6vz1',
                    })}
                    onClick={copyToClipboard}
                  >
                    <TextIcon
                      icon={<Icon icon={IconCopy} size={12} />}
                      color="greyDarker"
                      size={12}
                      spacing={4}
                      placement="left"
                    >
                      {truncate(article.access.secret!, 3, 2)}
                    </TextIcon>
                  </Button>
                )}
              </CopyToClipboard>
            </section>
          </section>
        )}

        {/* gateways */}
        {version.dataHash && gateways.length > 0 && (
          <section className={styles.item}>
            <section className={styles.name}>
              <FormattedMessage defaultMessage="Gateways" id="jtdQHR" />
            </section>
            <section className={styles.content}>
              {gateways.slice(0, 3).map((url) => {
                const cid = CID.parse(version.dataHash!)
                const cidv1 = cid.toV1().toString()
                const gatewayUrl = url
                  .replace(':hash', version.dataHash!)
                  .replace(':cidv1', cidv1)
                const hostname = url.replace(
                  /(https:\/\/|\/ipfs\/|:cidv[01]\.|:hash.?)/g,
                  ''
                )

                return (
                  <Button
                    htmlHref={gatewayUrl}
                    htmlTarget="_blank"
                    rel="noreferrer"
                    key={url}
                    className={styles.gatewayUrl}
                    textColor="greyDarker"
                    textActiveColor="black"
                  >
                    {hostname}
                  </Button>
                )
              })}
            </section>
          </section>
        )}
      </footer>
    </section>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader
