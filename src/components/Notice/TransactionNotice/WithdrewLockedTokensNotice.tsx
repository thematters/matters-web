import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { PATHS, TEST_ID, URL_ME_WALLET } from '~/common/enums'
import { explorers } from '~/common/utils/wallet'
import {
  TransactionState,
  WithdrewLockedTokensNoticeFragment,
} from '~/gql/graphql'

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
  const isFailed =
    tx.state === TransactionState.Failed ||
    tx.state === TransactionState.Canceled
  const link = isFailed
    ? `${PATHS.ME_WALLET}?${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.key}=${URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.value}`
    : blockchainTx
      ? `${explorers[blockchainTx.chain].url}/tx/${blockchainTx.txHash}`
      : ''

  if (!isFailed && !blockchainTx) {
    return null
  }

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_WITHDREW_LOCKED_TOKENS}
    >
      <section className={styles.contentWrap}>
        <a href={link} target={isFailed ? undefined : '_blank'}>
          {isFailed ? (
            <FormattedMessage
              defaultMessage="Claim {amount} USDT failed. Click here to retry or contact ask@matters.town"
              id="6Bxl4S"
              values={{
                amount: tx.amount,
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="The contract has sent {amount} to the linked wallet. Click here for details."
              id="n3SsO1"
              values={{
                amount: <span className="u-highlight">{tx.amount} USDT</span>,
              }}
            />
          )}
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
        state
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
