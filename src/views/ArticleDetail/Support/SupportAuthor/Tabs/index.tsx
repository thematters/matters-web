import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Tabs, ViewerContext } from '~/components'

type Props = {
  currency: CURRENCY
  setCurrency: (currency: CURRENCY) => void
}

const DonationTabs = ({ currency, setCurrency }: Props) => {
  const viewer = useContext(ViewerContext)
  const hasViewerLikeId = !!viewer.liker.likerId

  const isHKD = currency === CURRENCY.HKD
  const isUSDT = currency === CURRENCY.USDT
  const isLikecoin = currency === CURRENCY.LIKE

  return (
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
      {hasViewerLikeId && (
        <Tabs.Tab
          selected={isLikecoin}
          onClick={() => setCurrency(CURRENCY.LIKE)}
        >
          LikeCoin
        </Tabs.Tab>
      )}
    </Tabs>
  )
}

export default DonationTabs
