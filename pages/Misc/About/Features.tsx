import { Translate } from '~/components/Language'

import IMAGE_3_1 from '~/static/images/about-3-1.png'
import IMAGE_3_2 from '~/static/images/about-3-2.png'
import IMAGE_3_3 from '~/static/images/about-3-3.png'

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
          <a
            target="_blank"
            href="https://matters.news/@jidongjie1984/对谈精华整理-弦子-麦烧-不让任何看似庄严的存在摧毁自己-zdpuAviGvLYewPr3AYmGJ5jPTPjikEnYHWKBMmbxjwfMzAKmv"
          >
            【对谈精华整理】弦子、麦烧：不让任何看似庄严的存在摧毁自己
          </a>
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
          <a
            target="_blank"
            href="https://matters.news/@hi176/%E5%9C%A8%E7%BA%BF%E9%97%AE%E7%AD%94-%E9%93%81%E5%B9%95%E9%99%8D%E4%B8%B4-%E4%B8%AD%E7%BE%8E%E5%85%B3%E7%B3%BB%E5%B0%86%E8%B5%B0%E5%90%91%E4%BD%95%E6%96%B9-5-000%E5%AD%97%E9%87%8D%E7%A3%85%E5%AF%B9%E8%B0%88%E7%B2%BE%E5%8D%8E-%E6%8A%A2%E5%85%88%E9%87%8A%E5%87%BA-zdpuB3MQ6KdwVCXnGSvLRXYdQ9mk1yFh9eer9MLdrEgJxYLgt"
          >
            在線問答｜鐵幕降臨，中美關係將走向何方？（5,000
            字重磅對談精華，搶先釋出！）
          </a>
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_2} />
      </div>
    </section>

    <section className="feature-section l-row">
      <div className="intro l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-4">
        <h3>
          <Translate zh_hant="跨時代跨學科交流" zh_hans="跨时代跨学科交流" />
          <br />
          <Translate
            zh_hant="跨世代對人生選擇的誠懇對話"
            zh_hans="跨世代对人生选择的诚恳对话"
          />
        </h3>
        <p>
          <a
            target="_blank"
            href="https://matters.news/@wancat/%E5%9C%A8%E7%B7%9A%E5%95%8F%E7%AD%94-15%E6%AD%B2%E7%9A%84%E7%94%9F%E6%B6%AF%E9%81%B8%E6%93%87-%E6%88%91%E7%82%BA%E4%BD%95%E6%8B%92%E8%AE%80%E9%AB%98%E4%B8%AD-zdpuAydyYM9LWpBNsdx5VqnH6M5LYDsttLJDKMi1yXAchEV3y"
          >
            在線問答 | 15 歲的生涯選擇，我為何拒讀高中？
          </a>
        </p>
      </div>

      <div className="l-col-4 l-col-sm-4 l-col-md-4 l-col-lg-8">
        <img src={IMAGE_3_3} />
      </div>
    </section>

    <style jsx>{styles}</style>
  </section>
)

export default Features
