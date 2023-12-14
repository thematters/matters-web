import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import ContentAnalytics from './ContentAnalytics'
import FollowerAnalytics from './FollowerAnalytics'
import IncomeAnalytics from './IncomeAnalytics'
import SubscriberAnalytics from './SubscriberAnalytics'

const CircleAnalytics = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Analytics" id="GZJpDf" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Analytics',
          id: 'GZJpDf',
        })}
      />

      <IncomeAnalytics />
      <SubscriberAnalytics />
      <FollowerAnalytics />
      <ContentAnalytics />
    </Layout.Main>
  )
}

export default CircleAnalytics
