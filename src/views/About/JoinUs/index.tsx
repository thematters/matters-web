import { Translate, withIcon } from '~/components'

import { captureClicks } from '~/common/utils'

import { ReactComponent as IconArrowRight } from '@/public/static/images/about/arrow-right.svg'
import IMAGE_WAVE from '@/public/static/images/about/wave-join-us.svg'

import styles from './styles.css'

const IconArrow = () => (
  <>
    {withIcon(IconArrowRight)({
      style: { height: 20 },
    })}
  </>
)

const JoinUs = () => {
  return (
    <section className="joinUs" onClick={captureClicks}>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h2>
              <Translate zh_hant="加入我們" zh_hans="加入我们" en="Join Us" />
            </h2>

            <ul>
              <li>
                <a
                  href="https://www.cakeresume.com/companies/matters/jobs"
                  target="_blank"
                >
                  <Translate
                    zh_hant="加入 Matters 團隊"
                    zh_hans="加入 Matters 团队"
                    en="Join the Matters team"
                  />
                  <IconArrow />
                </a>
              </li>
              <li>
                <a href="https://matters.news/@hi176/%E9%A6%AC%E7%89%B9%E5%B8%82%E4%B8%89%E6%AD%B2%E4%BA%86-%E5%B0%8B%E6%89%BE-%E9%A6%AC%E7%89%B9%E5%B8%82%E5%BB%BA%E7%AF%89%E5%B8%AB-%E9%82%80%E4%BD%A0%E4%BE%86%E6%8F%90%E5%90%8D-bafyreibt7upd2hsvupmd43y46sxubirqevqqnkydgrudq6vziwjrztdz7m">
                  <Translate
                    zh_hant="成為馬特市建築師"
                    zh_hans="成为马特市建筑师"
                    en="Become a Matters architect"
                  />
                  <IconArrow />
                </a>
              </li>
              <li>
                <a href="https://matters.news/@hi176/matters-%E5%85%A8%E9%9D%A2%E9%96%8B%E6%BA%90-%E9%82%80%E8%AB%8B%E4%BD%A0%E4%B8%80%E8%B5%B7%E4%BE%86%E5%BB%BA%E8%A8%AD%E9%A6%AC%E7%89%B9%E5%B8%82-bafyreibge4gigd2bi34kdb742ch5dfiiu76sveqvj7hf7yuyy3gjiyarfy">
                  <Translate
                    zh_hant="加入開源社區 "
                    zh_hans="加入开源社区"
                    en="Join the Open Source Community"
                  />
                  <IconArrow />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
      <style jsx>{`
        .joinUs {
          background-image: url(${IMAGE_WAVE});
        }
      `}</style>
    </section>
  )
}

export default JoinUs
