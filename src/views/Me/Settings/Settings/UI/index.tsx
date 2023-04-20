import { Form, IconInfo16, Media, TextIcon, Translate } from '~/components'

import CurrencyConvertor from './CurrencyConvertor'
import styles from './styles.css'
import SwitchLanguage from './SwitchLanguage'

const BaseUISettings = ({ spaceX = 'base' }: { spaceX?: 0 | 'base' }) => {
  return (
    <Form.List groupName={<Translate id="settingsUI" />} spacingX={spaceX}>
      <SwitchLanguage />
      <CurrencyConvertor />
      <section className="rate-hint">
        <TextIcon icon={<IconInfo16 size="xs" />} color="grey" size="xs">
          <Translate
            zh_hans="加密货币汇率由 CoinGecko 提供"
            zh_hant="加密貨幣匯率由 CoinGecko 提供"
            en="Crypto rates provided by CoinGecko"
          />
        </TextIcon>
      </section>
      <style jsx>{styles}</style>
    </Form.List>
  )
}

const UISettings = () => {
  return (
    <>
      <Media at="sm">
        <BaseUISettings />
      </Media>
      <Media greaterThan="sm">
        <BaseUISettings spaceX={0} />
      </Media>
    </>
  )
}

export default UISettings
