import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Title } from '~/components/Title'

import { redirectToTarget } from '~/common/utils'
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
            zh_hant="恭喜！註冊完成，你可以瀏覽社區的所有內容了。"
            zh_hans="恭喜！注册完成，你可以浏览社区的所有内容了。"
          />
        </p>
        <br />
        <p>
          <Translate
            zh_hant="我们为你的 Matters 账号生成了 Liker ID，你可以在 "
            zh_hans="我们为你的 Matters 账号生成了 Liker ID，你可以在 "
          />
          <a className="u-link-green" href="https://like.co" target="_blank">
            like.co
          </a>
          <Translate zh_hant=" 管理。" zh_hans=" 管理。" />
        </p>
        <br />
        <p>
          <Translate
            zh_hant="👉 試試看， 添加 Matters 到移動設備主屏幕，浏览更便捷喔。"
            zh_hans="👉 试试看， 添加 Matters 到移动设备主屏幕，浏览更便捷喔。"
          />
        </p>
      </div>
    </Modal.Content>

    <div className="buttons">
      <Modal.FooterButton
        width="full"
        onClick={() =>
          redirectToTarget({
            fallback: purpose === 'page' ? 'homepage' : 'current'
          })
        }
      >
        <Translate zh_hant="進入社區" zh_hans="进入社区" />
      </Modal.FooterButton>
    </div>

    <style jsx>{styles}</style>
  </div>
)

export default SignUpComplete
