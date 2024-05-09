import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Tabs, ViewerContext } from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

type Props = {
  recipient: UserDonationRecipientFragment
  currency: CURRENCY
  setCurrency: React.Dispatch<React.SetStateAction<CURRENCY>>
}

const DonationTabs = ({ recipient, currency, setCurrency }: Props) => {
  const viewer = useContext(ViewerContext)
  const creatorAddress = recipient.info.ethAddress
  const hasLikeId = viewer.liker.likerId !== null

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
      <Tabs.Tab
        selected={isUSDT}
        onClick={() => setCurrency(CURRENCY.USDT)}
        disabled={!creatorAddress}
      >
        USDT
      </Tabs.Tab>
      {hasLikeId && (
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
