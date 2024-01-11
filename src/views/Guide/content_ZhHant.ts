const zh_hant = `
歡迎來到 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 馬特市！

## 給寫作者與讀者

如果你初來乍到，還在熟悉網站的基本功能，以下有兩份超詳盡的基礎功能指南，你可以在這兩份指南中，瞭解到如何使用編輯器發文、什麼是 IPFS、如何管理自己的創作收入、如何加入更多寫作社群等。

*   [Matters 讀者工具箱 | 新手必看](https://matters.town/@hi176/387122)
*   [Matters 作者工具箱 | 新手必看](https://matters.town/@hi176/387126)

Matters 目前尚未推出 App，如果你想要在手機上使用 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}，非常推薦你使用 PWA，功能跟 App 幾乎完全一樣。

*   [Matters 應用下載（PWA）指南](https://matters.town/@hi176/387115)

## 在 ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 探索 Web3 的世界

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 致力於探索 Web3 與創作者經濟，我們提供加密錢包註冊與登入的功能。綁定錢包後，也可以使用支付與提現等功能。

*   [Matters 加密錢包指南](https://matters.town/@hi176/387112)

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} 的經濟系統支援法幣（港幣）及 USDT、LikeCoin 等虛擬貨幣，歡迎你使用加密貨幣支持優質作者，也可以將獲得的報酬提領出來。

*   [Matters 支付與提現指南](https://matters.town/@hi176/387119)

如果你想用手機進行登入、綁定錢包及進行 USDT-Polygon 支付，請參考我們的手機版專屬指南，可以為你解決絕大部分的疑惑。

*   [Matters 錢包與支付指南（手機版）](https://matters.town/@hi176/387120)

好文章不遺漏，我們也支援 RSS 、JSON 閱讀器或 IPNS 兼容的 Planet 閱讀器來訂閱作者。

*   [Matters 內容訂閱使用指南](https://matters.town/@hi176/387116)

## 如何從 Matters 帳號綁定或解綁你的社交帳號？

Matters 用戶可以透過社交帳號註冊，或者在註冊完成後綁定社交帳號，目前支援 Google、X（前稱 Twitter）、及 Facebook。當然，綁定之後也可以解除綁定。

以 Facebook 為例，綁定步驟：

從「我的」進入「設定」，找到 Facebook 選項，按下綁定即可

![](/static/images/unlink-facebook-1.png)

解除綁定方式：按下帳號旁邊的「X」按鈕即可

![](/static/images/unlink-facebook-2.png)

此外，你也可以進入臉書的設定頁 [https://www.facebook.com/settings/](https://www.facebook.com/settings/)，從「應用程式與網站」找到 Matters 並選擇「移除」即可。

![](/static/images/unlink-facebook-3.png)

請注意，如果你一開始使用社交帳號註冊，註冊之後想解除綁定，為了帳號不遺失，你需要先採取其他綁定措施（例如郵箱、以太坊錢包地址或其他社交帳號），就可以解除當前的綁定。

`
export default zh_hant
