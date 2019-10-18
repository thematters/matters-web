import { useContext } from 'react'

import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'
import { Tooltip } from '~/components/Popper'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_FACEBOOK from '~/static/icons/footer-facebook.svg?sprite'
import ICON_INSTAGRAM from '~/static/icons/footer-instagram.svg?sprite'
import ICON_MEDIUM from '~/static/icons/footer-medium.svg?sprite'
import ICON_TELEGRAM from '~/static/icons/footer-telegram.svg?sprite'
import ICON_TWITTER from '~/static/icons/footer-twitter.svg?sprite'
import ICON_WECHAT from '~/static/icons/footer-wechat.svg?sprite'

import styles from './styles.css'

const Footer = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="l-row">
        <section className="footer-section l-col-4 l-col-sm-3 l-col-lg-4">
          <h2>
            <Translate zh_hant="聯絡方式" zh_hans="联系我们" />
          </h2>
          <p>
            <Translate
              zh_hant="媒體查詢、活動合作、一般查詢，請聯絡"
              zh_hans="媒体查询、活动合作、一般查询，请联系"
            />
            <br />
            <a className="u-link-green" href="mailto:hi@matters.news">
              hi@matters.news
            </a>
          </p>
          <p>
            <Translate
              zh_hant="對我們的產品有任何疑問，請聯絡"
              zh_hans="对我们的产品有任何疑问，请联系"
            />
            <br />
            <a className="u-link-green" href="mailto:hi@matters.news">
              ask@matters.news
            </a>
          </p>
        </section>

        <section className="footer-section l-col-4 l-col-sm-2 l-col-lg-4">
          <h2>
            <Translate zh_hant="追蹤我們" zh_hans="追蹤我們" />
          </h2>

          <div className="socials">
            <a href="https://twitter.com/MattersLab" target="_blank">
              <Icon id={ICON_TWITTER.id} viewBox={ICON_TWITTER.viewBox} />
            </a>
            <a href="https://www.facebook.com/MattersLab2018/" target="_blank">
              <Icon id={ICON_FACEBOOK.id} viewBox={ICON_FACEBOOK.viewBox} />
            </a>
            <a href="https://medium.com/matters-lab" target="_blank">
              <Icon id={ICON_MEDIUM.id} viewBox={ICON_MEDIUM.viewBox} />
            </a>
            <a href="https://www.instagram.com/matterslab2018/" target="_blank">
              <Icon id={ICON_INSTAGRAM.id} viewBox={ICON_INSTAGRAM.viewBox} />
            </a>
            <Tooltip content="MattersLab">
              <span>
                <Icon id={ICON_WECHAT.id} viewBox={ICON_WECHAT.viewBox} />
              </span>
            </Tooltip>
            <a
              href="https://t.me/joinchat/BXzlWUhXaWNZ-TXJZJCzDQ"
              target="_blank"
            >
              <Icon id={ICON_TELEGRAM.id} viewBox={ICON_TELEGRAM.viewBox} />
            </a>
          </div>
        </section>

        <section className="footer-section l-col-4 l-col-sm-3 l-col-lg-4">
          <h2>
            <Translate
              zh_hant="瞭解我們的最新進展"
              zh_hans="了解我们的最新进展"
            />
          </h2>

          <div id="mc_embed_signup">
            <form
              action="https://news.us12.list-manage.com/subscribe/post?u=d5d5a3cc17a4dfebbee549e7f&amp;id=82f8e18b83"
              method="post"
            >
              <input
                type="email"
                name="EMAIL"
                placeholder={translate({
                  zh_hant: TEXT.zh_hant.yourEmail,
                  zh_hans: TEXT.zh_hans.yourEmail,
                  lang
                })}
                defaultValue=""
              />
              <input
                style={{ position: 'absolute', left: '-5000px' }}
                aria-hidden="true"
                type="text"
                name="b_d5d5a3cc17a4dfebbee549e7f_82f8e18b83"
                defaultValue=""
              />
              <Button type="submit" bgColor="green" size="xlarge">
                <Translate zh_hant="訂閱" zh_hans="订阅" />
              </Button>
            </form>
          </div>
        </section>
      </div>

      <section className="l-row">
        <div className="copyright l-col-4 l-col-sm-8 l-col-lg-12">
          © {year} Matters
        </div>
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

export default Footer
