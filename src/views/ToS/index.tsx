import { Head, Layout, Term } from '~/components'

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
