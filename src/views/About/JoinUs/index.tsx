import { ReactComponent as IconArrowRight } from '@/public/static/images/about/arrow-right.svg'
import { captureClicks } from '~/common/utils'
import { Translate, withIcon } from '~/components'

import styles from './styles.module.css'

const IconArrow = () => (
  <>
    {withIcon(IconArrowRight)({
      style: { height: 20 },
    })}
  </>
)

const JoinUs = () => {
  return (
    <section className={styles.joinUs} onClick={captureClicks}>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h2>
              <Translate zh_hant="加入我們" zh_hans="加入我们" en="Join Us" />
            </h2>

            <ul>
              <li>
                <a
                  href="https://matterslab.notion.site/Matters-Lab-Job-Board-Public-4221b899fdca4c91b46119d64ab23daf"
                  target="_blank"
                  rel="noreferrer"
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
                <a
                  href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/@hi176/69962-matters-全面開源-邀請你一起來建設馬特市-bafyreibge4gigd2bi34kdb742ch5dfiiu76sveqvj7hf7yuyy3gjiyarfy`}
                >
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
    </section>
  )
}

export default JoinUs
