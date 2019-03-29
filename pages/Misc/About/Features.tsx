import { Translate } from '~/components/Language'

import IMAGE_3_1 from '~/static/images/about-3-1.jpg'

import styles from './styles.css'

const Features = () => (
  <section className="features">
    <section className="title l-row">
      <h2>
        <Translate zh_hant="沒有預設立場，" zh_hans="没有预设立场，" />
        <br />
        <Translate
          zh_hant="只有誠懇而深入的討論"
          zh_hans="只有诚恳而深入的讨论"
        />
      </h2>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          公共記憶永久儲存
          <br />
          當事人對社會運動的完整記錄
        </h3>
        <p>弦子、麥燒：MeToo 讓我們相信，柔軟可以改變世界</p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          公共議題的知識生產
          <br />2 小時內近 30 萬的閱讀人數
        </h3>
        <p>
          在線問答｜鐵幕降臨，中美關係將走向何方？（5,000
          字重磅對談精華，搶先釋出！）
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          跨时代跨学科交流
          <br />
          跨世代对人生选择的诚恳对话
        </h3>
        <p>在線問答 | 15 歲的生涯選擇，我為何拒讀高中？</p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <style jsx>{styles}</style>
  </section>
)

export default Features
