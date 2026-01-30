import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Tabs } from '~/components'

type Props = {
  currency: CURRENCY
  setCurrency: (currency: CURRENCY) => void
}

const DonationTabs = ({ currency, setCurrency }: Props) => {
  const isHKD = currency === CURRENCY.HKD
  const isUSDT = currency === CURRENCY.USDT

  return (
    <section>
      <Tabs>
        <Tabs.Tab selected={isHKD} onClick={() => setCurrency(CURRENCY.HKD)}>
          <FormattedMessage
            defaultMessage="Credit card"
            id="vmx+TU"
            description="src/views/ArticleDetail/SupportAuthor/Tabs/index.tsx"
          />
        </Tabs.Tab>
        <Tabs.Tab selected={isUSDT} onClick={() => setCurrency(CURRENCY.USDT)}>
          USDT
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}

export default DonationTabs
