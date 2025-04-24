import { GUIDE_LINKS } from '~/common/enums'

const en = `Welcome to Matters!

## For Creators and Readers

If you have just landed in Matterverse, here are two must-read features for guidance to help you sail. How to use ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} editor? What is IPFS? How to check your income and balance? How to discover more writing communities and participate in this self-regulated community?

*   [Toolkit for Matters Readers](${GUIDE_LINKS.readerToolbox.en})
*   [Toolkit for Matters Creators](${GUIDE_LINKS.authorToolbox.en})

Currently, ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} is not yet available as an app, so if you want to use Matters on your cell phone, we highly recommend using PWA, which is almost identical to an app.

*   [Install Matters PWA Step by Step](${GUIDE_LINKS.PWA.en})

## Explore Web3 with us in ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}

${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} is dedicated to exploring Web3 and the creator economy ecosystem. We encourage wallet registration and login for on-chain payment and withdrawal functions.

*   [Using Crypto Wallet on ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}](${GUIDE_LINKS.wallet.en})

Currently, ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME} support donation with fiat currency (HKD), crypto currencies USDT and LikeCoin. You can support the creators and collect your reward with the above methods.

*   [How to Withdraw and Process Payment on ${process.env.NEXT_PUBLIC_SITE_BRAND_NAME}](${GUIDE_LINKS.payment.en})

If you want to log in, bind wallets, or process USDT-Optimism payments on phone, please refer to our guide for cell phones, which will answer most of your questions.

*   [Mobile Guide for Crypto Wallet and Payment](${GUIDE_LINKS.mobileWallet.en})`

export default en
