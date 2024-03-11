import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

export type Step =
  | 'currencyChoice'
  | 'walletSelect'
  | 'setAmount'
  | 'addCredit'
  | 'complete'
  | 'confirm'
  | 'processing'
  | 'resetPassword'
  | 'setPaymentPassword'

export interface BaseSupportAuthorProps {
  completeCallback?: () => void
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  targetId: string
}
