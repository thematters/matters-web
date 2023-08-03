import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { getAddress } from 'viem'

import { OPEN_LIKE_COIN_DIALOG, PATHS } from '~/common/enums'
import { maskAddress } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Form,
  IconCopy16,
  Translate,
  ViewerContext,
} from '~/components'
import { ViewerLikeInfoQuery } from '~/gql/graphql'

import styles from './styles.module.css'

const VIEWER_LIKE_INFO = gql`
  query ViewerLikeInfo {
    viewer {
      id
      info {
        email
        ethAddress
      }
      liker {
        total
        rateUSD
      }
    }
  }
`

const WalletSettings = () => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const likerId = viewer.liker.likerId
  const { data } = useQuery<ViewerLikeInfoQuery>(VIEWER_LIKE_INFO, {
    errorPolicy: 'none',
    skip: typeof window === 'undefined',
  })

  const ethAddress = data?.viewer?.info?.ethAddress
    ? getAddress(data.viewer.info.ethAddress)
    : ''
  const shortAddress = ethAddress ? maskAddress(ethAddress) : ''

  return (
    <Form.List groupName={<Translate id="settingsWallet" />} spacingX={0}>
      <Form.List.Item
        title="Liker ID"
        onClick={
          !likerId
            ? () =>
                window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
            : undefined
        }
        role="button"
        rightText={likerId || <Translate id="setup" />}
      />

      <Form.List.Item
        title={
          ethAddress ? (
            <Translate id="walletAddress" />
          ) : (
            <Translate id="loginWithWallet" />
          )
        }
        role={ethAddress ? undefined : 'link'}
        href={ethAddress ? undefined : PATHS.ME_SETTINGS_CONNECT_WALLET}
        rightText={
          ethAddress ? (
            <>
              <span className={styles.address}>{shortAddress}</span>
              <CopyToClipboard
                text={ethAddress}
                successMessage={
                  <FormattedMessage defaultMessage="Address copied" />
                }
              >
                <Button
                  spacing={['xtight', 'xtight']}
                  aria-label={intl.formatMessage({ defaultMessage: 'Copy' })}
                >
                  <IconCopy16 color="grey" />
                </Button>
              </CopyToClipboard>
            </>
          ) : (
            <Translate
              zh_hant="前往設定"
              zh_hans="前往设置"
              en="Click to connect"
            />
          )
        }
        rightTextColor={ethAddress ? 'greyDarker' : 'green'}
      />
    </Form.List>
  )
}

export default WalletSettings
