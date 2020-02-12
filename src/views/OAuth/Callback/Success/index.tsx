import Router, { useRouter } from 'next/router'

import { OAuth, Translate } from '~/components'

import { OAUTH_PROVIDER, PATHS } from '~/common/enums'
import { getQuery } from '~/common/utils'
import ICON_LIKECOIN from '~/static/icons/likecoin.svg'

import styles from './styles.css'

const OAuthCallbackSuccess = () => {
  const router = useRouter()
  const provider = getQuery({ router, key: 'provider' })
  const title: { [key: string]: any } = {
    likecoin: <Translate zh_hant="設置 Liker ID" zh_hans="设置 Liker ID" />
  }
  const avatar: { [key: string]: any } = {
    likecoin: ICON_LIKECOIN
  }

  if (!provider || OAUTH_PROVIDER.indexOf(provider) < 0) {
    Router.push(PATHS.HOME.as)
    return null
  }

  return (
    <main className="l-row">
      <OAuth.Box avatar={avatar[provider]} title={title[provider]}>
        <section className="content">
          <h2>
            <Translate zh_hant="綁定成功！" zh_hans="綁定成功！" />
          </h2>

          <p>
            <Translate
              zh_hant="頁面即將關閉，請回到原頁面繼續操作"
              zh_hans="页面即将关闭，请回到原页面继续操作"
            />
          </p>
        </section>
      </OAuth.Box>

      <style jsx>{styles}</style>
    </main>
  )
}

export default OAuthCallbackSuccess
