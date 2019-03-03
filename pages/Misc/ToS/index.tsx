import { useContext } from 'react'

import { Head } from '~/components/Head'
import { LanguageContext, Translate } from '~/components/Language'
import { PageHeader } from '~/components/PageHeader'

import styles from '~/common/styles/utils/content.article.css'
import { TOS } from '~/common/texts/tos'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'

export default () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head title={{ zh_hant: '用戶協議', zh_hans: '用户协议' }} />

      <section className="l-row">
        <div className="l-col-4 l-col-md-1 l-col-lg-2">
          <MiscTab />
        </div>
        <div className="l-col-4 l-col-md-6 l-col-lg-8">
          <PageHeader
            pageTitle={<Translate zh_hant="用戶協議" zh_hans="用户协议" />}
          />
          <article
            dangerouslySetInnerHTML={{
              __html: translate({
                ...TOS,
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
