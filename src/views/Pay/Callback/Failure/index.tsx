import { useRouter } from 'next/router'

import { Layout, Translate } from '~/components'

import { PATHS, PAYMENT_PROVIDER } from '~/common/enums'
import { getQuery, routerPush } from '~/common/utils'

import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'

import { Box } from '../../Box'
import styles from '../styles.css'

const OAuthCallbackFailure = () => {
  const router = useRouter()
  const provider = getQuery({ router, key: 'provider' })
  const title: { [key: string]: any } = {
    likecoin: <Translate id="donation" />,
  }
  const avatar: { [key: string]: any } = {
    likecoin: ICON_LIKECOIN,
  }

  if (!provider || PAYMENT_PROVIDER.indexOf(provider) < 0) {
    routerPush(PATHS.HOME)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="donation" />} />

      <Layout.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className="content">
            <h2>
              <Translate zh_hant="支付失敗了！" zh_hans="支付失败了！" />
            </h2>

            <p>
              <Translate
                zh_hant="請回到原頁面重試"
                zh_hans="请回到原页面重试"
              />
            </p>
            <style jsx>{styles}</style>
          </section>
        </Box>
      </Layout.Spacing>
    </Layout.Main>
  )
}

export default OAuthCallbackFailure
