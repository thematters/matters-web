import { Button } from '~/components/Button'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import { redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?url'

import styles from './styles.css'

const SignUpComplete = () => (
  <div className="l-col-4 l-col-sm-6 l-col-md-6 l-col-lg-8 complete">
    <img src={ICON_AVATAR_GREEN} />

    <div className="content">
      <Title is="h3" type="modal-headline">
        <Translate zh_hant="歡迎加入 Matters！" zh_hans="欢迎加入 Matters！" />
      </Title>

      <p>
        <Translate
          zh_hant="恭喜！註冊完成，你可以瀏覽社區的所有內容了。"
          zh_hans="恭喜！註冊完成，你可以瀏覽社區的所有內容了。"
        />
      </p>
      <br />
      <p>
        <Translate
          zh_hant="目前 Matters 是一個邀請制社區，你的賬號需要激活才能擁有創作資格，你可以向你認識的 Matters 老用戶索取激活資格。"
          zh_hans="目前 Matters 是一个邀请制社区，你的账号需要激活才能拥有创作资格，你可以向你认识的 Matters 老用户索取激活资格。"
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
