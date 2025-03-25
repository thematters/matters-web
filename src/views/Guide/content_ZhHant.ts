import { GUIDE_LINKS } from '~/common/enums'

const zh_hant = `
歡迎來到 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 馬特市！

## 給寫作者與讀者

如果你初來乍到，還在熟悉網站的基本功能，以下有兩份超詳盡的基礎功能指南，你可以在這兩份指南中，瞭解到如何使用編輯器發文、什麼是 IPFS、如何管理自己的創作收入、如何加入更多寫作社群等。

*   [Matters 讀者工具箱 | 新手必看](${GUIDE_LINKS.readerToolbox.zh_hant})
*   [Matters 作者工具箱 | 新手必看](${GUIDE_LINKS.authorToolbox.zh_hant})

Matters 目前尚未推出 App，如果你想要在手機上使用 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}，非常推薦你使用 PWA，功能跟 App 幾乎完全一樣。

*   [Matters 應用下載（PWA）指南](${GUIDE_LINKS.PWA.zh_hant})

## 在 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 探索 Web3 的世界

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 致力於探索 Web3 與創作者經濟，我們提供加密錢包註冊與登入的功能。綁定錢包後，也可以使用支付與提現等功能。

*   [Matters 加密錢包指南 - 電腦版](${GUIDE_LINKS.wallet.zh_hant})

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 的經濟系統支援法幣（港幣）及 USDT、LikeCoin 等虛擬貨幣，歡迎你使用加密貨幣支持優質作者，也可以將獲得的報酬提領出來。

*   [Matters 支付與提現指南](${GUIDE_LINKS.payment.zh_hant})

如果你想用手機進行登入、綁定錢包及進行 USDT-Optimism 支付，請參考我們的手機版專屬指南，可以為你解決絕大部分的疑惑。

*   [Matters 加密錢包指南 - 手機版](${GUIDE_LINKS.mobileWallet.zh_hant})`
export default zh_hant
