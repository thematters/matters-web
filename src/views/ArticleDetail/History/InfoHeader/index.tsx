import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { truncate } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  IconCopy16,
  IconExternalLink16,
  IconHelp24,
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
    icon={<IconHelp24 size="mdXS" />}
    color="greyDark"
    textPlacement="left"
    size="xs"
    spacing="xxtight"
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
            avatarSize="md"
            textSize="xs"
            textWeight="md"
            spacing="xtight"
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
                    icon={<IconCopy16 size="xs" />}
                    color="greyDarker"
                    size="xs"
                    spacing="xxtight"
                    textPlacement="left"
                  >
                    {truncate(version.dataHash!, 4, 4)}
                  </TextIcon>
                </Button>
              )}
            </CopyToClipboard>
          )}
          {!version.dataHash && (
            <TextIcon color="greyDarker" size="xs">
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
                    {hostname}
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
                  icon={<IconExternalLink16 size="xs" />}
                  color="greyDarker"
                  size="xs"
                  spacing="xxtight"
                  textPlacement="left"
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
                      icon={<IconCopy16 size="xs" />}
                      color="greyDarker"
                      size="xs"
                      spacing="xxtight"
                      textPlacement="left"
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
