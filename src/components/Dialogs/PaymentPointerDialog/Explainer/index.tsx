import { Translate } from '~/components'

import styles from './styles.css'

export default () => (
  <>
    <p>
      <a href="https://interledger.org/" target="_blank">
        <Translate zh_hant="跨賬本協議" zh_hans="跨账本协议" />
      </a>
      ：
      <a href="https://coil.com" target="_blank">
        Coil
      </a>
      <Translate
        zh_hant=" 是一個將收到的讀者付費按照內容的網絡瀏覽量分成給創作者的平台。為增加創作者的收入來源，Matters 引入"
        zh_hans=" 是一个将收到的读者付费按照内容的网络浏览量分成给创作者的平台。为增加创作者的收入来源，Matters 引入"
      />
      <a href="https://interledger.org/" target="_blank">
        <Translate zh_hant="跨賬本協議" zh_hans="跨账本协议" />
      </a>
      <Translate
        zh_hant="，實現付款方與收款方即使使用不同的貨幣進行交易，也可以對交易進行自動幣種轉換。你可以通過 "
        zh_hans="，实现付款方与收款方即使使用不同的货币进行交易，也可以对交易进行自动币种转换。你可以通过 "
      />
      <a href="https://uphold.com/" target="_blank">
        Uphold
      </a>
      、
      <a href="https://gatehub.net" target="_blank">
        GateHub
      </a>
      <Translate zh_hant=" 等服務配置" zh_hans=" 等服务配置" />
      <a href="https://webmonetization.org/docs/ilp-wallets" target="_blank">
        <Translate zh_hant="錢包地址" zh_hans="钱包地址" />
      </a>
      <Translate zh_hant="，獲得來自 " zh_hans="，获得来自 " />
      <a href="https://coil.com" target="_blank">
        Coil
      </a>
      <Translate
        zh_hant=" 平臺的收入，在 Matters 網站與 IPFS 網絡中均可使用。"
        zh_hans=" 平台的收入，在 Matters 网站与 IPFS 网络中均可使用。"
      />
    </p>
    <br />
    <style jsx>{styles}</style>
  </>
)
