import { Button } from '~/components/Button'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import { redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?url'

import styles from './styles.css'

const SignUpComplete = () => (
  <div className="complete">
    <img src={ICON_AVATAR_GREEN} />

    <div className="content">
      <Title is="h3" type="modal-headline">
        <Translate zh_hant="歡迎加入 Matters！" zh_hans="欢迎加入 Matters！" />
      </Title>

      <p className="sub-title">
        <Translate
          zh_hant="恭喜！你的註冊已完成。"
          zh_hans="恭喜！你的注册已完成。"
        />
      </p>
      <br />
      <p>
        <Translate
          zh_hant="現在你可以閱讀、評論和分享 Matters 所有內容，也可以直接開始創作。在成功發佈第一篇作品後，你將獲得 10 MAT 獎勵。"
          zh_hans="现在你可以阅读、评论和分享Matters所有内容，你也可以直接开始创作。在成功发布第一篇作品后，你将获得 10 MAT 奖励。"
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
        <Translate zh_hant="探索社區" zh_hans="探索社区" />
      </Button>
    </div>
    <style jsx>{styles}</style>
  </div>
)

export default SignUpComplete
