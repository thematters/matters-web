import { Head, Layout, Term } from '~/components'

const ToS = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="termAndPrivacy" />} />

    <Head title={{ id: 'termAndPrivacy' }} />

    <Layout.Spacing>
      <Term />
    </Layout.Spacing>
  </Layout.Main>
)

export default ToS
