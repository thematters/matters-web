import { useQuery } from '@apollo/react-hooks'
import contentHash from '@ensdomains/content-hash'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'
import { namehash } from 'viem/ens'
import { useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import { EXTERNAL_LINKS } from '~/common/enums'
import { featureSupportedChains, PublicResolverABI } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
  IconInfo24,
  Spacer,
  Spinner,
  TextIcon,
} from '~/components'
import { AuthorRssFeedFragment, RssGatewaysQuery } from '~/gql/graphql'

import SectionCard from '../FingerprintDialog/SectionCard'
import styles from '../FingerprintDialog/styles.module.css'

type RssFeedDialogContentProps = {
  user: AuthorRssFeedFragment
  refetch: () => any
  closeDialog: () => any
}

const RSS_GATEWAYS = gql`
  query RssGateways {
    official {
      gatewayUrls @client
    }
  }
`

const BaseRssFeedDialogContent: React.FC<RssFeedDialogContentProps> = ({
  user,
  closeDialog,
}) => {
  const { loading, data } = useQuery<RssGatewaysQuery>(RSS_GATEWAYS)

  const gateways = data?.official.gatewayUrls || []
  const ipnsKey = user.info.ipnsKey

  const targetNetork = featureSupportedChains.ens[0]
  const address = user?.info.ethAddress
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: targetNetork.id,
  })
  const { data: resolverAddress } = useEnsResolver({
    name: ensName as string,
    chainId: targetNetork.id,
  })
  const { data: readData } = useContractRead({
    address: resolverAddress,
    abi: PublicResolverABI,
    functionName: 'contenthash',
    args: ensName ? [namehash(ensName) as `0x${string}`] : undefined,
    chainId: targetNetork.id,
  })
  const hasLinkedIPNS =
    !!ipnsKey && '0x' + contentHash.encode('ipns-ns', ipnsKey) === readData
  const displayIPNS = hasLinkedIPNS ? ensName : user.info.ipnsKey

  const intl = useIntl()

  return (
    <>
      <Dialog.Content>
        <section className={styles.container}>
          <SectionCard>
            {!ipnsKey ? (
              <>
                <section className={styles.warningCard}>
                  <IconInfo24 size="md" />

                  <p>
                    <FormattedMessage
                      defaultMessage="Adding contents into IPFS network, and it usually takes some times, please wait. You can accelerate the process by publishing new article."
                      description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                    />
                  </p>
                </section>
                <Spacer size="loose" />
              </>
            ) : null}

            {/* hash */}
            <section className={styles.hash}>
              <h4 className={styles.title}>
                <FormattedMessage
                  defaultMessage="IPNS Subscription"
                  description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                />
              </h4>
              <p className={styles.description}>
                <FormattedMessage
                  defaultMessage="Add hash from IPFS into compatible reader such as "
                  description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                />
                <a
                  className="u-link-green"
                  href={EXTERNAL_LINKS.PLANET}
                  target="_blank"
                  rel="noreferrer"
                >
                  Planet
                </a>
              </p>

              {ipnsKey ? (
                <section className={styles.copy}>
                  <div className={styles.hash}>{displayIPNS}</div>

                  <CopyToClipboard text={displayIPNS!}>
                    <Button
                      aria-label={intl.formatMessage({
                        defaultMessage: 'Copy Link',
                      })}
                    >
                      <IconCopy16 />
                    </Button>
                  </CopyToClipboard>
                </section>
              ) : (
                <>
                  <Spacer size="base" />
                  <section className={styles.warningInput}>
                    <TextIcon
                      icon={<IconInfo24 size="md" />}
                      color="green"
                      size="mdS"
                    >
                      <FormattedMessage
                        defaultMessage="Waiting ..."
                        description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                      />
                    </TextIcon>
                  </section>
                </>
              )}
            </section>

            <Spacer size="base" />
            <hr />
            <Spacer size="base" />

            {/* gateways */}
            <section className={styles.gateways}>
              <h4 className={styles.title}>
                <FormattedMessage
                  defaultMessage="RSS Subscription"
                  description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                />
              </h4>
              <p className={styles.description}>
                <FormattedMessage
                  defaultMessage="Add any URL in the following list into RSS reader"
                  description="src/components/Dialogs/RssFeedDialog/Content.tsx"
                />
              </p>

              <ul className={styles.gatewayUrls}>
                {(!data || loading) && <Spinner />}

                {/* FIXME: remove filebase.io and meson.network */}
                {gateways.slice(0, 4).map((url) => {
                  const gatewayUrl = url
                    .replace(':hash', displayIPNS!)
                    .replace('/ipfs/', '/ipns/')
                    .concat('/rss.xml')
                  const hostname = url.replace(
                    /(https:\/\/|\/ipfs\/|:hash.?)/g,
                    ''
                  )

                  return (
                    <li key={url}>
                      <span
                        className={classNames({
                          [styles.gatewayUrl]: true,
                          [styles.disabled]: !ipnsKey,
                        })}
                      >
                        {hostname}

                        <CopyToClipboard text={gatewayUrl}>
                          <Button
                            disabled={!ipnsKey}
                            aria-label={intl.formatMessage({
                              defaultMessage: 'Copy Link',
                            })}
                          >
                            <IconCopy16 />
                          </Button>
                        </CopyToClipboard>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          </SectionCard>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            color="greyDarker"
            text={<FormattedMessage defaultMessage="Close" />}
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

const RssFeedDialogContent: React.FC<RssFeedDialogContentProps> = (props) => (
  <BaseRssFeedDialogContent {...props} />
)

export default RssFeedDialogContent
