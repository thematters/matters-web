import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CryptoWalletConnectedNoticeFragment } from '~/gql/graphql'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CryptoWalletConnectedNotice = ({
  notice,
}: {
  notice: CryptoWalletConnectedNoticeFragment
}) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_CRYPTO_WALLET_CONNECTED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <FormattedMessage
            defaultMessage="You have successfully completed Ethereum wallet settings. Please confirm wallet address:"
            description="src/components/Notice/CryptoNotice/CryptoWalletConnectedNotice.tsx"
          />
          <p className="highlight">{notice.target.address}</p>
        </p>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CryptoWalletConnectedNotice.fragments = {
  notice: gql`
    fragment CryptoWalletConnectedNotice on CryptoNotice {
      __typename
      id
      unread
      type
      target {
        address
      }
      ...NoticeDate
    }
  `,
}

export default CryptoWalletConnectedNotice
