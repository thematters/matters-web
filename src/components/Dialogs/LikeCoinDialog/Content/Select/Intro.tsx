import { Translate } from '~/components'

import styles from './styles.module.css'

const Intro = () => (
  <section className={styles.intro}>
    <h4>
      <Translate
        zh_hant="什麼是 Liker ID？"
        zh_hans="什么是 Liker ID？"
        en="What is Liker ID?"
      />
    </h4>

    <p>
      <Translate
        zh_hant="讚賞公民是一場化讚為賞，回饋創作的運動，目標是做到讀者按讚，作者獲賞。Liker ID 是你的讚賞公民帳戶，讀者須登入 Liker ID 按讚，才可為作者帶來收入；作者也須擁有 Liker ID 才能獲取奬賞。注意：Matters ID 跟 Liker ID 是不同、獨立的 ID。了解更多 "
        zh_hans="赞赏公民是一场化赞为赏，回馈创作的运动，目标是做到读者按赞，作者获赏。Liker ID 是你的赞赏公民帐户，读者须登入 Liker ID 按赞，才可为作者带来收入；作者也须拥有 Liker ID 才能获取奖赏。注意：Matters ID 跟 Liker ID 是不同、独立的 ID。了解更多 "
        en="Civic Liker is a movement to reward good content and encourage openness. Like = reward. Liker ID is your account to become  a civic liker, you have to log into Liker ID in order to turn your “Like” to LikeCoin reward to the creators. Creators also need to register for a Liker ID to get the reward. Note: Matters ID and Liker ID are different and independent IDs. Learn more "
      />
      <a
        className="u-link-green"
        href="https://docs.like.co/v/zh/user-guide/creator/matters"
        target="_blank"
        rel="noreferrer"
      >
        help.like.co
      </a>
    </p>
  </section>
)

export default Intro
