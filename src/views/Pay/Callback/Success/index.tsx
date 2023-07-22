import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'
import { PATHS, PAYMENT_PROVIDER } from '~/common/enums'
import { Layout, Translate, useRoute } from '~/components'

import { Box } from '../../Box'
import styles from '../styles.module.css'

const PayCallbackSuccess = () => {
  const { getQuery, router } = useRoute()
  const provider = getQuery('provider')
  const title: { [key: string]: any } = {
    likecoin: <Translate id="donation" />,
  }
  const avatar: { [key: string]: any } = {
    likecoin: ICON_LIKECOIN,
  }

  if (!provider || PAYMENT_PROVIDER.indexOf(provider) < 0) {
    router.push(PATHS.HOME)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="donation" />} />

      <Layout.Main.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className={styles.content}>
            <h2>
              <Translate
                zh_hant="支付成功！"
                zh_hans="支付成功！"
                en="Payment Successful!"
              />
            </h2>

            <p>
              <Translate id="callbackClose" />
            </p>
          </section>
        </Box>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default PayCallbackSuccess
