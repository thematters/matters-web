import gql from 'graphql-tag'
import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

import { ResponseCountArticle } from './__generated__/ResponseCountArticle'

const fragments = {
  article: gql`
    fragment ResponseCountArticle on Article {
      id
      responseCount
    }
  `,
}

const ResponseCount = ({ article }: { article: ResponseCountArticle }) => {
  const { lang } = useContext(LanguageContext)
  const count = article?.responseCount || 0

  return (
    <span
      className="count"
      aria-label={translate({
        zh_hant: `${count} 條回應`,
        zh_hans: `${count} 条回应`,
        en: `${count} responses`,
        lang,
      })}
    >
      {count}

      <style jsx>{styles}</style>
    </span>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
