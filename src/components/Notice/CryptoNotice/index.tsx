import gql from 'graphql-tag'

import { CryptoNoticeFragment } from '~/gql/graphql'

import CryptoWalletAirdropNotice from './CryptoWalletAirdropNotice'
import CryptoWalletConnectedNotice from './CryptoWalletConnectedNotice'

const CryptoNotice = ({ notice }: { notice: CryptoNoticeFragment }) => {
  switch (notice.type) {
    case 'CryptoWalletAirdrop':
      return <CryptoWalletAirdropNotice notice={notice} />
    case 'CryptoWalletConnected':
      return <CryptoWalletConnectedNotice notice={notice} />
    default:
      return null
  }
}

CryptoNotice.fragments = {
  notice: gql`
    fragment CryptoNotice on CryptoNotice {
      __typename
      id
      unread
      type
      ...CryptoWalletAirdropNotice
      ...CryptoWalletConnectedNotice
    }
    ${CryptoWalletAirdropNotice.fragments.notice}
    ${CryptoWalletConnectedNotice.fragments.notice}
  `,
}

export default CryptoNotice
