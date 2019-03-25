import { useContext } from 'react'

import { Head, LanguageContext, PageHeader, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import styles from '~/common/styles/utils/content.article.css'
import Privacy from '~/common/texts/privacy'
import ToS from '~/common/texts/tos'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'

export default () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head
        title={{
          zh_hant: TEXT.zh_hant.termAndPrivacy,
          zh_hans: TEXT.zh_hans.termAndPrivacy
        }}
      />

      <section className="l-row">
        <div className="l-col-4 l-col-md-1 l-col-lg-2">
          <MiscTab />
        </div>
        <article className="l-col-4 l-col-md-6 l-col-lg-8">
          <PageHeader
            pageTitle={
              <Translate
                zh_hant={TEXT.zh_hant.termAndPrivacy}
                zh_hans={TEXT.zh_hans.termAndPrivacy}
              />
            }
            is="h2"
          />
          <section
            dangerouslySetInnerHTML={{
              __html: translate({
                ...ToS,
                lang
              })
            }}
            className="u-content"
          />
          <section
            dangerouslySetInnerHTML={{
              __html: translate({
                ...Privacy,
                lang
              })
            }}
            className="u-content"
          />
        </article>
        <style jsx>{styles}</style>
      </section>
    </main>
  )
}
