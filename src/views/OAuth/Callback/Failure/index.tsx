import { useRouter } from 'next/router'

import { Layout, Translate } from '~/components'

import { OAUTH_PROVIDER, PATHS } from '~/common/enums'
import { getQuery, routerPush } from '~/common/utils'
import ICON_LIKECOIN from '~/static/icons/likecoin.svg'

import { Box } from '../../Box'
import styles from '../styles.css'

const OAUTH_CALLBACK_ERROR_CODE = {
  userNotFound: 1,
  likerNotFound: 2,
  likerExists: 3,
}

const ERROR_TEXT = {
  [OAUTH_CALLBACK_ERROR_CODE.userNotFound]: {
    zh_hant: '用戶不存在，請回到 Matters 再次嘗試',
    zh_hans: '用户不存在，请回到 Matters 再次尝试',
  },
  [OAUTH_CALLBACK_ERROR_CODE.likerNotFound]: {
    zh_hant: 'Liker ID 不存在，請回到 Matters 再次嘗試',
    zh_hans: 'Liker ID 不存在，请回到 Matters 再次尝试',
  },
  [OAUTH_CALLBACK_ERROR_CODE.likerExists]: {
    zh_hant: '此 Liker ID 已與 Matters ID 綁定',
    zh_hans: '此 Liker ID 已与 Matters ID 绑定',
  },
}

const OAuthCallbackFailure = () => {
  const router = useRouter()
  const code = getQuery({ router, key: 'code' })
  const provider = getQuery({ router, key: 'provider' })
  const title: { [key: string]: any } = {
    likecoin: <Translate zh_hant="設置 Liker ID" zh_hans="设置 Liker ID" />,
  }
  const avatar: { [key: string]: any } = {
    likecoin: ICON_LIKECOIN,
  }
  const errorDetail = ERROR_TEXT[code as any]

  if (!provider || OAUTH_PROVIDER.indexOf(provider) < 0) {
    routerPush(PATHS.HOME.href, PATHS.HOME.as)
    return null
  }

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="oauthAuthorize" />} />

      <Layout.Spacing>
        <Box avatar={avatar[provider]} title={title[provider]}>
          <section className="content">
            <h2>
              <Translate zh_hant="出錯了" zh_hans="出错了" />
            </h2>

            {errorDetail && (
              <p>
                <Translate {...errorDetail} />
              </p>
            )}

            <style jsx>{styles}</style>
          </section>
        </Box>
      </Layout.Spacing>
    </Layout.Main>
  )
}

export default OAuthCallbackFailure
