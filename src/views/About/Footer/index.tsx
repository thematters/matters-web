import {
  Button,
  LanguageSwitch,
  TextIcon,
  Translate,
  useResponsive,
  withIcon,
} from '~/components'

import { ReactComponent as IconFooterBlog } from '@/public/static/icons/24px/footer-blog.svg'
import { ReactComponent as IconFooterDiscord } from '@/public/static/icons/24px/footer-discord.svg'
import { ReactComponent as IconFooterFacebook } from '@/public/static/icons/24px/footer-facebook.svg'
import { ReactComponent as IconFooterInstagram } from '@/public/static/icons/24px/footer-instagram.svg'
import { ReactComponent as IconFooterLinkedin } from '@/public/static/icons/24px/footer-linkedin.svg'
import { ReactComponent as IconFooterTwitter } from '@/public/static/icons/24px/footer-twitter.svg'

import styles from './styles.css'

const Footer = () => {
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
                      <a href="https://matters-lab.io/blog" target="_blank">
                        <TextIcon
                          icon={withIcon(IconFooterBlog)({
                            size: 'md',
                            color: 'white',
                          })}
                          color="grey"
                          size="md"
                          spacing="xtight"
                        >
                          Matters Blog
                        </TextIcon>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.linkedin.com/company/matters-lab"
                        target="_blank"
                      >
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
              <section className="subscribeUs">
                <h2>
                  <Translate
                    zh_hant="訂閱我們"
                    zh_hans="订阅我们"
                    en="Subscribe to Us"
                  />
                </h2>
                <div className="buttons">
                  <Button
                    size={['100%', '2.5rem']}
                    bgActiveColor="grey-lighter"
                    borderColor="white"
                    textColor="white"
                    textActiveColor="black"
                    borderWidth="sm"
                    htmlHref="https://matters.news/signup"
                    htmlTarget="_blank"
                    rel="noopener"
                  >
                    <TextIcon size="md">
                      <Translate
                        zh_hant="註冊並訂閱每週 Newsletter"
                        zh_hans="注册并订阅每周 Newsletter"
                        en="Sign up for our weekly newsletter"
                      />
                    </TextIcon>
                  </Button>
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
