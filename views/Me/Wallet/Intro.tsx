import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import styles from './styles.css'

const Intro = () => {
  return (
    <section className="intro">
      <Title type="page" is="h2">
        <Translate zh_hant="說明" zh_hans="说明" />
      </Title>

      <p>
        <Translate
          zh_hant="MAT 是 Matters 的基本貨幣，可用來讚賞，你可通過發佈作品或領取站上活動紅包獲得。"
          zh_hans="MAT 是 Matters 的基本货币，可用来赞赏，你可通过发布作品或领取站上活动红包获得。"
        />
      </p>

      <p>
        <Translate
          zh_hant="若您對錢包有其他疑問，可通過郵件聯繫我們 "
          zh_hans="若您对钱包有其他疑问，可通过邮件联系我们 "
        />
        <br />
        <a href="mailto:ask@matters.news" className="u-link-green">
          ask@matters.news
        </a>
      </p>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Intro
