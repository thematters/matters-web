import { Head } from '~/components'
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
        <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <MiscTab />

          <Term />
        </article>
      </section>
    </main>
  )
}
