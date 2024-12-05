import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { explorers } from '~/common/utils/wallet'
import { WithdrewLockedTokensNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const WithdrewLockedTokensNotice = ({
  notice,
}: {
  notice: WithdrewLockedTokensNoticeFragment
}) => {
  const tx = notice.tx
  const blockchainTx = tx.blockchainTx

  if (!notice.actors || !blockchainTx) {
    return null
  }

  const link = `${explorers[blockchainTx.chain].url}/tx/${blockchainTx.txHash}`

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_WITHDREW_LOCKED_TOKENS}
    >
      <section className={styles.contentWrap}>
        <a href={link} target="_blank">
          <FormattedMessage
            defaultMessage="The vault contract has sent {amount} USDT to the linked wallet. Click here for details."
            id="JlpeDH"
            values={{ amount: tx.amount }}
          />
        </a>
      </section>
      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

WithdrewLockedTokensNotice.fragments = {
  notice: gql`
    fragment WithdrewLockedTokensNotice on TransactionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      tx: target {
        id
        amount
        currency
        blockchainTx {
          chain
          txHash
        }
      }
    }
    ${NoticeDate.fragments.notice}
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
  `,
}

export default WithdrewLockedTokensNotice
