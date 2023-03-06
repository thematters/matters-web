import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CryptoWalletAirdropNoticeFragment } from '~/gql/graphql'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CryptoWalletAirdropNotice = ({
  notice,
}: {
  notice: CryptoWalletAirdropNoticeFragment
}) => {
  return (
    <section className="container" data-test-id={TEST_ID.CRYPTO_WALLET_AIRDROP}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <FormattedMessage
            defaultMessage="Airdrop registration completed. Your NFT will be revealed on November 12. Confirm your ETH wallet address:"
            description="src/components/Notice/CryptoNotice/CryptoWalletAirdropNotice.tsx"
          />
        </p>
        <p className="highlight">{notice.target.address}</p>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CryptoWalletAirdropNotice.fragments = {
  notice: gql`
    fragment CryptoWalletAirdropNotice on CryptoNotice {
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

export default CryptoWalletAirdropNotice
