import { useContext } from 'react'

import { Head, LanguageContext, PageHeader, Translate } from '~/components'

import styles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'

export default () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head title={{ zh_hant: '常見問題', zh_hans: '常见问题' }} />

      <section className="l-row">
        <div className="l-col-4 l-col-md-1 l-col-lg-2">
          <MiscTab />
        </div>
        <div className="l-col-4 l-col-md-6 l-col-lg-8">
          <PageHeader
            pageTitle={<Translate zh_hant="常見問題" zh_hans="常见问题" />}
          />
          <article
            dangerouslySetInnerHTML={{
              __html: translate({
                ...content,
                lang
              })
            }}
            className="content"
          />
        </div>
        <style jsx>{styles}</style>
      </section>
    </main>
  )
}
