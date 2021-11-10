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
            zh_hant="你已完成以太坊錢包設定。你設定的地址："
            zh_hans="你已完成以太坊钱包设定。你设定的地址："
            en="You have successfully completed Ethereum wallet settings. Please confirm wallet address:"
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
