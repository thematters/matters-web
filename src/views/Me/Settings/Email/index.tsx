import { Layout } from '~/components'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="email" />}
    />
  </Layout.Main>
)
