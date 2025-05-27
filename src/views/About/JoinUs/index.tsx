import IconAboutArrowRight from '@/public/static/images/about/arrow-right.svg'
import IMAGE_WAVE from '@/public/static/images/about/wave-join-us.svg?url'
import { captureClicks } from '~/common/utils'
import { Icon, Translate } from '~/components'

import layoutStyles from '../layout.module.css'
import styles from './styles.module.css'

const IconArrow = () => (
  <Icon icon={IconAboutArrowRight} style={{ height: 20 }} />
)

const JoinUs = () => {
  const style = {
    '--about-join-us-bg': `url(${IMAGE_WAVE})`,
  } as React.CSSProperties

  return (
    <section className={styles.joinUs} onClick={captureClicks} style={style}>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <h2 className={styles.title}>
            <Translate zh_hant="加入我們" zh_hans="加入我们" en="Join Us" />
          </h2>

          <ul className={styles.list}>
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
              <a href="https://matters.town/@hi176/69962">
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
    </section>
  )
}

export default JoinUs
