import { Head, Layout } from '~/components'

import CircleContentAnalytics from './Content'

const CircleAnalytics = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="circleAnalytics" />}
      />

      <Head title={{ id: 'circleAnalytics' }} />

      <CircleContentAnalytics />
    </Layout.Main>
  )
}

export default CircleAnalytics
