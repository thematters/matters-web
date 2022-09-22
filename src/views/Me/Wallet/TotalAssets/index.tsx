import { Button, Form, IconIncome24, TextIcon, Translate } from '~/components'

import { PATHS } from '@/src/common/enums'

const TotalAssets = () => {
  return (
    <Form.List.Item
      title={
        <TextIcon icon={<IconIncome24 size="md" />} spacing="xtight" size="xm">
          <Translate zh_hant="總資產" zh_hans="总资产" en="Total Assets" />
        </TextIcon>
      }
      right={
        <Button
          size={['7rem', '2rem']}
          bgColor="green"
          textColor="white"
          href={PATHS.ME_WALLET_TRANSACTIONS}
        >
          <TextIcon weight="md">
            <Translate id="paymentTransactions" />
          </TextIcon>
        </Button>
      }
    />
  )
}

export default TotalAssets
