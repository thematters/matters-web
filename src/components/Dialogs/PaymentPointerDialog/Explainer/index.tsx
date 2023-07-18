import { Translate } from '~/components'

import styles from './styles.module.css'

const PaymentPointerExplainer = () => (
  <>
    <p className={styles.content}>
      <a href="https://interledger.org/" target="_blank" rel="noreferrer">
        <Translate
          zh_hant="跨賬本協議"
          zh_hans="跨账本协议"
          en="Interledger Protocol"
        />
      </a>
      <Translate
        zh_hant="：為增加創作者的收入來源，Matters 引入了"
        zh_hans="：为增加创作者的收入来源，Matters 引入了"
        en=": In order to increase the sources of income for creators, Matters introduced "
      />
      <a href="https://interledger.org/" target="_blank" rel="noreferrer">
        <Translate
          zh_hant="跨賬本協議"
          zh_hans="跨账本协议"
          en="Interledger Protocol"
        />
      </a>
      <Translate zh_hant=" 與 " zh_hans=" 与 " en=" and " />
      <a href="https://webmonetization.org/" target="_blank" rel="noreferrer">
        <Translate
          zh_hant="Web Monetization 標準"
          zh_hans="Web Monetization 标准"
          en="Web Monetization standard"
        />
      </a>
      <Translate
        zh_hant="，實現付款方與收款方即使使用不同的貨幣進行交易，也可以對交易進行自動幣種轉換。你可以通過 "
        zh_hans="，实现付款方与收款方即使使用不同的货币进行交易，也可以对交易进行自动币种转换。你可以通过 "
        en=", enabling the payer and the payee to conduct transactions in different currencies. Through "
      />
      <a href="https://uphold.com/" target="_blank" rel="noreferrer">
        Uphold
      </a>
      <Translate zh_hant="、" zh_hans="、" en=", " />
      <a href="https://gatehub.net" target="_blank" rel="noreferrer">
        GateHub
      </a>
      <Translate
        zh_hant=" 等服務配置"
        zh_hans=" 等服务配置"
        en=" and other services you can acqure a "
      />
      <a
        href="https://webmonetization.org/docs/ilp-wallets"
        target="_blank"
        rel="noreferrer"
      >
        <Translate zh_hant="錢包地址" zh_hans="钱包地址" en="wallet address" />
      </a>
      <Translate
        zh_hant="，獲得來自 "
        zh_hans="，获得来自 "
        en=", and receive payments from "
      />
      <a href="https://coil.com" target="_blank" rel="noreferrer">
        Coil
      </a>
      <Translate
        zh_hant=" 平臺的收入，在 Matters 網站與 IPFS 網絡中均可使用。"
        zh_hans=" 平台的收入，在 Matters 网站与 IPFS 网络中均可使用。"
        en=", applicable on both Matters website and IPFS."
      />
    </p>
  </>
)

export default PaymentPointerExplainer
