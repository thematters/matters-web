import { Head, Layout, Term } from '~/components'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="termAndPrivacy" />}
    />

    <Head title={{ id: 'termAndPrivacy' }} />

    <Layout.Spacing>
      <Term />
    </Layout.Spacing>
  </Layout.Main>
)
