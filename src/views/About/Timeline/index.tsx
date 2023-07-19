import { Translate } from '~/components'

import layoutStyles from '../layout.module.css'
import styles from './styles.module.css'

const Timeline = () => {
  return (
    <section className={styles.timeline}>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <ul>
            <li>
              <time>May, 2018</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="基於 IPFS 去中心化社交媒體上線"
                  zh_hans="基于 IPFS 去中心化社交媒体上线"
                  en="Launched IPFS-based decentralized social media"
                />
              </p>
            </li>

            <li>
              <time>Jun, 2019</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="Matters 開放註冊"
                  zh_hans="Matters 开放注册"
                  en="Public Registration"
                />
              </p>
            </li>

            <li>
              <time>Oct, 2019</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="接入 LikeCoin 空投機制"
                  zh_hans="接入 LikeCoin 空投机制"
                  en="Integration of LikeCoin"
                />
              </p>
            </li>

            <li>
              <time>May, 2020</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="Matters Pay 上線"
                  zh_hans="Matters Pay 上线"
                  en="Matters Pay is now available"
                />
              </p>
            </li>

            <li>
              <time>Mar, 2021</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="圍爐功能上線"
                  zh_hans="围炉功能上线"
                  en="Matters Circle is now available"
                />
              </p>
            </li>
          </ul>

          <ul>
            <li>
              <time>Dec, 2021</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="上線 Traveloggers NFT"
                  zh_hans="上线 Traveloggers NFT"
                  en="Launch Traveloggers NFT"
                />
              </p>
            </li>

            <li>
              <time>Jan, 2022</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="支持以太坊錢包登入"
                  zh_hans="支持以太坊钱包登入"
                  en="Support Sign-In with Ethereum"
                />
              </p>
            </li>

            <li>
              <time>Oct, 2022</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="支持 USDT 等多種貨幣"
                  zh_hans="支持 USDT 等多种货币"
                  en="Support multiple currencies including USDT"
                />
              </p>
            </li>

            <li>
              <time>Oct, 2022</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="內容訂閱 IPNS 上線"
                  zh_hans="內容订阅 IPNS 上线"
                  en="Decentralized Content Subscription with IPNS"
                />
              </p>
            </li>

            <li>
              <time>Feb, 2023</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="全面接入 ENS 服務"
                  zh_hans="全面接入 ENS 服务"
                  en="Supports ENS EIP-1577"
                />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Timeline
