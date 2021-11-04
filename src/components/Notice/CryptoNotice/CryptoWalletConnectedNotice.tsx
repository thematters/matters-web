import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CryptoWalletConnectedNotice as NoticeType } from './__generated__/CryptoWalletConnectedNotice'

const CryptoWalletConnectedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <Translate
            zh_hant="你已成功設定加密錢包。錢包地址："
            zh_hans="你已成功设定加密钱包，钱包地址："
            en="You've connected a crypto wallet, and the address:"
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
