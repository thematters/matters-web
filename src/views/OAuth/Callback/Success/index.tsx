import ICON_LIKECOIN from '@/public/static/icons/likecoin.svg'
import ICON_STRIPE from '@/public/static/icons/stripe.svg'
import { OAUTH_PROVIDER, PATHS } from '~/common/enums'
import { Layout, Translate, useRoute } from '~/components'

import { Box } from '../../Box'
import styles from '../styles.module.css'

const OAuthCallbackSuccess = () => {
  const { getQuery, router } = useRoute()
  const provider = getQuery('provider')
  const title: { [key: string]: any } = {
    likecoin: (
      <Translate
        zh_hant="設置 Liker ID"
        zh_hans="设置 Liker ID"
        en="Setup Liker ID"
      />
    ),
  }
  const avatar: { [key: string]: any } = {
    likecoin: ICON_LIKECOIN,
    'stripe-connect': ICON_STRIPE,
  }

  if (!provider || OAUTH_PROVIDER.indexOf(provider) < 0) {
    router.push(PATHS.HOME)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="oauthAuthorize" />} />

      <Layout.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className={styles['content']}>
            <h2>
              <Translate
                zh_hant="綁定成功！"
                zh_hans="綁定成功！"
                en="Linking success!"
              />
            </h2>

            <p>
              <Translate id="callbackClose" />
            </p>
          </section>
        </Box>
      </Layout.Spacing>
    </Layout.Main>
  )
}

export default OAuthCallbackSuccess
