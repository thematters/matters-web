import { VisuallyHidden } from '@reach/visually-hidden'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'

import IMAGE_ARROW_DOWN from '@/public/static/images/about/arrow-down.svg'
import { ReactComponent as IconButtonLeft } from '@/public/static/images/about/button-left.svg'
import { ReactComponent as IconButtonRight } from '@/public/static/images/about/button-right.svg'
import SLIDE_CURSOR from '@/public/static/images/about/cursor.svg'
import IMAGE_ILLUSTRATION_1 from '@/public/static/images/about/hero-illustration-1.png'
import IMAGE_ILLUSTRATION_2 from '@/public/static/images/about/hero-illustration-2.png'
import IMAGE_WAVE_1 from '@/public/static/images/about/wave-hero-1.svg'
import IMAGE_WAVE_2 from '@/public/static/images/about/wave-hero-2.svg'
import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconLogo,
  LanguageContext,
  Media,
  TextIcon,
  Translate,
  withIcon,
} from '~/components'

import styles from './styles.module.css'

const Hero = () => {
  const { lang } = useContext(LanguageContext)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: 'trimSnaps',
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <section className={styles['hero']}>
      <header className={styles['logo']}>
        <div className="l-container">
          <div className="l-row">
            <div className="l-col-full">
              <Link href={PATHS.HOME} legacyBehavior>
                <a>
                  <VisuallyHidden>
                    <span>{translate({ id: 'discover', lang })}</span>
                  </VisuallyHidden>
                  <IconLogo />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <section className={styles['slogan']}>
              <section>
                <h2>
                  <Translate
                    zh_hant="去中心化的"
                    zh_hans="去中心化的"
                    en="The Future of Web3 is&nbsp;"
                  />
                  <br />
                  <Translate
                    zh_hant="創作社群與內容生態"
                    zh_hans="创作社群与内容生态"
                    en="at Matters"
                  />
                </h2>

                <Button
                  size={[null, '2.25rem']}
                  spacing={[0, 'base']}
                  bgColor="green"
                  href={PATHS.HOME}
                >
                  <TextIcon color="white" weight="md">
                    <Translate
                      zh_hant="開始創作"
                      zh_hans="开始创作"
                      en="Start Creating"
                    />
                  </TextIcon>
                </Button>
              </section>

              <div className="ilusCity" />
            </section>
          </div>
        </div>
      </div>

      <section className={styles['reports']}>
        <section className={styles['container']}>
          <section className={styles['scrollButton scrollLeft']}>
            <Button onClick={scrollPrev} disabled={!prevBtnEnabled}>
              <Media at="sm">{withIcon(IconButtonLeft)({ size: 'md' })}</Media>
              <Media greaterThan="sm">
                {withIcon(IconButtonLeft)({ size: 'lg' })}
              </Media>
            </Button>
          </section>
          <section className={styles['emblaViewport']} ref={emblaRef}>
            <ul className={styles['emblaContainer']}>
              <li>
                <a
                  href="https://restofworld.org/2020/chinas-fugitive-writers-find-a-home-online/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>China’s fugitive writers find a home online</h3>
                  <cite>Rest of World</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.blog.google/around-the-globe/google-asia/gni-innovation-challenge-apac/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>18 Asia Pacific news organizations with big ideas</h3>
                  <cite>Google News Initiative</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://appworks.tw/taiwans-appworks-demo-day-19-puts-18-of-the-most-promising-greater-southeast-asian-ai-blockchain-founders-on-stage/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    Taiwan’s AppWorks Demo Day #19 Puts 18 of the Most Promising
                    Greater Southeast ...
                  </h3>
                  <cite>AppWorks</cite>
                </a>
              </li>
              <li>
                <a
                  href="http://www.sixthtone.com/news/1002403/how-blockchain-could-revolutionize-chinas-media"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>How Blockchain Could Revolutionize China’s Media</h3>
                  <cite>Sixth Tone</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.welt.de/wirtschaft/bilanz/plus182345256/Blockchain-in-China-Zentrale-Macht-dezentrale-Technik.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>Der Staat gegen Nerds</h3>
                  <cite>Bilanz</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.cjr.org/analysis/china-censorship.php"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    As China abolishes two-term limit, a siege on digital free
                    speech
                  </h3>
                  <cite>Columbia Journalism Review</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.protocol.com/nft-indepedent-chinese-language-media"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>Chinese-language indie media has its NFT moment</h3>
                  <cite>Protocol</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://forkast.news/voice-of-april-nfts-shanghai-amid-harsh-lockdown/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    ‘Voice of April’ NFTs highlight Shanghai’s struggles amid
                    harsh lockdown
                  </h3>
                  <cite>Forekast</cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.dw.com/zh/%E5%8C%BA%E5%9D%97%E9%93%BE%E8%AE%A9%E5%A5%BD%E6%96%B0%E9%97%BB%E6%9B%B4%E5%AE%89%E5%85%A8%E6%9B%B4%E5%80%BC%E9%92%B1/a-44329162?&zhongwen=simp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    <Translate
                      zh_hant="區塊鏈：讓好新聞更安全、更“值錢”？"
                      zh_hans="区块链：让好新闻更安全、更“值钱”？"
                      en={`Blockchain: Making Good News Safer and More "Valuable"?`}
                    />
                  </h3>
                  <cite>
                    <Translate
                      zh_hant="德國之聲"
                      zh_hans="德国之声"
                      en="Deutsche Welle"
                    />
                  </cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.bnext.com.tw/article/49272/blockchain-blog-content-"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    <Translate
                      zh_hant="區塊鏈內容平台觀察：挑戰與現有解法"
                      zh_hans="区块链内容平台观察：挑战与现有解法"
                      en="Blockchain Content Platform Watch: Challenges and Existing Solutions"
                    />
                  </h3>
                  <cite>
                    <Translate
                      zh_hant="數位時代"
                      zh_hans="数位时代"
                      en="Business Next"
                    />
                  </cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.openbook.org.tw/article/p-66088"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    <Translate
                      zh_hant="出版NFT移民．平台》用Web3對抗演算法，打造共同的廣場： 專訪Matters創辦人張潔平"
                      zh_hans="出版NFT移民．平台》用Web3对抗演算法，打造共同的广场： 专访Matters创办人张洁平"
                      en="Building a New Agora with Web3.0 to Fight Algorithms"
                    />
                  </h3>
                  <cite>
                    <Translate
                      zh_hant="閱讀誌"
                      zh_hans="阅读志"
                      en="Openbook"
                    />
                  </cite>
                </a>
              </li>
              <li>
                <a
                  href="https://www.inside.com.tw/feature/nft/25869-matters-web3-nft"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>
                    <Translate
                      zh_hant="【你買 NFT 了嗎】走在 Web3 媒體路三年，Matters 跟張潔平想用 NFT 邁出下一步
                  "
                      zh_hans="【你买 NFT 了吗】走在 Web3 媒体路三年，Matters 跟张洁平想用 NFT 迈出下一步"
                      en="Matters Lab and Jieping Zhang leads Web3 Platform to the Next Step with NFT"
                    />
                  </h3>
                  <cite>INSIDE</cite>
                </a>
              </li>
            </ul>
          </section>
          <section className={styles['scrollButton scrollRight']}>
            <Button onClick={scrollNext} disabled={!nextBtnEnabled}>
              <Media at="sm">{withIcon(IconButtonRight)({ size: 'md' })}</Media>
              <Media greaterThan="sm">
                {withIcon(IconButtonRight)({ size: 'lg' })}
              </Media>
            </Button>
          </section>
        </section>
      </section>

      <style jsx>{`
        .hero {
          background-image: url(${IMAGE_WAVE_1}),
            url(${IMAGE_ILLUSTRATION_1.src}), url(${IMAGE_WAVE_2});
        }
        .ilusCity {
          background-image: url(${IMAGE_ILLUSTRATION_2.src});
        }
        .scrollHint {
          background-image: url(${IMAGE_ARROW_DOWN});
        }
        .emblaViewport {
          cursor: url(${SLIDE_CURSOR}), auto;
        }
      `}</style>
    </section>
  )
}

export default Hero
