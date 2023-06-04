import { Translate } from '~/components'

import styles from './styles.module.css'

const Timeline = () => {
  return (
    <section className={styles.timeline}>
      <div className="l-container">
        <div className="l-row">
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
          </ul>

          <ul>
            <li>
              <time>Jan, 2022</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="支持以太坊錢包登入"
                  zh_hans="支持以太坊钱包登入"
                  en="Support ETH Wallet Log In"
                />
              </p>
            </li>

            <li>
              <time>Jul, 2022</time>
              <p className={styles.event}>
                <Translate
                  zh_hant="開放內容註冊 ISCN"
                  zh_hans="开放内容注册 ISCN"
                  en="Matters on ISCN registry, ISCN Integration for all content"
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
                  zh_hant="去中心化內容訂閱功能 IPNS 上線"
                  zh_hans="去中心化內容订阅功能 IPNS 上线"
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
