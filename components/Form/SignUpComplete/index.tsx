import { Button } from '~/components/Button'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import { EXTERNAL_LINKS } from '~/common/enums'
import { redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?url'

import styles from './styles.css'

const postUrl =
  'https://matters.news/@hi176/' +
  '新老用戶配對2-0-我們因此寫作-你也是-太好了-zdpuAvrpbhq9KJHBH1fbXdGxXYgQECiBbohU8ybBG3EpJkj4t'

const SignUpComplete = () => (
  <div className="complete">
    <img src={ICON_AVATAR_GREEN} />

    <div className="content">
      <Title is="h3" type="modal-headline">
        <Translate zh_hant="歡迎加入 Matters！" zh_hans="欢迎加入 Matters！" />
      </Title>

      <p>
        <Translate
          zh_hant="恭喜！註冊完成，你可以瀏覽並分享社區的所有內容了。"
          zh_hans="恭喜！注册完成，你可以浏览并分享社区的所有内容了。"
        />
      </p>
      <br />
      <p>
        <Translate
          zh_hant="目前，Matters 實行邀請制，新註冊的用戶需要透過老用戶邀請，才可以獲得創作者資格。"
          zh_hans="目前，Matters 实行邀请制，新注册的用户需要通过老用户邀请，才可以获得创作者资格。"
        />
      </p>
      <br />
      <p>
        <Translate zh_hant="你可以在 " zh_hans="你可以在 " />
        <a className="u-link-green" href={postUrl} target="_blank">
          <Translate zh_hant="Matters 站内" zh_hans="Matters 站內" />
        </a>
        <Translate
          zh_hant="尋找老用户，或關注 "
          zh_hans="寻找老用户，或关注 "
        />
        <a
          className="u-link-green"
          href={EXTERNAL_LINKS.FACEBOOK}
          target="_blank"
        >
          <Translate zh_hant="Matters 臉書" zh_hans="Matters 脸书" />
        </a>
        <Translate zh_hant="和" zh_hans="和" />
        <a className="u-link-green" href={EXTERNAL_LINKS.WEIBO} target="_blank">
          <Translate
            zh_hant="微博帳號 MattersLab"
            zh_hans="微博帳號 MattersLab"
          />
        </a>
        <Translate
          zh_hant="，即時了解開啟權限新玩法。"
          zh_hans="，即时了解开启权限新玩法。"
        />
      </p>
    </div>

    <div className="buttons">
      <Button
        type="button"
        bgColor="green"
        size="large"
        onClick={redirectToTarget}
      >
        <Translate zh_hant="進入社區" zh_hans="进入社区" />
      </Button>
    </div>
    <style jsx>{styles}</style>
  </div>
)

export default SignUpComplete
