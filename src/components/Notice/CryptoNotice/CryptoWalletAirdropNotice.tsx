import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CryptoWalletAirdropNotice as NoticeType } from './__generated__/CryptoWalletAirdropNotice'

const CryptoWalletAirdropNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <Translate
            zh_hant="你已成功登記參加空投且完成以太坊錢包設定，空投活動將在 2021/11/12 進行。你設定的空投地址："
            zh_hans="你已成功登記参加空投且完成以太坊钱包设定，空投活动将在 2021/11/12 进行。你设定的空投地址："
            en="Airdrop registration completed. Your NFT will be revealed on November 12. Confirm your ETH wallet address:"
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
