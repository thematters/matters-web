import { Head, Layout } from '~/components'

import ContentAnalytics from './ContentAnalytics'
import FollowerAnalytics from './FollowerAnalytics'
import IncomeAnalytics from './IncomeAnalytics'
import SubscriberAnalytics from './SubscriberAnalytics'

const CircleAnalytics = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="circleAnalytics" />} />

      <Head title={{ id: 'circleAnalytics' }} />

      <IncomeAnalytics />
      <SubscriberAnalytics />
      <FollowerAnalytics />
      <ContentAnalytics />
    </Layout.Main>
  )
}

export default CircleAnalytics
