import { Head, Layout } from '~/components'

import { Term } from './Term'

const ToS = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="termAndPrivacy" />} />

    <Head title={{ id: 'termAndPrivacy' }} />

    <Layout.Main.Spacing>
      <Term />
    </Layout.Main.Spacing>
  </Layout.Main>
)

export default ToS
