import { GUIDE_LINKS } from '~/common/enums'

const zh_hans = `
欢迎来到 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 马特市！

## 给写作者与读者

如果你初来乍到，还在熟悉网站的基本功能，以下有两份超详尽的基础功能指南，你可以在这两份指南中，了解到如何使用编辑器发文、什么是 IPFS、如何管理自己的创作收入、如何加入更多写作社群等。

*   [Matters 读者工具箱 | 新手必看](${GUIDE_LINKS.readerToolbox.zh_hans})
*   [Matters 作者工具箱 | 新手必看](${GUIDE_LINKS.authorToolbox.zh_hans})

Matters 目前尚未推出 App，如果你想要在手机上使用 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}，非常推荐你使用 PWA，功能跟 App 几乎完全一样。

*   [Matters 应用下载（PWA）指南](${GUIDE_LINKS.PWA.zh_hans})

## 在 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 探索 Web3 的世界

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 致力于探索 Web3 与创作者经济，我们提供加密钱包注册与登入的功能。绑定钱包后，也可以使用支付与提现等功能。

*   [Matters 加密钱包指南 - 电脑版](${GUIDE_LINKS.wallet.zh_hans})

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 的经济系统支援法币（港币）及 USDT、LikeCoin 等虚拟货币，欢迎你使用加密货币支持优质作者，也可以将获得的报酬提领出来。

*   [Matters 支付与提现指南](${GUIDE_LINKS.payment.zh_hans})

如果你想用手机进行登入、绑定钱包及进行 USDT-Optimism 支付，请参考我们的手机版专属指南，可以为你解决绝大部分的疑惑。

*   [Matters 加密钱包指南 - 手机版](${GUIDE_LINKS.mobileWallet.zh_hans})`
export default zh_hans
