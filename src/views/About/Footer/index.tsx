import { useContext } from 'react'

import {
  Button,
  LanguageContext,
  LanguageSwitch,
  TextIcon,
  Tooltip,
  Translate,
  withIcon,
} from '~/components'

import { translate } from '~/common/utils'

import { ReactComponent as IconFooterFacebook } from '@/public/static/icons/24px/footer-facebook.svg'
import { ReactComponent as IconFooterInstagram } from '@/public/static/icons/24px/footer-instagram.svg'
import { ReactComponent as IconFooterTelegram } from '@/public/static/icons/24px/footer-telegram.svg'
import { ReactComponent as IconFooterTwitter } from '@/public/static/icons/24px/footer-twitter.svg'
import { ReactComponent as IconFooterWeChat } from '@/public/static/icons/24px/footer-wechat.svg'

import styles from './styles.css'

const Footer = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className="container">
              <section className="contactUs">
                <h2>
                  <Translate
                    zh_hant="聯絡方式"
                    zh_hans="联系我们"
                    en="Contact Us"
                  />
                </h2>
                <p>
                  <Translate
                    zh_hant="媒體查詢、活動合作、一般查詢，請聯絡"
                    zh_hans="媒体查询、活动合作、一般查询，请联系"
                    en="For media and business inquiries, please email"
                  />
                  <br />
                  <a
                    className="u-link-green"
                    href="mailto:hi@matters.news"
                    target="_blank"
                  >
                    hi@matters.news
                  </a>
                </p>
                <p>
                  <Translate
                    zh_hant="對我們的產品有任何疑問，請聯絡"
                    zh_hans="对我们的产品有任何疑问，请联系"
                    en="Any inquiries about our product, please email"
                  />
                  <br />
                  <a
                    className="u-link-green"
                    href="mailto:hi@matters.news"
                    target="_blank"
                  >
                    ask@matters.news
                  </a>
                </p>
                <p>
                  <Translate
                    zh_hant="探索更多專案，搭上 Web3 啟航之旅"
                    zh_hans="探索更多专案，搭上 Web3 启航之旅"
                    en="Enter and explore Matterverse"
                  />
                  <br />
                  <a
                    className="u-link-green"
                    href="https://matters-lab.io/"
                    target="_blank"
                  >
                    Matters Lab
                  </a>
                </p>
              </section>

              <section className="followUs">
                <h2>
                  <Translate
                    zh_hant="追蹤我們"
                    zh_hans="追蹤我們"
                    en="Follow Us"
                  />
                </h2>

                <div className="socials">
                  <a href="https://twitter.com/MattersLab" target="_blank">
                    {withIcon(IconFooterTwitter)({
                      size: 'md',
                      color: 'white',
                    })}
                  </a>
                  <a
                    href="https://www.facebook.com/MattersLab2018/"
                    target="_blank"
                  >
                    {withIcon(IconFooterFacebook)({
                      size: 'md',
                      color: 'white',
                    })}
                  </a>
                  <a
                    href="https://www.instagram.com/matterslab2018/"
                    target="_blank"
                  >
                    {withIcon(IconFooterInstagram)({
                      size: 'md',
                      color: 'white',
                    })}
                  </a>
                  <Tooltip content="MattersLab">
                    <span>
                      {withIcon(IconFooterWeChat)({
                        size: 'md',
                        color: 'white',
                      })}
                    </span>
                  </Tooltip>
                  <a
                    href="https://t.me/joinchat/BXzlWUhXaWNZ-TXJZJCzDQ"
                    target="_blank"
                  >
                    {withIcon(IconFooterTelegram)({
                      size: 'md',
                      color: 'white',
                    })}
                  </a>
                </div>
              </section>

              <section className="subscribeUs">
                <h2>
                  <Translate
                    zh_hant="訂閱我們"
                    zh_hans="订阅我们"
                    en="Subscribe to Us"
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
                      placeholder={translate({ id: 'yourEmail', lang })}
                      defaultValue=""
                    />
                    <input
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                      type="text"
                      name="b_d5d5a3cc17a4dfebbee549e7f_82f8e18b83"
                      defaultValue=""
                    />
                    <Button
                      size={[null, '2.5rem']}
                      spacing={[0, 'base']}
                      type="submit"
                      bgColor="black"
                    >
                      <TextIcon color="white" weight="md">
                        <Translate
                          zh_hant="訂閱"
                          zh_hans="订阅"
                          en="subscribe"
                        />
                      </TextIcon>
                    </Button>
                  </form>
                </div>

                <section className="languageSwitch">
                  <LanguageSwitch size="lg" bgColor="grey-darkest" />
                </section>
              </section>

              <section className="copyright">
                © {year} Matters, Inc. All rights reserved.
              </section>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </footer>
  )
}

export default Footer
