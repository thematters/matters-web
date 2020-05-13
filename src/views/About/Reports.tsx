import { Translate } from '~/components'

import styles from './styles.css'

const Reports = () => (
  <section className="reports">
    <div className="l-row">
      <div className="l-col-4 l-col-md-8 l-col-lg-12">
        <h2>
          <Translate zh_hant="媒體報導" zh_hans="媒体报道" />
        </h2>
      </div>
    </div>

    <div className="l-row">
      <div className="item">
        <a
          href="https://www.blog.google/around-the-globe/google-asia/gni-innovation-challenge-apac/"
          target="_blank"
        >
          <h3>18 Asia Pacific news organizations with big ideas</h3>
          <cite>Google Blog</cite>
        </a>
      </div>
      <div className="item">
        <a href="https://appworks.tw/category/events/" target="_blank">
          <h3>
            Taiwan’s AppWorks Demo Day #19 Puts 18 of the Most Promising Greater
            Southeast Asian AI / Blockchain Founders on Stage
          </h3>
          <cite>AppWorks</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="http://www.sixthtone.com/news/1002403/how-blockchain-could-revolutionize-chinas-media"
          target="_blank"
        >
          <h3>How Blockchain Could Revolutionize China’s Media</h3>
          <cite>Sixth Tone</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.welt.de/wirtschaft/bilanz/plus182345256/Blockchain-in-China-Zentrale-Macht-dezentrale-Technik.html"
          target="_blank"
        >
          <h3>Der Staat gegen Nerds</h3>
          <cite>BILANZ Deutschland</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.cjr.org/analysis/china-censorship.php"
          target="_blank"
        >
          <h3>
            As China abolishes two-term limit, a siege on digital free speech
          </h3>
          <cite>Columbia Journalism Review</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.bnext.com.tw/article/49272/blockchain-blog-content-"
          target="_blank"
        >
          <h3>區塊鏈內容平台觀察：挑戰與現有解法</h3>
          <cite>數位時代</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.dw.com/zh/%E5%8C%BA%E5%9D%97%E9%93%BE%E8%AE%A9%E5%A5%BD%E6%96%B0%E9%97%BB%E6%9B%B4%E5%AE%89%E5%85%A8%E6%9B%B4%E5%80%BC%E9%92%B1/a-44329162?&zhongwen=simp"
          target="_blank"
        >
          <h3>区块链：让好新闻更安全、更“值钱”？</h3>
          <cite>德國之聲</cite>
        </a>
      </div>
      <div className="item">
        <a
          href="https://new.qq.com/omn/20180410/20180410B0LP7J.html"
          target="_blank"
        >
          <h3>离开端传媒，张洁平的新实验：用区块链拯救公共讨论</h3>
          <cite>方可成</cite>
        </a>
      </div>
    </div>

    <style jsx>{styles}</style>
  </section>
)

export default Reports
