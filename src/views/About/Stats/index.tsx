import { Translate } from '~/components'

import styles from './styles.css'

const Stats = () => {
  return (
    <section className="stats">
      <div className="l-container">
        <ul className="l-row">
          <li>
            <p className="type">
              <Translate zh_hant="創作者人數" zh_hans="创作者人数" />
            </p>
            <span className="num">15K+</span>
          </li>
          <li>
            <p className="type">
              <Translate zh_hant="每月發布文章" zh_hans="每月发布文章" />
            </p>
            <span className="num">9K+</span>
          </li>
          <li>
            <p className="type">
              <Translate
                zh_hant="單篇文章最多獲得（以 LikeCoin 換算市價）"
                zh_hans="单篇文章最多获得（以 LikeCoin 换算市价）"
              />
            </p>
            <span className="num">HK$ 8K</span>
          </li>
        </ul>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Stats
