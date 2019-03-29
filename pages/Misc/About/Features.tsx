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
          <Translate zh_hant="公共記憶永久儲存" zh_hans="公共记忆永久储存" />
          <br />
          <Translate
            zh_hant="當事人對社會運動的完整記錄"
            zh_hans="当事人对社会运动的完整记录"
          />
        </h3>
        <p>
          <Translate
            zh_hant="弦子、麥燒：MeToo 讓我們相信，柔軟可以改變世界"
            zh_hans="弦子、麦烧：MeToo 让我们相信，柔软可以改变世界"
          />
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          <Translate
            zh_hant="公共議題的知識生產"
            zh_hans="公共议题的知识生产"
          />
          <br />
          <Translate
            zh_hant="2 小時內近 30 萬的閱讀人數"
            zh_hans="2 小时内近 30 万的阅读人数"
          />
        </h3>
        <p>
          <Translate
            zh_hant="在線問答｜鐵幕降臨，中美關係將走向何方？（5,000 字重磅對談精華，搶先釋出！）"
            zh_hans="在线问答｜铁幕降临，中美关系将走向何方？（5,000 字重磅对谈精华，抢先释出！）"
          />
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          <Translate zh_hant="跨时代跨学科交流" zh_hans="跨时代跨学科交流" />
          <br />
          <Translate
            zh_hant="跨世代对人生选择的诚恳对话"
            zh_hans="跨世代对人生选择的诚恳对话"
          />
        </h3>
        <p>
          <Translate
            zh_hant="在線問答 | 15 歲的生涯選擇，我為何拒讀高中？"
            zh_hans="在线问答|15 岁的生涯选择，我为何拒读高中？"
          />
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_1} />
      </div>
    </section>

    <style jsx>{styles}</style>
  </section>
)

export default Features
