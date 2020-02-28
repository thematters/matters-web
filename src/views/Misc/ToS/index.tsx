import { Head, Term } from '~/components'

import MiscTab from '../MiscTab'

export default () => {
  return (
    <main>
      <Head title={{ id: 'termAndPrivacy' }} />

      <section className="l-row">
        <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <MiscTab />

          <Term />
        </article>
      </section>
    </main>
  )
}
