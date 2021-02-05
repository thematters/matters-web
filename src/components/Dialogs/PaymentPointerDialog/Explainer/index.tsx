import { translate } from '@/src/common/utils'

import styles from './styles.css'

export default () => (
  <>
    <p>
      <a href="https://interledger.org/">
        {translate({
          zh_hant: '跨賬本協議',
          zh_hans: '跨账本协议',
        })}
      </a>
      {translate({
        zh_hant:
          '允許付款方與收款方使用不同的貨幣進行交易，對交易進行自動幣種轉換。你可以通過 ',
        zh_hans:
          '允许付款方与收款方使用不同的货币进行交易，对交易进行自动币种转换。你可以通过 ',
      })}
      <a href="https://uphold.com/">Uphold</a>、
      <a href="https://gatehub.net">GateHub</a>
      {translate({
        zh_hant: ' 等服務配置',
        zh_hans: ' 等服务配置',
      })}
      <a href="https://webmonetization.org/docs/ilp-wallets">
        {translate({
          zh_hant: '錢包地址',
          zh_hans: '钱包地址',
        })}
      </a>
      {translate({
        zh_hant: '，然後就可以獲得使用 ',
        zh_hans: '，然后就可以获得使用 ',
      })}
      <a href="https://coil.com">Coil</a>
      {translate({
        zh_hant: ' 等支付服務讀者的捐贈。',
        zh_hans: ' 等支付服务读者的捐赠。',
      })}
    </p>
    <br />
    <style jsx>{styles}</style>
  </>
)
