import gql from 'graphql-tag'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'
import { ResponseCountArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment ResponseCountArticle on Article {
      id
      responseCount
    }
  `,
}

const ResponseCount = ({
  article,
}: {
  article: ResponseCountArticleFragment
}) => {
  const { lang } = useContext(LanguageContext)
  const count = article?.responseCount || 0

  return (
    <span
      className={styles.count}
      aria-label={translate({
        zh_hant: `${count} 條回應`,
        zh_hans: `${count} 条回应`,
        en: `${count} responses`,
        lang,
      })}
    >
      {count}
    </span>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
