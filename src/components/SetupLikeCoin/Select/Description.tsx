import { Translate } from '~/components'

import styles from './styles.css'

const Description = () => (
  <section className="desc">
    <h4>
      <Translate zh_hant="什麼是 Liker ID？" zh_hans="什么是 Liker ID？" />
    </h4>

    <p>
      <Translate
        zh_hant="讚賞公民是一場化讚為賞，回饋創作的運動，目標是做到讀者按讚，作者獲賞。Liker ID 是你的讚賞公民帳號，讀者須登入 Liker ID 按讚，才可為作者帶來收入；作者也須擁有 Liker ID 才能獲取奬賞。了解更多 "
        zh_hans="赞赏公民是一场化赞为赏，回馈创作的运动，目标是做到读者按赞，作者获赏。Liker ID 是你的赞赏公民帐号，读者须登录 Liker ID 按赞，才可为作者带来收入；作者也须拥有 Liker ID 才能获取奖赏。了解更多 "
      />
      <a className="u-link-green" href="https://help.like.co" target="_blank">
        help.like.co
      </a>
    </p>

    <style jsx>{styles}</style>
  </section>
)

export default Description
