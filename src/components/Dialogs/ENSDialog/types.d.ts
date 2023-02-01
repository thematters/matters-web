import { UserProfileUserPublicQuery } from '~/gql/graphql'

export type Step = 'connectWallet' | 'walletSelect' | 'linkENS' | 'complete'

export interface BaseENSDialogProps {
  user: UserProfileUserPublicQuery['user']
  completeCallback?: () => void
}
