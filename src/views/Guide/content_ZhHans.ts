const zh_hans = `
欢迎来到 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 马特市！

## 给写作者与读者

如果你初来乍到，还在熟悉网站的基本功能，以下有两份超详尽的基础功能指南，你可以在这两份指南中，了解到如何使用编辑器发文、什么是 IPFS、如何管理自己的创作收入、如何加入更多写作社群等。

*   [Matters 读者工具箱 | 新手必看](https://matters.town/@hi176/387122?locale=zh-Hans)
*   [Matters 作者工具箱 | 新手必看](https://matters.town/@hi176/387126?locale=zh-Hans)

Matters 目前尚未推出 App，如果你想要在手机上使用 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}，非常推荐你使用 PWA，功能跟 App 几乎完全一样。

*   [Matters 应用下载（PWA）指南](https://matters.town/@hi176/387115?locale=zh-Hans)

## 在 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 探索 Web3 的世界

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 致力于探索 Web3 与创作者经济，我们提供加密钱包注册与登入的功能。绑定钱包后，也可以使用支付与提现等功能。

*   [Matters 加密钱包指南](https://matters.town/@hi176/387112?locale=zh-Hans)

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 的经济系统支援法币（港币）及 USDT、LikeCoin 等虚拟货币，欢迎你使用加密货币支持优质作者，也可以将获得的报酬提领出来。

*   [Matters 支付与提现指南](https://matters.town/@hi176/387119?locale=zh-Hans)

如果你想用手机进行登入、绑定钱包及进行 USDT-Polygon 支付，请参考我们的手机版专属指南，可以为你解决绝大部分的疑惑。

*   [Matters 钱包与支付指南（手机版）](https://matters.town/@hi176/387120)

好文章不遗漏，我们也支援 RSS 、JSON 阅读器或 IPNS 兼容的 Planet 阅读器来订阅作者。

*   [Matters 内容订阅使用指南](https://matters.town/@hi176/387116?locale=zh-Hans)

## 如何从 Matters 帐号绑定或解绑你的社交帐号？

Matters 用户可以透过社交帐号注册，或者在注册完成后绑定社交帐号，目前支援 Google、X（前称 Twitter）、及 Facebook。当然，绑定之后也可以解除绑定。

以 Facebook 为例，绑定步骤：

从「我的」进入「设定」，找到 Facebook 选项，按下绑定即可

![](/static/images/unlink-facebook-1.png)

解除绑定方式：按下帐号旁边的「X」按钮即可

![](/static/images/unlink-facebook-2.png)

此外，你也可以进入脸书的设定页 [https://www.facebook.com/settings/](https://www.facebook.com/settings/) ，从「应用程式与网站」找到 Matters 并选择「移除」即可。

![](/static/images/unlink-facebook-3.png)

请注意，如果你一开始使用社交帐号注册，注册之后想解除绑定，为了帐号不遗失，你需要先采取其他绑定措施（例如邮箱、以太坊钱包地址或其他社交帐号），就可以解除当前的绑定。
`
export default zh_hans
