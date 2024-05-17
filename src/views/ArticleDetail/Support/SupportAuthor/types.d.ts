import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

export type Step =
  | 'setAmount'
  | 'topup'
  | 'confirm'
  | 'complete'
  | 'processing'
  | 'resetPassword'
  // Wallet
  | 'walletSelect'
  | 'networkSelect'
  | 'bindWallet'

export interface BaseSupportAuthorProps {
  completeCallback?: () => void
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  targetId: string
}
