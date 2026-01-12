import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { PATHS, URL_ME_WALLET } from '~/common/enums'
import { explorers } from '~/common/utils/wallet'
import { TransactionState, WithdrewLockedTokensFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const WithdrewLockedTokens = ({
  notice,
}: {
  notice: WithdrewLockedTokensFragment
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
    <NoticeCard
      notice={notice}
      type="system"
      content={
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
              defaultMessage="The contract has sent {amount} USDT to the connected wallet"
              id="tWCQCd"
              values={{
                amount: tx.amount,
              }}
            />
          )}
        </a>
      }
    />
  )
}

WithdrewLockedTokens.fragments = {
  notice: gql`
    fragment WithdrewLockedTokens on TransactionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
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
    ${ActorAction.fragments.user}
  `,
}

export default WithdrewLockedTokens
