import { Translate } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'

import styles from './styles.css'

const Growing = () => (
  <section className="growing">
    <div className="l-row">
      <div className="l-col-4 l-col-md-4 l-col-lg-6 ">
        <h2>
          <Translate zh_hant="Matters 成長日記" zh_hans="Matters 成长日记" />
        </h2>
        <p>
          <Translate
            zh_hant="Matters 上的用戶來自 35 個時區、226 個國家和地區，最積極的讀者來自台灣、香港和美國，最積極的寫作者來自美國、中國大陸和香港。"
            zh_hans="Matters 上的用户来自 35 个时区、226 个国家和地区，最积极的读者来自台湾、香港和美国，最积极的写作者来自美国、中国大陆和香港。"
          />
        </p>
        <p>
          <Translate
            zh_hant="這張圖表是 Matters 社區的成長日記："
            zh_hans="这张图表是 Matters 社区的成长日记："
          />
        </p>
      </div>

      <div className="l-col-4 l-col-md-4 l-col-lg-6 u-content">
        <p />
        <figure className="embed-data-dashbord">
          <div className="iframe-container">
            <iframe
              src="https://data.matters.news/public/dashboard/5181637e-288a-478e-aee2-64aefe95aa99"
              frameBorder="0"
              allowFullScreen={false}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </figure>
      </div>
    </div>

    <style jsx>{styles}</style>
    <style jsx>{contentStyles}</style>
  </section>
)

export default Growing
