import type { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'

import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'
import { PATHS, PAYMENT_PROVIDER } from '~/common/enums'
import { Layout, Translate, useRoute } from '~/components'

import { Box } from '../../Box'
import styles from '../styles.module.css'

const OAuthCallbackFailure = () => {
  const { getQuery, router } = useRoute()
  const provider = getQuery('provider')
  const title: { [key: string]: ReactNode } = {
    likecoin: <FormattedMessage defaultMessage="Support Author" id="ezYuE2" />,
  }
  const avatar: { [key: string]: string } = {
    likecoin: ICON_LIKECOIN,
  }

  if (!provider || PAYMENT_PROVIDER.indexOf(provider) < 0) {
    router.push(PATHS.HOME)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Support Author" id="ezYuE2" />
          </Layout.Header.Title>
        }
      />

      <Layout.Main.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className={styles.content}>
            <h2>
              <Translate
                zh_hant="支付失敗了！"
                zh_hans="支付失败了！"
                en="Payment Failed!"
              />
            </h2>

            <p>
              <Translate
                zh_hant="請回到原頁面重試"
                zh_hans="请回到原页面重试"
                en="Please return to previous page and retry"
              />
            </p>
          </section>
        </Box>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default OAuthCallbackFailure
