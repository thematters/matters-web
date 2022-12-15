import { TextIcon, Translate } from '~/components'

import styles from './styles.css'

const EndOfResults = () => {
  return (
    <section className="endOfResults">
      <TextIcon color="grey" size="sm">
        -&nbsp;
        <Translate
          zh_hans="已显示所有结果"
          zh_hant="已顯示所有結果"
          en="End of the results"
        />
        &nbsp;-
      </TextIcon>
      <style jsx>{styles}</style>
    </section>
  )
}

export default EndOfResults
