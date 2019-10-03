import Router, { withRouter, WithRouterProps } from 'next/router'

import { Modal, Translate } from '~/components'
import OAuth from '~/components/OAuth'

import { OAUTH_PROVIDER, PATHS, TEXT } from '~/common/enums'
import { getQuery } from '~/common/utils'
import ICON_LIKECOIN from '~/static/icons/oauth/likecoin.svg?url'

import styles from './styles.css'

// const OAUTH_CALLBACK_ERROR_CODE = {
//   userNotFound: 1,
//   likerNotFound: 2
// }

const OAuthCallbackFailure: React.FC<WithRouterProps> = ({ router }) => {
  const code = getQuery({ router, key: 'code' })
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
            <Translate zh_hant="出錯了" zh_hans="出错了" />
          </h2>

          <p>
            <Translate
              zh_hant="請回到 Matters 再次嘗試"
              zh_hans="请回到 Matters 再次尝试"
            />
          </p>

          {code && (
            <p>
              <Translate
                zh_hant={`（錯誤代碼：${code}）`}
                zh_hans={`（错误代码：${code}）`}
              />
            </p>
          )}
        </section>

        <footer>
          <Modal.FooterButton is="link" {...PATHS.HOME} width="full">
            <Translate
              zh_hant={TEXT.zh_hant.close}
              zh_hans={TEXT.zh_hans.close}
            />
          </Modal.FooterButton>
        </footer>
      </OAuth.Box>
      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(OAuthCallbackFailure)
