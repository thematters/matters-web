import { useContext } from 'react'

import { Head, LanguageContext } from '~/components'

import { TEXT } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'
import styles from './styles.css'

const Guide = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head
        title={{ zh_hant: TEXT.zh_hant.guide, zh_hans: TEXT.zh_hans.guide }}
      />

      <section className="l-row">
        <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <MiscTab />

          <article
            dangerouslySetInnerHTML={{
              __html: translate({
                ...content,
                lang
              })
            }}
            className="u-content"
          />
        </div>

        <style jsx>{styles}</style>
        <style jsx>{contentStyles}</style>
      </section>
    </main>
  )
}

export default Guide
