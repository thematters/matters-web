import { Head, Layout, Term } from '~/components'

import MiscTab from '../MiscTab'

export default () => (
  <Layout>
    <Head title={{ id: 'termAndPrivacy' }} />

    <Layout.Spacing>
      <MiscTab />
      <Term />
    </Layout.Spacing>
  </Layout>
)
