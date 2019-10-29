import { useContext } from 'react'

import { Head, LanguageContext, PageHeader, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'

const FAQ = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head title={{ zh_hant: TEXT.zh_hant.faq, zh_hans: TEXT.zh_hans.faq }} />

      <section className="l-row">
        <div className="l-col-4 l-col-md-1 l-col-lg-2">
          <MiscTab />
        </div>
        <div className="l-col-4 l-col-md-6 l-col-lg-8">
          <PageHeader
            pageTitle={
              <Translate
                zh_hant={TEXT.zh_hant.faq}
                zh_hans={TEXT.zh_hans.faq}
              />
            }
          />
          <article
            dangerouslySetInnerHTML={{
              __html: translate({
                ...content,
                lang
              })
            }}
          />
        </div>

        <style jsx global>
          {contentStyles}
        </style>
        <style jsx global>
          {detailsStyles}
        </style>
      </section>
    </main>
  )
}

export default FAQ
