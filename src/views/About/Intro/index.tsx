import IMAGE_ILLUSTRATION_1 from '@/public/static/images/about/intro-illustration-1.png'
import IMAGE_ILLUSTRATION_2 from '@/public/static/images/about/intro-illustration-2.png'
import IMAGE_ILLUSTRATION_3 from '@/public/static/images/about/intro-illustration-3.png'
import IMAGE_WAVE_1 from '@/public/static/images/about/wave-intro-1.svg'
import IMAGE_WAVE_2 from '@/public/static/images/about/wave-intro-2.svg'
import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const Intro = () => {
  const style = {
    '--about-wave-bg-1': `url(${IMAGE_WAVE_1})`,
    '--about-wave-bg-2': `url(${IMAGE_WAVE_2})`,
  } as React.CSSProperties

  return (
    <section className={styles.intro} style={style}>
      <ul>
        <li className={`l-container full ${styles.ecosystem}`}>
          <div className="l-row">
            <img src={IMAGE_ILLUSTRATION_1.src} alt="illustration 1" />

            <section className={styles.content}>
              <h3>
                <Translate
                  zh_hant="生態：自主、自由"
                  zh_hans="生态：自主、自由"
                  en="Ecosystem: Autonomous and Freedom"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters.Town 為 Matters Lab 生態系的第一個入口，致力搭建去中心化的內容存儲及分發系統，令創作不受制於任何平台，獨立性得到保障。同時，與 LikeCoin 基金會聯手，並支援多種法幣和加密貨幣打賞功能，作者得以將創造力兌現，永續創作。"
                  zh_hans="Matters.Town 为 Matters Lab 生态系的第一个入口，致力搭建去中心化的内容存储及分发系统，令创作不受制于任何平台，独立性得到保障。同时，与 LikeCoin 基金会联手，并支援多种法币和加密货币打赏功能，作者得以将创造力兑现，永续创作。"
                  en="Matters.Town, powered by Matters Lab, is a self-regulated community of 100,000 creators, also the first entry point built by Matters Lab. The decentralized content publication ecosystem is built on top of InterPlanetary File System (IPFS), a protocol and peer-to-peer network for storing and sharing data in a distributed file system that is hard for authorities to censor, allowing creators to be truly independent. We also partner with LikeCoin Foundation and support Matters Pay to reward creativity in the form of multiple currencies and cryptocurrencies."
                />
              </p>
              <section className={styles.buttons}>
                <Button
                  bgColor="green"
                  spacing={['tight', 'loose']}
                  htmlHref={EXTERNAL_LINKS.MATTERS_LAB}
                  htmlTarget="_blank"
                  rel="noopener"
                >
                  <TextIcon color="white" size="md" weight="md">
                    <Translate
                      zh_hant="探索 Matters Lab 生態系"
                      zh_hans="探索 Matters Lab 生态系"
                      en="Explore More at Matters Lab"
                    />
                  </TextIcon>
                </Button>
              </section>
            </section>
          </div>
        </li>
        <li className={`l-container full ${styles.community}`}>
          <div className="l-row">
            <img src={IMAGE_ILLUSTRATION_2.src} alt="illustration 2" />

            <section className={styles.content}>
              <h3>
                <Translate
                  zh_hant="社區：開放、共治"
                  zh_hans="社区：开放、共治"
                  en="Community: Openness and Participation"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters.Town 是立足去中心化生態建立的，一個代碼開源、創作者自治的寫作社區。創作者可以在這裡寫作、發表、閱讀、討論，同時，為社區建立「共同生活、共同決定」的規則，未來進一步應用到去中心生態的其它社區。"
                  zh_hans="Matters.Town 是立足去中心化生态建立的，一个代码开源、创作者自治的写作社区。创作者可以在这里写作、发表、阅读、讨论，同时，为社区建立「共同生活、共同决定」的规则，未来进一步应用到去中心生态的其它社区。"
                  en="Matters.Town is a writing community based on decentralized technologies, with open-sourced codebase and self-governance of creators. Creators can write, publish, read and discuss, as well as participate in building, co-living and deciding together for the Matters Community."
                />
              </p>
              <section className={styles.buttons}>
                <Button
                  bgActiveColor="greyLighter"
                  borderColor="white"
                  textColor="white"
                  textActiveColor="black"
                  borderWidth="sm"
                  spacing={['tight', 'loose']}
                  htmlHref={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
                  htmlTarget="_blank"
                  rel="noopener"
                >
                  <TextIcon size="md">
                    <Translate
                      zh_hant="GitHub 代碼倉庫"
                      zh_hans="GitHub 代码仓库"
                      en="Repository on GitHub"
                    />
                  </TextIcon>
                </Button>
              </section>
            </section>
          </div>
        </li>
        <li className={`l-container full feature ${styles.feature}`}>
          <div className="l-row">
            <section className={styles.content}>
              {/* <span className={styles.flag}>
                <Translate
                  zh_hant="\\\ 新功能上線 ///"
                  zh_hans="\\\ 新功能上线 ///"
                  en="\\\ New Feature ///"
                />
              </span> */}
              <h3>
                <Translate
                  zh_hant="支持：連結、共贏"
                  zh_hans="支持：连结、共赢"
                  en="Support: Connection and Grant"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters 鼓勵優質內容，圍爐功能幫助創作者建立、維繫更緊密的支持者社群，並基於訂閱機制，形成從交流到金流的正向反饋。同時，挹注百萬社區基金，設置在場獎學金，串接起華文非虛構寫作者、編輯與出版媒體，以書寫作為行動。"
                  zh_hans="Matters 鼓励优质内容，围炉功能帮助创作者建立、维系更紧密的支持者社群，并基于订阅机制，形成从交流到金流的正向反馈。同时，挹注百万社区基金，设置在场奖学金，串接起华文非虚构写作者、编辑与出版媒体，以书写作为行动。"
                  en="With subscription revenue model Circle that forms a closely connected backer community for creators, along with millions of community funds and Frontline Fellowship for Chinese Non-Fiction Writing, all niche content is rewarded and encouraged in Matters."
                />
              </p>
              <section className={styles.buttons}>
                <Button
                  bgColor="green"
                  textColor="white"
                  spacing={['tight', 'loose']}
                  htmlHref="https://www.frontlinefellowship.io/"
                  htmlTarget="_blank"
                  rel="noopener"
                >
                  <TextIcon color="white" size="md" weight="md">
                    <Translate
                      zh_hant="在場獎學金"
                      zh_hans="在场奖学金"
                      en="Frontline Fellowship"
                    />
                  </TextIcon>
                </Button>
              </section>
            </section>

            <img src={IMAGE_ILLUSTRATION_3.src} alt="illustration 3" />
          </div>
        </li>
      </ul>
    </section>
  )
}

export default Intro
