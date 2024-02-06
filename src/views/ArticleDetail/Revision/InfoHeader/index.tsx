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
  TextIcon,
  Tooltip,
  UserDigest,
} from '~/components'
import { GatewaysQuery } from '~/gql/graphql'
import { MOCK_ARTILCE, MOCK_USER } from '~/stories/mocks'

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

export const InfoHeader = () => {
  const intl = useIntl()
  const { data } = useQuery<GatewaysQuery>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className={styles.info}>
      <header className={styles.header}>
        <section className={styles.author}>
          <UserDigest.Mini
            user={MOCK_USER}
            hasDisplayName
            hasAvatar
            avatarSize="md"
            textSize="xs"
            textWeight="md"
            spacing="xtight"
          />

          <section className={styles.viewIpfs}>
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
                <TextIcon
                  icon={<IconHelp24 size="mdXS" />}
                  color="greyDark"
                  textPlacement="left"
                  size="xs"
                  spacing="xxtight"
                >
                  <FormattedMessage defaultMessage="View on IPFS" id="zbaTLV" />
                </TextIcon>
              </span>
            </Tooltip>
          </section>
        </section>

        <p className={styles.description}>
          這個版本調整了引用文字、出處，以及部分連結資料也一併更新了
        </p>
      </header>

      <hr className={styles.divider} />

      <footer className={styles.footer}>
        {/* dataHash */}
        <section className={styles.item}>
          <section className={styles.name}>
            <FormattedMessage defaultMessage="Content Hash" id="Xh/txo" />
          </section>
          <CopyToClipboard text={MOCK_ARTILCE.dataHash}>
            <Button
              aria-label={intl.formatMessage({
                defaultMessage: 'Copy',
                id: '4l6vz1',
              })}
            >
              <TextIcon
                icon={<IconCopy16 size="xs" />}
                color="greyDarker"
                size="xs"
                spacing="xxtight"
                textPlacement="left"
              >
                {truncate(MOCK_ARTILCE.dataHash, 4, 4)}
              </TextIcon>
            </Button>
          </CopyToClipboard>
        </section>

        {/* gateways */}
        <section className={styles.item}>
          <section className={styles.name}>
            <FormattedMessage defaultMessage="Gateways" id="jtdQHR" />
          </section>
          <section className={styles.content}>
            {gateways.slice(0, 3).map((url) => {
              const gatewayUrl = url.replace(':hash', MOCK_ARTILCE.dataHash)
              const hostname = url.replace(/(https:\/\/|\/ipfs\/|:hash.?)/g, '')

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

        {/* ISCN */}
        <section className={styles.item}>
          <section className={styles.name}>ISCN</section>

          <section className={styles.content}>
            <a
              href={iscnLinkUrl(MOCK_ARTILCE.iscnId)}
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
                {truncate(MOCK_ARTILCE.iscnId, 4, 4)}
              </TextIcon>
            </a>
          </section>
        </section>

        {/* Secret */}
        <section className={styles.item}>
          <section className={styles.name}>
            <FormattedMessage defaultMessage="Key" id="EcglP9" />
          </section>

          <section className={styles.content}>
            <CopyToClipboard text={MOCK_ARTILCE.access.secret}>
              <Button
                aria-label={intl.formatMessage({
                  defaultMessage: 'Copy',
                  id: '4l6vz1',
                })}
              >
                <TextIcon
                  icon={<IconCopy16 size="xs" />}
                  color="greyDarker"
                  size="xs"
                  spacing="xxtight"
                  textPlacement="left"
                >
                  {truncate(MOCK_ARTILCE.access.secret, 4, 4)}
                </TextIcon>
              </Button>
            </CopyToClipboard>
          </section>
        </section>
      </footer>
    </section>
  )
}
