import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import { ReactComponent as IconExternal } from '@/public/static/icons/24px/external.svg'
import { ReactComponent as IconHelp } from '@/public/static/icons/24px/help.svg'
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
    spacing={4}
  >
    <FormattedMessage defaultMessage="View on IPFS" id="zbaTLV" />
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
  const { data } = useQuery<GatewaysQuery>(GATEWAYS)

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
                        defaultMessage="The Fingerprint from IPFS, you can read it via a gateway"
                        id="Oru6G2"
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
                    defaultMessage="The Fingerprint from IPFS, you can read it via a gateway"
                    id="Oru6G2"
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
        <section className={styles.item}>
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
                    {truncate(version.dataHash!, 4, 4)}
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

        {/* gateways */}
        {version.dataHash && (
          <section className={styles.item}>
            <section className={styles.name}>
              <FormattedMessage defaultMessage="Gateways" id="jtdQHR" />
            </section>
            <section className={styles.content}>
              {gateways.slice(0, 3).map((url) => {
                const gatewayUrl = url.replace(':hash', version.dataHash!)
                const hostname = url.replace(
                  /(https:\/\/|\/ipfs\/|:hash.?)/g,
                  ''
                )

                return (
                  <a
                    href={gatewayUrl}
                    target="_blank"
                    rel="noreferrer"
                    key={url}
                    className={styles.gatewayUrl}
                  >
                    {truncate(hostname, 4, 5)}
                  </a>
                )
              })}
            </section>
          </section>
        )}

        {/* ISCN */}
        {article.iscnId && (
          <section className={styles.item}>
            <section className={styles.name}>ISCN</section>

            <section className={styles.content}>
              <a
                href={iscnLinkUrl(article.iscnId)}
                target="_blank"
                rel="noreferrer"
              >
                <TextIcon
                  icon={<Icon icon={IconExternal} size={12} />}
                  color="greyDarker"
                  size={12}
                  spacing={4}
                  placement="left"
                >
                  {truncate(article.iscnId, 4, 4)}
                </TextIcon>
              </a>
            </section>
          </section>
        )}

        {/* Secret */}
        {article.access.secret && (
          <section className={styles.item}>
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
                      {truncate(article.access.secret!, 4, 4)}
                    </TextIcon>
                  </Button>
                )}
              </CopyToClipboard>
            </section>
          </section>
        )}
      </footer>
    </section>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader
