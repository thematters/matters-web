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
  | 'setPaymentPassword'
  // Wallet
  | 'walletSelect'
  | 'networkSelect'

export interface BaseSupportAuthorProps {
  completeCallback?: () => void
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  targetId: string
}
