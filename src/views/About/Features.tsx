import { Translate } from '~/components'

import IMAGE_3_1 from '@/public/static/images/about-3-1.jpg'
import IMAGE_3_2 from '@/public/static/images/about-3-2.jpg'
import IMAGE_3_3 from '@/public/static/images/about-3-3.jpg'

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
            zh_hant="參與者對社會進程的完整記錄"
            zh_hans="参与者对社会进程的完整记录"
          />
        </h3>
        <p>
          <a
            target="_blank"
            href="https://matters.news/@maishaoshao/%E5%BC%A6%E5%AD%90-%E9%BA%A6%E7%83%A7-me-too%E8%AE%A9%E6%88%91%E4%BB%AC%E7%9B%B8%E4%BF%A1-%E6%9F%94%E8%BD%AF%E5%8F%AF%E4%BB%A5%E6%94%B9%E5%8F%98%E4%B8%96%E7%95%8C-zdpuAy2E1vCLxj74FopkHN5QyQ3TX77tkxB3j59KLFKkuJxZs"
          >
            <Translate
              zh_hant="弦子、麥燒：MeToo 讓我們相信，柔軟可以改變世界"
              zh_hans="弦子、麦烧：MeToo 让我们相信，柔软可以改变世界"
            />
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
            zh_hant="38 篇作品，200 萬的閱讀量"
            zh_hans="38 篇作品，200 万的阅读量"
          />
        </h3>
        <p>
          <a
            target="_blank"
            href="https://matters.news/@leungkaichihk/香港第一課-簡介及目錄-zdpuB2J818r8yUSDeZ4vDARrnQ4ut3S2UYjALXHJ16jp25w4P"
          >
            <Translate
              zh_hant="《香港第一課》簡介及目錄"
              zh_hans="《香港第一课》简介及目录"
            />
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
          <Translate zh_hant="引入創作金流機制" zh_hans="引入创作金流机制" />
          <br />
          <Translate
            zh_hant="給創作者以更多回饋"
            zh_hans="给创作者以更多回馈"
          />
        </h3>
        <p>
          <a
            target="_blank"
            href="https://matters.news/@septentrium/%E6%88%91%E4%B9%B0%E4%BA%86%E4%B8%80%E7%AC%94-likecoin-%E6%88%90%E4%B8%BA%E4%BA%86-matters-%E6%89%80%E6%9C%89%E7%94%A8%E6%88%B7%E7%9A%84%E6%8A%95%E8%B5%84%E4%BA%BA-zdpuAmUucoEtJj19Wtf3Vee96dYydZZ6rSwWX7Eb3wvpHZ8Pu"
          >
            <Translate
              zh_hant="我買了一筆 LikeCoin，成為了 Matters 所有用戶投資人"
              zh_hans="我买了一笔 LikeCoin，成为了 Matters 所有用户投资人"
            />
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
