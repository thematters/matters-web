import { Layout } from '~/components'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title zh_hant="Matters ID" zh_hans="Matters ID" />}
    />
  </Layout.Main>
)
