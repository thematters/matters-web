import { Head, Layout, Term } from '~/components'

import MiscTab from '../MiscTab'

export default () => (
  <Layout>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="termAndPrivacy" />}
    />

    <Head title={{ id: 'termAndPrivacy' }} />

    <MiscTab />

    <Layout.Spacing>
      <Term />
    </Layout.Spacing>
  </Layout>
)
