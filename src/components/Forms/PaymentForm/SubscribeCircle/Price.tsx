import _get from 'lodash/get'

import { Translate } from '~/components'

import { toAmountString } from '~/common/utils'

import ConfirmTable from '../ConfirmTable'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type PriceProps = {
  circle: DigestRichCirclePublic
}

const Price: React.FC<PriceProps> = ({ circle }) => {
  const price = circle.prices && circle.prices[0]

  if (!price) {
    return null
  }

  return (
    <ConfirmTable>
      <ConfirmTable.Row type="balance">
        <ConfirmTable.Col>
          <Translate zh_hant="每月費用" zh_hans="每月费用" />
        </ConfirmTable.Col>

        <ConfirmTable.Col>
          {price.currency} {toAmountString(price.amount)}
        </ConfirmTable.Col>
      </ConfirmTable.Row>
    </ConfirmTable>
  )
}

export default Price
