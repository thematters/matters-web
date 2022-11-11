import { Head, Layout } from '@/src/components'

const MyAnalytics = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myAnalytics" />}
    />
    <Head title={{ id: 'myAnalytics' }} />
  </Layout.Main>
)

export default MyAnalytics
