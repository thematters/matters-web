import { Layout, Translate, useRoute } from '~/components'

import { PATHS, PAYMENT_PROVIDER } from '~/common/enums'

import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'

import { Box } from '../../Box'
import styles from '../styles.css'

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

      <Layout.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className="content">
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

          <style jsx>{styles}</style>
        </Box>
      </Layout.Spacing>
    </Layout.Main>
  )
}

export default PayCallbackSuccess
