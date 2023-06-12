import { ReactComponent as IconFooterBlog } from '@/public/static/icons/24px/footer-blog.svg'
import { ReactComponent as IconFooterDiscord } from '@/public/static/icons/24px/footer-discord.svg'
import { ReactComponent as IconFooterFacebook } from '@/public/static/icons/24px/footer-facebook.svg'
import { ReactComponent as IconFooterInstagram } from '@/public/static/icons/24px/footer-instagram.svg'
import { ReactComponent as IconFooterLinkedin } from '@/public/static/icons/24px/footer-linkedin.svg'
import { ReactComponent as IconFooterTwitter } from '@/public/static/icons/24px/footer-twitter.svg'
import { EXTERNAL_LINKS } from '~/common/enums'
import {
  Button,
  LanguageSwitch,
  Media,
  TextIcon,
  Translate,
  withIcon,
} from '~/components'

import styles from './styles.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className={styles.container}>
              <Media at="sm">
                <section className={styles.languageSwitch}>
                  <LanguageSwitch size="lg" bgColor="greyDarkest" />
                </section>
              </Media>

              <section className={styles.contactUs}>
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
                    href="mailto:hi@matters.town"
                    target="_blank"
                    rel="noreferrer"
                  >
                    hi@matters.town
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
                    href="mailto:hi@matters.town"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ask@matters.town
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
                    href={EXTERNAL_LINKS.MATTERS_LAB}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Matters Lab
                  </a>
                </p>
              </section>
              <section className={styles.followUs}>
                <h2>
                  <Translate
                    zh_hant="追蹤我們"
                    zh_hans="追蹤我們"
                    en="Follow Us"
                  />
                </h2>

                <div className={styles.socials}>
                  <ul>
                    <li>
                      <a
                        href="https://twitter.com/MattersLab"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                      <a
                        href="https://twitter.com/Mattersw3b"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                      <a
                        href="https://discord.gg/matterslab"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                        href={EXTERNAL_LINKS.FACEBOOK}
                        target="_blank"
                        rel="noreferrer"
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
                      <a
                        href="https://matters-lab.io/blog"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                        rel="noreferrer"
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
                        rel="noreferrer"
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
              <section className={styles.subscribeUs}>
                <h2>
                  <Translate
                    zh_hant="訂閱我們"
                    zh_hans="订阅我们"
                    en="Subscribe to Us"
                  />
                </h2>
                <div className={styles.buttons}>
                  <Button
                    size={['100%', '2.5rem']}
                    bgActiveColor="greyLighter"
                    borderColor="white"
                    textColor="white"
                    textActiveColor="black"
                    borderWidth="sm"
                    htmlHref={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/signup`}
                    htmlTarget="_blank"
                    rel="noreferrer"
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

                <Media greaterThan="sm">
                  <section className={styles.languageSwitch}>
                    <LanguageSwitch size="lg" bgColor="greyDarkest" />
                  </section>
                </Media>
              </section>
              <section className={styles.copyright}>
                © {year} Matters, Inc. All rights reserved.
              </section>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
