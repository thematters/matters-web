import { useContext } from 'react'

import {
  Button,
  LanguageContext,
  LanguageSwitch,
  TextIcon,
  Translate,
  useResponsive,
  withIcon,
} from '~/components'

import { translate } from '~/common/utils'

import { ReactComponent as IconFooterDiscord } from '@/public/static/icons/24px/footer-discord.svg'
import { ReactComponent as IconFooterFacebook } from '@/public/static/icons/24px/footer-facebook.svg'
import { ReactComponent as IconFooterInstagram } from '@/public/static/icons/24px/footer-instagram.svg'
import { ReactComponent as IconFooterLinkedin } from '@/public/static/icons/24px/footer-linkedin.svg'
import { ReactComponent as IconFooterMedium } from '@/public/static/icons/24px/footer-medium.svg'
import { ReactComponent as IconFooterTwitter } from '@/public/static/icons/24px/footer-twitter.svg'

import styles from './styles.css'

const Footer = () => {
  const { lang } = useContext(LanguageContext)
  const isSmallUp = useResponsive('sm-up')
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className="container">
              {!isSmallUp && (
                <section className="languageSwitch">
                  <LanguageSwitch size="lg" bgColor="grey-darkest" />
                </section>
              )}
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
                    zh_hant="一般聯繫、媒體詢問、活動合作"
                    zh_hans="一般联系、媒体询问、活动合作"
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
                    zh_hant="用戶客服"
                    zh_hans="用户客服"
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
                  <ul>
                    <li>
                      <a href="https://twitter.com/MattersLab" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterTwitter)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Twitter（中文）
                        </TextIcon>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/Mattersw3b" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterTwitter)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Twitter（English）
                        </TextIcon>
                      </a>
                    </li>

                    <li>
                      <a href="https://discord.gg/matterslab" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterDiscord)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Discord
                        </TextIcon>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/MattersLab2018/"
                        target="_blank"
                      >
                        <TextIcon
                          icon={withIcon(IconFooterFacebook)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Facebook
                        </TextIcon>
                      </a>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <a href="https://matterslab.medium.com/" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterMedium)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Medium
                        </TextIcon>
                      </a>
                    </li>

                    {/* TODO: fill linkedin href */}
                    <li>
                      <a href="" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterLinkedin)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          LinkedIn
                        </TextIcon>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/matterslab2018/"
                        target="_blank"
                      >
                        <TextIcon
                          icon={withIcon(IconFooterInstagram)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Instagram
                        </TextIcon>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
              <section className="moreProducts">
                <h2>
                  <Translate
                    zh_hant="更多產品"
                    zh_hans="更多产品"
                    en="More Products"
                  />
                </h2>

                <div className="products">
                  <a href="https://traveloggers.matters.news/" target="_blank">
                    <TextIcon color="grey" size="md">
                      Traveloggers
                    </TextIcon>
                  </a>

                  <a href="https://logbook.matters.news/" target="_blank">
                    <TextIcon color="grey" size="md">
                      Logbook
                    </TextIcon>
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
                {isSmallUp && (
                  <section className="languageSwitch">
                    <LanguageSwitch size="lg" bgColor="grey-darkest" />
                  </section>
                )}
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
