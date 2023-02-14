import { GUIDE_LINKS } from '~/common/enums';
const content_md = {
  zh_hans: `
欢迎来到 Matters.News 马特市！

给写作者与读者
-------

如果你初来乍到，还在熟悉网站的基本功能，以下有两份超详尽的基础功能指南，你可以在这两份指南中，了解到如何使用编辑器发文、什么是 IPFS、如何管理自己的创作收入、如何加入更多写作社群等。

*   [Matters 读者工具箱 | 新手必看](${GUIDE_LINKS.readerToolbox.zh_hans})
*   [Matters 作者工具箱 | 新手必看](${GUIDE_LINKS.authorToolbox.zh_hans})

Matters 目前尚未推出 App，如果你想要在手机上使用 Matters.News，非常推荐你使用 PWA，功能跟 App 几乎完全一样。

*   [Matters 应用下载（PWA）指南](${GUIDE_LINKS.PWA.zh_hans})

在 Matters.News 探索 Web3 的世界
--------------------------

Matters.News 致力于探索 Web3 与创作者经济，我们提供加密钱包注册与登入的功能。绑定钱包后，也可以使用支付与提现等功能。

*   [Matters 加密钱包指南](${GUIDE_LINKS.connectWallet.zh_hans})

Matters.News 的经济系统支援法币（港币）及 USDT、LikeCoin 等虚拟货币，欢迎你使用加密货币支持优质作者，也可以将获得的报酬提领出来。

*   [Matters 支付与提现指南](${GUIDE_LINKS.payment.zh_hans})

如果你想用手机进行登入、绑定钱包及进行 USDT 支付，请参考我们的手机版专属指南，可以为你解决绝大部分的疑惑。

*   [Matters 钱包与支付指南（手机版）](${GUIDE_LINKS.mobilePayment.zh_hant})

好文章不遗漏，我们也支援 RSS 、JSON 阅读器或 IPNS 兼容的 Planet 阅读器来订阅作者。

*   [Matters 内容订阅使用指南](${GUIDE_LINKS.RSS.zh_hans})
`,
  zh_hant: `
歡迎來到 Matters.News 馬特市！

給寫作者與讀者
-------

如果你初來乍到，還在熟悉網站的基本功能，以下有兩份超詳盡的基礎功能指南，你可以在這兩份指南中，瞭解到如何使用編輯器發文、什麼是 IPFS、如何管理自己的創作收入、如何加入更多寫作社群等。

*   [Matters 讀者工具箱 | 新手必看](${GUIDE_LINKS.readerToolbox.zh_hant})
*   [Matters 作者工具箱 | 新手必看](${GUIDE_LINKS.authorToolbox.zh_hant})

Matters 目前尚未推出 App，如果你想要在手機上使用 Matters.News，非常推薦你使用 PWA，功能跟 App 幾乎完全一樣。

*   [Matters 應用下載（PWA）指南](${GUIDE_LINKS.PWA.zh_hant})

在 Matters.News 探索 Web3 的世界
--------------------------

Matters.News 致力於探索 Web3 與創作者經濟，我們提供加密錢包註冊與登入的功能。綁定錢包後，也可以使用支付與提現等功能。

*   [Matters 加密錢包指南](${GUIDE_LINKS.connectWallet.zh_hant})

Matters.News 的經濟系統支援法幣（港幣）及 USDT、LikeCoin 等虛擬貨幣，歡迎你使用加密貨幣支持優質作者，也可以將獲得的報酬提領出來。

*   [Matters 支付與提現指南](${GUIDE_LINKS.payment.zh_hant})

如果你想用手機進行登入、綁定錢包及進行 USDT 支付，請參考我們的手機版專屬指南，可以為你解決絕大部分的疑惑。

*   [Matters 錢包與支付指南（手機版）](${GUIDE_LINKS.mobilePayment.zh_hant})

好文章不遺漏，我們也支援 RSS 、JSON 閱讀器或 IPNS 兼容的 Planet 閱讀器來訂閱作者。

*   [Matters 內容訂閱使用指南](${GUIDE_LINKS.RSS.zh_hant})
`,
  en: `Welcome to Matters!

For Creators and Readers
----------------------------------------------   

If you have just landed in Matterverse, here are two must-read features guidance to help you sail. How to use Matters.News' editor? What is IPFS? How to check your income and balance? How to discover more writing communities and participate in this self-regulated community?

*   [Toolkit for Matters Readers](${GUIDE_LINKS.readerToolbox.en})
*   [Toolkit for Matters Creators](${GUIDE_LINKS.authorToolbox.en})

Currently, Matters.News is not yet available as an application, so if you want to use Matters on your cell phone, we highly recommend using PWA, which is almost identical to an app.

*   [Install Matters PWA Step by Step](${GUIDE_LINKS.PWA.en})

Explore Web3 with us in Matters.News
------------------------------------

Matters.News is dedicated to exploring Web3 and the creator economy ecosystem. We encourage wallet registration and login for on-chain payment and withdrawal functions.

*   [Using Crypto Wallet on Matters.News](${GUIDE_LINKS.connectWallet.en})

Currently, Matters.News support donation with fiat currency (HKD), crypto currencies USDT and LikeCoin. You can support the creators and collect your reward with above methods.

*   [How to Withdraw and Process Payment on Matters.News](${GUIDE_LINKS.payment.en})

If you want to log in, bind wallets, or process USDT payments on phone, please refer to our guide for cell phones, which will answer most of your questions.

*   [Mobile Guide for Crypto Wallet and Payment](${GUIDE_LINKS.mobilePayment.en})

Matters.News is a writing community based on decentralized technologies with open-sourced codebase. We encourage you to subscribe to your favorite creators with RSS, JSON reader or IPNS compatible Planet reader.

*   [Features Guidance for Content Feed Subscription](${GUIDE_LINKS.RSS.en})`
};
export default content_md;