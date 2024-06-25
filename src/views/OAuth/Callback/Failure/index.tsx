import type { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'

import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'
import ICON_STRIPE from '@/public/static/icons/stripe.svg'
import { OAUTH_PROVIDER, PATHS } from '~/common/enums'
import type { TranslateArgs } from '~/common/utils'
import { Layout, Translate, useRoute } from '~/components'

import { Box } from '../../Box'
import styles from '../styles.module.css'

const OAUTH_CALLBACK_ERROR_CODE = {
  userNotFound: 1,
  // likecoin
  likerNotFound: 2,
  likerExists: 3,
  // stripe
  stripeAccountNotFound: 4,
  stripeAuthFailed: 5,
  stripeAccountExists: 6,
  // https://stripe.com/docs/api/account_links/create#create_account_link-refresh_url
  stripeAccountRefresh: 7,
}

const ERROR_TEXT: { [key: number]: TranslateArgs } = {
  [OAUTH_CALLBACK_ERROR_CODE.userNotFound]: {
    zh_hant: '用戶不存在，請回到 Matters 再次嘗試',
    zh_hans: '用户不存在，请回到 Matters 再次尝试',
    en: 'User does not exist, please retry on Matters',
  },
  [OAUTH_CALLBACK_ERROR_CODE.likerNotFound]: {
    zh_hant: 'Liker ID 不存在，請回到 Matters 再次嘗試',
    zh_hans: 'Liker ID 不存在，请回到 Matters 再次尝试',
    en: 'Liker ID does not exist, please retry on MAtters',
  },
  [OAUTH_CALLBACK_ERROR_CODE.likerExists]: {
    zh_hant: '此 Liker ID 已與 Matters ID 綁定',
    zh_hans: '此 Liker ID 已与 Matters ID 绑定',
    en: 'This Liker ID has already linked with Matters ID',
  },
  [OAUTH_CALLBACK_ERROR_CODE.stripeAccountNotFound]: {
    zh_hant: 'Stripe 帳戶不存在',
    zh_hans: 'Stripe 帐户不存在',
    en: 'Stripe account does not exist',
  },
  [OAUTH_CALLBACK_ERROR_CODE.stripeAuthFailed]: {
    zh_hant: 'Stripe 帳戶創建失敗',
    zh_hans: 'Stripe 帐户创建失败',
    en: 'Creating Stripe account failed',
  },
  [OAUTH_CALLBACK_ERROR_CODE.stripeAccountExists]: {
    zh_hant: '你已創建 Stripe 帳戶',
    zh_hans: '你已创建 Stripe 帐户',
    en: 'You have created Stripe account',
  },
  [OAUTH_CALLBACK_ERROR_CODE.stripeAccountRefresh]: {
    zh_hant: 'Stripe 帳戶創建失敗，請回到原頁面重新操作',
    zh_hans: 'Stripe 帐户创建失败，请回到原页面重新操作',
    en: 'Failed to create Stripe Account, please return to your previous page and retry',
  },
}

const OAuthCallbackFailure = () => {
  const { getQuery, router } = useRoute()
  const code = Number(getQuery('code'))
  const provider = getQuery('provider')
  const title: { [key: string]: ReactNode } = {
    likecoin: (
      <Translate
        zh_hant="設置 Liker ID"
        zh_hans="设置 Liker ID"
        en="Setup Liker ID"
      />
    ),
  }
  const avatar: { [key: string]: string } = {
    likecoin: ICON_LIKECOIN,
    'stripe-connect': ICON_STRIPE,
  }
  const errorDetail = code in ERROR_TEXT ? ERROR_TEXT[code] : null

  if (!provider || OAUTH_PROVIDER.indexOf(provider) < 0) {
    router.push(PATHS.HOME)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="OAuth authorize" id="Mgl1bT" />
          </Layout.Header.Title>
        }
      />

      <Layout.Main.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className={styles.content}>
            <h2>
              <Translate
                zh_hant="出錯了"
                zh_hans="出错了"
                en="Sorry, something went wrong"
              />
            </h2>

            {errorDetail && (
              <p>
                <Translate {...errorDetail} />
              </p>
            )}
          </section>
        </Box>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default OAuthCallbackFailure
