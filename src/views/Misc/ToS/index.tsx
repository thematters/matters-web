import { Head, PageHeader, Translate } from '~/components'
import { Term } from '~/components/Term'

import { TEXT } from '~/common/enums'

import MiscTab from '../MiscTab'

export default () => {
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

          <Term />
        </article>
      </section>
    </main>
  )
}
