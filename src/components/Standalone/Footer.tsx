import {
  Button,
  NewsletterDialog,
  TextIcon,
  Tooltip,
  Translate,
  withIcon,
} from '~/components'

import { ReactComponent as IconFooterFacebook } from '@/public/static/icons/footer-facebook.svg'
import { ReactComponent as IconFooterInstagram } from '@/public/static/icons/footer-instagram.svg'
import { ReactComponent as IconFooterTelegram } from '@/public/static/icons/footer-telegram.svg'
import { ReactComponent as IconFooterTwitter } from '@/public/static/icons/footer-twitter.svg'
import { ReactComponent as IconFooterWeChat } from '@/public/static/icons/footer-wechat.svg'

import styles from './styles.css'

const Footer = () => {
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
        </section>

        <section className="footer-section l-col-4 l-col-sm-2 l-col-lg-4">
          <h2>
            <Translate zh_hant="追蹤我們" zh_hans="追蹤我們" />
          </h2>

          <div className="socials">
            <a href="https://twitter.com/MattersLab" target="_blank">
              {withIcon(IconFooterTwitter)({ size: 'md' })}
            </a>
            <a href="https://www.facebook.com/MattersLab2018/" target="_blank">
              {withIcon(IconFooterFacebook)({ size: 'md' })}
            </a>
            <a href="https://www.instagram.com/matterslab2018/" target="_blank">
              {withIcon(IconFooterInstagram)({ size: 'md' })}
            </a>
            <Tooltip content="MattersLab">
              <span>{withIcon(IconFooterWeChat)({ size: 'md' })}</span>
            </Tooltip>
            <a href="https://t.me/thematters" target="_blank">
              {withIcon(IconFooterTelegram)({ size: 'md' })}
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
            <NewsletterDialog>
              {({ open }) => (
                <Button
                  aria-haspopup="true"
                  size={[null, '2.25rem']}
                  spacing={[0, 'base']}
                  type="submit"
                  bgColor="green"
                  onClick={open}
                >
                  <TextIcon color="white" weight="md">
                    <Translate
                      zh_hant="訂閱 Matters 通訊"
                      zh_hans="订阅 Matters 通讯"
                    />
                  </TextIcon>
                </Button>
              )}
            </NewsletterDialog>
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
