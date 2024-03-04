import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'

export type Step = 'credit' | 'usdt' | 'likecoin'

type Props = {
  step: Step
  setStep: React.Dispatch<React.SetStateAction<Step>>
}

const DonationTabs = ({ step, setStep }: Props) => {
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
      <Tabs.Tab selected={isUsdt} onClick={() => setStep('usdt')}>
        USDT
      </Tabs.Tab>
      <Tabs.Tab selected={isLikecoin} onClick={() => setStep('likecoin')}>
        LikeCoin
      </Tabs.Tab>
    </Tabs>
  )
}

export default DonationTabs
