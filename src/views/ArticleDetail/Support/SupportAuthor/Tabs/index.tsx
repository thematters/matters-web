import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

export type CurrencyType = 'credit' | 'usdt' | 'likecoin'

type Props = {
  recipient: UserDonationRecipientFragment
  type: CurrencyType
  setType: React.Dispatch<React.SetStateAction<CurrencyType>>
}

const DonationTabs = ({ recipient, type, setType }: Props) => {
  const creatorAddress = recipient.info.ethAddress

  const isCredit = type === 'credit'
  const isUsdt = type === 'usdt'
  const isLikecoin = type === 'likecoin'

  return (
    <Tabs>
      <Tabs.Tab selected={isCredit} onClick={() => setType('credit')}>
        <FormattedMessage
          defaultMessage="Credit card"
          id="vmx+TU"
          description="src/views/ArticleDetail/SupportAuthor/Tabs/index.tsx"
        />
      </Tabs.Tab>
      <Tabs.Tab
        selected={isUsdt}
        onClick={() => setType('usdt')}
        disabled={!creatorAddress}
      >
        USDT
      </Tabs.Tab>
      <Tabs.Tab selected={isLikecoin} onClick={() => setType('likecoin')}>
        LikeCoin
      </Tabs.Tab>
    </Tabs>
  )
}

export default DonationTabs
