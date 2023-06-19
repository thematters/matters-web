import { Translate } from '~/components'

import layoutStyles from '../layout.module.css'
import styles from './styles.module.css'

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={layoutStyles.container}>
        <ul className={layoutStyles.content}>
          <li>
            <p className={styles.type}>
              <Translate
                zh_hant="創作者人數"
                zh_hans="创作者人数"
                en="Number of Creators"
              />
            </p>
            <span className={styles.num}>100K+</span>
          </li>
          <li>
            <p className={styles.type}>
              <Translate
                zh_hant="每月發布文章"
                zh_hans="每月发布文章"
                en="Monthly New Articles"
              />
            </p>
            <span className={styles.num}>18K+</span>
          </li>
          <li>
            <p className={styles.type}>
              <Translate
                zh_hant="收到讚賞的文章數量"
                zh_hans="收到赞赏的文章数量"
                en="Number of Articles Got Rewarded"
              />
            </p>
            <span className={styles.num}>350K+</span>
          </li>
          <li>
            <p className={styles.type}>
              <Translate
                zh_hant="支持創作者基金（US）"
                zh_hans="支持创作者基金（US）"
                en="Funds to support creators"
              />
            </p>
            <span className={styles.num}>$100K+</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Stats
