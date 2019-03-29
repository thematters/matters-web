import { Translate } from '~/components/Language'

import styles from './styles.css'

const Reports = () => (
  <section className="reports">
    <div className="l-row">
      <div className="l-col-4 l-col-md-8 l-col-lg-12">
        <h2>
          <Translate zh_hant="媒體報道" zh_hans="媒体报道" />
        </h2>
      </div>
    </div>

    <div className="l-row">
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a
          href="http://www.sixthtone.com/news/1002403/how-blockchain-could-revolutionize-chinas-media"
          target="_blank"
        >
          <h3>How Blockchain Could Revolutionize China’s Media</h3>
          <cite>Sixth Tone</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a
          href="https://www.welt.de/wirtschaft/bilanz/plus182345256/Blockchain-in-China-Zentrale-Macht-dezentrale-Technik.html"
          target="_blank"
        >
          <h3>Der Staat gegen Nerds</h3>
          <cite>BILANZ Deutschland</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
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
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a
          href="hhttps://www.bnext.com.tw/article/49272/blockchain-blog-content-"
          target="_blank"
        >
          <h3>區塊鏈內容平台觀察：挑戰與現有解法</h3>
          <cite>數位時代</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a
          href="https://www.dw.com/zh/%E5%8C%BA%E5%9D%97%E9%93%BE%E8%AE%A9%E5%A5%BD%E6%96%B0%E9%97%BB%E6%9B%B4%E5%AE%89%E5%85%A8%E6%9B%B4%E5%80%BC%E9%92%B1/a-44329162?&zhongwen=simp"
          target="_blank"
        >
          <h3>区块链：让好新闻更安全、更“值钱”？</h3>
          <cite>德國之聲</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a href="https://36kr.com/p/5156042.html" target="_blank">
          <h3>“城市化治理”：平台运营的最高境界</h3>
          <cite>全媒派</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
        <a
          href="https://mp.weixin.qq.com/s?__biz=MzU2MjQ2OTE5Nw==&mid=2247484199&idx=1&sn=adf46bfe6285c20e7f92fcf199360ce1&chksm=fc684305cb1fca13fdac5ca4d47063881ff6aa7909e3c141111da901667b72fdc2260e94c817&mpshare=1&scene=1&srcid=05162EAouKYBv3fNvBDz5a0Q&key=12a00fb205fe0934d49869205812e14fbd1e7a879942a8e5e1efcce1f99e6921623be4672714f229dfc58e2743696b5e4351b2d3acb3d1f31b36667268bfc386e0b3e682362c5f0b19f854f2b5108b4d&ascene=0&uin=NTU3NzYwNjU%3D&devicetype=iMac+MacBook8%2C1+OSX+OSX+10.13.4+build(17E199)&version=12020810&nettype=WIFI&lang=zh_CN&fontScale=100&pass_ticket=9m6qkpYH8nnyE6EF7DwHs%2Bj5jQnOW8R3ypMowqntaKA%3D"
          target="_blank"
        >
          <h3>专访Matters创始人张洁平：区块链能让好内容活下去吗？</h3>
          <cite>野馬財經</cite>
        </a>
      </div>
      <div className="item l-waffle-1 l-waffle-sm-2 l-waffle-md-4">
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
