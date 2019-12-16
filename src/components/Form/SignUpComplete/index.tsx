import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Title } from '~/components/Title'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?url'

import styles from './styles.css'

const SignUpComplete = ({
  purpose,
  scrollLock
}: {
  purpose?: 'modal' | 'page'
  scrollLock?: boolean
}) => (
  <div className="complete">
    <Modal.Content scrollLock={scrollLock}>
      <img src={ICON_AVATAR_GREEN} />

      <div className="content">
        <Title is="h3" type="modal-headline">
          <Translate
            zh_hant="歡迎加入 Matters！"
            zh_hans="欢迎加入 Matters！"
          />
        </Title>

        <p>
          <Translate
            zh_hant="你已註冊完成，可以開始在 Matters 發佈作品了。"
            zh_hans="你已注册完成，可以开始在 Matters 发布作品了。"
          />
        </p>
        <br />

        <p>
          <Translate
            zh_hant="當你的作品累計獲得 30 個讚賞，你才可以激活讚賞權限為他人拍手，並能參與精彩討論。"
            zh_hans="当你的作品累计获得 30 个赞赏，你才可以激活赞赏权限为他人鼓掌，并能参与精彩讨论。"
          />
        </p>
        <br />

        <p>
          <Translate
            zh_hant="我們也為你準備好了 Liker ID，登入 "
            zh_hans="我们也为你准备好了 Liker ID，登陆 "
          />
          <a className="u-link-green" href="https://like.co" target="_blank">
            like.co
          </a>
          <Translate
            zh_hant=" 管理你的創作收益。"
            zh_hans=" 管理你的创作收益。"
          />
        </p>
        <br />

        <p>
          <Translate
            zh_hant="馬上開始你的創作吧！"
            zh_hans="马上开始你的创作吧！"
          />
        </p>
      </div>
    </Modal.Content>

    <div className="buttons">
      <Modal.FooterButton
        width="full"
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_ENTER_AFTER_SIGNUP)
          redirectToTarget({
            fallback: purpose === 'page' ? 'homepage' : 'current'
          })
        }}
      >
        <Translate zh_hant="進入社區" zh_hans="进入社区" />
      </Modal.FooterButton>
    </div>

    <style jsx>{styles}</style>
  </div>
)

export default SignUpComplete
