import { Translate } from '~/components'

import styles from './styles.module.css'

const EndOfResults = () => {
  return (
    <section className={styles.endOfResults}>
      <Translate
        zh_hans="已显示所有结果"
        zh_hant="已顯示所有結果"
        en="End of the results"
      />
    </section>
  )
}

export default EndOfResults
