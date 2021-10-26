import gql from 'graphql-tag'

import CryptoWalletAirdropNotice from './CryptoWalletAirdropNotice'
import CryptoWalletConnectedNotice from './CryptoWalletConnectedNotice'

import { CryptoNotice as NoticeType } from './__generated__/CryptoNotice'

const CryptoNotice = ({ notice }: { notice: NoticeType }) => {
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
