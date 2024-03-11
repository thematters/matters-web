import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

export type Step = 'credit' | 'usdt' | 'likecoin'

type Props = {
  recipient: UserDonationRecipientFragment
  step: Step
  setStep: React.Dispatch<React.SetStateAction<Step>>
}

const DonationTabs = ({ recipient, step, setStep }: Props) => {
  const creatorAddress = recipient.info.ethAddress

  const isCredit = step === 'credit'
  const isUsdt = step === 'usdt'
  const isLikecoin = step === 'likecoin'

  return (
    <Tabs>
      <Tabs.Tab selected={isCredit} onClick={() => setStep('credit')}>
        <FormattedMessage
          defaultMessage="Credit card"
          id="vmx+TU"
          description="src/views/ArticleDetail/SupportAuthor/Tabs/index.tsx"
        />
      </Tabs.Tab>
      <Tabs.Tab
        selected={isUsdt}
        onClick={() => setStep('usdt')}
        disabled={!creatorAddress}
      >
        USDT
      </Tabs.Tab>
      <Tabs.Tab selected={isLikecoin} onClick={() => setStep('likecoin')}>
        LikeCoin
      </Tabs.Tab>
    </Tabs>
  )
}

export default DonationTabs
