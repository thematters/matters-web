import { useEmblaCarousel } from 'embla-carousel/react'
import Link from 'next/link'

import { Button, IconLogo, TextIcon, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import IMAGE_ARROW_DOWN from '@/public/static/images/about/arrow-down.svg'
import SLIDE_CURSOR from '@/public/static/images/about/cursor.svg'
import IMAGE_ILLUSTRATION_1 from '@/public/static/images/about/hero-illustration-1.png'
import IMAGE_ILLUSTRATION_2 from '@/public/static/images/about/hero-illustration-2.png'
import IMAGE_WAVE_1 from '@/public/static/images/about/wave-hero-1.svg'
import IMAGE_WAVE_2 from '@/public/static/images/about/wave-hero-2.svg'

import styles from './styles.css'

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: 'trimSnaps',
  })

  return (
    <section className="hero">
      <header className="logo">
        <div className="l-container">
          <div className="l-row">
            <div className="l-col-full">
              <Link href={PATHS.HOME}>
                <a aria-label={TEXT.zh_hant.discover}>
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
            <section className="slogan">
              <section>
                <h2>
                  <Translate
                    zh_hant="去中心化的"
                    zh_hans="去中心化的"
                    en="The Next Decentralized"
                  />
                  <br />
                  <Translate
                    zh_hant="寫作社群與內容生態"
                    zh_hans="写作社群与内容生态"
                    en="Content Ecosystem"
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

      <section className="reports " ref={emblaRef}>
        <ul>
          <li>
            <a
              href="https://restofworld.org/2020/chinas-fugitive-writers-find-a-home-online/"
              target="_blank"
            >
              <h3>China’s fugitive writers find a home online</h3>
              <cite>Rest of World</cite>
            </a>
          </li>
          <li>
            <a
              href="https://www.blog.google/around-the-globe/google-asia/gni-innovation-challenge-apac/"
              target="_blank"
            >
              <h3>18 Asia Pacific news organizations with big ideas</h3>
              <cite>Google Blog</cite>
            </a>
          </li>
          <li>
            <a
              href="https://appworks.tw/taiwans-appworks-demo-day-19-puts-18-of-the-most-promising-greater-southeast-asian-ai-blockchain-founders-on-stage/"
              target="_blank"
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
            >
              <h3>How Blockchain Could Revolutionize China’s Media</h3>
              <cite>Sixth Tone</cite>
            </a>
          </li>
          <li>
            <a
              href="https://www.welt.de/wirtschaft/bilanz/plus182345256/Blockchain-in-China-Zentrale-Macht-dezentrale-Technik.html"
              target="_blank"
            >
              <h3>Der Staat gegen Nerds</h3>
              <cite>BILANZ Deutschland</cite>
            </a>
          </li>
          <li>
            <a
              href="https://www.cjr.org/analysis/china-censorship.php"
              target="_blank"
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
              href="https://www.bnext.com.tw/article/49272/blockchain-blog-content-"
              target="_blank"
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
              href="https://www.dw.com/zh/%E5%8C%BA%E5%9D%97%E9%93%BE%E8%AE%A9%E5%A5%BD%E6%96%B0%E9%97%BB%E6%9B%B4%E5%AE%89%E5%85%A8%E6%9B%B4%E5%80%BC%E9%92%B1/a-44329162?&zhongwen=simp"
              target="_blank"
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
        </ul>
      </section>

      <style jsx>{styles}</style>
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
        .reports {
          cursor: url(${SLIDE_CURSOR}), auto;
        }
      `}</style>
    </section>
  )
}

export default Hero
