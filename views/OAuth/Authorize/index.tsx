import getConfig from 'next/config'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Modal, Translate } from '~/components'
import OAuth from '~/components/OAuth'
import Throw404 from '~/components/Throw404'

import { PATHS, TEXT } from '~/common/enums'
import { objectToGetParams } from '~/common/utils'
import ICON_LIKECOIN from '~/static/icons/oauth/likecoin.svg?url'

import styles from './styles.css'

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()
const OAUTH_AUTHORIZE_ENDPOINT = `${OAUTH_URL}/authorize`

const OAuthAuthorize: React.FC<WithRouterProps> = ({ router }) => {
  const qs = (router ? router.query : {}) as { [key: string]: any }
  const actionUrl = `${OAUTH_AUTHORIZE_ENDPOINT}${objectToGetParams(qs)}`

  if (!qs.client_id) {
    return <Throw404 />
  }

  return (
    <main className="l-row">
      <OAuth.Box
        avatar={ICON_LIKECOIN}
        title={
          <>
            <a className="u-link-green" href="https://like.co" target="_blank">
              LikeCoin
            </a>
            <Translate
              zh_hant=" 正在申請訪問你的 Matters 賬號數據："
              zh_hans=" 正在申请访问你的 Matters 账号数据："
            />
          </>
        }
        titleAlign="left"
      >
        <form action={actionUrl} method="post">
          <input type="hidden" name="client_id" value={qs.client_id} />
          {qs.state && <input type="hidden" name="state" value={qs.state} />}
          {qs.scope && <input type="hidden" name="scope" value={qs.scope} />}
          {qs.redirect_uri && (
            <input type="hidden" name="redirect_uri" value={qs.redirect_uri} />
          )}
          <input type="hidden" name="response_type" value="code" />

          <section className="content">
            <ul>
              <li>读取你的个人资料</li>
              <li>读取你的头像</li>
              <li>读取你发布的内容</li>
            </ul>

            <hr />

            <p className="switch-account">
              <Translate zh_hant="不是你？" zh_hans="不是你？" />
              <Link {...PATHS.AUTH_LOGIN}>
                <a className="u-link-green">
                  <Translate zh_hant="切換賬戶" zh_hans="切换账户" />
                </a>
              </Link>
            </p>
          </section>

          <footer>
            <Modal.FooterButton bgColor="white" onClick={() => alert('TODO')}>
              <Translate
                zh_hant={TEXT.zh_hant.refuse}
                zh_hans={TEXT.zh_hans.refuse}
              />
            </Modal.FooterButton>
            <Modal.FooterButton htmlType="submit">
              <Translate
                zh_hant={TEXT.zh_hant.agree}
                zh_hans={TEXT.zh_hans.agree}
              />
            </Modal.FooterButton>
          </footer>
        </form>
      </OAuth.Box>
      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(OAuthAuthorize)
