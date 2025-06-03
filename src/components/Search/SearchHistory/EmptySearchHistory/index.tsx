import IMAGE_EMPTY_SEARCH_HISTORY from '@/public/static/images/illustration-empty-search-history.svg?url'
import { Translate } from '~/components'

import styles from './styles.module.css'

const EmptySearchHistory = () => {
  return (
    <section className={styles.container}>
      <img src={IMAGE_EMPTY_SEARCH_HISTORY.src} alt="empty search history" />
      <section className={styles.hint}>
        <Translate
          zh_hant="輸入關鍵詞餵食搜尋怪，幫你找到相關內容哦！"
          zh_hans="输入关键词喂食搜寻怪，帮你找到相关内容哦！"
          en="Once upon a time there was a search monster who ate your keyword then gave you what you ask for."
        />
      </section>
    </section>
  )
}

export default EmptySearchHistory
