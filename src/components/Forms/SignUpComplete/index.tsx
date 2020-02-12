import { Dialog, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg'

import styles from './styles.css'

export const SignUpComplete = ({
  purpose
}: {
  purpose?: 'dialog' | 'page'
}) => (
  <div className="complete">
    <Dialog.Content>
      <img src={ICON_AVATAR_GREEN} />

      <div className="content">
        <Title is="h3" type="dialog-headline">
          <Translate
            zh_hant="歡迎加入 Matters！"
            zh_hans="欢迎加入 Matters！"
          />
        </Title>

        <p>
          <Translate
            zh_hant="你已完成註冊，現在可以在 Matters 發佈作品並讚賞他人啦。"
            zh_hans="你已完成注册，现在可以在 Matters 发布作品并赞赏他人啦。"
          />
        </p>
        <br />

        <p>
          <Translate
            zh_hant="只要你收穫的讚賞數與閱讀的文章數累積達到一定標準，就能啟動評論功能，參與精彩討論。"
            zh_hans="只要你获得的赞赏数与阅读的文章数达到一定标准，就能启动评论功能，参与精彩讨论。"
          />
        </p>
        <br />

        <p>
          <Translate
            zh_hant="你的專屬 Liker ID 已就位，登入 "
            zh_hans="你的专属 Liker ID 已就位，登录 "
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
    </Dialog.Content>

    <Dialog.Footer>
      <Dialog.Button
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_ENTER_AFTER_SIGNUP)
          redirectToTarget({
            fallback: purpose === 'page' ? 'homepage' : 'current'
          })
        }}
      >
        <Translate zh_hant="進入社區" zh_hans="进入社区" />
      </Dialog.Button>
    </Dialog.Footer>

    <style jsx>{styles}</style>
  </div>
)
