import { Head, Layout } from '~/components'

import ContentAnalytics from './Content'
import FollowerAnalytics from './Follower'
import IncomeAnalytics from './Income'
import SubscriberAnalytics from './Subscriber'

const CircleAnalytics = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="circleAnalytics" />}
      />

      <Head title={{ id: 'circleAnalytics' }} />

      <IncomeAnalytics />
      <SubscriberAnalytics />
      <FollowerAnalytics />
      <ContentAnalytics />
    </Layout.Main>
  )
}

export default CircleAnalytics
