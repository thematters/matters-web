import { Button, Translate } from '~/components'

import IMAGE_ILLUSTRATION_1 from '@/public/static/images/about/intro-illustration-1.png'
import IMAGE_ILLUSTRATION_2 from '@/public/static/images/about/intro-illustration-2.png'
import IMAGE_ILLUSTRATION_3 from '@/public/static/images/about/intro-illustration-3.png'
import IMAGE_WAVE_1 from '@/public/static/images/about/wave-intro-1.svg'
import IMAGE_WAVE_2 from '@/public/static/images/about/wave-intro-2.svg'

import styles from './styles.css'

const Intro = () => {
  return (
    <section className="intro">
      <ul>
        <li className="l-container full ecosystem">
          <div className="l-row">
            <img src={IMAGE_ILLUSTRATION_1.src} />

            <section className="content">
              <h3>
                <Translate
                  zh_hant="生態：自主、自由"
                  zh_hans="生态：自主、自由"
                  en="Ecosystem: Autonomous and Freedom"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters 致力搭建基於 IPFS 的去中心化的內容存儲及分發系統，令創作不受制於任何平台，獨立性得到保障。同時，與 LikeCoin 基金會聯手，將 LikeCoin 這一以寫作者創造力為衡量的加密貨幣，以收入的形式回饋給作者。"
                  zh_hans="Matters 致力搭建基于 IPFS 的去中心化的内容存储及分发系统，令创作不受制于任何平台，独立性得到保障。同时，与 LikeCoin 基金会联手，将 LikeCoin 这一以写作者创造力为衡量的加密货币，以收入的形式回馈给作者。"
                  en="Matters is building a decentralized content publication ecosystem on top of IPFS, allowing creators to be truly independent from any platform. We also partner with LikeCoin fundation, to reward creativity in the form of cryptocurrency LikeCoin."
                />
              </p>
            </section>
          </div>
        </li>
        <li className="l-container full community">
          <div className="l-row">
            <img src={IMAGE_ILLUSTRATION_2.src} />

            <section className="content">
              <h3>
                <Translate
                  zh_hant="社區：開放、共治"
                  zh_hans="社区：开放、共治"
                  en="Community: Openness and Participation"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters 是立足去中心化生態建立的，一個代碼開源、創作者自治的寫作社區。創作者可以在這裡寫作、發表、閱讀、討論，同時，為社區建立「共同生活、共同決定」的規則，未來進一步應用到去中心生態的其它社區。"
                  zh_hans="Matters 是立足去中心化生态建立的，一个代码开源、创作者自治的写作社区。创作者可以在这里写作、发表、阅读、讨论，同时，为社区建立「共同生活、共同决定」的规则，未来进一步应用到去中心生态的其它社区。"
                  en="Matters is a writing community based on decentralized technologies, with open-sourced codebase and self-governance of creators. Creators can write, publish, read and discuss, as well as participate in designing how we create, live and decide together. This rules will be further applied to other aspects of the decentralized ecosystem."
                />
              </p>
              <section className="buttons">
                <Button
                  borderColor="white"
                  borderWidth="sm"
                  spacing={['xtight', 'loose']}
                  htmlHref="https://github.com/thematters/developer-resource"
                  htmlTarget="_blank"
                  rel="noopener"
                >
                  <Translate
                    zh_hant="GitHub 代碼倉庫"
                    zh_hans="GitHub 代码仓库"
                    en="Repository on GitHub"
                  />
                </Button>
              </section>
            </section>
          </div>
        </li>
        <li className="l-container full feature">
          <div className="l-row">
            <section className="content">
              <span className="flag">
                <Translate
                  zh_hant="\\\ 新功能上線 ///"
                  zh_hans="\\\ 新功能上线 ///"
                  en="\\\ New Feature ///"
                />
              </span>
              <h3>
                <Translate
                  zh_hant="圍爐：連結、交流"
                  zh_hans="围炉：连结、交流"
                  en="Circle: Connection and Communication"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="圍爐，立足 Matters 社區，幫助創作者建立、維繫更緊密的支持者社群，並基於訂閱機制，對創作者形成從交流到金流的正向反饋。"
                  zh_hans="围炉，立足 Matters 社区，帮助创作者建立、维系更紧密的支持者社群，并基于订阅机制，对创作者形成从交流到金流的正向反馈。"
                  en="Circle starts from Matters community, helps creators to build and maintain a intimate backer community, closes the loop of creation, communication and revenue by subscription model."
                />
              </p>
            </section>

            <img src={IMAGE_ILLUSTRATION_3.src} />
          </div>
        </li>
      </ul>

      <style jsx>{styles}</style>
      <style jsx>{`
        .ecosystem {
          background-image: url(${IMAGE_WAVE_1});
        }
        .feature {
          background-image: url(${IMAGE_WAVE_2});
        }
      `}</style>
    </section>
  )
}

export default Intro
