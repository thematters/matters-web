import { Translate } from '~/components'

import styles from './styles.css'

const Timeline = () => {
  return (
    <section className="timeline">
      <div className="l-container">
        <div className="l-row">
          <ul>
            <li>
              <time>May, 2018</time>
              <p className="event">
                <Translate
                  zh_hant="Prototype 上線"
                  zh_hans="Prototype 上线"
                  en="Prototype went live"
                />
              </p>
            </li>

            <li>
              <time>Oct, 2018</time>
              <p className="event">
                <Translate
                  zh_hant="所有文章上載到 IPFS"
                  zh_hans="所有文章上载到 IPFS"
                  en="Content storage with IPFS"
                />
              </p>
            </li>

            <li>
              <time>Mar, 2019</time>
              <p className="event">
                <Translate
                  zh_hant="網站 Beta 版上線"
                  zh_hans="网站 Beta 版上线"
                  en="Beta version website went live"
                />
              </p>
            </li>

            <li>
              <time>Jun, 2019</time>
              <p className="event">
                <Translate
                  zh_hant="Matters 開放註冊"
                  zh_hans="Matters 开放注册"
                  en="Public registration"
                />
              </p>
            </li>
          </ul>

          <ul>
            <li>
              <time>Oct, 2019</time>
              <p className="event">
                <Translate
                  zh_hant="接入 LikeCoin"
                  zh_hans="接入 LikeCoin"
                  en="Integration of LikeCoin"
                />
              </p>
            </li>

            <li>
              <time>Mar, 2020</time>
              <p className="event">
                <Translate
                  zh_hant="網站 2.0 上線"
                  zh_hans="网站 2.0 上线"
                  en="Website 2.0 went live"
                />
              </p>
            </li>

            <li>
              <time>May, 2020</time>
              <p className="event">
                <Translate
                  zh_hant="Matters Pay 上線"
                  zh_hans="Matters Pay 上线"
                  en="Matters Pay went live"
                />
              </p>
            </li>

            <li>
              <time>Mar, 2021</time>
              <p className="event">
                <Translate
                  zh_hant="圍爐功能上線"
                  zh_hans="围炉功能上线"
                  en="Matters Circle went live"
                />
              </p>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Timeline
