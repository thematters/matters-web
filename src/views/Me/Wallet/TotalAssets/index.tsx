import { Button, IconIncome24, TextIcon, Translate } from '~/components'

import { PATHS } from '@/src/common/enums'

import styles from './styles.css'

const TotalAssets = () => {
  return (
    <section className="TotalAssets">
      <TextIcon
        icon={<IconIncome24 size="md" />}
        spacing="xtight"
        size="xm"
        weight="semibold"
      >
        <Translate zh_hant="資產" zh_hans="资产" en="Assets" />
      </TextIcon>
      <Button
        spacing={['xxtight', 'tight']}
        bgColor="green"
        textColor="white"
        href={PATHS.ME_WALLET_TRANSACTIONS}
      >
        <TextIcon weight="md">
          <Translate id="paymentTransactions" />
        </TextIcon>
      </Button>
      <style jsx>{styles}</style>
    </section>
  )
}

export default TotalAssets
