import { Form, IconInfo16, TextIcon, Translate } from '~/components'

import CurrencyConvertor from './CurrencyConvertor'
import styles from './styles.module.css'
import SwitchLanguage from './SwitchLanguage'

const UISettings = () => {
  return (
    <section className={styles.container}>
      <Form.List groupName={<Translate id="settingsUI" />} spacingX={0}>
        <SwitchLanguage />
        <hr className={styles.dashedLine} />
        <CurrencyConvertor />
        <section className={styles.rateHint}>
          <TextIcon icon={<IconInfo16 size="xs" />} color="grey" size="xs">
            <Translate
              zh_hans="加密货币汇率由 CoinGecko 提供"
              zh_hant="加密貨幣匯率由 CoinGecko 提供"
              en="Crypto rates provided by CoinGecko"
            />
          </TextIcon>
        </section>
      </Form.List>
    </section>
  )
}

export default UISettings
